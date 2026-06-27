// All site content lives here, bilingual (TR / EN).
// Sourced from Armağan Aydoğan's CV + GitHub (github.com/Armitorenk).
// Add / edit your work, skills and details right here — nothing else to touch.

export type L = { tr: string; en: string };

export const profile = {
  name: "Armağan Aydoğan",
  email: "armaganaydogan48@gmail.com",
  githubUser: "Armitorenk",
  github: "https://github.com/Armitorenk",
  linkedin:
    "https://www.linkedin.com/in/arma%C4%9Fan-aydo%C4%9Fan-aa88252a0",
  location: { tr: "Bodrum, Muğla", en: "Bodrum, Türkiye" },
};

// LinkedIn posts for each hackathon
export const HACKATHON_POST_MUGLA =
  "https://www.linkedin.com/posts/arma%C4%9Fan-aydo%C4%9Fan-aa88252a0_de%C4%9Ferli-ba%C4%9Flant%C4%B1lar%C4%B1m-z-erden-dereli-ve-share-7461812235590545408-Unkr/";
export const HACKATHON_POST_AYDIN =
  "https://www.linkedin.com/posts/arma%C4%9Fan-aydo%C4%9Fan-aa88252a0_de%C4%9Ferli-ba%C4%9Flant%C4%B1m-abdulkadir-kamil-le-ayd%C4%B1nda-ugcPost-7457866672415150081-jX9a/";

export const ui = {
  nav: {
    about: { tr: "Hakkımda", en: "About" },
    work: { tr: "İşler", en: "Work" },
    experience: { tr: "Deneyim", en: "Experience" },
    stack: { tr: "Yetenekler", en: "Stack" },
    github: { tr: "GitHub", en: "GitHub" },
    contact: { tr: "İletişim", en: "Contact" },
    games: { tr: "Oyunlar", en: "Games" },
  },
  availability: { tr: "İşe / staja açığım", en: "Available for work" },
  viewWork: { tr: "İşlerime bak", en: "View my work" },
  getInTouch: { tr: "İletişime geç", en: "Get in touch" },
  downloadCV: { tr: "CV indir", en: "Download CV" },
  sourceCode: { tr: "Kaynak", en: "Source" },
  visitSite: { tr: "Siteyi gör", en: "Live" },
  moreOnGithub: { tr: "GitHub'da hepsini gör", en: "See everything on GitHub" },
  scrollHint: { tr: "Kaydır", en: "Scroll" },
  builtWith: {
    tr: "React, Vite, Tailwind ve Framer Motion ile yapıldı.",
    en: "Built with React, Vite, Tailwind & Framer Motion.",
  },
};

export const hero = {
  role: { tr: "Yazılım Geliştirici", en: "Software Engineer" },
  domains: { tr: "Web · Mobil · Yapay Zekâ", en: "Web · Mobile · AI" },
  lead: { tr: "Fikirleri", en: "I turn ideas into" },
  rotating: {
    tr: ["çalışan ürünlere", "tarayıcıda çalışan şeylere", "cihaz-üstü zekâya", "sıfırdan ürünlere"],
    en: ["working products", "things that run in the browser", "on-device AI", "products, from scratch"],
  },
  trail: { tr: "dönüştürüyorum.", en: "people actually use." },
  intro: {
    tr: "Bilgisayar Mühendisliği öğrencisiyim. Aklıma takılan bir fikri kullanılabilir bir ürüne çevirmeden rahat edemiyorum — web'den mobile, yapay zekâya kadar uçtan uca üretiyorum.",
    en: "Computer Engineering student. I can't rest until an idea becomes something usable — I build end-to-end, from web to mobile to AI.",
  },
};

export type Stat = { value: string; label: L };
export const heroStats: Stat[] = [
  { value: "6", label: { tr: "Proje", en: "Projects" } },
  { value: "2×", label: { tr: "Hackathon 2.'lik", en: "Hackathon 2nd" } },
  { value: "15+", label: { tr: "Teknoloji", en: "Technologies" } },
];

export const about = {
  heading: { tr: "Merhaba, ben Armağan.", en: "Hello, I'm Armağan." },
  body: {
    tr: [
      "Aydın Adnan Menderes Üniversitesi'nde Bilgisayar Mühendisliği okuyorum. Tarayıcıda çalışan bir PDF editöründen internetsiz çalışan bir yapay zekâ asistanına kadar çoğu projem, bir fikri çalışır bir ürüne çevirme isteğinden doğdu.",
      "Bir şeyi en çok onu sıfırdan yapıp çalışır hâle getirirken öğreniyorum. Katıldığım iki hackathonda ekip arkadaşlarımla ikincilik aldık — takım içinde üretmeyi ve öğrendiğimi paylaşmayı seviyorum.",
    ],
    en: [
      "I'm studying Computer Engineering at Aydın Adnan Menderes University. From a browser-based PDF editor to an AI assistant that runs fully offline, most of my projects come from the same urge: turning an idea into something that actually works.",
      "I learn best by building things from scratch until they run. My teams placed 2nd in two hackathons — I enjoy building with others and sharing what I learn.",
    ],
  },
};

export type Level = "expert" | "advanced" | "intermediate" | "familiar";

export const levelLabel: Record<Level, L> = {
  expert: { tr: "Uzman", en: "Expert" },
  advanced: { tr: "İleri", en: "Advanced" },
  intermediate: { tr: "Orta", en: "Intermediate" },
  familiar: { tr: "Aşina", en: "Familiar" },
};

// Drives the little 4-segment strength indicator next to each skill.
export const levelRank: Record<Level, number> = {
  expert: 4,
  advanced: 3,
  intermediate: 2,
  familiar: 1,
};

// `logo` is a Simple Icons slug (cdn.simpleicons.org). Concept skills
// (RAG, SSE…) leave it out and fall back to a generic mark. `darkLogo`
// marks brand marks that are near-black so they get a light tint in dark mode.
export type Skill = { name: string; level: Level; logo?: string; darkLogo?: boolean };
export type SkillGroup = { label: L; items: Skill[] };

export const skills: SkillGroup[] = [
  {
    label: { tr: "Diller", en: "Languages" },
    items: [
      { name: "TypeScript", level: "expert", logo: "typescript" },
      { name: "JavaScript", level: "expert", logo: "javascript" },
      { name: "Python", level: "intermediate", logo: "python" },
      { name: "C++", level: "familiar", logo: "cplusplus" },
      { name: "Dart", level: "intermediate", logo: "dart" },
      { name: "SQL", level: "intermediate" },
      { name: "HTML / CSS", level: "advanced", logo: "html5" },
    ],
  },
  {
    label: { tr: "Frontend", en: "Frontend" },
    items: [
      { name: "React", level: "expert", logo: "react" },
      { name: "Next.js", level: "advanced", logo: "nextdotjs", darkLogo: true },
      { name: "Vite", level: "advanced", logo: "vite" },
    ],
  },
  {
    label: { tr: "Backend", en: "Backend" },
    items: [
      { name: "Node.js", level: "advanced", logo: "nodedotjs" },
      { name: "Express", level: "advanced", logo: "express", darkLogo: true },
      { name: "REST / SSE", level: "advanced" },
      { name: "Prisma", level: "advanced", logo: "prisma", darkLogo: true },
      { name: "Auth (jose / JWT)", level: "advanced", logo: "jsonwebtokens" },
    ],
  },
  {
    label: { tr: "Mobil", en: "Mobile" },
    items: [
      { name: "Capacitor", level: "advanced", logo: "capacitor" },
      { name: "Flutter", level: "intermediate", logo: "flutter" },
      { name: "Android", level: "intermediate", logo: "android" },
    ],
  },
  {
    label: { tr: "Yapay Zekâ / ML", en: "AI / ML" },
    items: [
      { name: "RAG", level: "advanced" },
      { name: "On-device LLM", level: "intermediate" },
      { name: "Foundry Local", level: "intermediate" },
      { name: "LightGBM / CatBoost", level: "intermediate" },
    ],
  },
  {
    label: { tr: "Veri & Araçlar", en: "Data & Tools" },
    items: [
      { name: "PostgreSQL", level: "advanced", logo: "postgresql" },
      { name: "SQLite", level: "advanced", logo: "sqlite" },
      { name: "Docker", level: "intermediate", logo: "docker" },
      { name: "Git / GitHub", level: "advanced", logo: "github", darkLogo: true },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  kind: L;
  summary: L;
  tags: string[];
  github?: string;
  site?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "pdf-editor",
    title: "PDF Editör",
    kind: { tr: "Web + Mobil", en: "Web + Mobile" },
    summary: {
      tr: "Hiçbir dosyayı sunucuya yüklemeden, tamamen tarayıcıda çalışan bir PDF editörü: metni düzenle, görsel ekle, sayfaları yönet, dışa aktar. Sonra Android'e taşıdım ve nesneleri gerçekten düzenleyebilmek için C++ ile native bir PDFium motoru entegre ettim.",
      en: "A PDF editor that runs entirely in the browser — no file ever leaves the device: edit text, place images, manage pages, export. I then ported it to Android and integrated a native PDFium engine in C++ to truly edit objects.",
    },
    tags: ["Next.js 16", "TypeScript", "pdf.js", "pdf-lib", "Capacitor", "PDFium / C++"],
    github: "https://github.com/Armitorenk/pdf-editor",
    featured: true,
  },
  {
    id: "offline-rag",
    title: "Offline RAG Asistanı",
    kind: { tr: "Yapay Zekâ", en: "AI" },
    summary: {
      tr: "İnternetsiz, tamamen kendi bilgisayarında çalışan bir yapay zekâ asistanı: öğrenci sorularını kendi belgelerinden yanıtlıyor. Foundry Local + Phi-3.5, SQLite üzerinde TF-IDF ve canlı (SSE) yanıt akışı. Bulut yok, API anahtarı yok.",
      en: "An AI assistant that runs fully offline on your machine: it answers student questions from their own documents. Foundry Local + Phi-3.5, TF-IDF over SQLite, and live (SSE) streaming. No cloud, no API keys.",
    },
    tags: ["Node.js", "Express", "SQLite", "Foundry Local", "Phi-3.5", "RAG", "SSE"],
    featured: true,
  },
  {
    id: "kaggle-toolkit",
    title: "Kaggle Tabular Toolkit",
    kind: { tr: "Veri / ML", en: "Data / ML" },
    summary: {
      tr: "Bir datathon sürecinde öğrendiklerimi tek bir araç setinde topladım: leaderboard'ı takip eden metrik, sızıntısız feature engineering, sabit cross-validation ve model harmanlama (blend) optimizasyonu.",
      en: "Everything I learned during a datathon, gathered into one toolkit: a leaderboard-tracking metric, leak-free feature engineering, fixed cross-validation, and model blending optimization.",
    },
    tags: ["Python", "LightGBM", "CatBoost", "scikit-learn"],
  },
  {
    id: "nextjs-starter",
    title: "Next.js Full-Stack Starter",
    kind: { tr: "Şablon", en: "Boilerplate" },
    summary: {
      tr: "Yeni projelere hızlı başlamak için kendi full-stack başlangıç şablonum: Next.js + Prisma, sıfırdan kurduğum jose tabanlı kimlik doğrulama ve hazır Docker yapılandırması.",
      en: "My own full-stack starter for spinning up projects fast: Next.js + Prisma, a jose-based auth I built from scratch, and a ready-to-go Docker setup.",
    },
    tags: ["Next.js 16", "TypeScript", "Prisma 7", "Docker"],
  },
  {
    id: "otaku",
    title: "Otaku Durağı",
    kind: { tr: "Freelance", en: "Freelance" },
    summary: {
      tr: "Next.js ve PostgreSQL ile baştan sona bir e-ticaret sitesi: üyelik & giriş, ürün/görsel yönetimi (Prisma), sepet ve sipariş akışı, responsive arayüz — tek başıma geliştirip teslim ettim.",
      en: "A complete e-commerce site with Next.js and PostgreSQL: membership & login, product/image management (Prisma), cart and order flow, responsive UI — designed, built and delivered solo.",
    },
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
  },
  {
    id: "nexus",
    title: "Nexus",
    kind: { tr: "Hackathon · 2.'lik", en: "Hackathon · 2nd" },
    summary: {
      tr: "Aydın'daki hackathon için React + Vite ile geliştirdiğim uygulama. Abdulkadir Kamil ile katıldık ve ikinci olduk. Kod GitHub'da.",
      en: "The app I built with React + Vite for a hackathon in Aydın. I competed with Abdulkadir Kamil and we placed second. Code is on GitHub.",
    },
    tags: ["React", "Vite", "JavaScript"],
    github: "https://github.com/Armitorenk/Nexus",
  },
];

// `image` is an optional photo path under /public (e.g. "/images/otaku.jpg").
export type ExperienceItem = { role: L; org: string; meta: L; body: L; image?: string };
export const experience: ExperienceItem[] = [
  {
    role: { tr: "Freelance Web Geliştirici", en: "Freelance Web Developer" },
    org: "Otaku Durağı",
    meta: { tr: "Freelance · Uçtan uca teslim", en: "Freelance · End-to-end delivery" },
    body: {
      tr: "Next.js ve PostgreSQL ile bir e-ticaret sitesini tek başıma kurup teslim ettim: üyelik & giriş, Prisma ile ürün/görsel yönetimi, sepet ve sipariş akışı, responsive arayüz.",
      en: "Single-handedly built and delivered an e-commerce site with Next.js and PostgreSQL: membership & login, product/image management with Prisma, cart and order flow, responsive UI.",
    },
    image: "/images/otaku.jpg",
  },
];

export type Award = { title: L; place: string; body: L; link?: string; image?: string };
export const awards: Award[] = [
  {
    title: { tr: "Veri Bilimi Topluluğu Hackathon'u", en: "Data Science Community Hackathon" },
    place: "Muğla · 2.'lik / 2nd 🥈",
    body: {
      tr: "Z. Erden Dereli ve Abdulkadir Kamil ile katıldık; backend geliştirmesini üstlendim ve ekibimizle ikinci olduk.",
      en: "Competed with Z. Erden Dereli and Abdulkadir Kamil; I led the backend development and our team placed second.",
    },
    link: HACKATHON_POST_MUGLA,
    image: "/images/hackathon-mugla.jpg",
  },
  {
    title: { tr: "Hackathon", en: "Hackathon" },
    place: "Aydın · 2.'lik / 2nd 🥈",
    body: {
      tr: "Abdulkadir Kamil ile katıldık; yarışma için React + Vite ile Nexus uygulamasını geliştirdim. İkinci olduk.",
      en: "Competed with Abdulkadir Kamil; I built the Nexus app with React + Vite for the contest. We placed second.",
    },
    link: HACKATHON_POST_AYDIN,
    image: "/images/hackathon-aydin.jpg",
  },
];

export type EduItem = { school: string; detail: L };
export const education: EduItem[] = [
  {
    school: "Aydın Adnan Menderes Üniversitesi",
    detail: { tr: "Bilgisayar Mühendisliği · Aydın", en: "Computer Engineering · Aydın" },
  },
  {
    school: "Bodrum Anadolu Lisesi",
    detail: { tr: "Bodrum", en: "Bodrum" },
  },
];

export const languages = [
  { name: { tr: "Türkçe", en: "Turkish" }, level: { tr: "Ana dil", en: "Native" } },
  { name: { tr: "İngilizce", en: "English" }, level: { tr: "B2", en: "B2" } },
];

export const contact = {
  heading: { tr: "Bir şeyler yapalım.", en: "Let's build something." },
  body: {
    tr: "Bir proje, staj ya da iş fırsatı mı var? Aşağıdaki formu doldur, doğrudan kutuma düşsün. Genelde aynı gün dönüyorum.",
    en: "Got a project, internship or role in mind? Drop me a line below and it lands straight in my inbox. I usually reply the same day.",
  },
  form: {
    name: { tr: "Adın", en: "Your name" },
    email: { tr: "E-posta adresin", en: "Your email" },
    message: { tr: "Mesajın", en: "Your message" },
    send: { tr: "Mesajı gönder", en: "Send message" },
    sending: { tr: "Gönderiliyor…", en: "Sending…" },
    sent: { tr: "Teşekkürler! Mesajın ulaştı.", en: "Thanks! Your message is on its way." },
    error: {
      tr: "Bir şeyler ters gitti. Doğrudan e-posta atabilirsin:",
      en: "Something went wrong. You can email me directly:",
    },
  },
};
