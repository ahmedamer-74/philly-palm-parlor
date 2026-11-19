import { img } from "./images";
import type { Localized } from "@/lib/i18n";

const L = (en: string, ar: string): Localized => ({ en, ar });

export const company = {
  name: L("Pheladelfia Agricultural LLC", "فيلادلفيا الزراعية ذ.م.م"),
  phone: "+971 2 555 1662",
  phoneHref: "tel:+97125551662",
  whatsappHref: "https://wa.me/97125551662",
  email: "nursery@pheladelfia.com",
  hours: L("Sat–Thu 8am–6pm · Friday closed", "السبت–الخميس 8 ص–6 م · الجمعة مغلق"),
  nursery: L("Nursery: Al Wathba, Abu Dhabi", "المشتل: الوثبة، أبوظبي"),
  branch: L("Branch: Al Quoz, Dubai", "الفرع: القوز، دبي"),
};

export const services = [
  {
    id: "landscaping",
    title: L("Landscaping Design & Installation", "تصميم وتنفيذ المسطحات الخضراء"),
    short: L("From concept to planting — villas, compounds and public spaces.", "من الفكرة إلى الزراعة — للفلل والمجمعات والمساحات العامة."),
    body: L(
      "Our design team turns plans into living landscapes: concept and planting design, softscape and hardscape installation, irrigation networks, lighting and large-specimen palm transplanting. We deliver for developers, contractors, hotels and government entities.",
      "يحوّل فريق التصميم لدينا المخططات إلى مساحات خضراء حية: التصميم المبدئي وتصميم الزراعة، تنفيذ الأعمال الزراعية والإنشائية، شبكات الري، الإضاءة ونقل النخيل الكبير. ننفذ للمطورين والمقاولين والفنادق والجهات الحكومية.",
    ),
    points: [L("Concept & planting design", "التصميم المبدئي وتصميم الزراعة"), L("Irrigation & lighting", "الري والإضاءة"), L("Specimen palm transplanting", "نقل النخيل الكبير")],
    image: img.villa,
  },
  {
    id: "maintenance",
    title: L("Grounds Maintenance", "صيانة المسطحات الخضراء"),
    short: L("Scheduled care that keeps landscapes healthy all year.", "عناية مجدولة تحافظ على المساحات الخضراء طوال العام."),
    body: L(
      "Trained crews provide pruning, palm trimming, fertilization, pest control, irrigation checks and lawn care on flexible annual contracts — with clear reporting for facility managers.",
      "تقدم فرقنا المدربة التقليم وتشذيب النخيل والتسميد ومكافحة الآفات وفحص الري والعناية بالعشب بعقود سنوية مرنة — مع تقارير واضحة لمديري المرافق.",
    ),
    points: [L("Annual maintenance contracts", "عقود صيانة سنوية"), L("Palm trimming & pest control", "تشذيب النخيل ومكافحة الآفات"), L("Irrigation audits", "تدقيق أنظمة الري")],
    image: img.maintenance,
  },
  {
    id: "interior",
    title: L("Interior Plant Maintenance", "صيانة النباتات الداخلية"),
    short: L("Living interiors for offices, hotels and malls.", "مساحات داخلية حية للمكاتب والفنادق والمراكز التجارية."),
    body: L(
      "We design, supply and maintain indoor planting schemes — regular visits for watering, cleaning, feeding and plant rotation so your interiors always look their best.",
      "نصمم ونورد ونصون مخططات النباتات الداخلية — زيارات منتظمة للري والتنظيف والتغذية وتبديل النباتات لتبقى مساحاتك الداخلية في أبهى صورة.",
    ),
    points: [L("Plant & planter supply", "توريد النباتات والأحواض"), L("Weekly care visits", "زيارات رعاية أسبوعية"), L("Seasonal rotation", "تبديل موسمي")],
    image: img.indoor,
  },
];

export const projects = [
  { title: L("Corniche Boulevard Planting", "تشجير شارع الكورنيش"), client: L("Municipal client · Abu Dhabi", "جهة بلدية · أبوظبي"), tag: L("Public realm", "مساحات عامة"), image: img.boulevard, tall: true },
  { title: L("Heritage Resort Courtyards", "أفنية منتجع تراثي"), client: L("5-star hotel · Dubai", "فندق 5 نجوم · دبي"), tag: L("Hospitality", "ضيافة"), image: img.hotel },
  { title: L("Private Villa Garden", "حديقة فيلا خاصة"), client: L("Residential · Emirates Hills", "سكني · تلال الإمارات"), tag: L("Residential", "سكني"), image: img.villa },
  { title: L("Washingtonia Supply — 1,200 palms", "توريد 1,200 نخلة واشنطونيا"), client: L("Master developer · Yas Island", "مطور رئيسي · جزيرة ياس"), tag: L("Supply", "توريد"), image: img.palmNurseryRows, tall: true },
  { title: L("Corporate HQ Interiors", "نباتات مقر شركة"), client: L("Office tower · ADGM", "برج مكاتب · سوق أبوظبي العالمي"), tag: L("Interior", "داخلي"), image: img.indoor },
  { title: L("City Park Maintenance", "صيانة حديقة عامة"), client: L("Annual contract · Abu Dhabi", "عقد سنوي · أبوظبي"), tag: L("Maintenance", "صيانة"), image: img.maintenance },
  { title: L("Date Palm Avenue", "ممر نخيل التمر"), client: L("Mosque grounds · Al Ain", "ساحة مسجد · العين"), tag: L("Public realm", "مساحات عامة"), image: img.datePalm, tall: true },
  { title: L("Native Ghaf Grove", "بستان غاف محلي"), client: L("Sustainability park · Sharjah", "حديقة مستدامة · الشارقة"), tag: L("Sustainability", "استدامة"), image: img.ghaf },
  { title: L("Mediterranean Terrace", "تراس بطابع متوسطي"), client: L("Penthouse · Saadiyat", "بنتهاوس · السعديات"), tag: L("Residential", "سكني"), image: img.chamaerops },
];

export const testimonials = [
  {
    quote: L(
      "Pheladelfia supplied over a thousand Washingtonia palms for our community on time and in excellent condition. Their team made a complex logistics job look easy.",
      "قامت فيلادلفيا بتوريد أكثر من ألف نخلة واشنطونيا لمجتمعنا السكني في الموعد وبحالة ممتازة. فريقهم جعل مهمة لوجستية معقدة تبدو سهلة.",
    ),
    name: L("Khalid Al Mansoori", "خالد المنصوري"),
    role: L("Project Director, Real Estate Developer", "مدير مشاريع، شركة تطوير عقاري"),
  },
  {
    quote: L(
      "We've used their grounds maintenance for three years. The gardens have never looked better, and reporting is always clear.",
      "نتعامل مع خدمة الصيانة لديهم منذ ثلاث سنوات. لم تبدُ الحدائق أفضل من ذلك قط، والتقارير دائماً واضحة.",
    ),
    name: L("Sarah Thompson", "سارة طومسون"),
    role: L("Facilities Manager, Hotel Group", "مديرة المرافق، مجموعة فندقية"),
  },
  {
    quote: L(
      "Beautiful, healthy plants that actually survive our summer. The advice on choosing the right palms was invaluable.",
      "نباتات جميلة وصحية تصمد فعلاً أمام صيفنا. نصائحهم في اختيار النخيل المناسب كانت لا تقدّر بثمن.",
    ),
    name: L("Mariam Al Hosani", "مريم الحوسني"),
    role: L("Villa owner, Abu Dhabi", "مالكة فيلا، أبوظبي"),
  },
];

export const mockOrders = [
  { id: "PH-10482", date: "2026-10-28", status: L("Delivered", "تم التوصيل"), total: 2415, items: 3 },
  { id: "PH-10317", date: "2026-09-14", status: L("Delivered", "تم التوصيل"), total: 840, items: 6 },
  { id: "PH-10566", date: "2026-11-12", status: L("Out for delivery", "قيد التوصيل"), total: 1890, items: 2 },
];
