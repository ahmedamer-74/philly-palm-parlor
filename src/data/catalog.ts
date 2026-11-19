import { img } from "./images";
import type { Localized } from "@/lib/i18n";

export type CategoryId = "palms" | "trees" | "shrubs" | "ground-covers" | "indoor" | "pots";
export type Trunk = "single" | "multi" | "clumping" | "none";
export type Sun = "full" | "partial" | "shade";
export type Water = "low" | "moderate" | "high";
export type Stock = "in" | "low" | "out";

export type Variant = { id: string; label: Localized; heightM: number; price: number | null };

export type Product = {
  slug: string;
  sku: string;
  name: Localized;
  botanical: string;
  category: CategoryId;
  short: Localized;
  description: Localized;
  images: string[];
  variants: Variant[];
  stock: Stock;
  trunk: Trunk;
  sun: Sun;
  water: Water;
  care: { sun: Localized; water: Localized; soil: Localized; climate: Localized };
  bestseller?: boolean;
};

export const categories: { id: CategoryId; name: Localized; blurb: Localized; image: string }[] = [
  { id: "palms", name: { en: "Palms", ar: "النخيل" }, blurb: { en: "Fan, date & specimen palms", ar: "نخيل مروحي وتمر ونخيل مميز" }, image: img.palmGroveFan },
  { id: "trees", name: { en: "Trees", ar: "الأشجار" }, blurb: { en: "Shade & native trees", ar: "أشجار الظل والأشجار المحلية" }, image: img.ghaf },
  { id: "shrubs", name: { en: "Shrubs", ar: "الشجيرات" }, blurb: { en: "Flowering & hedging", ar: "شجيرات مزهرة وأسوار نباتية" }, image: img.bougainvillea },
  { id: "ground-covers", name: { en: "Ground Covers", ar: "المغطيات الأرضية" }, blurb: { en: "Low-water carpets", ar: "مغطيات قليلة الاحتياج للماء" }, image: img.groundCover },
  { id: "indoor", name: { en: "Indoor Plants", ar: "النباتات الداخلية" }, blurb: { en: "For homes & offices", ar: "للمنازل والمكاتب" }, image: img.indoor },
  { id: "pots", name: { en: "Pots & Accessories", ar: "الأحواض والمستلزمات" }, blurb: { en: "Planters, soil & care", ar: "أحواض وتربة ومستلزمات العناية" }, image: img.planters },
];

const L = (en: string, ar: string): Localized => ({ en, ar });
const h = (m: number, price: number | null, label?: Localized): Variant => ({
  id: `${m}m`,
  heightM: m,
  price,
  label: label ?? L(m >= 1 ? `${m} m` : `${Math.round(m * 100)} cm`, m >= 1 ? `${m} م` : `${Math.round(m * 100)} سم`),
});

const palmCare = {
  sun: L("Full sun all year. Thrives in direct UAE summer sun.", "شمس كاملة طوال العام، ويتحمل شمس صيف الإمارات المباشرة."),
  water: L("Deep drip irrigation 2–3 times a week in summer, weekly in winter.", "ري بالتنقيط العميق 2–3 مرات أسبوعياً صيفاً، ومرة أسبوعياً شتاءً."),
  soil: L("Well-drained sandy soil enriched with organic compost.", "تربة رملية جيدة التصريف مدعّمة بالسماد العضوي."),
  climate: L("Excellent — tolerates 48°C+, wind and moderate salinity.", "ممتازة — يتحمل حرارة تتجاوز 48°م والرياح والملوحة المتوسطة."),
};
const treeCare = {
  sun: L("Full sun to light shade.", "شمس كاملة إلى ظل خفيف."),
  water: L("Regular drip irrigation while establishing, then reduce.", "ري منتظم بالتنقيط خلال فترة التأسيس ثم يُقلَّل."),
  soil: L("Sandy loam; avoid waterlogging.", "تربة رملية طميية مع تجنب تجمع المياه."),
  climate: L("Very good — acclimatized at our Abu Dhabi nursery.", "جيدة جداً — متأقلمة في مشتلنا بأبوظبي."),
};
const shrubCare = {
  sun: L("Full sun for best flowering.", "شمس كاملة لأفضل إزهار."),
  water: L("Water every 2–3 days in summer; let topsoil dry between.", "ري كل 2–3 أيام صيفاً مع ترك سطح التربة يجف بين الريات."),
  soil: L("Light, well-drained soil.", "تربة خفيفة جيدة التصريف."),
  climate: L("Very good — heat and drought tolerant once established.", "جيدة جداً — تتحمل الحرارة والجفاف بعد التأسيس."),
};
const groundCare = {
  sun: L("Full sun to partial shade.", "شمس كاملة إلى ظل جزئي."),
  water: L("Low — light drip irrigation every few days.", "منخفض — ري خفيف بالتنقيط كل بضعة أيام."),
  soil: L("Sandy, free-draining soil.", "تربة رملية سريعة التصريف."),
  climate: L("Excellent — a water-wise lawn alternative.", "ممتازة — بديل موفر للمياه عن العشب."),
};
const indoorCare = {
  sun: L("Bright indirect light; keep away from hot glass.", "ضوء ساطع غير مباشر، بعيداً عن الزجاج الساخن."),
  water: L("Water when the top 3 cm of soil is dry.", "اسقِ عندما تجف أعلى 3 سم من التربة."),
  soil: L("Airy indoor potting mix.", "خلطة زراعة داخلية جيدة التهوية."),
  climate: L("Indoor — ideal for air-conditioned spaces at 20–26°C.", "داخلي — مثالي للمساحات المكيفة بين 20–26°م."),
};
const accessoryCare = {
  sun: L("UV-stable finish suitable for outdoor use.", "طلاء مقاوم للأشعة فوق البنفسجية للاستخدام الخارجي."),
  water: L("Drainage holes included.", "مزوّد بفتحات تصريف."),
  soil: L("Pair with our premium potting mix.", "يُنصح باستخدامه مع خلطة الزراعة الممتازة."),
  climate: L("Designed for UAE heat and humidity.", "مصمم لحرارة ورطوبة الإمارات."),
};

export const products: Product[] = [
  {
    slug: "washingtonia-robusta",
    sku: "PH-PLM-001",
    name: L("Mexican Fan Palm", "نخيل الواشنطونيا روبوستا"),
    botanical: "Washingtonia robusta",
    category: "palms",
    short: L("Fast-growing fan palm with a slender trunk.", "نخيل مروحي سريع النمو بجذع نحيل."),
    description: L(
      "A UAE landscape icon. Washingtonia robusta forms a tall, slender trunk crowned with glossy bright-green fan leaves — perfect for boulevards, villa entrances and resort frontages. Grown and acclimatized in our Abu Dhabi nursery.",
      "من أيقونات تنسيق الحدائق في الإمارات. يكوّن جذعاً طويلاً نحيلاً يعلوه تاج من الأوراق المروحية الخضراء اللامعة — مثالي للشوارع ومداخل الفلل والمنتجعات. مزروع ومتأقلم في مشتلنا بأبوظبي.",
    ),
    images: [img.palmGroveFan, img.palmNurseryRows, img.palmRowSmall],
    variants: [h(2, 450), h(3, 750), h(4, 1200), h(5, 1950, L("5 m+", "5 م فأكثر"))],
    stock: "in",
    trunk: "single",
    sun: "full",
    water: "low",
    care: palmCare,
    bestseller: true,
  },
  {
    slug: "washingtonia-filifera",
    sku: "PH-PLM-002",
    name: L("California Fan Palm", "نخيل الواشنطونيا فيليفيرا"),
    botanical: "Washingtonia filifera",
    category: "palms",
    short: L("Robust trunk, grey-green fans with white threads.", "جذع قوي وأوراق مروحية رمادية خضراء بخيوط بيضاء."),
    description: L(
      "Stockier than its Mexican cousin, the California Fan Palm develops a thick, characterful trunk and broad grey-green fronds with distinctive white filaments. A statement palm for parks and large gardens.",
      "أكثر امتلاءً من الروبوستا، يتميز بجذع سميك وأوراق رمادية خضراء عريضة بخيوط بيضاء مميزة. نخلة لافتة للحدائق العامة والحدائق الكبيرة.",
    ),
    images: [img.palmNurseryRows, img.palmGroveFan],
    variants: [h(2, 520), h(3, 890), h(4, 1450), h(6, 2600, L("6 m+", "6 م فأكثر"))],
    stock: "in",
    trunk: "single",
    sun: "full",
    water: "low",
    care: palmCare,
    bestseller: true,
  },
  {
    slug: "brahea-armata",
    sku: "PH-PLM-003",
    name: L("Blue Hesper Palm", "نخيل براهيا الأزرق"),
    botanical: "Brahea armata",
    category: "palms",
    short: L("Rare silver-blue fan palm, very slow growing.", "نخيل مروحي نادر بلون فضي أزرق وبطيء النمو."),
    description: L(
      "Prized for its striking silver-blue foliage, Brahea armata is a slow-growing specimen palm that brings a sculptural, contemporary feel to courtyards and modern villas.",
      "يُقدَّر لأوراقه الفضية الزرقاء اللافتة، وهو نخيل مميز بطيء النمو يضفي لمسة نحتية عصرية على الأفنية والفلل الحديثة.",
    ),
    images: [img.palmSingle, img.palmGroveFan],
    variants: [h(1.5, 980), h(2.5, 2400), h(3.5, 4200)],
    stock: "low",
    trunk: "single",
    sun: "full",
    water: "low",
    care: palmCare,
    bestseller: true,
  },
  {
    slug: "phoenix-dactylifera",
    sku: "PH-PLM-004",
    name: L("Date Palm", "نخلة التمر"),
    botanical: "Phoenix dactylifera",
    category: "palms",
    short: L("The heritage palm of the Emirates.", "النخلة التراثية لدولة الإمارات."),
    description: L(
      "The date palm is woven into Emirati heritage. Our field-grown specimens have strong, well-formed trunks and full crowns, ready for villas, mosques, majlis gardens and public realm projects.",
      "نخلة التمر جزء أصيل من التراث الإماراتي. نخيلنا المزروع في الحقل يتميز بجذوع قوية متناسقة وتيجان كثيفة، جاهزة للفلل والمساجد وحدائق المجالس والمشاريع العامة.",
    ),
    images: [img.datePalm, img.palmNurseryRows],
    variants: [h(3, 1800), h(5, 3500), h(7, 6500, L("7 m+", "7 م فأكثر"))],
    stock: "in",
    trunk: "single",
    sun: "full",
    water: "moderate",
    care: palmCare,
    bestseller: true,
  },
  {
    slug: "phoenix-canariensis",
    sku: "PH-PLM-005",
    name: L("Canary Island Date Palm", "نخيل الكناري"),
    botanical: "Phoenix canariensis",
    category: "palms",
    short: L("Majestic crown on a sculpted pineapple trunk.", "تاج مهيب على جذع منحوت يشبه الأناناس."),
    description: L(
      "With its massive arching crown and diamond-patterned trunk, the Canary Island Date Palm is a true centrepiece for roundabouts, hotel entrances and grand gardens.",
      "بتاجه الضخم المقوّس وجذعه المنقوش، يعد نخيل الكناري قطعة مركزية للدوارات ومداخل الفنادق والحدائق الكبرى.",
    ),
    images: [img.canary, img.datePalm],
    variants: [h(2, 1600), h(3, 2900), h(4, 4800)],
    stock: "in",
    trunk: "single",
    sun: "full",
    water: "moderate",
    care: palmCare,
  },
  {
    slug: "chamaerops-humilis",
    sku: "PH-PLM-006",
    name: L("Mediterranean Fan Palm", "النخيل المروحي المتوسطي"),
    botanical: "Chamaerops humilis",
    category: "palms",
    short: L("Compact clumping palm for courtyards & planters.", "نخيل متكتل مدمج للأفنية والأحواض."),
    description: L(
      "A compact, multi-stemmed fan palm that grows into a lush clump. Ideal for courtyards, terraces and large planters where space is limited.",
      "نخيل مروحي مدمج متعدد السيقان ينمو على شكل كتلة كثيفة. مثالي للأفنية والتراسات والأحواض الكبيرة حيث المساحة محدودة.",
    ),
    images: [img.chamaerops, img.palmGroveFan],
    variants: [h(1, 380), h(1.5, 650), h(2, 1100)],
    stock: "in",
    trunk: "clumping",
    sun: "full",
    water: "low",
    care: palmCare,
    bestseller: true,
  },
  {
    slug: "ficus-nitida",
    sku: "PH-TRE-001",
    name: L("Ficus Nitida", "فيكس نيتيدا"),
    botanical: "Ficus microcarpa 'Nitida'",
    category: "trees",
    short: L("Dense evergreen canopy, perfect for topiary.", "تاج كثيف دائم الخضرة ومثالي للتشكيل."),
    description: L(
      "The UAE's favourite evergreen for shade, screening and topiary. Our Ficus nitida are shaped into full ball heads on clean stems, ready to plant.",
      "الشجرة دائمة الخضرة المفضلة في الإمارات للظل والتسوير والتشكيل. أشجارنا مشكّلة بتيجان كروية كاملة على سيقان نظيفة وجاهزة للزراعة.",
    ),
    images: [img.ficus],
    variants: [h(1.5, 180), h(2.5, 420), h(3.5, 850)],
    stock: "in",
    trunk: "single",
    sun: "full",
    water: "moderate",
    care: treeCare,
    bestseller: true,
  },
  {
    slug: "ghaf-tree",
    sku: "PH-TRE-002",
    name: L("Ghaf Tree", "شجرة الغاف"),
    botanical: "Prosopis cineraria",
    category: "trees",
    short: L("The UAE national tree — native & drought-proof.", "الشجرة الوطنية للإمارات — محلية ومقاومة للجفاف."),
    description: L(
      "The Ghaf is the national tree of the UAE and a symbol of resilience. Deep-rooted and extremely drought tolerant, it offers dappled shade with minimal water — ideal for sustainable landscapes.",
      "الغاف هي الشجرة الوطنية لدولة الإمارات ورمز للصمود. جذورها عميقة وتتحمل الجفاف بشدة، وتوفر ظلاً لطيفاً بأقل كمية من المياه — مثالية للمناظر الطبيعية المستدامة.",
    ),
    images: [img.ghaf],
    variants: [h(2, 650), h(3, 1200), h(5, 2400)],
    stock: "in",
    trunk: "multi",
    sun: "full",
    water: "low",
    care: treeCare,
    bestseller: true,
  },
  {
    slug: "conocarpus-erectus",
    sku: "PH-TRE-003",
    name: L("Conocarpus Hedge", "كونوكاربس"),
    botanical: "Conocarpus erectus",
    category: "trees",
    short: L("Fast screening hedge, salt tolerant.", "سياج سريع النمو ويتحمل الملوحة."),
    description: L(
      "A tough, fast-growing hedging tree used across the region for privacy screens and windbreaks. Supplied as columnar specimens ready to form an instant green wall.",
      "شجرة قوية سريعة النمو تُستخدم في المنطقة كسياج للخصوصية ومصدات للرياح. تُورَّد بأشكال عمودية جاهزة لتكوين جدار أخضر فوري.",
    ),
    images: [img.conocarpus],
    variants: [h(1.5, 95), h(2, 140), h(3, 260)],
    stock: "in",
    trunk: "single",
    sun: "full",
    water: "moderate",
    care: treeCare,
  },
  {
    slug: "bougainvillea",
    sku: "PH-SHR-001",
    name: L("Bougainvillea", "الجهنمية"),
    botanical: "Bougainvillea glabra",
    category: "shrubs",
    short: L("Vivid magenta blooms through the hottest months.", "أزهار أرجوانية زاهية خلال أشد الشهور حرارة."),
    description: L(
      "Bougainvillea floods walls, pergolas and fences with colour almost all year. Heat-loving and water-wise, it is one of the most rewarding flowering plants for UAE gardens.",
      "تغمر الجهنمية الجدران والمظلات والأسوار بالألوان طوال العام تقريباً. محبة للحرارة وموفرة للمياه، وهي من أكثر النباتات المزهرة عطاءً في حدائق الإمارات.",
    ),
    images: [img.bougainvillea],
    variants: [h(0.6, 45), h(1.2, 95), h(2, 220, L("2 m trellis", "2 م على تعريشة"))],
    stock: "in",
    trunk: "none",
    sun: "full",
    water: "low",
    care: shrubCare,
    bestseller: true,
  },
  {
    slug: "oleander",
    sku: "PH-SHR-002",
    name: L("Oleander", "الدفلة"),
    botanical: "Nerium oleander",
    category: "shrubs",
    short: L("Hardy flowering shrub in pink and white.", "شجيرة مزهرة قوية بالوردي والأبيض."),
    description: L(
      "A classic of Gulf landscaping, oleander offers long flowering, glossy foliage and great tolerance to heat, wind and salinity. Ideal for medians and informal hedges.",
      "من كلاسيكيات تنسيق الحدائق في الخليج، تتميز الدفلة بإزهار طويل وأوراق لامعة وتحمل عالٍ للحرارة والرياح والملوحة. مثالية للجزر الوسطية والأسوار غير الرسمية.",
    ),
    images: [img.oleander],
    variants: [h(0.6, 35), h(1, 65), h(1.5, 120)],
    stock: "in",
    trunk: "none",
    sun: "full",
    water: "low",
    care: shrubCare,
  },
  {
    slug: "dodonaea-viscosa",
    sku: "PH-SHR-003",
    name: L("Hop Bush", "الدودونيا"),
    botanical: "Dodonaea viscosa",
    category: "shrubs",
    short: L("Drought-proof evergreen for low hedges.", "شجيرة دائمة الخضرة مقاومة للجفاف للأسوار المنخفضة."),
    description: L(
      "An extremely tough evergreen shrub with fine foliage, widely used in water-wise landscapes and as a clipped low hedge.",
      "شجيرة دائمة الخضرة شديدة التحمل بأوراق دقيقة، تُستخدم كثيراً في الحدائق الموفرة للمياه وكسياج منخفض مشذّب.",
    ),
    images: [img.conocarpus],
    variants: [h(0.6, 30), h(1, 55)],
    stock: "out",
    trunk: "none",
    sun: "full",
    water: "low",
    care: shrubCare,
  },
  {
    slug: "lantana-montevidensis",
    sku: "PH-GRC-001",
    name: L("Trailing Lantana", "اللانتانا الزاحفة"),
    botanical: "Lantana montevidensis",
    category: "ground-covers",
    short: L("Purple-flowering carpet, very low water.", "بساط بأزهار بنفسجية بأقل كمية مياه."),
    description: L(
      "A spreading ground cover that blankets beds with lilac flowers for most of the year. Excellent on slopes, roundabouts and road verges.",
      "مغطٍ أرضي زاحف يكسو الأحواض بأزهار ليلكية معظم أيام السنة. ممتاز للمنحدرات والدوارات وجوانب الطرق.",
    ),
    images: [img.groundCover],
    variants: [h(0.15, 18, L("15 cm pot", "أصيص 15 سم")), h(0.2, 32, L("Tray of 12", "صينية 12 نبتة"))],
    stock: "in",
    trunk: "none",
    sun: "full",
    water: "low",
    care: groundCare,
  },
  {
    slug: "sesuvium-portulacastrum",
    sku: "PH-GRC-002",
    name: L("Sea Purslane", "الرغل البحري"),
    botanical: "Sesuvium portulacastrum",
    category: "ground-covers",
    short: L("Native succulent ground cover, salt tolerant.", "مغطٍ عصاري محلي يتحمل الملوحة."),
    description: L(
      "A native UAE succulent that thrives in coastal and saline conditions. A sustainable, low-maintenance lawn alternative.",
      "نبات عصاري محلي في الإمارات يزدهر في الظروف الساحلية والمالحة. بديل مستدام وقليل الصيانة عن العشب.",
    ),
    images: [img.groundCover],
    variants: [h(0.1, 15, L("10 cm pot", "أصيص 10 سم")), h(0.12, 26, L("Tray of 12", "صينية 12 نبتة"))],
    stock: "in",
    trunk: "none",
    sun: "full",
    water: "low",
    care: groundCare,
  },
  {
    slug: "monstera-deliciosa",
    sku: "PH-IND-001",
    name: L("Monstera Deliciosa", "مونستيرا"),
    botanical: "Monstera deliciosa",
    category: "indoor",
    short: L("Iconic split-leaf plant for interiors.", "نبات الأوراق المشقوقة الأيقوني للديكور الداخلي."),
    description: L(
      "Bold, sculptural leaves make Monstera a favourite for lobbies, offices and living rooms. Supplied in a nursery pot, ready for your planter.",
      "أوراقها الكبيرة المنحوتة تجعل المونستيرا مفضلة للردهات والمكاتب وغرف المعيشة. تُورَّد في أصيص المشتل جاهزة لحوضك.",
    ),
    images: [img.monstera, img.indoor],
    variants: [h(0.6, 120), h(1, 210), h(1.5, 340)],
    stock: "in",
    trunk: "none",
    sun: "partial",
    water: "moderate",
    care: indoorCare,
  },
  {
    slug: "ficus-lyrata",
    sku: "PH-IND-002",
    name: L("Fiddle Leaf Fig", "فيكس ليراتا"),
    botanical: "Ficus lyrata",
    category: "indoor",
    short: L("Statement indoor tree with large glossy leaves.", "شجرة داخلية لافتة بأوراق كبيرة لامعة."),
    description: L(
      "An architectural indoor tree with large violin-shaped leaves — elegant in bright corners of homes, hotels and offices.",
      "شجرة داخلية معمارية بأوراق كبيرة على شكل الكمان — أنيقة في الزوايا المضيئة للمنازل والفنادق والمكاتب.",
    ),
    images: [img.indoor],
    variants: [h(1.2, 260), h(1.8, 480)],
    stock: "low",
    trunk: "single",
    sun: "partial",
    water: "moderate",
    care: indoorCare,
  },
  {
    slug: "fiberglass-planter",
    sku: "PH-ACC-001",
    name: L("Premium Fiberglass Planter", "حوض فايبرجلاس فاخر"),
    botanical: "Sand · Stone · Charcoal",
    category: "pots",
    short: L("Lightweight, UV-stable, hand-finished.", "خفيف الوزن ومقاوم للأشعة ومشطّب يدوياً."),
    description: L(
      "Hand-finished fiberglass planters in natural textures. Lightweight yet strong, UV-stable and designed for UAE outdoor conditions.",
      "أحواض فايبرجلاس مشطّبة يدوياً بملمس طبيعي. خفيفة وقوية ومقاومة للأشعة فوق البنفسجية ومصممة للظروف الخارجية في الإمارات.",
    ),
    images: [img.planters],
    variants: [
      { id: "s", heightM: 0.5, price: 280, label: L("Small · 50 cm", "صغير · 50 سم") },
      { id: "m", heightM: 0.8, price: 520, label: L("Medium · 80 cm", "وسط · 80 سم") },
      { id: "l", heightM: 1.1, price: 890, label: L("Large · 110 cm", "كبير · 110 سم") },
    ],
    stock: "in",
    trunk: "none",
    sun: "full",
    water: "low",
    care: accessoryCare,
  },
  {
    slug: "palm-care-kit",
    sku: "PH-ACC-002",
    name: L("Palm Nutrition & Care Kit", "طقم تغذية ورعاية النخيل"),
    botanical: "Fertilizer · Soil conditioner · Guide",
    category: "pots",
    short: L("Slow-release palm feed for UAE soils.", "سماد نخيل بطيء التحرر لتربة الإمارات."),
    description: L(
      "Everything a newly planted palm needs: slow-release palm fertilizer with magnesium and manganese, an organic soil conditioner and our bilingual care guide.",
      "كل ما تحتاجه النخلة المزروعة حديثاً: سماد نخيل بطيء التحرر بالمغنيسيوم والمنغنيز، ومحسّن تربة عضوي، ودليل رعاية باللغتين.",
    ),
    images: [img.planters],
    variants: [
      { id: "5kg", heightM: 0, price: 95, label: L("5 kg", "5 كجم") },
      { id: "20kg", heightM: 0, price: 320, label: L("20 kg", "20 كجم") },
    ],
    stock: "in",
    trunk: "none",
    sun: "full",
    water: "low",
    care: accessoryCare,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (id: string) => categories.find((c) => c.id === id);

/** Lowest price across sizes */
export function fromPrice(p: Product): number | null {
  const prices = p.variants.map((v) => v.price).filter((x): x is number => x != null);
  return prices.length ? Math.min(...prices) : null;
}

export const trunkLabels: Record<Trunk, Localized> = {
  single: L("Single trunk", "جذع منفرد"),
  multi: L("Multi-trunk", "متعدد الجذوع"),
  clumping: L("Clumping", "متكتل"),
  none: L("Not applicable", "غير منطبق"),
};
export const sunLabels: Record<Sun, Localized> = {
  full: L("Full sun", "شمس كاملة"),
  partial: L("Partial shade", "ظل جزئي"),
  shade: L("Shade", "ظل"),
};
export const waterLabels: Record<Water, Localized> = {
  low: L("Low", "منخفض"),
  moderate: L("Moderate", "متوسط"),
  high: L("High", "مرتفع"),
};
export const stockLabels: Record<Stock, Localized> = {
  in: L("In stock", "متوفر"),
  low: L("Low stock", "كمية محدودة"),
  out: L("Out of stock", "غير متوفر"),
};
