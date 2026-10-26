/**
 * JGTECH ChatFolio — Executive Interactive AI Conversational Portfolio Engine
 * Inspired by ChatFolio, elevated with obsidian luxury styling, intelligent
 * natural language matching, realistic typing simulation, and rich UI cards.
 */

function chatfolioApp() {
  return {
    // Mode & Theme State
    dark: document.documentElement.classList.contains('dark'),
    mode: 'chat', // 'chat' or 'classic'
    introVisible: true,
    menuOpen: false,
    inputQuery: '',
    isTyping: false,
    copiedEmail: false,
    currentProjectIndex: 0,

    // Active Chat Conversation History
    messages: [],

    // Curated Project Showcase
    projects: [
      {
        id: 'edutrack',
        title: 'EduTrack Pro',
        category: 'Enterprise SaaS & Grading Engine',
        tagline: 'High-speed academic grading and reporting for 12,000+ students.',
        summary: 'Architected and shipped an end-to-end academic management system featuring rapid grade entry, automated GPA recalculation, PDF report card generation, and SMS parent notifications. Reduced end-of-term grading turnaround from 14 days to under 4 hours.',
        tech: ['PHP 8.2', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'Chart.js'],
        metrics: '99.98% Uptime · 12,000+ Active Records · 75% Admin Time Saved',
        link: 'projects.html',
        caseStudy: 'case-study.html',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'nexus',
        title: 'Nexus Cloud ERP',
        category: 'Multi-Branch Inventory & POS',
        tagline: 'Real-time multi-branch retail inventory with sub-second synchronization.',
        summary: 'Engineered a centralized cloud ERP handling multi-location stock movements, barcode scanning, thermal receipt printing, and daily reconciliation. Replaced manual spreadsheets across 6 physical stores.',
        tech: ['Node.js', 'PostgreSQL', 'Express', 'Tailwind CSS', 'WebSockets'],
        metrics: '6 Retail Branches · 40,000+ SKUs · Real-time Sync',
        link: 'projects.html',
        caseStudy: 'case-study.html',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'apex',
        title: 'Apex Banking & Micro-Invest',
        category: 'Fintech Dashboard Architecture',
        tagline: 'Frictionless financial analytics, instant transfers and KYC workflows.',
        summary: 'Designed and implemented a high-security fintech management dashboard with 2-factor authentication, biometric session verification, transaction heatmaps, and automated PDF statement exports.',
        tech: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'REST API', 'Figma'],
        metrics: 'PCI-DSS Compliant · <120ms API Latency · 4.9★ Review',
        link: 'projects.html',
        caseStudy: 'case-study.html',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'churchflow',
        title: 'ChurchFlow Stream Console',
        category: 'Live Media & Giving Management',
        tagline: 'Automated broadcast lower-thirds, OBS WebSocket control and instant giving.',
        summary: 'Developed a custom cloud stream management console integrating OBS Studio remote control, live scripture overlays, mobile church giving, and real-time attendee engagement metrics during live broadcasts.',
        tech: ['OBS WebSocket', 'PHP', 'MySQL', 'Tailwind CSS', 'WebRTC'],
        metrics: '5,000+ Live Viewers · Sub-second Overlay Triggering',
        link: 'projects.html',
        caseStudy: 'case-study.html',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'brandcraft',
        title: 'BrandCraft UI System',
        category: 'Design Systems & Tokens',
        tagline: 'Scalable design architecture with 120+ WCAG 2.1 AA compliant components.',
        summary: 'Crafted an enterprise design system uniting Figma UI libraries with Tailwind tokens. Built reusable interactive patterns, keyboard focus management, dark mode palettes, and living documentation.',
        tech: ['Figma', 'Tailwind CSS', 'Design Tokens', 'Storybook', 'HTML5'],
        metrics: '120+ Components · 100% WCAG AA Score · 3x Faster Dev Sprints',
        link: 'projects.html',
        caseStudy: 'case-study.html',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'shopwave',
        title: 'ShopWave Headless Store',
        category: 'High-Converting E-Commerce',
        tagline: 'Lightning-fast mobile shopping experience with 98 Lighthouse performance.',
        summary: 'Built a headless digital storefront with instant category filtering, slide-out cart drawers, mobile-first checkout, and direct WhatsApp order confirmation for West African and international buyers.',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'Stripe API', 'WhatsApp API'],
        metrics: '98/100 Lighthouse · 3.2x Conversion Rate · Sub-second page loads',
        link: 'projects.html',
        caseStudy: 'case-study.html',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
      }
    ],

    // Client Testimonials
    testimonials: [
      {
        quote: "JGTECH transformed our academic management completely. What used to take two weeks of chaotic manual calculations was reduced to a few hours with zero errors. He is the most dependable developer we have ever worked with.",
        author: "Rev. Emmanuel O.",
        role: "Director of Academic Operations",
        rating: 5
      },
      {
        quote: "Working with JGTECH on our cloud POS was smooth from day one. He understands business logic, builds exceptionally clean code, and delivered ahead of our scheduled retail launch.",
        author: "Kofi Mensah",
        role: "Retail Managing Partner",
        rating: 5
      },
      {
        quote: "The visual polish and micro-animations JGTECH created for our fintech platform gave our startup instant credibility with international investors. Outstanding UI/UX talent.",
        author: "Sandra A.",
        role: "Product Lead",
        rating: 5
      }
    ],

    init() {
      // Auto-focus input on desktop after mount
      this.$nextTick(() => {
        if (window.innerWidth > 768 && this.$refs.chatInput) {
          this.$refs.chatInput.focus();
        }
      });
    },

    toggleTheme() {
      this.dark = !this.dark;
      if (this.dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    },

    switchMode(targetMode) {
      this.mode = targetMode;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const win = this.$refs.chatWindow;
        if (win) {
          win.scrollTop = win.scrollHeight;
        }
      });
    },

    // Handles user trigger actions (buttons or options)
    triggerAction(actionKey, customLabel = null) {
      if (this.introVisible) {
        this.introVisible = false;
      }
      this.menuOpen = false;

      const label = customLabel || this.getActionLabel(actionKey);
      this.pushUserMessage(label);
      this.simulateAiResponse(actionKey);
    },

    getActionLabel(key) {
      const map = {
        about: 'Tell me about yourself',
        skills: 'What are your skills & tech stack?',
        projects: 'Show me your projects',
        services: 'What services & pricing do you offer?',
        pricing: 'How much do you charge?',
        process: 'What is your development process?',
        reviews: 'What do past clients say?',
        contact: 'How can I contact you?',
        whatsapp: 'Direct WhatsApp link',
        cv: 'Download your CV / Resume',
        next_project: 'Show next project',
        prev_project: 'Show previous project'
      };
      return map[key] || key;
    },

    // Processes free-text input from chat bar
    handleInputSubmit() {
      const text = this.inputQuery.trim();
      if (!text || this.isTyping) return;

      if (this.introVisible) {
        this.introVisible = false;
      }
      this.menuOpen = false;

      this.pushUserMessage(text);
      this.inputQuery = '';

      const matchedFlow = this.matchIntent(text);
      this.simulateAiResponse(matchedFlow);
    },

    // Natural Language Intent Matcher
    matchIntent(query) {
      const q = query.toLowerCase();

      if (q.includes('about') || q.includes('who are you') || q.includes('bio') || q.includes('experience') || q.includes('background') || q.includes('where are you') || q.includes('location')) {
        return 'about';
      }
      if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('tools') || q.includes('frontend') || q.includes('backend') || q.includes('react') || q.includes('php') || q.includes('python') || q.includes('figma')) {
        return 'skills';
      }
      if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('build') || q.includes('case stud') || q.includes('sample') || q.includes('edutrack') || q.includes('app')) {
        return 'projects';
      }
      if (q.includes('service') || q.includes('what do you do') || q.includes('hire') || q.includes('offer')) {
        return 'services';
      }
      if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('how much') || q.includes('quote') || q.includes('budget')) {
        return 'pricing';
      }
      if (q.includes('process') || q.includes('how you work') || q.includes('method') || q.includes('step') || q.includes('timeline')) {
        return 'process';
      }
      if (q.includes('review') || q.includes('client') || q.includes('testimonial') || q.includes('rating') || q.includes('feedback')) {
        return 'reviews';
      }
      if (q.includes('whatsapp') || q.includes('chat') || q.includes('number') || q.includes('phone') || q.includes('call')) {
        return 'whatsapp';
      }
      if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('message') || q.includes('touch')) {
        return 'contact';
      }
      if (q.includes('cv') || q.includes('resume') || q.includes('curriculum')) {
        return 'cv';
      }
      if (q.includes('next')) {
        return 'next_project';
      }
      if (q.includes('prev')) {
        return 'prev_project';
      }
      if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('yo') || q.includes('good morning') || q.includes('good afternoon')) {
        return 'greeting';
      }

      return 'fallback';
    },

    pushUserMessage(text) {
      this.messages.push({
        id: Date.now() + Math.random(),
        sender: 'user',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.scrollToBottom();
    },

    simulateAiResponse(intentKey) {
      this.isTyping = true;
      this.scrollToBottom();

      const delay = Math.floor(Math.random() * 250) + 400; // 400-650ms realistic typing cadence

      setTimeout(() => {
        this.isTyping = false;
        const responseData = this.generateResponseData(intentKey);
        this.messages.push({
          id: Date.now() + Math.random(),
          sender: 'ai',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ...responseData
        });
        this.scrollToBottom();
      }, delay);
    },

    // Generates rich structured card responses
    generateResponseData(intent) {
      switch (intent) {
        case 'about':
          return {
            type: 'about',
            heading: "About JGTECH",
            text: "I'm a multi-disciplinary **Senior Full-Stack Developer & UI/UX Designer** with over 6 years of production engineering experience. I partner with founders, educational institutions, growing businesses, and international agencies to turn complex requirements into fast, reliable, beautiful web products.",
            highlights: [
              "6+ Years Production Experience across Full-Stack & UI/UX",
              "50+ Shipped Web Projects & Enterprise Systems",
              "30+ Satisfied Clients across Ghana & International Remote",
              "100% On-Time Delivery Track Record & Strict Security Standards"
            ],
            options: [
              { label: "View My Projects", action: "projects", primary: true },
              { label: "Technical Skills", action: "skills" },
              { label: "Services & Pricing", action: "services" },
              { label: "Direct WhatsApp", action: "whatsapp" }
            ]
          };

        case 'skills':
          return {
            type: 'skills',
            heading: "Skills & Core Technologies",
            text: "Here are the tools and engineering stacks I deploy daily to architect resilient, scalable systems with exceptional design polish:",
            categories: [
              {
                title: "Frontend Engineering",
                icon: "code",
                skills: [
                  { name: "Tailwind CSS & Modern CSS3", level: "98%" },
                  { name: "Alpine.js & Vanilla JavaScript (ES6+)", level: "95%" },
                  { name: "React, Next.js & Vue 3", level: "90%" },
                  { name: "Responsive Architecture & WCAG AA", level: "96%" }
                ]
              },
              {
                title: "Backend & Systems",
                icon: "database",
                skills: [
                  { name: "PHP 8.x & Modern Architecture", level: "95%" },
                  { name: "Node.js & Express.js", level: "90%" },
                  { name: "MySQL & PostgreSQL Relational DBs", level: "92%" },
                  { name: "RESTful APIs & GraphQL Endpoints", level: "94%" }
                ]
              },
              {
                title: "UI/UX & Design Systems",
                icon: "palette",
                skills: [
                  { name: "Figma Prototyping & Wireframing", level: "96%" },
                  { name: "Design Tokens & Living Libraries", level: "92%" },
                  { name: "Micro-Interactions & Motion Design", level: "90%" }
                ]
              },
              {
                title: "Cloud & Media Streaming",
                icon: "cloud",
                skills: [
                  { name: "OBS Studio Media & WebSocket Automation", level: "95%" },
                  { name: "Nginx, Linux & Cloud Deployments", level: "88%" },
                  { name: "Git Workflow & CI/CD Pipelines", level: "92%" }
                ]
              }
            ],
            options: [
              { label: "See Projects Built With This Stack", action: "projects", primary: true },
              { label: "Services & Pricing", action: "services" },
              { label: "Download Resume", action: "cv" }
            ]
          };

        case 'projects':
        case 'next_project':
        case 'prev_project':
          if (intent === 'next_project') {
            this.currentProjectIndex = (this.currentProjectIndex + 1) % this.projects.length;
          } else if (intent === 'prev_project') {
            this.currentProjectIndex = (this.currentProjectIndex - 1 + this.projects.length) % this.projects.length;
          } else {
            this.currentProjectIndex = 0;
          }

          const currentProj = this.projects[this.currentProjectIndex];
          return {
            type: 'project_card',
            heading: `Project ${this.currentProjectIndex + 1} of ${this.projects.length}: ${currentProj.title}`,
            text: currentProj.tagline,
            project: currentProj,
            projectIndex: this.currentProjectIndex,
            totalProjects: this.projects.length,
            options: [
              { label: `Next Project (${(this.currentProjectIndex + 1) % this.projects.length + 1}/${this.projects.length}) →`, action: "next_project", primary: true },
              { label: "View All 50+ Projects", link: "projects.html" },
              { label: "In-Depth Case Study", link: currentProj.caseStudy },
              { label: "Pricing & Inquiries", action: "pricing" }
            ]
          };

        case 'services':
        case 'pricing':
          return {
            type: 'services',
            heading: "Services & Investment Tiers",
            text: "I offer full-cycle design and development services. Every engagement is executed with clean code, direct founder communication, and milestone guarantees:",
            packages: [
              {
                name: "Custom Web Application",
                price: "From $1,200",
                duration: "2 – 4 Weeks",
                summary: "Full-stack tailored portals, admin dashboards, student/client platforms with authentication and database architecture.",
                features: ["PHP/Node.js + MySQL", "Tailwind + Alpine/Vue UI", "Role-based security", "Full database migration"]
              },
              {
                name: "High-Converting Portfolio / Website",
                price: "From $800",
                duration: "1 – 2 Weeks",
                summary: "World-class bespoke portfolio or business website with curated typography, dark mode, smooth micro-interactions and SEO.",
                features: ["Figma UI System", "Bespoke SVG Vector Graphics", "100/100 Lighthouse Performance", "WhatsApp + Email Integration"]
              },
              {
                name: "Full-Stack SaaS Platform",
                price: "From $2,500",
                duration: "4 – 8 Weeks",
                summary: "Complete MVP build from schema to deployment, including subscription billing, multi-tenancy, and analytics.",
                features: ["Scalable architecture", "Payment gateway integration", "REST API suite", "Automated backups & monitoring"]
              },
              {
                name: "Live Media & OBS Integration",
                price: "From $600",
                duration: "3 – 7 Days",
                summary: "Custom OBS Studio automation, live lower-thirds, remote WebSocket consoles, and multi-camera streaming setups.",
                features: ["Custom animated overlays", "WebSocket remote panel", "Stream deck integrations", "Sound & audio mastering"]
              }
            ],
            options: [
              { label: "Start a Project on WhatsApp", action: "whatsapp", primary: true },
              { label: "Client Testimonials", action: "reviews" },
              { label: "My 4-Step Process", action: "process" }
            ]
          };

        case 'process':
          return {
            type: 'process',
            heading: "The 4-Phase Delivery Process",
            text: "A disciplined, transparent engineering methodology that guarantees zero scope creep, clear milestones, and rapid delivery:",
            steps: [
              { num: "01", title: "Discovery & Blueprint", desc: "We map user journeys, technical constraints, data schemas, and define precise delivery milestones." },
              { num: "02", title: "Figma UI/UX & Design Tokens", desc: "Craft pixel-perfect wireframes and interactive prototypes in Figma with accessible type and color tokens." },
              { num: "03", title: "Rapid Engineering Sprint", desc: "Clean code development using PHP, Node.js, Tailwind, and Alpine. Bi-weekly preview deployments on staging." },
              { num: "04", title: "QA, Security & Launch", desc: "Rigorous cross-device testing, database indexing, Lighthouse speed optimization, and production deployment." }
            ],
            options: [
              { label: "Start Phase 1 Discovery", action: "contact", primary: true },
              { label: "See Past Projects", action: "projects" },
              { label: "Direct WhatsApp", action: "whatsapp" }
            ]
          };

        case 'reviews':
          return {
            type: 'reviews',
            heading: "What Clients Say",
            text: "Real feedback from institutional directors, business owners, and tech leaders:",
            testimonials: this.testimonials,
            options: [
              { label: "Let's Work Together", action: "contact", primary: true },
              { label: "View Portfolio Projects", action: "projects" },
              { label: "Chat on WhatsApp", action: "whatsapp" }
            ]
          };

        case 'whatsapp':
          return {
            type: 'whatsapp',
            heading: "Direct WhatsApp Connection",
            text: "Need a fast turnaround or quick consultation? I'm currently **online and responsive** on WhatsApp.",
            number: "+233 54 714 0375",
            waUrl: "https://wa.me/233547140375?text=Hello%20JGTECH,%20I%20would%20like%20to%20discuss%20a%20project.",
            options: [
              { label: "Open WhatsApp Chat Now ↗", link: "https://wa.me/233547140375?text=Hello%20JGTECH,%20I%20would%20like%20to%20discuss%20a%20project.", primary: true },
              { label: "Send An Email", action: "contact" },
              { label: "Explore Projects", action: "projects" }
            ]
          };

        case 'contact':
          return {
            type: 'contact',
            heading: "Get in Touch with JGTECH",
            text: "I am available for new contracts, consulting, and full-stack engineering collaborations. Reach out directly through any of these verified channels:",
            contacts: [
              { label: "Email", value: "jgtech766@gmail.com", action: "copy_email" },
              { label: "WhatsApp", value: "+233 54 714 0375", url: "https://wa.me/233547140375" },
              { label: "Instagram", value: "@jgtech200", url: "https://instagram.com/jgtech200" },
              { label: "Location", value: "Accra, Ghana (Worldwide Remote Available)" }
            ],
            options: [
              { label: "Chat on WhatsApp", link: "https://wa.me/233547140375", primary: true },
              { label: "View Case Studies", link: "case-study.html" },
              { label: "Services & Pricing", action: "services" }
            ]
          };

        case 'cv':
          return {
            type: 'cv',
            heading: "Curriculum Vitae / Resume",
            text: "Download my complete professional resume detailing 6+ years of production experience, technical competencies, and architectural leadership.",
            options: [
              { label: "Download Complete CV (PDF) ⤓", link: "assets/JGTECH-Resume.pdf", primary: true },
              { label: "Explore Skills Matrix", action: "skills" },
              { label: "Start a Conversation", action: "contact" }
            ]
          };

        case 'greeting':
          return {
            type: 'generic',
            heading: "Hello & Welcome!",
            text: "Hi there! I am **JGTECH's Interactive AI Assistant**. I can help you explore JGTECH's skills, shipped projects, services, pricing, client reviews, or connect you directly via WhatsApp.",
            options: [
              { label: "Explore Projects", action: "projects", primary: true },
              { label: "Skills & Tech Stack", action: "skills" },
              { label: "Services & Pricing", action: "services" },
              { label: "Chat on WhatsApp", action: "whatsapp" }
            ]
          };

        default:
          return {
            type: 'generic',
            heading: "I'm Here to Help!",
            text: "I can walk you through any aspect of JGTECH's engineering and design work. Try choosing a topic below or asking a specific question:",
            options: [
              { label: "About JGTECH", action: "about" },
              { label: "Technical Skills", action: "skills" },
              { label: "Selected Projects", action: "projects", primary: true },
              { label: "Pricing & Services", action: "services" },
              { label: "Direct WhatsApp", action: "whatsapp" }
            ]
          };
      }
    },

    copyEmailAddress() {
      navigator.clipboard.writeText('jgtech766@gmail.com').then(() => {
        this.copiedEmail = true;
        setTimeout(() => { this.copiedEmail = false; }, 2500);
      });
    }
  };
}
