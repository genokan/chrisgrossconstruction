# Google Drive Image Tracker Setup

## Before You Start

The raw and edited versions of an image must have the same base filename.

Example:

- Raw image: `holton-shop-01.jpg`
- Edited image: `holton-shop-01.webp`

The different file extensions are fine. If the edited image is renamed to a
completely different name, the spreadsheet will treat it as a separate image.

## Installation

1. Create or open the Google Sheet that will track the images.
2. In the spreadsheet, select **Extensions → Apps Script**.
3. Delete the sample code from the editor.
4. Copy everything from `Code.gs` into the editor.
5. Replace the three placeholder folder IDs at the top of the script.
6. Change `SHEET_NAME` if the spreadsheet tab is not named `Image Tracker`.
7. Save the script.
8. Select `setupImageTracker` from the function menu and click **Run**.
9. Approve the requested Google permissions.

The spreadsheet will update immediately and then scan the folders every 15
minutes.

## Finding a Folder ID

Open the folder in Google Drive. Its URL will look similar to:

`https://drive.google.com/drive/folders/1AbCdEfGhIjKlMn`

Copy only the part after `/folders/` and paste it into the matching setting in
the script.

You need IDs for:

- Raw Images
- Edited Images
- Approved for Website

## Spreadsheet Behavior

The script automatically controls:

- `raw_image_name`
- `edited_image_name`
- `edited`

People may manually update:

- `published`
- `context`

The script preserves the `published` and `context` values during future scans.

An image is marked `edited` when a matching file is found in **Edited Images**
or **Approved for Website**. The `published` checkbox is always managed
manually.

To force an immediate refresh, open Apps Script and run `syncImageTracker`.
