export const site = {
  name: "Chris Gross Construction",
  shortName: "Chris Gross Construction",
  legalName: "Chris Gross Construction, Inc.",
  tagline: "Building Your Dreams",
  description:
    "Family-owned post-frame builder in Holton, Kansas with more than 25 years of experience. Custom barndominiums, shops, garages, and farm buildings across northeast Kansas. Call for a free quote.",
  url: "https://chrisgrossconstruction.com",

  phoneDisplay: "(785) 364-5600",
  phoneHref: "tel:+17853645600",

  emailDisplay: "chrisgrossconstruction@gmail.com",
  emailHref: "mailto:chrisgrossconstruction@gmail.com",

  address: {
    street: "12423 Memory Ln",
    city: "Holton",
    state: "KS",
    zip: "66436",
    full: "12423 Memory Ln, Holton, KS 66436",
  },

  // Holton, KS
  geo: { lat: 39.4614, lng: -95.7355 },

  hours: "Mon–Fri, 7am–5pm",
  yearsInBusiness: "More than 25 years",

  // Shown near call CTAs so callers know voicemail is monitored.
  callNote: "If we miss your call, please leave a message — we return every call.",

  areaBlurb: "Based in Holton — about 30 minutes north of Topeka.",
  serviceArea: [
    "Holton",
    "Topeka",
    "Lawrence",
    "Jackson County",
    "Hoyt",
    "Mayetta",
    "Netawaka",
    "Soldier",
    "Meriden",
    "Valley Falls",
    "Northeast Kansas",
  ],

  nav: [
    { label: "Our Work", href: "/work/" },
    { label: "What We Build", href: "/services/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],

  socialProfiles: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/p/Chris-Gross-Construction-100087169221999/",
    },
  ],

  trustProfiles: [
    {
      label: "BBB A+ Rating",
      href: "https://www.bbb.org/us/ks/holton/profile/pole-barn/chris-gross-construction-inc-0714-17240",
    },
    {
      label: "Holton Chamber",
      href: "https://exploreholton.com/membership/membership-directory#!biz/id/655669c16412de16290e02c2",
    },
  ],

  get externalProfiles() {
    return [...this.socialProfiles, ...this.trustProfiles];
  },
};

export type Site = typeof site;
