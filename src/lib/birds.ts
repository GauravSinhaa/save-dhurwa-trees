import { AvianSpecies } from "./types";

// Native Avian & Canopy Wildlife Species affected by road widening in Dhurwa, Ranchi
export const dhurwaAvianSpecies: AvianSpecies[] = [
  {
    id: "bird-001",
    common_name_en: "Indian Grey Hornbill",
    common_name_hi: "भारतीय धूसर धनेश",
    scientific_name: "Ocyceros birostris",
    nesting_type: "TREE_HOLLOW_CAVITY",
    primary_host_trees: [
      "Peepal (Ficus religiosa)",
      "Banyan (Ficus benghalensis)",
      "Sal (Shorea robusta)",
    ],
    diet_type: "Frugivore / Omnivore (Wild figs, berries, insects)",
    impact_summary:
      "Female seals herself inside deep tree hollows with mud during nesting. Road felling destroys obligate breeding cavities that saplings cannot replace for 40+ years.",
    why_saplings_cannot_replace:
      "Compensatory saplings do not form natural trunk hollows for at least 4 to 5 decades. Loss of mature trees leads to immediate local reproductive collapse.",
    iucn_status: "Least Concern (Severely threatened by urban canopy felling)",
    corridor_hotspots:
      "Vivekananda School More to Dhurwa Post Office (Chainage 0+200 to 1+400)",
  },
  {
    id: "bird-002",
    common_name_en: "Coppersmith Barbet",
    common_name_hi: "ताम्रकार बसंता (छोटा बसंता)",
    scientific_name: "Psilopogon haemacephalus",
    nesting_type: "TREE_HOLLOW_CAVITY",
    primary_host_trees: [
      "Sal (Shorea robusta)",
      "Neem (Azadirachta indica)",
      "Peepal",
    ],
    diet_type: "Frugivore (Ficus figs, drupes, floral buds)",
    impact_summary:
      "Excavates its own circular nest hole in mature or decaying limbs. The metallic 'tuk-tuk' call is a signature sound of Dhurwa's shaded avenues.",
    why_saplings_cannot_replace:
      "Requires thick branches (>20 cm diameter) with partial internal softness to peck out nest holes; saplings have zero excavatable limbs.",
    iucn_status: "Protected under Wildlife Protection Act (Schedule II)",
    corridor_hotspots: "HEC Administrative Avenue & Sector 3 outer green belt",
  },
  {
    id: "bird-003",
    common_name_en: "Spotted Owlet",
    common_name_hi: "चित्तीदार उल्लू (खूसट)",
    scientific_name: "Athene brama",
    nesting_type: "TREE_HOLLOW_CAVITY",
    primary_host_trees: ["Banyan / Bargad", "Mahua (Madhuca longifolia)", "Karanj"],
    diet_type: "Carnivore / Insectivore (Mice, beetles, locusts)",
    impact_summary:
      "Roosts inside deep knot-holes of heritage Banyan and Mahua trunks. Serves as natural rodent control for surrounding residential sectors and farmlands.",
    why_saplings_cannot_replace:
      "Requires natural weathering crevices and hollows formed exclusively in mature trees over 30 to 60 years old.",
    iucn_status: "Protected under Wildlife Protection Act",
    corridor_hotspots: "Near Dhurwa Dam Link and Jagannathpur Historic Corridor",
  },
  {
    id: "bird-004",
    common_name_en: "Alexandrine Parakeet",
    common_name_hi: "बड़ा तोता (राया तोता)",
    scientific_name: "Psittacula eupatria",
    nesting_type: "TREE_HOLLOW_CAVITY",
    primary_host_trees: ["Sal (Shorea robusta)", "Semal (Bombax ceiba)", "Arjun"],
    diet_type: "Granivore / Frugivore (Seeds, fleshy calyces, nectar)",
    impact_summary:
      "Near Threatened species globally. Relies on tall old-growth tree cavities high above human reach. Flocks feed on Semal and Mahua blooms in spring.",
    why_saplings_cannot_replace:
      "Cannot breed in low or thin-branched young trees due to predation vulnerability and lack of cavity depth.",
    iucn_status: "Near Threatened (IUCN Red List)",
    corridor_hotspots: "Jagannathpur corridor to Naya Sarai approach",
  },
  {
    id: "bird-005",
    common_name_en: "Black-hooded Oriole",
    common_name_hi: "पीलक (हल्दी चिड़िया)",
    scientific_name: "Oriolus xanthornus",
    nesting_type: "HIGH_CANOPY_FORK",
    primary_host_trees: ["Sal (Shorea robusta)", "Mahua", "Karanj"],
    diet_type: "Insectivore / Frugivore (Caterpillars, wild figs)",
    impact_summary:
      "Weaves an intricate cradle-like cup suspended between horizontal forks in dense high canopies. Crucial regulator of defoliating forest caterpillars.",
    why_saplings_cannot_replace:
      "Requires dense continuous canopy shade at 12–18m height to camouflage nests from crows and raptors.",
    iucn_status: "Least Concern (Habitat restricted in urbanized corridors)",
    corridor_hotspots: "Continuous Sal canopy between Sector 2 and Sector 3",
  },
  {
    id: "bird-006",
    common_name_en: "Shikra & Black Kite",
    common_name_hi: "शिकरा और चील",
    scientific_name: "Accipiter badius / Milvus migrans",
    nesting_type: "HIGH_CANOPY_FORK",
    primary_host_trees: ["Banyan (Ficus benghalensis)", "Tall Sal", "Arjun"],
    diet_type: "Raptor (Lizards, rodents, roadkill, carrion)",
    impact_summary:
      "Builds massive, multi-year stick platform nests exclusively in the highest crotches of trees standing 16m+ tall.",
    why_saplings_cannot_replace:
      "Heavy raptor nests require thick structural crotches capable of holding 15–30 kg of nesting material in high winds.",
    iucn_status: "Protected under Wildlife Protection Act",
    corridor_hotspots: "Vivekananda School More & Ring Road Intersect",
  },
  {
    id: "bird-007",
    common_name_en: "Indian Peafowl",
    common_name_hi: "राष्ट्रीय पक्षी मोर",
    scientific_name: "Pavo cristatus",
    nesting_type: "COLONIAL_ROOST",
    primary_host_trees: ["Mature Sal Canopy", "Banyan"],
    diet_type: "Omnivore (Seeds, insects, small reptiles)",
    impact_summary:
      "National bird of India. Resident populations around Dhurwa Dam and Jagannathpur fly up into mature 15m+ Sal branches every evening for safe nocturnal roosting.",
    why_saplings_cannot_replace:
      "Adult peacocks weigh 4 to 6 kg; they require broad, horizontal boughs at least 10–15m off the ground to escape feral dogs and predators.",
    iucn_status: "Schedule I (Highest Protection under Wildlife Protection Act)",
    corridor_hotspots: "Dhurwa Dam Canal Link and Naya Sarai Forest Fringe",
  },
  {
    id: "bird-008",
    common_name_en: "Indian Flying Fox (Fruit Bat)",
    common_name_hi: "विशाल फलभक्षी चमगादड़",
    scientific_name: "Pteropus giganteus",
    nesting_type: "COLONIAL_ROOST",
    primary_host_trees: ["Centennial Banyan & Peepal avenues"],
    diet_type: "Nectarivore / Frugivore (Key nocturnal pollinator)",
    impact_summary:
      "Crucial keystone pollinator and seed disperser for Mahua and Sal ecosystems. Established maternal roosts hang in century-old Banyan branches.",
    why_saplings_cannot_replace:
      "Colonies require undisturbed aerial space 18–25m high with massive branch span to support hundreds of roosting bats.",
    iucn_status: "Protected / Keystone ecological pollinator",
    corridor_hotspots: "Vivekananda School More heritage trees (Chainage 0+240)",
  },
];
