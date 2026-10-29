import type { ImageKey } from "./images";

/**
 * Sample itineraries. Every trip is customised and quoted on request, so no prices are
 * published here. Edit, add or remove packages freely – pages and links update automatically.
 */
export const categories = ["Classic", "Honeymoon", "Family", "Winter", "Offbeat"] as const;
export type Category = (typeof categories)[number];

export type TourPackage = {
  slug: string;
  category: Category;
  bestTime: string;
  name: string;
  nights: number;
  days: number;
  summary: string;
  idealFor: string;
  route: string[];
  image: ImageKey;
  highlights: string[];
  itinerary: { title: string; detail: string }[];
  /** Destination slugs (see data/destinations.ts). */
  destinations: string[];
};

export const packages: TourPackage[] = [
  {
    slug: "kashmir-valley-classic",
    category: "Classic",
    bestTime: "March to November",
    name: "Kashmir Valley Classic",
    nights: 5,
    days: 6,
    summary:
      "The best-loved first-time route: Dal Lake and the Mughal gardens in Srinagar, a day in Gulmarg, a glacier day in Sonamarg and two calm nights in Pahalgam.",
    idealFor: "First-time visitors who want to see the main valleys at a comfortable pace",
    route: ["Srinagar", "Gulmarg", "Sonamarg", "Pahalgam", "Srinagar"],
    image: "uDalHouseboats",
    highlights: ["Shikara ride on Dal Lake", "Gulmarg Gondola (tickets subject to availability)", "Thajiwas Glacier area", "Betaab and Aru valleys"],
    itinerary: [
      { title: "Arrive in Srinagar", detail: "Airport pickup, check in to your hotel or houseboat, and an evening shikara ride on Dal Lake." },
      { title: "Srinagar to Gulmarg day trip", detail: "Drive via Tangmarg to Gulmarg for the gondola, meadow walks or snow activities, returning to Srinagar." },
      { title: "Sonamarg day trip", detail: "Full day along the Sindh River to Sonamarg, with an optional pony ride towards Thajiwas Glacier." },
      { title: "Srinagar to Pahalgam", detail: "Stop at saffron fields and Avantipora ruins on the way. Evening by the Lidder River." },
      { title: "Pahalgam sightseeing", detail: "Betaab Valley, Aru Valley and Chandanwari by local taxi, as open on the day." },
      { title: "Departure", detail: "Return to Srinagar for your onward flight, with a Mughal garden stop if time permits." },
    ],
    destinations: ["srinagar", "tangmarg", "gulmarg", "sonamarg", "pahalgam"],
  },
  {
    slug: "kashmir-honeymoon",
    category: "Honeymoon",
    bestTime: "Year-round – choose snow or green season",
    name: "Kashmir Honeymoon",
    nights: 6,
    days: 7,
    summary:
      "An unhurried trip for couples, with a houseboat night on Dal Lake, a stay in Gulmarg and riverside evenings in Pahalgam. We can add room decoration or a candle-light dinner on request.",
    idealFor: "Newly married couples and anniversary trips",
    route: ["Srinagar", "Gulmarg", "Pahalgam", "Srinagar"],
    image: "uDalShikaras",
    highlights: ["Houseboat night on Dal Lake", "Overnight stay in Gulmarg", "Two nights in Pahalgam", "Mughal gardens of Srinagar"],
    itinerary: [
      { title: "Arrive in Srinagar", detail: "Transfer to your houseboat and a sunset shikara ride." },
      { title: "Srinagar sightseeing", detail: "Nishat Bagh, Shalimar Bagh and Chashme Shahi, with time in the old city." },
      { title: "Srinagar to Gulmarg", detail: "Drive up via Tangmarg and spend the afternoon on the meadows." },
      { title: "Gulmarg", detail: "Gondola ride (tickets subject to availability) and a slow evening in the mountains." },
      { title: "Gulmarg to Pahalgam", detail: "Scenic drive across the valley to the Lidder River." },
      { title: "Pahalgam", detail: "Betaab Valley and Aru Valley, or a quiet day by the river." },
      { title: "Departure", detail: "Drive back to Srinagar airport." },
    ],
    destinations: ["srinagar", "tangmarg", "gulmarg", "pahalgam"],
  },
  {
    slug: "kashmir-family-holiday",
    category: "Family",
    bestTime: "April to October",
    name: "Kashmir Family Holiday",
    nights: 4,
    days: 5,
    summary:
      "A shorter plan with fewer hotel changes, ideal for families with children or elderly parents. Srinagar is the base, with easy day trips to Gulmarg and Sonamarg.",
    idealFor: "Families who prefer one base and shorter daily drives",
    route: ["Srinagar", "Gulmarg", "Sonamarg", "Srinagar"],
    image: "uTulipGarden",
    highlights: ["Single hotel base in Srinagar", "Gulmarg and Sonamarg day trips", "Shikara ride", "Flexible pace for children and elders"],
    itinerary: [
      { title: "Arrive in Srinagar", detail: "Pickup, check-in and a short shikara ride." },
      { title: "Gulmarg day trip", detail: "Gondola or snow play depending on season, back to Srinagar for the night." },
      { title: "Sonamarg day trip", detail: "Riverside stops and meadow time with an optional pony ride." },
      { title: "Srinagar at leisure", detail: "Mughal gardens, local markets and time to rest." },
      { title: "Departure", detail: "Transfer to Srinagar airport." },
    ],
    destinations: ["srinagar", "tangmarg", "gulmarg", "sonamarg"],
  },
  {
    slug: "gulmarg-snow-escape",
    category: "Winter",
    bestTime: "December to March",
    name: "Gulmarg Snow Escape",
    nights: 3,
    days: 4,
    summary:
      "A winter trip built around Gulmarg's snow. Stay close to the slopes, ride the gondola and try skiing or sledging with a local instructor arranged on request.",
    idealFor: "Winter travellers looking for snow and beginner skiing",
    route: ["Srinagar", "Gulmarg", "Srinagar"],
    image: "uGulmargRoad",
    highlights: ["Two nights in Gulmarg", "Gondola ride (weather permitting)", "Skiing or sledging on request", "Snow-season vehicle arrangements"],
    itinerary: [
      { title: "Arrive in Srinagar", detail: "Pickup and an evening in Srinagar or a direct drive to Gulmarg, depending on flight time." },
      { title: "Gulmarg snow day", detail: "Gondola ride and snow activities on the lower slopes." },
      { title: "Skiing or sledging", detail: "A beginner session with an instructor, or a free day in the snow." },
      { title: "Departure", detail: "Drive down via Tangmarg to Srinagar airport." },
    ],
    destinations: ["gulmarg", "tangmarg", "srinagar"],
  },
  {
    slug: "offbeat-kashmir-gurez-doodhpathri",
    category: "Offbeat",
    bestTime: "June to September (Gurez road season)",
    name: "Offbeat Kashmir: Gurez & Doodhpathri",
    nights: 6,
    days: 7,
    summary:
      "For travellers who have seen the classic valleys or simply want quieter places: the meadows of Doodhpathri and the remote log villages of Gurez Valley.",
    idealFor: "Repeat visitors and travellers who prefer fewer crowds",
    route: ["Srinagar", "Doodhpathri", "Gurez Valley", "Srinagar"],
    image: "uGurezLake",
    highlights: ["Doodhpathri meadows", "Two nights in Gurez Valley", "Razdan Pass drive", "Village life around Dawar"],
    itinerary: [
      { title: "Arrive in Srinagar", detail: "Pickup and an evening shikara ride." },
      { title: "Doodhpathri day trip", detail: "Meadow walks and a riverside picnic by the Shaliganga." },
      { title: "Srinagar to Gurez", detail: "Long scenic drive via Bandipora and the Razdan Pass to Dawar." },
      { title: "Gurez Valley", detail: "Habba Khatoon peak, village walks and the Kishanganga River." },
      { title: "Tulail or rest day", detail: "Optional drive up the valley towards Tulail, depending on road conditions." },
      { title: "Gurez to Srinagar", detail: "Return over the pass to Srinagar." },
      { title: "Departure", detail: "Transfer to Srinagar airport." },
    ],
    destinations: ["srinagar", "doodhpathri", "gurez-valley"],
  },
  {
    slug: "south-kashmir-springs",
    category: "Offbeat",
    bestTime: "April to November",
    name: "South Kashmir Springs & Waterfalls",
    nights: 5,
    days: 6,
    summary:
      "Pahalgam's river valleys combined with the Mughal spring at Verinag, the gardens and springs of Kokernag and the waterfall at Aharbal – a calmer side of Kashmir that many visitors miss.",
    idealFor: "Travellers who enjoy heritage, gardens and quieter sightseeing",
    route: ["Srinagar", "Pahalgam", "Verinag", "Kokernag", "Aharbal", "Srinagar"],
    image: "verinag",
    highlights: ["Verinag Mughal spring", "Kokernag botanical garden", "Aharbal waterfall", "Two nights in Pahalgam"],
    itinerary: [
      { title: "Arrive in Srinagar", detail: "Pickup, check-in and an evening shikara ride on Dal Lake." },
      { title: "Srinagar to Pahalgam", detail: "Drive via saffron fields and the Avantipora ruins to the Lidder valley." },
      { title: "Pahalgam sightseeing", detail: "Betaab Valley, Aru Valley and Chandanwari by local taxi, as open on the day." },
      { title: "Verinag and Kokernag", detail: "The octagonal Mughal spring at Verinag, then Kokernag's botanical garden and springs." },
      { title: "Aharbal to Srinagar", detail: "Visit Aharbal waterfall on the Veshaw river and drive back to Srinagar." },
      { title: "Departure", detail: "Transfer to Srinagar airport." },
    ],
    destinations: ["srinagar", "pahalgam", "verinag", "kokernag", "aharbal"],
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);

export const durationLabel = (p: Pick<TourPackage, "nights" | "days">) => `${p.nights} Nights / ${p.days} Days`;
