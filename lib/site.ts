export const site = {
  name: "Chris Gross Construction",
  shortName: "Chris Gross Construction",
  tagline: "Building Your Dreams",
  description:
    "Family-owned post-frame builder in Holton, Kansas. Custom barndominiums, shops, garages, and farm buildings across northeast Kansas. Call for a free quote.",
  url: "https://chrisgrossconstruction.com",

  phoneDisplay: "(785) 364-5600",
  phoneHref: "tel:+17853645600",

  email: "", // no public email yet — call for quotes

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
    "Greater Kansas City",
  ],

  nav: [
    { label: "Our Work", href: "/work/" },
    { label: "What We Build", href: "/services/" },
    { label: "About", href: "/contact/#about" },
    { label: "Contact", href: "/contact/" },
  ],
};

export type Site = typeof site;
