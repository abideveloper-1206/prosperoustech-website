// Central place for real ProsperousTech copy (sourced from https://prosperoustech.com).
// Keeping this separate from the components means each future section (Services,
// About, Case Studies, Contact) can be planned and dropped in independently.

export const SITE = {
  name: "ProsperousTech",
  tagline: "Engineering Prosperity Through AI",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  badge: "100% AI-First Development",
  // Rendered as exactly two lines (see HeroSection.tsx). "Scale" gets the
  // brand gradient, matching the live site's gradient-text-animated word.
  headingLine1: "We Build Products That",
  headingLine2: ["Scale", "Businesses"],
  headingHighlight: "Scale",
  subline:
    "Transform your technical vision into reality with our AI-first engineering approach. We build intelligent products, scalable platforms, and provide long-term technical partnership for ambitious founders.",
  primaryCta: { label: "Build With Us", href: "#contact" },
  secondaryCta: { label: "Explore Our Services", href: "#services" },
};

// Sourced from https://prosperoustech.com/about. Kept short on purpose —
// this renders as a single compact glass panel, not a long-form page.
export const ABOUT = {
  eyebrow: "Who We Are",
  heading: "We Build Extraordinary Products",
  description:
    "ProsperousTech is an AI-first engineering studio that partners with ambitious founders to transform technical visions into production-ready products.",
  cta: { label: "Know More", href: "#contact" },
};

// Kept for later reuse (e.g. a dedicated Services/Values section) even
// though the compact About layout doesn't render these itself right now.
export const VALUES = [
  {
    title: "Mission-Driven",
    description:
      "We turn technical visions into reality, empowering entrepreneurs and businesses.",
  },
  {
    title: "Innovation First",
    description:
      "We leverage cutting-edge AI, modern architectures, and proven technologies.",
  },
  {
    title: "True Partnership",
    description:
      "We act as technical co-founders, deeply invested in your long-term success.",
  },
  {
    title: "Excellence Always",
    description: "Production-quality engineering, every time.",
  },
];

// Sourced from https://prosperoustech.com/about. `value`/`decimals` are
// numeric so StatsSection can count up to them instead of just fading in.
export const STATS = [
  { value: 50, decimals: 0, suffix: "+", label: "Projects Delivered" },
  { value: 15, decimals: 0, suffix: "+", label: "AI Systems Built" },
  { value: 99.9, decimals: 1, suffix: "%", label: "Uptime Average" },
  { value: 24, decimals: 0, suffix: "/7", label: "Support Available" },
];

// Sourced from the "What We Build" section on https://prosperoustech.com.
// `icon` keys into the small icon map in ServicesSection.tsx (used as a
// fallback visual for any service whose `image` hasn't been uploaded yet).
// `image` paths point at public/services/ — drop a matching file in there
// and it takes over from the icon automatically, no code change needed.
export const SERVICES = {
  eyebrow: "Our Services",
  headingLead: "What",
  headingTail: "We Build",
  subheading:
    "From concept to scale, we engineer products that drive real business value.",
  items: [
    {
      icon: "brain",
      image: "/services/ai_powered_products_1789739461717.jpg",
      title: "AI-Powered Products",
      description:
        "Intelligent systems that learn, adapt, and scale with your business needs.",
    },
    {
      icon: "globe",
      image: "/services/saas_platforms_1789739477100.jpg",
      title: "SaaS Platforms",
      description:
        "Full-stack cloud applications built for growth and recurring revenue.",
    },
    {
      icon: "web",
      image: "/services/web_applications_1789739491423.jpg",
      title: "Web Applications",
      description:
        "Modern, responsive web apps with exceptional user experiences.",
    },
    {
      icon: "mobile",
      image: "/services/mobile_applications_1789739506690.jpg",
      title: "Mobile Applications",
      description:
        "Native and cross-platform mobile solutions for iOS and Android.",
    },
    {
      icon: "enterprise",
      image: "/services/internal_enterprise_systems_1789739520121.jpg",
      title: "Internal Enterprise Systems",
      description:
        "Custom business tools and workflows that streamline operations.",
    },
    {
      icon: "data",
      image: "/services/data_intelligence_1789739537973.jpg",
      title: "Data Intelligence",
      description:
        "Transform raw data into actionable insights and predictions.",
    },
  ],
};

// Sourced from the "Why ProsperousTech" section on https://prosperoustech.com.
export const WHY = {
  eyebrow: "Why Choose Us",
  heading: "Why ProsperousTech",
  subheading:
    "Four reasons founders choose us as their long-term technical partner.",
  items: [
    {
      icon: "handshake",
      title: "Long-Term Partner, Not Vendor",
      description:
        "We build lasting relationships rather than one-off projects.",
    },
    {
      icon: "brainCircuit",
      title: "AI & Architecture Experts",
      description:
        "Deep expertise in modern AI systems and scalable architecture.",
    },
    {
      icon: "scale",
      title: "Scalable Systems Thinking",
      description: "Built to handle millions of users from day one.",
    },
    {
      icon: "rocket",
      title: "Founder-Friendly Engagements",
      description: "Startup pricing with enterprise-quality engineering.",
    },
  ],
};

// Reuses two of the six real SERVICES entries as the two featured cases —
// same underlying content and image paths as ServicesSection, just framed
// as a portfolio-style showcase (inspired by the "Transforming Ideas"
// layout on the we-brand reference site).
export const SHOWCASE = {
  eyebrow: "Featured Work",
  heading: "Turning Ambitious Ideas Into Production-Ready Products",
  description:
    "Every engagement reflects our AI-first approach: intelligent products, scalable platforms, and long-term technical partnership for ambitious founders.",
  items: [
    { ...SERVICES.items[0], image: "/services/featured_ai_1789739910918.jpg" },
    { ...SERVICES.items[1], image: "/services/featured_saas_1789739926748.jpg" }
  ],
};

export const CTA_BANNER = {
  message: "Let's build something extraordinary together.",
  description:
    "Our doors — and our calendars — are open. Tell us what you're building, and let's talk.",
  cta: { label: "Build With Us", href: "#contact" },
};

// Sourced from the "Technical Partner Model" section on https://prosperoustech.com.
export const HOW_WE_HELP = {
  eyebrow: "How We Help",
  heading: "Our Technical Partner Model",
  subheading:
    "From first idea to long-term growth, here's how an engagement with us actually works.",
  steps: [
    {
      title: "Idea Validation",
      description:
        "We help validate your concept with technical feasibility analysis and market research.",
    },
    {
      title: "Architecture & AI Design",
      description:
        "Design scalable systems with AI at the core, built for growth from day one.",
    },
    {
      title: "MVP → Scale",
      description:
        "Rapid prototyping to production-ready platform with continuous iteration.",
    },
    {
      title: "Cloud & DevOps",
      description:
        "Enterprise-grade infrastructure that scales automatically with demand.",
    },
    {
      title: "Long-Term Support & Growth",
      description:
        "Ongoing partnership to evolve your product as your business grows.",
    },
  ],
};

// No FAQ section exists anywhere on prosperoustech.com (checked the homepage
// and /services), so these are built from facts already sourced elsewhere on
// the real site (services list, stats, engagement model) rather than a
// direct copy — nothing here is invented beyond rephrasing those facts as
// questions.
export const FAQ = {
  eyebrow: "FAQ",
  heading: "Common Questions",
  items: [
    {
      question: "What kind of companies does ProsperousTech work with?",
      answer:
        "We work with startups, SMEs, and angel investors to build AI-powered products, scalable platforms, and mission-critical systems.",
    },
    {
      question: "What makes you different from a typical dev agency?",
      answer:
        "We're a long-term technical partner, not a vendor. We build lasting relationships rather than taking on one-off projects, with startup-friendly pricing and enterprise-quality engineering.",
    },
    {
      question: "What services do you offer?",
      answer:
        "AI-powered products, SaaS platforms, web and mobile applications, internal enterprise systems, and data intelligence — from concept to a production-ready product.",
    },
    {
      question: "How reliable are the systems you build?",
      answer:
        "Our systems maintain a 99.9% uptime average, backed by 24/7 support.",
    },
    {
      question: "How do we get started working together?",
      answer:
        "Reach out through the \"Build With Us\" button. We'll schedule a consultation to understand your goals before moving into architecture and design.",
    },
  ],
};
