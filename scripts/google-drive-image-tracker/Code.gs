/**
 * Google Drive Website Image Tracker
 *
 * Scans the website image folders and synchronizes them with the active sheet.
 * Raw and edited versions are paired by their filename without the extension:
 *   holton-shop-01.jpg  <->  holton-shop-01.webp
 *
 * The script owns these columns:
 *   raw_image_name, edited_image_name, edited
 *
 * People may edit these columns without the script overwriting them:
 *   published, context
 */

const CONFIG = {
  SHEET_NAME: 'Image Tracker',

  // Replace each value with the ID from the corresponding Google Drive folder URL.
  RAW_IMAGES_FOLDER_ID: 'PASTE_RAW_IMAGES_FOLDER_ID_HERE',
  EDITED_IMAGES_FOLDER_ID: 'PASTE_EDITED_IMAGES_FOLDER_ID_HERE',
  APPROVED_IMAGES_FOLDER_ID: 'PASTE_APPROVED_FOR_WEBSITE_FOLDER_ID_HERE',

  HEADERS: [
    'raw_image_name',
    'edited_image_name',
    'edited',
    'published',
    'context',
  ],
};

/** Run this once after entering the folder IDs. */
function setupImageTracker() {
  validateConfiguration_();
  const sheet = getTrackerSheet_();
  ensureHeaders_(sheet);
  syncImageTracker();
  createSyncTrigger_();
}

/**
 * Scans all tracked folders and updates the spreadsheet.
 * This can also be run manually at any time.
 */
function syncImageTracker() {
  validateConfiguration_();

  const sheet = getTrackerSheet_();
  ensureHeaders_(sheet);

  const existingRows = readExistingRows_(sheet);
  const images = new Map();

  collectImages_(CONFIG.RAW_IMAGES_FOLDER_ID, 'raw', images);
  collectImages_(CONFIG.EDITED_IMAGES_FOLDER_ID, 'edited', images);
  collectImages_(CONFIG.APPROVED_IMAGES_FOLDER_ID, 'edited', images);

  const keys = Array.from(images.keys()).sort();
  const rows = keys.map((key) => {
    const image = images.get(key);
    const saved = existingRows.get(key) || {};

    return [
      image.rawName || '',
      image.editedName || '',
      Boolean(image.editedName),
      saved.published === true,
      saved.context || '',
    ];
  });

  writeRows_(sheet, rows);
}

/** Creates one automatic sync trigger that runs every 15 minutes. */
function createSyncTrigger_() {
  const handler = 'syncImageTracker';
  const existingTriggers = ScriptApp.getProjectTriggers();
  const alreadyExists = existingTriggers.some(
    (trigger) => trigger.getHandlerFunction() === handler
  );

  if (!alreadyExists) {
    ScriptApp.newTrigger(handler).timeBased().everyMinutes(15).create();
  }
}

function collectImages_(folderId, type, images) {
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    if (!isImage_(file)) continue;

    const name = file.getName();
    const key = filenameKey_(name);
    if (!key) continue;

    if (!images.has(key)) {
      images.set(key, { rawName: '', editedName: '' });
    }

    const image = images.get(key);
    if (type === 'raw') {
      image.rawName = chooseName_(image.rawName, name);
    } else {
      image.editedName = chooseName_(image.editedName, name);
    }
  }
}

function readExistingRows_(sheet) {
  const rowsByKey = new Map();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return rowsByKey;

  const values = sheet
    .getRange(2, 1, lastRow - 1, CONFIG.HEADERS.length)
    .getValues();

  values.forEach((row) => {
    const rawName = String(row[0] || '').trim();
    const editedName = String(row[1] || '').trim();
    const key = filenameKey_(rawName || editedName);
    if (!key) return;

    rowsByKey.set(key, {
      published: normalizeBoolean_(row[3]),
      context: String(row[4] || ''),
    });
  });

  return rowsByKey;
}

function writeRows_(sheet, rows) {
  const previousRowCount = Math.max(sheet.getLastRow() - 1, 0);
  const rowsToClear = Math.max(previousRowCount, rows.length);

  if (rowsToClear > 0) {
    sheet
      .getRange(2, 1, rowsToClear, CONFIG.HEADERS.length)
      .clearContent()
      .clearDataValidations();
  }

  if (rows.length === 0) return;

  sheet.getRange(2, 1, rows.length, CONFIG.HEADERS.length).setValues(rows);
  sheet.getRange(2, 3, rows.length, 2).insertCheckboxes();
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, CONFIG.HEADERS.length);
}

function ensureHeaders_(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, CONFIG.HEADERS.length);
  const current = headerRange.getValues()[0];
  const correct = CONFIG.HEADERS.every(
    (header, index) => current[index] === header
  );

  if (!correct) {
    headerRange.setValues([CONFIG.HEADERS]);
  }

  headerRange.setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function getTrackerSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
  }

  return sheet;
}

function isImage_(file) {
  const mimeType = file.getMimeType();
  return mimeType.indexOf('image/') === 0;
}

function filenameKey_(filename) {
  return String(filename || '')
    .trim()
    .replace(/\.[^.]+$/, '')
    .toLowerCase();
}

function chooseName_(currentName, candidateName) {
  if (!currentName) return candidateName;
  return candidateName.localeCompare(currentName) < 0
    ? candidateName
    : currentName;
}

function normalizeBoolean_(value) {
  return value === true || String(value).toLowerCase() === 'true';
}

function validateConfiguration_() {
  const folderIds = [
    CONFIG.RAW_IMAGES_FOLDER_ID,
    CONFIG.EDITED_IMAGES_FOLDER_ID,
    CONFIG.APPROVED_IMAGES_FOLDER_ID,
  ];

  const missing = folderIds.some((id) => String(id).indexOf('PASTE_') === 0);
  if (missing) {
    throw new Error(
      'Add all three Google Drive folder IDs to the CONFIG section before running the script.'
    );
  }
}
