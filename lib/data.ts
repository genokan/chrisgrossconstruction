export type Project = {
  slug: string;
  title: string;
  category: "Barndominium" | "Shop" | "Garage" | "Ag Building" | "Commercial";
  image: string;
  blurb: string;
};

// Real Chris Gross Construction builds.
export const projects: Project[] = [
  {
    slug: "wraparound-porch-barndominium",
    title: "Barndominium with Wraparound Porch",
    category: "Barndominium",
    image: "/photos/p02.jpg",
    blurb: "Living quarters and an attached shop under one roof, wrapped in a covered porch.",
  },
  {
    slug: "stone-wainscot-barndominium",
    title: "Custom Barndominium Home",
    category: "Barndominium",
    image: "/photos/p08.jpg",
    blurb: "White post-frame home with stone wainscot, wraparound porch, and matching detached garage.",
  },
  {
    slug: "two-story-barndominium",
    title: "Two-Story Barndominium",
    category: "Barndominium",
    image: "/photos/p07.jpg",
    blurb: "A two-story home with timber-accented porch and a full attached shop.",
  },
  {
    slug: "sunset-barndominium",
    title: "Custom Barndominium",
    category: "Barndominium",
    image: "/photos/p01.jpg",
    blurb: "Gray post-frame home with black cross-buck doors, cupolas, and stone accents.",
  },
  {
    slug: "post-frame-home-garage",
    title: "Post-Frame Home & Garage",
    category: "Barndominium",
    image: "/photos/p04.jpg",
    blurb: "A tan barndominium with attached garage, covered porch, and clean metal siding.",
  },
  {
    slug: "modern-barndominium",
    title: "Modern Barndominium",
    category: "Barndominium",
    image: "/photos/p10.jpg",
    blurb: "A striking black post-frame home with a two-story glass gable and timber entry.",
  },
  {
    slug: "equipment-shop",
    title: "Equipment Shop",
    category: "Shop",
    image: "/photos/p05.jpg",
    blurb: "A spacious red shop with a lean-to — room for the tractor, the toys, and the projects.",
  },
  {
    slug: "detached-garage-shop",
    title: "Detached Garage & Shop",
    category: "Garage",
    image: "/photos/p09.jpg",
    blurb: "A three-bay white-and-black garage with cupola and lean-to for vehicles and gear.",
  },
  {
    slug: "farm-machine-shed",
    title: "Farm Machine Shed",
    category: "Ag Building",
    image: "/photos/p03.jpg",
    blurb: "A bold red-and-black machine shed with a large sliding door, built for everyday work.",
  },
  {
    slug: "commercial-shop",
    title: "Commercial Shop Building",
    category: "Commercial",
    image: "/photos/p06.jpg",
    blurb: "A clean, low-maintenance commercial post-frame building with paved access.",
  },
];

export type Service = {
  title: string;
  image: string;
  blurb: string;
};

export const services: Service[] = [
  {
    title: "Barndominiums & Homes",
    image: "/photos/p04.jpg",
    blurb: "Live and work under one roof. Custom post-frame homes and shouses designed around how you actually live.",
  },
  {
    title: "Shops & Garages",
    image: "/photos/p09.jpg",
    blurb: "From a two-car garage to a full equipment shop — sized, insulated, and finished for how you'll use it.",
  },
  {
    title: "Farm & Ag Buildings",
    image: "/photos/p03.jpg",
    blurb: "Machine sheds, hay storage, and livestock barns built tough for the way you farm.",
  },
  {
    title: "Commercial Buildings",
    image: "/photos/p06.jpg",
    blurb: "Low-maintenance, cost-effective post-frame buildings for shops, storage, and light industrial use.",
  },
];

// The customization message the client wants front and center.
export const customization: string[] = [
  "Size & floor plan",
  "Siding & trim colors",
  "Roof style & pitch",
  "Porches & lean-tos",
  "Doors, windows & openings",
  "Interior finish & insulation",
];

export const valueProps = [
  { title: "Locally Owned", text: "Family-run and based right here in Holton." },
  { title: "Fully Custom", text: "Every build designed around your needs, not a catalog." },
  { title: "Built to Last", text: "Quality materials and workmanship that hold up for decades." },
  { title: "Free Quotes", text: "Straight answers and honest pricing — just give us a call." },
];
