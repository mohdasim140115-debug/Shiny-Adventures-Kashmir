import type { ImageKey } from "./images";

/**
 * Destination guide content. Distances and timings are approximate and road-dependent;
 * keep them conservative and update them if local conditions change.
 */
export const regions = [
  { id: "central", name: "Central Kashmir", text: "Srinagar and the meadows within a short drive of the city." },
  { id: "north", name: "North Kashmir", text: "Gulmarg, Tangmarg and the remote valleys of the north." },
  { id: "south", name: "South Kashmir", text: "Pahalgam, Mughal springs and waterfalls of Anantnag and Kulgam." },
] as const;
export type RegionId = (typeof regions)[number]["id"];

export type Destination = {
  slug: string;
  region: RegionId;
  name: string;
  tagline: string;
  bestTime: string;
  image: ImageKey;
  /** Extra photos for the city guide gallery (main image is always shown first). */
  gallery: ImageKey[];
  intro: string;
  fromSrinagar: string;
  bestFor: string[];
  experiences: string[];
  /** Photo for each experience, by index; null when no photo genuinely shows it. */
  experienceImages: (ImageKey | null)[];
  planningNote: string;
  /** Package slugs (see data/packages.ts) that include this destination. */
  packages: string[];
};

export const destinations: Destination[] = [
  {
    slug: "srinagar",
    experienceImages: ["uDalBlue", "uDalHouseboats", "srinagarShalimar", null],
    gallery: ["uDalHouseboats", "uFloatingMarket", "uTulipGarden", "uAutumnChinar", "uDalBlue", "srinagarShalimar"],
    region: "central",
    bestTime: "March to November; winter for snow-dusted lake views",
    name: "Srinagar",
    tagline: "Dal Lake, houseboats and Mughal gardens",
    image: "uDalShikaras",
    intro:
      "Srinagar is where most Kashmir trips begin and end. The city wraps around Dal Lake and Nigeen Lake, and a night on a traditional houseboat is one of the most requested parts of any itinerary. Early-morning shikara rides pass the floating vegetable market, while the terraced Mughal gardens of Nishat Bagh, Shalimar Bagh and Chashme Shahi are an easy afternoon.",
    fromSrinagar: "Arrival point – Srinagar airport and the city's hotels and houseboats",
    bestFor: ["First-time visitors", "Honeymoon couples", "Families with elders"],
    experiences: [
      "Shikara ride on Dal Lake",
      "Houseboat stay on Dal or Nigeen Lake",
      "Nishat Bagh, Shalimar Bagh and Chashme Shahi gardens",
      "Hazratbal Shrine and the old city",
    ],
    planningNote:
      "Two nights in Srinagar works well for most travellers: one on a houseboat and one in a hotel, or both on the water if you prefer.",
    packages: ["kashmir-valley-classic", "kashmir-honeymoon", "kashmir-family-holiday", "offbeat-kashmir-gurez-doodhpathri", "south-kashmir-springs"],
  },
  {
    slug: "gulmarg",
    experienceImages: ["uGulmargGondola", "uGulmargSnowCabin", "gulmargSummer", null],
    gallery: ["uGulmargSnowCabin", "uGulmargRoad", "uGulmargView", "gulmargSummer"],
    region: "north",
    bestTime: "December to March for snow, May to September for meadows",
    name: "Gulmarg",
    tagline: "Gondola rides, snow and alpine meadows",
    image: "uGulmargGondola",
    intro:
      "Gulmarg is a high meadow ringed by pine forest, known for the Gulmarg Gondola, one of the highest cable cars in the world, which climbs towards Mount Apharwat. In winter it becomes Kashmir's snow destination, with skiing and sledging on the slopes; in summer the same meadows turn green and are ideal for walks, pony rides and photography. Our office is in Wahipora, Tangmarg, on the road up to Gulmarg.",
    fromSrinagar: "Approx. 50 km, around 1.5–2 hours by road via Tangmarg",
    bestFor: ["Snow lovers", "Families", "Adventure seekers"],
    experiences: [
      "Gulmarg Gondola to Kongdoori and Apharwat (subject to weather and ticket availability)",
      "Skiing, snowboarding and sledging in winter",
      "Meadow walks and pony rides in summer",
      "St. Mary's Church and the view over the valley",
    ],
    planningNote:
      "Gondola tickets sell out on busy days, so we advise booking as early as possible. Higher-phase operations depend on weather.",
    packages: ["kashmir-valley-classic", "kashmir-honeymoon", "kashmir-family-holiday", "gulmarg-snow-escape"],
  },
  {
    slug: "pahalgam",
    experienceImages: ["pahalgamBetaab", null, "pahalgamLidder", null],
    gallery: ["pahalgamBetaab", "pahalgam", "pahalgamAru", "pahalgamLidder"],
    region: "south",
    bestTime: "April to October",
    name: "Pahalgam",
    tagline: "The Lidder River and pine valleys",
    image: "uPahalgamMustard",
    intro:
      "Pahalgam sits where the Lidder River runs through a wide, pine-covered valley. It is a relaxed place to stay for a night or two, with short drives to Betaab Valley, Aru Valley and Chandanwari. Riverside walks, local pony trails and quiet evenings make it a favourite with families and couples alike.",
    fromSrinagar: "Approx. 95 km, around 2.5–3 hours by road",
    bestFor: ["Nature lovers", "Couples", "Slow travellers"],
    experiences: [
      "Betaab Valley and Aru Valley by local taxi",
      "Chandanwari, often snow-covered well into early summer",
      "Walks along the Lidder River",
      "Saffron fields and apple orchards on the drive from Srinagar",
    ],
    planningNote:
      "Sightseeing inside Pahalgam uses local union taxis. Access to some points can change at short notice, and we confirm what is open before your visit.",
    packages: ["kashmir-valley-classic", "kashmir-honeymoon", "south-kashmir-springs"],
  },
  {
    slug: "sonamarg",
    experienceImages: ["uSonamargSnowGrass", null, "uSonamargMeadow"],
    gallery: ["uSonamargMeadow", "uSonamargSnowGrass", "uSonamargWinter", "sonamarg"],
    region: "central",
    bestTime: "May to October",
    name: "Sonamarg",
    tagline: "Glacier views on the road to Ladakh",
    image: "uThajiwas",
    intro:
      "Sonamarg, the 'meadow of gold', lies along the Sindh River on the highway towards Zojila and Ladakh. Jagged peaks rise directly above the meadows, and the Thajiwas Glacier is reached on foot or by pony. It is usually visited as a full day trip from Srinagar.",
    fromSrinagar: "Approx. 80 km, around 2.5–3 hours by road",
    bestFor: ["Day trips", "Photography", "Glacier walks"],
    experiences: [
      "Pony ride or walk to Thajiwas Glacier",
      "Riverside stops along the Sindh",
      "Views of the high Himalayan peaks",
    ],
    planningNote:
      "Road access in winter depends on snowfall and highway authority advisories. We check current conditions before confirming a Sonamarg day.",
    packages: ["kashmir-valley-classic", "kashmir-family-holiday"],
  },
  {
    slug: "doodhpathri",
    experienceImages: ["doodhpathri", "doodhpathriStream", "doodhpathriPonies"],
    gallery: ["doodhpathri", "doodhpathriPonies", "doodhpathriStream", "doodhpathriUpper"],
    region: "central",
    bestTime: "May to October",
    name: "Doodhpathri",
    tagline: "Quiet meadows and the milky Shaliganga",
    image: "uDoodhpathriHut",
    intro:
      "Doodhpathri, the 'valley of milk', is a broad grassland in Budgam district crossed by the white, foaming Shaliganga stream. It is far less crowded than the better-known resorts and has only basic facilities, which is exactly why many travellers enjoy it as a peaceful day out with a packed lunch.",
    fromSrinagar: "Approx. 45 km, around 1.5–2 hours by road",
    bestFor: ["Offbeat travellers", "Picnics", "Families wanting a calm day"],
    experiences: [
      "Walks across open meadows",
      "Riverside picnic by the Shaliganga",
      "Pony rides to viewpoints",
    ],
    planningNote:
      "Doodhpathri works best as a day trip from Srinagar between late spring and autumn. Carry warm layers even in summer.",
    packages: ["offbeat-kashmir-gurez-doodhpathri"],
  },
  {
    slug: "gurez-valley",
    experienceImages: ["gurezHabbaKhatoon", "gurez", null, null],
    gallery: ["uGurezValley", "uGurezForest", "gurezHabbaKhatoon", "gurez", "gurezVillage"],
    region: "north",
    bestTime: "June to September",
    name: "Gurez Valley",
    tagline: "Remote log villages beside the Kishanganga",
    image: "uGurezLake",
    intro:
      "Gurez is a remote valley north of Srinagar, reached over the high Razdan Pass. Wooden log houses, the Kishanganga River and the pyramid-shaped Habba Khatoon peak give it a character quite different from the rest of Kashmir. Dawar is the main village, and the Tulail area further up the valley rewards travellers who have an extra day.",
    fromSrinagar: "A long day's drive via Bandipora and the Razdan Pass",
    bestFor: ["Offbeat explorers", "Culture and village life", "Photographers"],
    experiences: [
      "Habba Khatoon peak and spring",
      "Village walks around Dawar",
      "Drives along the Kishanganga River",
      "Excursion to Tulail when time allows",
    ],
    planningNote:
      "Gurez is a border area: carry a valid government photo ID. The Razdan Pass usually closes in winter, so trips are planned for the open season, and we confirm the latest entry rules for your nationality before booking.",
    packages: ["offbeat-kashmir-gurez-doodhpathri"],
  },
  {
    slug: "tangmarg",
    experienceImages: [null, "tangmargPines", null, null],
    gallery: ["tangmargPines", "tangmargRoad", "gulmargWinterForest"],
    region: "north",
    bestTime: "Year-round; December to March for snow",
    name: "Tangmarg",
    tagline: "Pine forests at the gateway to Gulmarg",
    image: "tangmarg",
    intro:
      "Tangmarg is the small town on the road from Srinagar to Gulmarg, where the plains give way to pine-covered slopes. It is where our office is based, in Wahipora. Most travellers pass through on the way up to Gulmarg, but the area is worth a stop of its own: the Drung waterfall, which often freezes in winter, and the Ferozpora stream are both close by.",
    fromSrinagar: "Approx. 40 km, around 1–1.5 hours by road",
    bestFor: ["Gulmarg travellers", "Winter snow", "Short scenic stops"],
    experiences: [
      "Drung waterfall, often frozen in mid-winter",
      "Pine-forest drive up to Gulmarg",
      "Walks along the Ferozpora stream",
      "Local bakeries and roadside tea stops",
    ],
    planningNote:
      "In heavy snow, vehicles going up to Gulmarg may need chains or 4x4s and traffic is sometimes regulated at Tangmarg. We arrange suitable vehicles and plan around these restrictions.",
    packages: ["kashmir-valley-classic", "kashmir-honeymoon", "kashmir-family-holiday", "gulmarg-snow-escape"],
  },
  {
    slug: "yusmarg",
    experienceImages: ["yusmargSheep", "yusmargNilnag", null],
    gallery: ["uYusmargFlowers", "yusmargSheep", "yusmargNilnag"],
    region: "central",
    bestTime: "April to October",
    name: "Yusmarg",
    tagline: "Open meadows and the Doodh Ganga stream",
    image: "yusmarg",
    intro:
      "Yusmarg is a broad meadow in Budgam district, edged by pine and fir forest, with the Doodh Ganga stream running nearby. It is quieter than the main resorts and makes a relaxed day out from Srinagar. Visitors with more energy can walk or ride a pony to the small Nilnag lake.",
    fromSrinagar: "Approx. 47 km, around 1.5–2 hours by road",
    bestFor: ["Day trips", "Families", "Quiet nature walks"],
    experiences: ["Meadow walks and picnics", "Pony ride or short trek to Nilnag lake", "Riverside time by the Doodh Ganga"],
    planningNote: "Yusmarg pairs well with Doodhpathri on a second day trip from Srinagar. Facilities are limited, so carry water and snacks.",
    packages: [],
  },
  {
    slug: "lolab-valley",
    experienceImages: ["lolabDiver", null, "lolab"],
    gallery: ["lolabDiver"],
    region: "north",
    bestTime: "May to October",
    name: "Lolab Valley",
    tagline: "Orchards, forests and village life in Kupwara",
    image: "lolab",
    intro:
      "Lolab is a long, green valley in Kupwara district, known locally as Wadi-e-Lolab. Fields, walnut and apple orchards and dense forest fill the valley floor, and village life here moves at an unhurried pace. The Kalaroos caves are among the places visitors explore in the area.",
    fromSrinagar: "Approx. 110–120 km, around 3.5–4 hours by road",
    bestFor: ["Offbeat travellers", "Village life", "Photography"],
    experiences: ["Drives through orchards and paddy fields", "Kalaroos caves area", "Forest walks and village visits"],
    planningNote:
      "Lolab is best with at least one overnight stay because of the drive time. We confirm current access and accommodation options before including it in your plan.",
    packages: [],
  },
  {
    slug: "bangus-valley",
    experienceImages: ["bangusWide", "bangus", null],
    gallery: ["bangusWide", "bangusHills"],
    region: "north",
    bestTime: "June to September",
    name: "Bangus Valley",
    tagline: "A vast high meadow in north Kashmir",
    image: "bangus",
    intro:
      "Bangus is a wide, high-altitude meadow in the Kupwara area, ringed by pine forest and crossed by small streams. It sees far fewer visitors than the well-known resorts and has only basic facilities, which makes it appealing to travellers who want open space and quiet.",
    fromSrinagar: "Roughly 4–5 hours by road via Handwara, depending on road conditions",
    bestFor: ["Offbeat explorers", "Camping-style trips", "Landscape photography"],
    experiences: ["Walks across the open meadow", "Streams and forest edges", "Picnic stops on the drive through Handwara"],
    planningNote: "Road access is seasonal and facilities are basic. Bangus is planned only in the open season and after checking current conditions.",
    packages: [],
  },
  {
    slug: "aharbal",
    experienceImages: ["aharbalClose", "aharbalRiver", null],
    gallery: ["aharbalClose", "aharbalRiver"],
    region: "south",
    bestTime: "April to October",
    name: "Aharbal",
    tagline: "A powerful waterfall on the Veshaw river",
    image: "aharbal",
    intro:
      "Aharbal in Kulgam district is known for its waterfall, where the Veshaw river drops through a narrow rocky gorge surrounded by pine forest. The roar of the water and the forest setting make it a popular stop on a south Kashmir day trip.",
    fromSrinagar: "Approx. 70 km, around 2–2.5 hours by road",
    bestFor: ["Day trips", "Nature lovers", "Photography"],
    experiences: ["Viewpoints around Aharbal waterfall", "Forest walks along the Veshaw river", "Picnic stops in the pine forest"],
    planningNote: "Rocks near the falls can be slippery; stay behind the railings. Aharbal combines well with Kokernag or Verinag.",
    packages: ["south-kashmir-springs"],
  },
  {
    slug: "kokernag",
    experienceImages: ["kokernagGarden", null, "kokernagTrout"],
    gallery: ["kokernagGarden", "kokernagChinar", "kokernagTrout"],
    region: "south",
    bestTime: "April to October",
    name: "Kokernag",
    tagline: "Botanical garden and freshwater springs",
    image: "kokernag",
    intro:
      "Kokernag in Anantnag district is known for its freshwater springs and a large botanical garden laid out among willows and chinars, with forested hills all around. A trout fish farm nearby is another stop many visitors enjoy.",
    fromSrinagar: "Approx. 80 km, around 2.5 hours by road",
    bestFor: ["Families", "Gardens and springs", "Relaxed sightseeing"],
    experiences: ["Kokernag botanical garden", "Freshwater springs", "Trout fish farm"],
    planningNote: "Kokernag and Verinag are close to each other and fit comfortably into one day from Pahalgam or Srinagar.",
    packages: ["south-kashmir-springs"],
  },
  {
    slug: "verinag",
    experienceImages: ["verinagSpring", "verinagChannel", "verinagAutumn"],
    gallery: ["verinagSpring", "verinagAutumn", "verinagChannel"],
    region: "south",
    bestTime: "April to November",
    name: "Verinag",
    tagline: "The Mughal spring at the source of the Jhelum",
    image: "verinag",
    intro:
      "Verinag is a deep, turquoise spring traditionally regarded as the source of the Jhelum river. The Mughal emperor Jahangir enclosed it in an octagonal stone tank with an arched arcade, and a Mughal garden extends from it. It is one of the most atmospheric heritage stops in south Kashmir.",
    fromSrinagar: "Approx. 80 km, around 2.5 hours by road",
    bestFor: ["Heritage lovers", "Photography", "Families"],
    experiences: ["Octagonal Mughal spring and arcade", "Verinag Mughal garden", "Autumn colours in the garden"],
    planningNote: "Verinag is often combined with Kokernag and Achabal on a south Kashmir day.",
    packages: ["south-kashmir-springs"],
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
