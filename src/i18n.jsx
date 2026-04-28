import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "metz-locale";
const DEFAULT_LOCALE = "en";
export const SUPPORTED = ["en", "sw"];

// UI dictionary — flat keys for inline strings used across components.
const dict = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.cta": "Start a project",
    "nav.skip": "Skip to content",
    "nav.aria.main": "Main navigation",
    "nav.aria.brandHome": "METZ Engineering home",
    "nav.aria.open": "Open navigation",
    "nav.aria.close": "Close navigation",

    "footer.visit": "Visit us",
    "footer.contact": "Contact",
    "footer.copy": "© {year} METZ Engineering Co. Limited.",

    "home.eyebrow": "Building and civil contractors",
    "home.cta.view": "View projects",
    "home.cta.quote": "Request a quote",
    "home.statsAria": "Company highlights",
    "home.section.general": "General information",
    "home.section.generalTitle": "Practical construction delivery with local accountability.",
    "home.section.general.p1":
      "METZ Engineering Co. Limited was established in 2017 and registered in 2019 as a privately owned Tanzanian company operating across building and civil works.",
    "home.section.general.p2":
      "The company focuses on quality workmanship, safer working environments, responsible team induction, and applying practical technology where it improves delivery.",
    "home.section.general.p3":
      "METZ is registered by the Contractors Registration Board of Tanzania as a Building Works and Civil Works Contractor Class VI.",

    "home.section.capabilities": "Capabilities",
    "home.section.capabilitiesTitle": "Built for the full construction lifecycle",
    "home.section.capabilitiesBody":
      "From early planning to site execution and handover, the company supports clients with coordinated construction services.",

    "home.section.selected": "Selected work",
    "home.section.selectedTitle": "Recent work across housing, roads, and residential construction",

    "home.vision": "Vision",
    "home.visionTitle": "World-class infrastructure and real estate delivery.",
    "home.visionBody":
      "METZ aims to grow through innovative design, quality materials, timely completion, and high standards of workmanship that build long-term customer confidence.",
    "home.mission": "Mission",
    "home.missionTitle": "Value-added construction services from start to finish.",
    "home.missionBody":
      "The company builds lasting client relationships by creating successful partnerships through the construction process and exceeding expectations through reliable performance.",

    "callout.eyebrow": "Ready to build",
    "callout.title": "Bring METZ into the project early.",
    "callout.body":
      "We can help shape scope, budget, safety planning, site execution, and handover from the first practical conversation.",
    "callout.cta": "Talk to us",

    "about.eyebrow": "About METZ",
    "about.title": "A registered Tanzanian contractor with a hands-on leadership team.",
    "about.body":
      "METZ Engineering Co. Limited combines construction experience, technical oversight, and practical site management for building and civil works.",
    "about.legalProfile": "Legal profile",
    "about.particulars": "Company particulars",
    "about.compliance": "Compliance",
    "about.regStatus": "Registration and status",
    "about.leadership": "Leadership",
    "about.directors": "Board of directors",
    "about.directorsBody":
      "The company is led by construction and quantity surveying professionals with deep operational experience.",
    "about.personnel": "Personnel",
    "about.management": "Executive management team",
    "about.managementBody":
      "A cross-functional team supports finance, marketing, legal, engineering, quantity surveying, records, and safety.",
    "about.tableRole": "Role",
    "about.tableName": "Name",
    "about.tableQual": "Qualification",
    "about.tableExp": "Experience",
    "about.associate": "Associate staff network",
    "about.associateBody":
      "METZ maintains relationships with qualified individual personnel who can be engaged on a fee-for-service basis for specialist assignments.",

    "services.eyebrow": "Services",
    "services.title": "Construction services from planning through handover.",
    "services.body":
      "METZ supports clients with general contracting, construction management, design-build, pre-construction planning, civil works, finishing, and maintenance.",
    "services.what": "What we do",
    "services.whatTitle": "A practical service mix for real projects",
    "services.whatBody":
      "The work is organized around the project lifecycle: define the scope, plan the build, execute on site, monitor progress, and close the project properly.",
    "services.delivery": "Delivery methods",
    "services.deliveryTitle": "Flexible enough for different client procurement models.",
    "services.safety": "Health and safety",
    "services.safetyTitle": "Safer work is treated as part of delivery, not an afterthought.",
    "services.safetyBody":
      "Every employee working on site is insured, inducted, and trained on practical safety methods before joining active work areas.",
    "services.social": "Social responsibility",
    "services.socialTitle": "Community is a key stakeholder.",
    "services.socialBody":
      "METZ regards the community as part of the project environment and keeps social responsibility visible in its public activities.",
    "services.objectives": "Strategic objectives",
    "services.objectivesTitle": "Focused growth through 2030.",
    "services.safety.induction": "Site induction before work begins",
    "services.safety.firstAid": "First-aid-trained site agents",
    "services.safety.risk": "Risk assessment and hazard awareness",
    "services.safety.injury": "Injury prevention training",

    "projects.eyebrow": "Projects",
    "projects.title": "Homes, housing, and road works delivered.",
    "projects.body":
      "Browse selected project records from METZ Engineering's residential, housing, and civil works portfolio.",
    "projects.portfolio": "Portfolio",
    "projects.filter": "Filter by project type",
    "projects.shown.one": "{count} project shown",
    "projects.shown.many": "{count} projects shown",
    "projects.filterAria": "Project filters",
    "projects.filterAll": "All",
    "projects.viewPhotos": "View photos",
    "projects.thumbsAria": "{title} image preview",
    "projects.openPhoto": "Open {title} photo {index}",
    "projects.viewerAria": "{title} photos",
    "projects.close": "Close photo viewer",
    "projects.prev": "Previous photo",
    "projects.next": "Next photo",
    "projects.show": "Show photo {index}",

    "contact.eyebrow": "Contact",
    "contact.title": "Start with the project details you already have.",
    "contact.body":
      "Share the scope, location, timeline, and the type of construction support you need. METZ can respond with the next practical step.",
    "contact.directLine": "Direct line",
    "contact.reach": "Reach METZ Engineering",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone",
    "contact.form.service": "Service",
    "contact.form.message": "Project message",
    "contact.form.placeholder": "Tell us about the site, scope, timeline, and budget if available.",
    "contact.form.submit": "Send inquiry",
    "contact.form.submitting": "Sending...",
    "contact.form.success": "Thanks — your inquiry has been sent. METZ will follow up shortly.",
    "contact.form.error":
      "Something went wrong sending the form. Please email metz_engineering@yahoo.com directly.",
    "contact.form.honeypot": "Don't fill this out:",

    "notfound.eyebrow": "404",
    "notfound.title": "Page not found",
    "notfound.body":
      "The page you were looking for has moved or no longer exists. Head back to the home page to continue browsing METZ Engineering.",
    "notfound.home": "Back to home",
    "notfound.contact": "Contact us",

    "lang.label": "Language",
    "theme.label": "Theme",
    "theme.auto": "Auto",
    "theme.light": "Light",
    "theme.dark": "Dark",
  },
  sw: {
    "nav.home": "Mwanzo",
    "nav.about": "Kuhusu Sisi",
    "nav.services": "Huduma",
    "nav.projects": "Miradi",
    "nav.contact": "Mawasiliano",
    "nav.cta": "Anza Mradi",
    "nav.skip": "Ruka uende kwenye maudhui",
    "nav.aria.main": "Menyu kuu",
    "nav.aria.brandHome": "Rudi ukurasa wa nyumbani wa METZ Engineering",
    "nav.aria.open": "Fungua menyu",
    "nav.aria.close": "Funga menyu",

    "footer.visit": "Tutembelee",
    "footer.contact": "Mawasiliano",
    "footer.copy": "© {year} METZ Engineering Co. Limited.",

    "home.eyebrow": "Wakandarasi wa majengo na barabara",
    "home.cta.view": "Tazama Miradi",
    "home.cta.quote": "Omba Bei",
    "home.statsAria": "Vipengele muhimu vya kampuni",
    "home.section.general": "Habari kwa ufupi",
    "home.section.generalTitle": "Tunajenga kwa weledi, na tunawajibika hapa hapa.",
    "home.section.general.p1":
      "METZ Engineering Co. Limited ilianzishwa mwaka 2017 na kusajiliwa rasmi mwaka 2019 kama kampuni binafsi ya Kitanzania inayofanya kazi za majengo pamoja na kazi za kiraia.",
    "home.section.general.p2":
      "Tunazingatia ubora wa ufundi, mazingira salama ya kazi, mafunzo ya wafanyakazi, na kutumia teknolojia inayoboresha matokeo eneoni.",
    "home.section.general.p3":
      "METZ imesajiliwa na Bodi ya Wakandarasi Tanzania (CRB) kama Mkandarasi wa Majengo na Kazi za Kiraia, Daraja la VI.",

    "home.section.capabilities": "Tunaloweza",
    "home.section.capabilitiesTitle": "Tunakuongoza tangu mwanzo hadi ukabidhi",
    "home.section.capabilitiesBody":
      "Kuanzia mipango ya awali hadi utekelezaji eneoni na ukabidhi, tunatoa huduma za ujenzi zilizoratibiwa kwa pamoja.",

    "home.section.selected": "Kazi zetu",
    "home.section.selectedTitle": "Kazi za hivi karibuni: nyumba, makazi, na barabara",

    "home.vision": "Maono",
    "home.visionTitle": "Miundombinu na majengo ya kiwango cha kimataifa.",
    "home.visionBody":
      "Tunalenga kukua kwa ubunifu, vifaa bora, kukamilisha kwa wakati, na ufundi wa hali ya juu unaowapa wateja imani ya kudumu.",
    "home.mission": "Dhamira",
    "home.missionTitle": "Huduma kamili za ujenzi tangu mwanzo hadi mwisho.",
    "home.missionBody":
      "Tunajenga uhusiano wa muda mrefu na wateja kwa kushirikiana naye katika kila hatua ya ujenzi na kuvuka matarajio kupitia kazi inayoaminika.",

    "callout.eyebrow": "Tuko tayari kuanza",
    "callout.title": "Mlete METZ kwenye mradi tangu awali.",
    "callout.body":
      "Tutakusaidia kupanga upeo, bajeti, usalama, utekelezaji eneoni, na ukabidhi — tangu mazungumzo ya kwanza.",
    "callout.cta": "Wasiliana nasi",

    "about.eyebrow": "Kuhusu METZ",
    "about.title": "Mkandarasi wa Kitanzania aliyesajiliwa, akiongozwa na timu inayoshika mwenyewe nyundo.",
    "about.body":
      "METZ Engineering Co. Limited inajumuisha uzoefu wa ujenzi, usimamizi wa kiufundi, na uongozi wa eneoni katika kazi za majengo na za kiraia.",
    "about.legalProfile": "Hadhi ya kisheria",
    "about.particulars": "Maelezo ya kampuni",
    "about.compliance": "Vyeti na leseni",
    "about.regStatus": "Usajili na uthibitisho",
    "about.leadership": "Uongozi",
    "about.directors": "Bodi ya wakurugenzi",
    "about.directorsBody":
      "Kampuni inaongozwa na wataalamu wa ujenzi na upimaji wa wingi wenye uzoefu wa muda mrefu kazini.",
    "about.personnel": "Wafanyakazi",
    "about.management": "Timu ya uongozi",
    "about.managementBody":
      "Timu inayofanya kazi kwa pamoja inashughulikia fedha, masoko, sheria, uhandisi, upimaji wa wingi, kumbukumbu, na usalama.",
    "about.tableRole": "Wadhifa",
    "about.tableName": "Jina",
    "about.tableQual": "Elimu",
    "about.tableExp": "Uzoefu",
    "about.associate": "Wafanyakazi washirika",
    "about.associateBody":
      "METZ inashirikiana na wataalamu binafsi wenye sifa, wanaoitwa kazini kwa malipo wakati kazi maalum zinapotokea.",

    "services.eyebrow": "Huduma",
    "services.title": "Huduma za ujenzi tangu kupanga hadi kukabidhi.",
    "services.body":
      "METZ inakusaidia kwa ukandarasi wa jumla, usimamizi wa ujenzi, ubuni-ujenzi, mipango ya awali, kazi za kiraia, umaliziaji, na matengenezo.",
    "services.what": "Tunachofanya",
    "services.whatTitle": "Huduma kamili kwa miradi halisi",
    "services.whatBody":
      "Tunapanga kazi kwa kufuata mzunguko wa mradi: kueleza upeo, kupanga ujenzi, kutekeleza eneoni, kufuatilia maendeleo, na kufunga mradi vizuri.",
    "services.delivery": "Mfumo wa utoaji",
    "services.deliveryTitle": "Tunaweza kufanya kazi kwa mfumo wowote unaokufaa.",
    "services.safety": "Afya na usalama",
    "services.safetyTitle":
      "Usalama ni sehemu ya kazi, si jambo la kufikiria baadaye.",
    "services.safetyBody":
      "Kila mfanyakazi eneoni anapata bima, mafunzo ya awali, na elimu ya usalama kabla ya kuanza kazi.",
    "services.social": "Wajibu kwa jamii",
    "services.socialTitle": "Jamii ni mshirika wetu.",
    "services.socialBody":
      "Kwa METZ, jamii ni sehemu ya mazingira ya mradi, na wajibu kwa jamii unaonekana katika shughuli zetu za umma.",
    "services.objectives": "Malengo ya kimkakati",
    "services.objectivesTitle": "Ukuaji wenye mwelekeo, hadi 2030.",
    "services.safety.induction": "Maelekezo eneoni kabla kazi haijaanza",
    "services.safety.firstAid": "Mawakala wenye mafunzo ya msaada wa kwanza",
    "services.safety.risk": "Tathmini ya hatari na utambuzi wa vihatarishi",
    "services.safety.injury": "Mafunzo ya kuzuia majeraha",

    "projects.eyebrow": "Miradi",
    "projects.title": "Nyumba, makazi, na barabara — zilizokamilika.",
    "projects.body":
      "Pitia baadhi ya miradi tuliyoifanya: nyumba za makazi, miradi ya nyumba za kupanga, na kazi za kiraia.",
    "projects.portfolio": "Orodha ya kazi",
    "projects.filter": "Chuja kwa aina ya mradi",
    "projects.shown.one": "Mradi {count}",
    "projects.shown.many": "Miradi {count}",
    "projects.filterAria": "Vichujio vya miradi",
    "projects.filterAll": "Yote",
    "projects.viewPhotos": "Tazama picha zote",
    "projects.thumbsAria": "Picha za {title}",
    "projects.openPhoto": "Fungua picha ya {index} ya {title}",
    "projects.viewerAria": "Picha za {title}",
    "projects.close": "Funga kionyeshi",
    "projects.prev": "Picha iliyotangulia",
    "projects.next": "Picha inayofuata",
    "projects.show": "Onyesha picha {index}",

    "contact.eyebrow": "Mawasiliano",
    "contact.title": "Anza na maelezo ya mradi uliyo nayo tayari.",
    "contact.body":
      "Tuelezee upeo, eneo, ratiba, na aina ya msaada unaohitaji. METZ itakujibu kwa hatua inayofuata.",
    "contact.directLine": "Wasiliana moja kwa moja",
    "contact.reach": "Tafuta METZ Engineering",
    "contact.form.name": "Jina",
    "contact.form.email": "Barua pepe",
    "contact.form.phone": "Simu",
    "contact.form.service": "Huduma",
    "contact.form.message": "Eleza mradi wako",
    "contact.form.placeholder":
      "Tueleze kuhusu eneo, upeo, muda, na bajeti ikiwa unayo.",
    "contact.form.submit": "Tuma ombi",
    "contact.form.submitting": "Inatuma...",
    "contact.form.success": "Asante — ombi lako limefika. METZ itakujibu hivi karibuni.",
    "contact.form.error":
      "Samahani, kuna tatizo la kutuma fomu. Tutumie barua pepe moja kwa moja kupitia metz_engineering@yahoo.com.",
    "contact.form.honeypot": "Usijaze hapa:",

    "notfound.eyebrow": "404",
    "notfound.title": "Ukurasa haupatikani",
    "notfound.body":
      "Ukurasa uliokuwa ukitafuta umehama au haupo. Rudi mwanzoni uendelee kuvinjari METZ Engineering.",
    "notfound.home": "Rudi mwanzoni",
    "notfound.contact": "Wasiliana nasi",

    "lang.label": "Lugha",
    "theme.label": "Mandhari",
    "theme.auto": "Otomatiki",
    "theme.light": "Mwanga",
    "theme.dark": "Giza",
  },
};

function detectInitialLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(stored)) return stored;
  } catch (e) {}
  if (typeof navigator !== "undefined" && navigator.language) {
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith("sw")) return "sw";
  }
  return DEFAULT_LOCALE;
}

const I18nContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => key,
});

function format(template, vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] != null ? String(vars[key]) : "",
  );
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => detectInitialLocale());

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  const setLocale = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
    setLocaleState(next);
  }, []);

  // Cross-tab sync.
  useEffect(() => {
    function onStorage(event) {
      if (event.key === STORAGE_KEY && SUPPORTED.includes(event.newValue)) {
        setLocaleState(event.newValue);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const t = useCallback(
    (input, vars) => {
      if (input == null) return "";
      if (typeof input === "string") {
        const value =
          dict[locale]?.[input] ?? dict[DEFAULT_LOCALE]?.[input] ?? input;
        return format(value, vars);
      }
      if (typeof input === "object") {
        const value = input[locale] ?? input[DEFAULT_LOCALE] ?? "";
        return format(value, vars);
      }
      return String(input);
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
