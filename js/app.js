/**
 * SkillBridge — Smart Career & Skill Navigator
 * File: js/app.js
 * Description: Shared career repository, persistent localStorage helpers,
 *              and common UI interactions (navigation, mobile menu).
 */

// -----------------------------------------------------------------------------
// Career Profiles Data Catalog
// -----------------------------------------------------------------------------
const CAREERS_DATA = [
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    categorySlug: 'data',
    shortDesc: 'Extracts, cleans, and analyzes structured datasets to identify commercial trends and create visual dashboards for decision-making.',
    fullDesc: 'Data Analysts bridge the gap between numbers and strategy. They collect data from databases, clean anomalies, compute statistical aggregates, and build business intelligence dashboards using tools like SQL, Excel, and Power BI / Tableau.',
    requiredSkills: [
      'SQL & Database Queries',
      'Data Visualization (Power BI / Tableau)',
      'Python / R for Analytics',
      'Advanced Excel & Pivot Tables',
      'Descriptive Statistics',
      'Critical Problem Solving'
    ],
    skillsToImprove: [
      'Advanced SQL Window Functions',
      'Statistical Hypothesis Testing',
      'Executive Dashboard Storytelling'
    ],
    averageSalaryNote: 'Entry Level: ₹3.5L – ₹6.0L PA (India avg.) / $65,000 (US)',
    roadmap: {
      beginner: [
        { id: 'da_b1', title: 'Master Advanced Excel & Google Sheets', desc: 'Formulas (VLOOKUP, XLOOKUP, INDEX/MATCH), nested logic, and pivot tables.' },
        { id: 'da_b2', title: 'Relational Database & SQL Basics', desc: 'SELECT, WHERE, GROUP BY, HAVING, and INNER/LEFT JOIN statements.' },
        { id: 'da_b3', title: 'Introductory Applied Statistics', desc: 'Mean, median, mode, standard deviation, variance, and distributions.' }
      ],
      intermediate: [
        { id: 'da_i1', title: 'Data Wrangling with Python (Pandas & NumPy)', desc: 'Handling missing values, data type casting, and filtering real-world CSV/JSON.' },
        { id: 'da_i2', title: 'Interactive BI Dashboards (Power BI / Tableau)', desc: 'Connecting data sources, DAX calculations, KPI cards, and drill-down filters.' },
        { id: 'da_i3', title: 'Exploratory Data Analysis (EDA)', desc: 'Detecting outliers, correlation matrices, and visual storytelling.' }
      ],
      projects: [
        {
          title: 'Retail Sales & Revenue Dashboard',
          desc: 'Build an interactive dashboard analyzing monthly revenue, top-selling categories, and customer churn metrics using Power BI or Tableau.',
          skills: ['Power BI', 'SQL', 'Data Modeling']
        },
        {
          title: 'Student Academic Performance EDA',
          desc: 'Analyze university student test records to discover factors affecting semester grades using Python, Pandas, and Matplotlib/Seaborn.',
          skills: ['Python', 'Pandas', 'Data Cleaning']
        }
      ],
      readinessChecklist: [
        { id: 'da_c1', title: 'Can write complex multi-table SQL JOINs and aggregated queries.' },
        { id: 'da_c2', title: 'Can detect anomalies, missing rows, and clean dirty data.' },
        { id: 'da_c3', title: 'Can design an executive dashboard answering key business questions.' },
        { id: 'da_c4', title: 'Prepared 2 portfolio case studies with GitHub / dashboard links.' }
      ]
    }
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    category: 'Development & Engineering',
    categorySlug: 'engineering',
    shortDesc: 'Builds responsive, accessible, interactive web pages and web applications for modern browsers on desktop and mobile devices.',
    fullDesc: 'Web Developers specialize in creating user-facing web applications. They master HTML5 for semantic structure, modern CSS3 for responsive fluid layouts, and JavaScript to bring pages to life with client-side logic, API integrations, and smooth user interactions.',
    requiredSkills: [
      'Semantic HTML5 & DOM API',
      'Modern CSS3 (Flexbox & Grid)',
      'JavaScript (ES6+, Async/Await)',
      'Responsive & Mobile-First Design',
      'Git Version Control & GitHub',
      'Browser Developer Tools & Debugging'
    ],
    skillsToImprove: [
      'Web Performance & Core Web Vitals',
      'Asynchronous REST API Integration',
      'Accessibility Standards (WCAG 2.1)'
    ],
    averageSalaryNote: 'Entry Level: ₹3.0L – ₹6.5L PA (India avg.) / $70,000 (US)',
    roadmap: {
      beginner: [
        { id: 'wd_b1', title: 'Semantic HTML5 & Web Structure', desc: 'Understanding tags, forms, tables, media elements, and accessible attributes.' },
        { id: 'wd_b2', title: 'Modern CSS3 Layouts (Flexbox & Grid)', desc: 'Box model, CSS variables, media queries for mobile responsiveness.' },
        { id: 'wd_b3', title: 'JavaScript Fundamentals', desc: 'Variables, loops, functions, array methods, and basic DOM manipulation.' }
      ],
      intermediate: [
        { id: 'wd_i1', title: 'Asynchronous JavaScript & Fetch API', desc: 'Promises, Async/Await, consuming REST APIs, and error handling.' },
        { id: 'wd_i2', title: 'Version Control with Git & GitHub', desc: 'Branches, pull requests, resolving merge conflicts, and static deployment.' },
        { id: 'wd_i3', title: 'State Management & Web Storage', desc: 'Using localStorage, sessionStorage, and structured JavaScript state.' }
      ],
      projects: [
        {
          title: 'Interactive Student Task & Habit Tracker',
          desc: 'Create a responsive web app with task categorization, local storage persistence, filtering, and progress tracking.',
          skills: ['JavaScript ES6', 'CSS Grid', 'localStorage']
        },
        {
          title: 'Live Weather & Forecast Web Portal',
          desc: 'Build an app that queries public weather REST APIs, displays dynamic forecasts with icons, and handles network states.',
          skills: ['Fetch API', 'Async/Await', 'JSON Handling']
        }
      ],
      readinessChecklist: [
        { id: 'wd_c1', title: 'Can build pixel-perfect mobile-responsive layouts without breaking on small screens.' },
        { id: 'wd_c2', title: 'Can consume third-party JSON REST APIs and render dynamic DOM elements.' },
        { id: 'wd_c3', title: 'Comfortable with Git branch workflows and deploying to GitHub Pages or Netlify.' },
        { id: 'wd_c4', title: 'Completed at least 3 distinct frontend projects hosted online.' }
      ]
    }
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design & Creative',
    categorySlug: 'design',
    shortDesc: 'Researches user needs, crafts intuitive wireframes, and designs appealing, user-friendly digital product interfaces.',
    fullDesc: 'UI/UX Designers ensure that digital systems are easy, pleasant, and intuitive to use. They conduct user interviews, map customer journeys, define color and typography hierarchies, and create clickable high-fidelity prototypes using tools like Figma.',
    requiredSkills: [
      'Figma & UI Wireframing',
      'User Research & Empathy Mapping',
      'Visual Hierarchy & Typography',
      'Information Architecture & Flow',
      'Usability Testing & Heuristics',
      'Interactive Prototyping'
    ],
    skillsToImprove: [
      'Design System Components & Auto-layout',
      'Micro-interactions & Motion Principles',
      'Usability Heuristic Evaluations'
    ],
    averageSalaryNote: 'Entry Level: ₹3.5L – ₹6.0L PA (India avg.) / $68,000 (US)',
    roadmap: {
      beginner: [
        { id: 'ux_b1', title: 'Principles of Visual UI Design', desc: 'Contrast, whitespace, alignment, typographic scale, and color harmony.' },
        { id: 'ux_b2', title: 'Mastering Figma Basics', desc: 'Frames, shapes, pen tool, auto-layout, styles, and reusable components.' },
        { id: 'ux_b3', title: 'User Experience Research Essentials', desc: 'User personas, problem statements, and qualitative user interviews.' }
      ],
      intermediate: [
        { id: 'ux_i1', title: 'Information Architecture & Wireframing', desc: 'Low-fidelity wireframes, site maps, and user journey flowcharts.' },
        { id: 'ux_i2', title: 'Interactive High-Fidelity Prototyping', desc: 'Smart animate, transitions, mobile modal sheets, and click flows.' },
        { id: 'ux_i3', title: 'Design Systems & Component Libraries', desc: 'Variants, tokens, button states, and developer handoff documentation.' }
      ],
      projects: [
        {
          title: 'Campus Food Delivery & Mess Booking App',
          desc: 'Conduct interviews with 5 college students, create wireframes, and build a high-fidelity Figma prototype with order tracking.',
          skills: ['User Interviews', 'Figma Wireframing', 'Prototyping']
        },
        {
          title: 'College Portal Redesign Case Study',
          desc: 'Audit the existing university portal for usability flaws and redesign the course registration experience with before/after comparisons.',
          skills: ['Heuristic Evaluation', 'Design System', 'Case Study']
        }
      ],
      readinessChecklist: [
        { id: 'ux_c1', title: 'Can design clean responsive UI screens following 8pt grid systems.' },
        { id: 'ux_c2', title: 'Knows how to structure an end-to-end interactive clickable Figma prototype.' },
        { id: 'ux_c3', title: 'Understands WCAG color contrast requirements for accessible UI.' },
        { id: 'ux_c4', title: 'Published a Behance or Notion portfolio case study explaining design decisions.' }
      ]
    }
  },
  {
    id: 'digital-marketing-analyst',
    title: 'Digital Marketing Analyst',
    category: 'Marketing & Growth',
    categorySlug: 'marketing',
    shortDesc: 'Plans and evaluates online campaigns, optimizes search engine visibility, and leverages analytics to drive audience acquisition.',
    fullDesc: 'Digital Marketing Analysts study online visitor behavior and performance across social media, search engines, and paid advertising. They evaluate conversion funnels, execute Search Engine Optimization (SEO), and optimize advertising expenditure.',
    requiredSkills: [
      'Search Engine Optimization (SEO)',
      'Google Analytics 4 (GA4)',
      'Conversion Rate Optimization (CRO)',
      'Content Marketing Strategy',
      'Social Media Ads & Campaign Metrics',
      'Email Marketing & A/B Testing'
    ],
    skillsToImprove: [
      'Campaign Attribution Modeling',
      'Google Tag Manager (GTM) Setup',
      'ROI & Customer Acquisition Cost (CAC) Modeling'
    ],
    averageSalaryNote: 'Entry Level: ₹3.0L – ₹5.5L PA (India avg.) / $58,000 (US)',
    roadmap: {
      beginner: [
        { id: 'dm_b1', title: 'Digital Marketing Fundamentals', desc: 'Inbound vs outbound, marketing funnels (AIDA), and audience segmentation.' },
        { id: 'dm_b2', title: 'On-Page & Technical SEO Basics', desc: 'Keywords, title tags, meta descriptions, site speed, and robots.txt.' },
        { id: 'dm_b3', title: 'Content & Social Media Strategy', desc: 'Copywriting principles, engagement metrics, and editorial calendar management.' }
      ],
      intermediate: [
        { id: 'dm_i1', title: 'Web Analytics with GA4 & UTM Tags', desc: 'Event tracking, user acquisition channels, bounce rates, and session analysis.' },
        { id: 'dm_i2', title: 'Paid Search & Social Advertising', desc: 'Google Search Ads, Meta Business Suite, CPC/CTR bidding, and targeting.' },
        { id: 'dm_i3', title: 'A/B Testing & Funnel Optimization', desc: 'Landing page conversion testing, email subject tests, and heatmaps.' }
      ],
      projects: [
        {
          title: 'Local Business Website SEO Audit',
          desc: 'Conduct a thorough audit of a real local business website covering keywords, backlinks, and meta tags, and provide a recommendations deck.',
          skills: ['SEO Audit', 'Keyword Research', 'Google Search Console']
        },
        {
          title: 'College Fest Digital Promotion Campaign',
          desc: 'Design and execute a multi-channel digital campaign for a college cultural or tech fest, analyzing reach and registration conversion rates.',
          skills: ['Campaign Strategy', 'GA4 Tracking', 'Social Analytics']
        }
      ],
      readinessChecklist: [
        { id: 'dm_c1', title: 'Can interpret GA4 acquisition and engagement metrics to diagnose drop-offs.' },
        { id: 'dm_c2', title: 'Understands keyword research using free tools and Google Trends.' },
        { id: 'dm_c3', title: 'Can calculate marketing ROI, CAC (Customer Acquisition Cost), and CTR.' },
        { id: 'dm_c4', title: 'Created a sample campaign report presentation with data-backed recommendations.' }
      ]
    }
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    category: 'Business & Strategy',
    categorySlug: 'business',
    shortDesc: 'Analyzes organizational operations, gathers business requirements, and translates stakeholder needs into functional IT specifications.',
    fullDesc: 'Business Analysts act as vital translators between non-technical business clients and software development teams. They document software requirements (BRD/FRD), map current vs. future process workflows using BPMN, and facilitate Agile sprint planning.',
    requiredSkills: [
      'Requirements Elicitation & Documentation',
      'Business Process Modeling (BPMN / UML)',
      'Agile & Scrum Methodology',
      'Stakeholder Interviewing',
      'Gap Analysis & Feasibility Studies',
      'User Stories & Acceptance Criteria'
    ],
    skillsToImprove: [
      'Use Case Specification Writing',
      'Data-driven Financial Impact Estimation',
      'Jira Backlog Management & Grooming'
    ],
    averageSalaryNote: 'Entry Level: ₹4.0L – ₹7.0L PA (India avg.) / $72,000 (US)',
    roadmap: {
      beginner: [
        { id: 'ba_b1', title: 'Software Development Life Cycles (SDLC)', desc: 'Waterfall vs Agile Scrum, sprint cycles, ceremonies, and team roles.' },
        { id: 'ba_b2', title: 'Requirement Gathering Techniques', desc: 'Interviews, surveys, workshops, document analysis, and observation.' },
        { id: 'ba_b3', title: 'Writing Clear User Stories', desc: 'INVEST criteria, writing acceptance criteria using Gherkin (Given/When/Then).' }
      ],
      intermediate: [
        { id: 'ba_i1', title: 'Process Flow & Workflow Modeling', desc: 'Drafting BPMN diagrams, Swimlane diagrams, and UML Activity flows in diagrams.net.' },
        { id: 'ba_i2', title: 'Documentation (BRD & FRD Templates)', desc: 'Business Requirements Documents, functional specifications, and traceability.' },
        { id: 'ba_i3', title: 'Agile Project Tracking in Jira', desc: 'Epics, sprint backlogs, story pointing, velocity charts, and burndown curves.' }
      ],
      projects: [
        {
          title: 'College Library System Business Requirement Document (BRD)',
          desc: 'Produce a comprehensive 10-page BRD including stakeholder personas, As-Is vs To-Be process flows, and 15 prioritized user stories.',
          skills: ['BRD Documentation', 'BPMN Diagrams', 'User Stories']
        },
        {
          title: 'E-Commerce Return Process Gap Analysis',
          desc: 'Analyze a retail return and refund process, identify friction bottlenecks, and present a proposed technical solution roadmap.',
          skills: ['Gap Analysis', 'Process Mapping', 'Feasibility Study']
        }
      ],
      readinessChecklist: [
        { id: 'ba_c1', title: 'Can facilitate a requirement elicitation session with simulated clients.' },
        { id: 'ba_c2', title: 'Can draw clean BPMN and Swimlane flowcharts without syntactic errors.' },
        { id: 'ba_c3', title: 'Familiar with drafting Acceptance Criteria and Definition of Done.' },
        { id: 'ba_c4', title: 'Completed a full SRS/BRD project artifact ready to showcase in interviews.' }
      ]
    }
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    category: 'Development & Engineering',
    categorySlug: 'engineering',
    shortDesc: 'Designs algorithms, builds backend logic, implements data structures, and develops stable application architectures.',
    fullDesc: 'Software Developers engineer the core logic, databases, and APIs powering technology platforms. They focus on algorithm efficiency, object-oriented or functional software architecture, database management, and robust code verification through automated tests.',
    requiredSkills: [
      'OOP Language (Java / Python / C++)',
      'Data Structures & Algorithms (DSA)',
      'Relational Database Modeling & SQL',
      'REST API Design & Backend Routing',
      'Git Version Control & CLI',
      'Unit Testing & Debugging'
    ],
    skillsToImprove: [
      'Time & Space Complexity (Big-O Optimization)',
      'Database Normalization (1NF to 3NF)',
      'API Security & Error Handling Best Practices'
    ],
    averageSalaryNote: 'Entry Level: ₹3.5L – ₹7.5L PA (India avg.) / $75,000 (US)',
    roadmap: {
      beginner: [
        { id: 'sd_b1', title: 'Core Programming Mastery (Python/Java/C++)', desc: 'Data types, loops, functions, OOP classes, inheritance, and encapsulation.' },
        { id: 'sd_b2', title: 'Fundamental Data Structures', desc: 'Arrays, strings, stacks, queues, linked lists, and basic search/sort algorithms.' },
        { id: 'sd_b3', title: 'Relational Database Schema Design', desc: 'Tables, primary/foreign keys, entity relationships, and SQL CRUD queries.' }
      ],
      intermediate: [
        { id: 'sd_i1', title: 'Intermediate Algorithms & Big-O', desc: 'Recursion, binary trees, hash tables, and algorithm efficiency analysis.' },
        { id: 'sd_i2', title: 'RESTful API Engineering', desc: 'HTTP methods, JSON serialization, status codes, and server-side routing.' },
        { id: 'sd_i3', title: 'Unit Testing & Software Quality', desc: 'Writing test cases, assertions, mocking, and defensive error handling.' }
      ],
      projects: [
        {
          title: 'Student Course Enrollment Backend Engine',
          desc: 'Build a modular program managing course registrations, prerequisite validation, seat limits, and persistence to an SQL database or file.',
          skills: ['Java / Python', 'OOP Principles', 'SQL / File I/O']
        },
        {
          title: 'RESTful Expense & Budget Manager Service',
          desc: 'Develop a backend API service with endpoints to create, filter, categorize, and report student monthly expenses.',
          skills: ['REST APIs', 'CRUD Operations', 'Testing']
        }
      ],
      readinessChecklist: [
        { id: 'sd_c1', title: 'Can implement core data structures and explain their Big-O complexities.' },
        { id: 'sd_c2', title: 'Can design a normalized relational database schema with referential integrity.' },
        { id: 'sd_c3', title: 'Can write unit tests verifying edge cases and exception handling.' },
        { id: 'sd_c4', title: 'Maintains an active GitHub account with well-documented code repositories.' }
      ]
    }
  }
];

// -----------------------------------------------------------------------------
// Storage Keys Constants
// -----------------------------------------------------------------------------
const STORAGE_KEYS = {
  ASSESSMENT_RESULTS: 'skillbridge_assessment_results',
  SELECTED_CAREER: 'skillbridge_selected_career',
  ROADMAP_CHECKLIST: 'skillbridge_roadmap_checklist',
  LAST_ASSESSMENT_DATE: 'skillbridge_last_date'
};

// -----------------------------------------------------------------------------
// Storage Helper Functions
// -----------------------------------------------------------------------------
const Storage = {
  getResults: function() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_RESULTS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading assessment results from localStorage', e);
      return null;
    }
  },

  saveResults: function(results) {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENT_RESULTS, JSON.stringify(results));
      localStorage.setItem(STORAGE_KEYS.LAST_ASSESSMENT_DATE, new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }));
      // Set top career as default active career if not already set
      if (results && results.length > 0) {
        localStorage.setItem(STORAGE_KEYS.SELECTED_CAREER, results[0].careerId);
      }
      return true;
    } catch (e) {
      console.error('Error saving assessment results to localStorage', e);
      return false;
    }
  },

  getSelectedCareer: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_CAREER);
      if (stored) return stored;
      const results = this.getResults();
      if (results && results.length > 0) {
        return results[0].careerId;
      }
      return 'web-developer'; // Safe default
    } catch (e) {
      return 'web-developer';
    }
  },

  setSelectedCareer: function(careerId) {
    try {
      localStorage.setItem(STORAGE_KEYS.SELECTED_CAREER, careerId);
    } catch (e) {
      console.error('Error setting selected career', e);
    }
  },

  getChecklistState: function() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROADMAP_CHECKLIST);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  toggleChecklistItem: function(itemId) {
    try {
      const state = this.getChecklistState();
      state[itemId] = !state[itemId];
      localStorage.setItem(STORAGE_KEYS.ROADMAP_CHECKLIST, JSON.stringify(state));
      return state[itemId];
    } catch (e) {
      console.error('Error toggling checklist item', e);
      return false;
    }
  },

  resetAllProgress: function() {
    try {
      localStorage.removeItem(STORAGE_KEYS.ASSESSMENT_RESULTS);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_CAREER);
      localStorage.removeItem(STORAGE_KEYS.ROADMAP_CHECKLIST);
      localStorage.removeItem(STORAGE_KEYS.LAST_ASSESSMENT_DATE);
      return true;
    } catch (e) {
      console.error('Error clearing progress', e);
      return false;
    }
  }
};

// -----------------------------------------------------------------------------
// Career Lookup Helper
// -----------------------------------------------------------------------------
function getCareerById(careerId) {
  return CAREERS_DATA.find(c => c.id === careerId) || null;
}

// -----------------------------------------------------------------------------
// Navigation & Mobile Menu Setup
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // Highlight active link based on current path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
