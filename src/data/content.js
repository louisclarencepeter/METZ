// All localizable strings are stored as { en, sw } objects so the i18n
// `t()` helper can pick the active locale. Proper nouns (names, places,
// reg numbers, phones) stay as plain strings.

export const company = {
  name: "METZ Engineering Co. Limited",
  tagline: {
    en: "Building and civil contractors delivering durable work across Tanzania.",
    sw: "Wakandarasi wa majengo na barabara, tunaojenga kazi za kudumu Tanzania.",
  },
  address: "Gongo la Mboto - Stakishari, Dar es Salaam, Tanzania",
  postal: "P.O BOX 71003",
  phonePrimary: "+255-765184245",
  phoneSecondary: "+255-754567065",
  email: "metz_engineering@yahoo.com",
};

export const stats = [
  { value: "2017", label: { en: "Established", sw: "Tulianza" } },
  { value: "Class VI", label: { en: "CRB contractor", sw: "Daraja la CRB" } },
  { value: "2030", label: { en: "Growth strategy", sw: "Mkakati hadi 2030" } },
  {
    value: "TZS 568M+",
    label: { en: "Referenced contracts", sw: "Thamani ya mikataba" },
  },
];

export const featuredProjects = [
  {
    image: "/images/Projects/pr1.jpg",
    alt: {
      en: "Completed residential house in Mtoni Kijichi, Dar es Salaam.",
      sw: "Nyumba ya makazi iliyokamilika Mtoni Kijichi, Dar es Salaam.",
    },
    title: {
      en: "Simple Residential House",
      sw: "Nyumba ya Makazi",
    },
    location: "Mtoni Kijichi, Dar es Salaam",
    type: { en: "Residential", sw: "Makazi" },
    body: {
      en: "Construction of a simple residential house for Miss. Juliana Moka.",
      sw: "Tulijenga nyumba ya makazi kwa Bi. Juliana Moka.",
    },
  },
  {
    image: "/images/Projects/pr2.jpg",
    alt: {
      en: "Affordable housing units delivered in Temeke Municipality.",
      sw: "Nyumba za bei nafuu zilizojengwa Manispaa ya Temeke.",
    },
    title: { en: "Affordable Housing Scheme", sw: "Mpango wa Nyumba za Bei Nafuu" },
    location: "Temeke Municipality",
    type: { en: "Housing", sw: "Nyumba" },
    body: {
      en: "Landscaping, finishing, paint, and decoration works for Phase III, Lot 11.",
      sw: "Tulifanya kazi za mandhari, umaliziaji, rangi na mapambo — Awamu ya III, Kipande 11.",
    },
  },
  {
    image: "/images/Projects/pr3.png",
    alt: {
      en: "Resurfaced 2km section of Wailes Road in Lindi Municipal Council.",
      sw: "Kilomita 2 za Barabara ya Wailes zilizofanyiwa matengenezo, Halmashauri ya Lindi.",
    },
    title: { en: "Wailes Road Maintenance", sw: "Matengenezo ya Barabara ya Wailes" },
    location: "Lindi Municipal Council",
    type: { en: "Civil Works", sw: "Kazi za Kiraia" },
    body: {
      en: "Periodic maintenance and double surface dressing across a 2km road section.",
      sw: "Matengenezo ya kawaida na uwekaji wa lami mara mbili kwa kilomita 2 za barabara.",
    },
  },
];

const RESIDENTIAL = { en: "Residential", sw: "Makazi" };
const HOUSING = { en: "Housing", sw: "Nyumba" };
const CIVIL = { en: "Civil Works", sw: "Kazi za Kiraia" };

export const projects = [
  {
    title: { en: "Residential House, Kihonda", sw: "Nyumba ya Makazi, Kihonda" },
    location: "Kihonda, Morogoro",
    type: RESIDENTIAL,
    alt: {
      en: "Residential house construction in Kihonda, Morogoro",
      sw: "Ujenzi wa nyumba ya makazi Kihonda, Morogoro",
    },
    images: ["/images/Projects/p1/pr1.png", "/images/Projects/p1/pr2.png"],
  },
  {
    title: {
      en: "Mbezi Beach Residential Apartment",
      sw: "Apartmenti ya Makazi Mbezi Beach",
    },
    location: "Mbezi Beach, Dar es Salaam",
    type: RESIDENTIAL,
    alt: {
      en: "Mbezi Beach residential apartment in Dar es Salaam",
      sw: "Apartmenti ya makazi Mbezi Beach, Dar es Salaam",
    },
    images: [
      "/images/Projects/p2/pr1.png",
      "/images/Projects/p2/pr2.png",
      "/images/Projects/p2/pr3.png",
      "/images/Projects/p2/pr4.png",
      "/images/Projects/p2/pr5.png",
      "/images/Projects/p2/pr6.png",
      "/images/Projects/p2/pr7.png",
    ],
  },
  {
    title: {
      en: "Affordable Housing Phase III",
      sw: "Nyumba za Bei Nafuu Awamu ya III",
    },
    location: "Mtoni Kijichi, Dar es Salaam",
    type: HOUSING,
    value: "TZS 218M",
    alt: {
      en: "Affordable Housing Phase III in Mtoni Kijichi, Dar es Salaam",
      sw: "Nyumba za Bei Nafuu Awamu ya III, Mtoni Kijichi, Dar es Salaam",
    },
    images: ["/images/Projects/p3/pr1.png", "/images/Projects/p3/pr2.png"],
  },
  {
    title: {
      en: "Wailes Road Maintenance",
      sw: "Matengenezo ya Barabara ya Wailes",
    },
    location: "Lindi Municipal Council",
    type: CIVIL,
    value: "TZS 350M",
    alt: {
      en: "Wailes Road maintenance works in Lindi Municipal Council",
      sw: "Kazi za matengenezo ya Barabara ya Wailes, Halmashauri ya Manispaa ya Lindi",
    },
    images: ["/images/Projects/p4/pr1.png", "/images/Projects/p4/pr2.png"],
  },
  {
    title: {
      en: "Mbezi Beach Apartment Block",
      sw: "Jengo la Apartmenti Mbezi Beach",
    },
    location: "Mbezi Beach, Dar es Salaam",
    type: RESIDENTIAL,
    alt: {
      en: "Mbezi Beach apartment block in Dar es Salaam",
      sw: "Jengo la apartmenti Mbezi Beach, Dar es Salaam",
    },
    images: [
      "/images/Projects/p5/pr1.png",
      "/images/Projects/p5/pr2.png",
      "/images/Projects/p5/pr3.png",
      "/images/Projects/p5/pr4.png",
    ],
  },
  {
    title: { en: "Kibada Residential House", sw: "Nyumba ya Makazi Kibada" },
    location: "Kibada, Temeke",
    type: RESIDENTIAL,
    alt: {
      en: "Kibada residential house in Temeke",
      sw: "Nyumba ya makazi Kibada, Temeke",
    },
    images: [
      "/images/Projects/p6/pr1.png",
      "/images/Projects/p6/pr2.png",
      "/images/Projects/p6/pr3.png",
      "/images/Projects/p6/pr4.png",
      "/images/Projects/p6/pr5.png",
      "/images/Projects/p6/pr6.png",
    ],
  },
];

export const services = [
  {
    title: { en: "General Construction", sw: "Ujenzi wa Jumla" },
    body: {
      en: "Residential, commercial, and industrial construction delivered through coordinated site execution.",
      sw: "Ujenzi wa nyumba za makazi, majengo ya biashara, na viwanda — kazi inayoratibiwa eneoni hadi mwisho.",
    },
  },
  {
    title: { en: "Civil Works", sw: "Kazi za Kiraia" },
    body: {
      en: "Roads, sewerage, drainage systems, and maintenance programs for public and private clients.",
      sw: "Barabara, mifumo ya majitaka, mifereji, pamoja na matengenezo — kwa serikali na wateja binafsi.",
    },
  },
  {
    title: { en: "Pre-Construction Planning", sw: "Mipango ya Awali" },
    body: {
      en: "Scope definition, scheduling, phasing, budgeting, cost modelling, and subcontractor qualification.",
      sw: "Kuweka upeo, ratiba, awamu, bajeti, makadirio ya gharama, na kuchagua wakandarasi wadogo wanaofaa.",
    },
  },
  {
    title: { en: "Finishing and Landscaping", sw: "Umaliziaji na Mandhari" },
    body: {
      en: "Interior design, partitions, painting, decoration, landscape works, and handover support.",
      sw: "Ubunifu wa ndani, vyumba vidogo, upakaji rangi, mapambo, kazi za mandhari, na msaada wa ukabidhi.",
    },
  },
];

export const deliveryMethods = [
  {
    abbr: "LB",
    title: {
      en: "Lump sum bid from completed drawings",
      sw: "Zabuni ya bei kamili kwa michoro iliyo tayari",
    },
  },
  {
    abbr: "CM",
    title: { en: "Construction management", sw: "Usimamizi wa ujenzi" },
  },
  {
    abbr: "DB",
    title: { en: "Design-build development", sw: "Mfumo wa ubuni-na-ujenzi" },
  },
  {
    abbr: "PC",
    title: { en: "Pre-construction services", sw: "Huduma za kabla ya ujenzi" },
  },
];

export const strategicObjectives = [
  {
    en: "Become a successful construction company in the Tanzanian construction industry.",
    sw: "Kuwa miongoni mwa kampuni za ujenzi zinazoongoza nchini Tanzania.",
  },
  {
    en: "Grow revenue by 50% and expand countrywide by 2030.",
    sw: "Kuongeza mapato kwa asilimia 50 na kufika mikoa yote ifikapo 2030.",
  },
  {
    en: "Build long-term relationships with clients, consultants, lenders, and financial institutions.",
    sw: "Kujenga uhusiano wa muda mrefu na wateja, washauri, wakopeshaji, na taasisi za fedha.",
  },
];

export const companyParticulars = [
  [
    { en: "Name of Company", sw: "Jina la Kampuni" },
    "METZ ENGINEERING LIMITED COMPANY",
  ],
  [
    { en: "Date of company incorporation", sw: "Tarehe ya usajili wa kampuni" },
    { en: "20th June 2019", sw: "20 Juni 2019" },
  ],
  [
    { en: "Certificate of incorporation", sw: "Cheti cha usajili" },
    "139-352-262",
  ],
  [
    { en: "Place of incorporation", sw: "Mahali pa usajili" },
    { en: "Dar es Salaam, Tanzania", sw: "Dar es Salaam, Tanzania" },
  ],
  [
    { en: "Office Address", sw: "Anwani ya Ofisi" },
    "Gongo la Mboto - Stakishari",
  ],
  [
    { en: "Postal Address", sw: "Anwani ya Posta" },
    "P.O Box 71003, Dar es Salaam",
  ],
  [
    { en: "Taxpayer Identification Number", sw: "Namba ya Utambulisho wa Mlipa Kodi" },
    "139-352-262",
  ],
];

export const legalStatus = [
  { en: "Certificate of Incorporation", sw: "Cheti cha Usajili wa Kampuni" },
  {
    en: "Business License for Civil Works Contractor Class 6",
    sw: "Leseni ya biashara — Mkandarasi wa Kazi za Kiraia, Daraja la 6",
  },
  {
    en: "Business License for Building Contractor Class 6",
    sw: "Leseni ya biashara — Mkandarasi wa Majengo, Daraja la 6",
  },
  {
    en: "Taxpayer Identification Number (TIN)",
    sw: "Namba ya Mlipa Kodi (TIN)",
  },
  {
    en: "VAT Registration Number (VRN)",
    sw: "Namba ya Usajili wa VAT (VRN)",
  },
  {
    en: "Certificate of Registration as Civil Engineering Contractor Class 6",
    sw: "Cheti cha Usajili — Mkandarasi wa Uhandisi wa Kiraia, Daraja la 6",
  },
  {
    en: "Certificate of Registration as Building Contractor Class 6",
    sw: "Cheti cha Usajili — Mkandarasi wa Majengo, Daraja la 6",
  },
];

export const directors = [
  {
    image: "/images/ceo.png",
    alt: {
      en: "Portrait of Mtambalike Shinga Mtambalike, Managing Director",
      sw: "Picha ya Mtambalike Shinga Mtambalike, Mkurugenzi Mtendaji",
    },
    name: "Mtambalike Shinga Mtambalike",
    role: { en: "Managing Director", sw: "Mkurugenzi Mtendaji" },
    bio: {
      en: "A company shareholder with 20 years of construction industry experience and a track record of leading complex project delivery.",
      sw: "Mwanahisa wa kampuni, mwenye miaka 20 ya kazi katika tasnia ya ujenzi na historia ya kuongoza miradi mikubwa hadi mwisho.",
    },
  },
  {
    image: "/images/mceo.png",
    alt: {
      en: "Portrait of Qs. Ezekiel Wilson Peter, Technical Director",
      sw: "Picha ya Qs. Ezekiel Wilson Peter, Mkurugenzi wa Ufundi",
    },
    name: "Qs. Ezekiel Wilson Peter",
    role: { en: "Technical Director", sw: "Mkurugenzi wa Ufundi" },
    bio: {
      en: "A quantity surveyor and shareholder focused on business development, cost estimating, construction supervision, and real estate delivery.",
      sw: "Mpimaji wa wingi na mwanahisa, anayeshughulika na ukuzaji wa biashara, makadirio ya gharama, usimamizi wa ujenzi, na miradi ya majengo.",
    },
  },
];

const yrs = (n) => ({ en: `${n} years`, sw: `Miaka ${n}` });

export const managementTeam = [
  [
    { en: "Finance Manager", sw: "Meneja wa Fedha" },
    "Queen Moccah",
    { en: "Tax Administration", sw: "Usimamizi wa Kodi" },
    yrs(9),
  ],
  [
    { en: "Marketing Manager", sw: "Meneja wa Masoko" },
    "Sadru Musiba",
    { en: "Bachelor Degree in Marketing", sw: "Shahada ya Masoko" },
    yrs(12),
  ],
  [
    {
      en: "Legal Advisor / Human Resource Manager",
      sw: "Mshauri wa Sheria / Meneja wa Rasilimali Watu",
    },
    "Juliana Changarawe",
    { en: "Bachelor of Law", sw: "Shahada ya Sheria" },
    yrs(15),
  ],
  [
    { en: "Sites / General Manager", sw: "Meneja wa Maeneo / Meneja Mkuu" },
    "Respicius S. Kabyemela",
    { en: "FTC. Civil Engineer", sw: "FTC. Uhandisi wa Kiraia" },
    yrs(20),
  ],
  [
    { en: "Engineer", sw: "Mhandisi" },
    "Twahil Abdallah",
    {
      en: "Civil and Water Resources Engineer",
      sw: "Uhandisi wa Kiraia na Rasilimali za Maji",
    },
    yrs(5),
  ],
  [
    { en: "Engineer", sw: "Mhandisi" },
    "Victor Marko Pallagyo",
    { en: "Civil Engineer", sw: "Uhandisi wa Kiraia" },
    yrs(3),
  ],
  [
    { en: "Secretary", sw: "Katibu" },
    "Mary Joseph Muronko",
    { en: "Records Management", sw: "Usimamizi wa Kumbukumbu" },
    yrs(3),
  ],
  [
    { en: "Quantity Surveyor", sw: "Mpimaji wa Wingi" },
    "Irene Andrew Mnyeke",
    { en: "Quantity Surveying", sw: "Upimaji wa Wingi" },
    yrs(7),
  ],
  [
    { en: "Safety and Health Officer", sw: "Afisa wa Usalama na Afya" },
    "Wily B.M.Machumu",
    { en: "FTC. Civil Engineer", sw: "FTC. Uhandisi wa Kiraia" },
    yrs(25),
  ],
];
