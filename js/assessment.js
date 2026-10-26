/**
 * SkillBridge — Smart Career & Skill Navigator
 * File: js/assessment.js
 * Description: Interactive 10-question assessment engine, progressive step navigation,
 *              input validation, deterministic career scoring algorithm, and result generation.
 */

// -----------------------------------------------------------------------------
// 10 Comprehensive Assessment Questions
// -----------------------------------------------------------------------------
const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    category: 'Work Interests & Daily Tasks',
    question: 'What kind of college project or daily work activity excites you the most?',
    options: [
      {
        id: '1a',
        text: 'Analyzing datasets, uncovering hidden patterns, and building charts to explain trends.',
        weights: { 'data-analyst': 3, 'business-analyst': 1 }
      },
      {
        id: '1b',
        text: 'Writing clean code and designing interactive web pages you can test directly in a browser.',
        weights: { 'web-developer': 3, 'ui-ux-designer': 1 }
      },
      {
        id: '1c',
        text: 'Sketching mobile app layouts, picking color palettes, and researching user pain points.',
        weights: { 'ui-ux-designer': 3, 'digital-marketing-analyst': 1 }
      },
      {
        id: '1d',
        text: 'Planning online marketing campaigns, studying audience engagement, and SEO growth.',
        weights: { 'digital-marketing-analyst': 3, 'business-analyst': 1 }
      },
      {
        id: '1e',
        text: 'Interviewing stakeholders, documenting requirements, and improving organization workflows.',
        weights: { 'business-analyst': 3, 'data-analyst': 1 }
      },
      {
        id: '1f',
        text: 'Developing complex backend algorithms, database schemas, and robust software logic.',
        weights: { 'software-developer': 3, 'web-developer': 1 }
      }
    ]
  },
  {
    id: 2,
    category: 'Problem-Solving Approach',
    question: 'When handed a new, complex problem to solve, what is your first instinctive action?',
    options: [
      {
        id: '2a',
        text: 'Gather raw data numbers into a spreadsheet or SQL table to calculate statistical facts.',
        weights: { 'data-analyst': 3, 'business-analyst': 1 }
      },
      {
        id: '2b',
        text: 'Open a code editor and quickly code a minimal interactive prototype to see it live.',
        weights: { 'web-developer': 3, 'software-developer': 1 }
      },
      {
        id: '2c',
        text: 'Talk with real users to understand their confusion and sketch an intuitive layout.',
        weights: { 'ui-ux-designer': 3 }
      },
      {
        id: '2d',
        text: 'Analyze competitor marketing campaigns and study market metrics to find growth angles.',
        weights: { 'digital-marketing-analyst': 3 }
      },
      {
        id: '2e',
        text: 'Break down the business workflow, identify operational bottlenecks, and document steps.',
        weights: { 'business-analyst': 3, 'data-analyst': 1 }
      },
      {
        id: '2f',
        text: 'Structure an algorithmic diagram, define data entities, and plan error handling routines.',
        weights: { 'software-developer': 3, 'web-developer': 1 }
      }
    ]
  },
  {
    id: 3,
    category: 'Technical & Tool Preferences',
    question: 'Which tool or technology stack would you be most enthusiastic to master this year?',
    options: [
      {
        id: '3a',
        text: 'SQL databases, Python Pandas, and Power BI / Tableau dashboards.',
        weights: { 'data-analyst': 3 }
      },
      {
        id: '3b',
        text: 'HTML5, modern responsive CSS layouts, and modern JavaScript (ES6+).',
        weights: { 'web-developer': 3 }
      },
      {
        id: '3c',
        text: 'Figma for wireframing, component design systems, and clickable prototypes.',
        weights: { 'ui-ux-designer': 3 }
      },
      {
        id: '3d',
        text: 'Google Analytics 4 (GA4), Search Console, SEO tools, and social advertising managers.',
        weights: { 'digital-marketing-analyst': 3 }
      },
      {
        id: '3e',
        text: 'Business Process Model and Notation (BPMN), Jira boards, and Requirement Documents.',
        weights: { 'business-analyst': 3 }
      },
      {
        id: '3f',
        text: 'Core Java/Python/C++, Data Structures (trees, graphs), and RESTful backend APIs.',
        weights: { 'software-developer': 3 }
      }
    ]
  },
  {
    id: 4,
    category: 'Communication Style',
    question: 'How do you most effectively explain your findings or project deliverables to others?',
    options: [
      {
        id: '4a',
        text: 'Through concise charts, comparative bar graphs, and statistical trend tables.',
        weights: { 'data-analyst': 3, 'business-analyst': 1 }
      },
      {
        id: '4b',
        text: 'Through a live, responsive web demonstration where people can interact with buttons and views.',
        weights: { 'web-developer': 3, 'ui-ux-designer': 1 }
      },
      {
        id: '4c',
        text: 'Through visual Figma mockups, user persona storyboards, and interactive click-throughs.',
        weights: { 'ui-ux-designer': 3 }
      },
      {
        id: '4d',
        text: 'Through persuasive presentation decks highlighting engagement metrics, reach, and ROI.',
        weights: { 'digital-marketing-analyst': 3 }
      },
      {
        id: '4e',
        text: 'Through structured requirement matrices, clear acceptance criteria, and swimlane diagrams.',
        weights: { 'business-analyst': 3 }
      },
      {
        id: '4f',
        text: 'Through documented API contracts, system architecture diagrams, and unit test suites.',
        weights: { 'software-developer': 3 }
      }
    ]
  },
  {
    id: 5,
    category: 'Preferred Working Style',
    question: 'Which type of teamwork environment feels most fulfilling and natural to you?',
    options: [
      {
        id: '5a',
        text: 'Working independently with datasets, verifying figures, and answering investigative questions.',
        weights: { 'data-analyst': 3, 'software-developer': 1 }
      },
      {
        id: '5b',
        text: 'Collaborating closely with designers and testers to turn visual designs into responsive websites.',
        weights: { 'web-developer': 3, 'ui-ux-designer': 1 }
      },
      {
        id: '5c',
        text: 'Facilitating brainstorming sessions, observing user test interviews, and advocating for user comfort.',
        weights: { 'ui-ux-designer': 3 }
      },
      {
        id: '5d',
        text: 'Partnering with content creators, analyzing campaign performance, and rapidly testing marketing ideas.',
        weights: { 'digital-marketing-analyst': 3 }
      },
      {
        id: '5e',
        text: 'Liaising between business clients and software developers to align everyone on feature goals.',
        weights: { 'business-analyst': 3 }
      },
      {
        id: '5f',
        text: 'Pair programming on core backend systems, optimizing algorithms, and reviewing code pull requests.',
        weights: { 'software-developer': 3 }
      }
    ]
  },
  {
    id: 6,
    category: 'Quantitative & Analytical Aptitude',
    question: 'How do you prefer to handle quantitative figures, logic, and metrics?',
    options: [
      {
        id: '6a',
        text: 'I love discovering correlations and using math to prove or disprove hypotheses.',
        weights: { 'data-analyst': 3, 'business-analyst': 1 }
      },
      {
        id: '6b',
        text: 'I like math when applied to grid layout calculations, animations, and viewport coordinates.',
        weights: { 'web-developer': 3, 'software-developer': 1 }
      },
      {
        id: '6c',
        text: 'I lean heavily toward empathy, visual aesthetics, color theory, and human psychology.',
        weights: { 'ui-ux-designer': 3 }
      },
      {
        id: '6d',
        text: 'I enjoy marketing math: click-through rates (CTR), conversion costs, and return on ad spend.',
        weights: { 'digital-marketing-analyst': 3 }
      },
      {
        id: '6e',
        text: 'I enjoy cost-benefit evaluations, resource capacity planning, and project feasibility metrics.',
        weights: { 'business-analyst': 3 }
      },
      {
        id: '6f',
        text: 'I thrive on Boolean logic, Big-O algorithm efficiency, memory allocation, and recursion.',
        weights: { 'software-developer': 3 }
      }
    ]
  },
  {
    id: 7,
    category: 'Debugging & Patience',
    question: 'Which of the following troubleshooting tasks would you find LEAST frustrating?',
    options: [
      {
        id: '7a',
        text: 'Hunting down a formula error or missing records causing discrepancies in a 10,000-row dataset.',
        weights: { 'data-analyst': 3 }
      },
      {
        id: '7b',
        text: 'Adjusting CSS Flexbox or resolving a responsive mobile layout overflow error.',
        weights: { 'web-developer': 3 }
      },
      {
        id: '7c',
        text: 'Iterating through multiple wireframe layouts until test users can navigate without confusion.',
        weights: { 'ui-ux-designer': 3 }
      },
      {
        id: '7d',
        text: 'Diagnosing why a marketing email had a low open rate or why a landing page bounce rate spiked.',
        weights: { 'digital-marketing-analyst': 3 }
      },
      {
        id: '7e',
        text: 'Resolving a disagreement between a client and engineering team about scope definition.',
        weights: { 'business-analyst': 3 }
      },
      {
        id: '7f',
        text: 'Debugging a null pointer exception or infinite loop in a recursive algorithmic function.',
        weights: { 'software-developer': 3 }
      }
    ]
  },
  {
    id: 8,
    category: 'Product & System Curiosity',
    question: 'When you download or browse a brand-new web application, what catches your attention first?',
    options: [
      {
        id: '8a',
        text: 'The reporting dashboards, metrics displayed, and whether the numbers look credible.',
        weights: { 'data-analyst': 3 }
      },
      {
        id: '8b',
        text: 'How fast the pages render, the smooth interactive micro-transitions, and responsive styling.',
        weights: { 'web-developer': 3 }
      },
      {
        id: '8c',
        text: 'The visual elegance: font pairings, whitespace margins, icon clarity, and user ease.',
        weights: { 'ui-ux-designer': 3 }
      },
      {
        id: '8d',
        text: 'The value proposition headlines, call-to-action buttons, and promotional referral loops.',
        weights: { 'digital-marketing-analyst': 3 }
      },
      {
        id: '8e',
        text: 'The underlying business model, pricing plans, and how efficiently user workflows are structured.',
        weights: { 'business-analyst': 3 }
      },
      {
        id: '8f',
        text: 'The backend stability, API response speed, and security measures like authentication tokens.',
        weights: { 'software-developer': 3 }
      }
    ]
  },
  {
    id: 9,
    category: 'College Capstone Aspiration',
    question: 'If you had to pick one dream BCA final year mini-project, which one sounds most exciting?',
    options: [
      {
        id: '9a',
        text: 'A Covid-19 or Healthcare Analytics Portal with predictive trend forecasting and charts.',
        weights: { 'data-analyst': 3 }
      },
      {
        id: '9b',
        text: 'A responsive College Event Management Web Platform with interactive registration forms.',
        weights: { 'web-developer': 3 }
      },
      {
        id: '9c',
        text: 'A comprehensive UX research study and Figma redesign of a messy university student app.',
        weights: { 'ui-ux-designer': 3 }
      },
      {
        id: '9d',
        text: 'An end-to-end digital growth campaign and SEO strategy case study for a student e-commerce store.',
        weights: { 'digital-marketing-analyst': 3 }
      },
      {
        id: '9e',
        text: 'A complete Business Requirements & Process Automation blueprint for a campus canteen.',
        weights: { 'business-analyst': 3 }
      },
      {
        id: '9f',
        text: 'A multi-threaded software management system with SQL database normalization and test suites.',
        weights: { 'software-developer': 3 }
      }
    ]
  },
  {
    id: 10,
    category: 'Ultimate Career Motivation',
    question: 'What kind of professional accomplishment would bring you the greatest pride in 3 years?',
    options: [
      {
        id: '10a',
        text: 'Delivering data insights that directly helped an organization double efficiency or prevent losses.',
        weights: { 'data-analyst': 3, 'business-analyst': 1 }
      },
      {
        id: '10b',
        text: 'Building accessible, fast websites used by thousands of active users worldwide every day.',
        weights: { 'web-developer': 3 }
      },
      {
        id: '10c',
        text: 'Designing a digital app interface so intuitive that even elderly users find it effortless.',
        weights: { 'ui-ux-designer': 3 }
      },
      {
        id: '10d',
        text: 'Executing growth campaigns that propelled an early-stage startup into a recognizable brand.',
        weights: { 'digital-marketing-analyst': 3 }
      },
      {
        id: '10e',
        text: 'Serving as the strategic voice that successfully steered a multi-million-dollar software release.',
        weights: { 'business-analyst': 3 }
      },
      {
        id: '10f',
        text: 'Architecting high-performance software code and solving deep computer science algorithmic challenges.',
        weights: { 'software-developer': 3 }
      }
    ]
  }
];

// -----------------------------------------------------------------------------
// Assessment State Management
// -----------------------------------------------------------------------------
let currentQuestionIndex = 0;
// answers map: questionIndex -> selected optionId
const userAnswers = {};

// -----------------------------------------------------------------------------
// DOM Elements Cache
// -----------------------------------------------------------------------------
let questionCategoryEl;
let questionNumberEl;
let questionTextEl;
let optionsListEl;
let progressBarEl;
let prevBtnEl;
let nextBtnEl;
let submitBtnEl;
let validationAlertEl;

// -----------------------------------------------------------------------------
// Initialization
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  questionCategoryEl = document.getElementById('questionCategory');
  questionNumberEl = document.getElementById('questionNumber');
  questionTextEl = document.getElementById('questionText');
  optionsListEl = document.getElementById('optionsList');
  progressBarEl = document.getElementById('progressBar');
  prevBtnEl = document.getElementById('prevBtn');
  nextBtnEl = document.getElementById('nextBtn');
  submitBtnEl = document.getElementById('submitBtn');
  validationAlertEl = document.getElementById('validationAlert');

  if (prevBtnEl) prevBtnEl.addEventListener('click', handlePrevious);
  if (nextBtnEl) nextBtnEl.addEventListener('click', handleNext);
  if (submitBtnEl) submitBtnEl.addEventListener('click', handleSubmit);

  renderQuestion(currentQuestionIndex);
});

// -----------------------------------------------------------------------------
// Render Question
// -----------------------------------------------------------------------------
function renderQuestion(index) {
  const q = ASSESSMENT_QUESTIONS[index];
  if (!q) return;

  // Clear validation alert
  if (validationAlertEl) {
    validationAlertEl.style.display = 'none';
  }

  // Update header and labels
  if (questionCategoryEl) questionCategoryEl.textContent = q.category;
  if (questionNumberEl) questionNumberEl.textContent = `Question ${index + 1} of ${ASSESSMENT_QUESTIONS.length}`;
  if (questionTextEl) questionTextEl.textContent = q.question;

  // Update progress bar
  const progressPercent = Math.round(((index + 1) / ASSESSMENT_QUESTIONS.length) * 100);
  if (progressBarEl) {
    progressBarEl.style.width = `${progressPercent}%`;
  }

  // Render options
  if (optionsListEl) {
    optionsListEl.innerHTML = '';

    q.options.forEach((opt) => {
      const isSelected = userAnswers[index] === opt.id;
      const optionCard = document.createElement('label');
      optionCard.className = `option-item ${isSelected ? 'selected' : ''}`;
      optionCard.htmlFor = `opt_${opt.id}`;

      optionCard.innerHTML = `
        <input 
          type="radio" 
          name="question_${index}" 
          id="opt_${opt.id}" 
          value="${opt.id}" 
          class="option-radio"
          ${isSelected ? 'checked' : ''}
        />
        <div class="option-content">
          <div class="option-title">${opt.text}</div>
        </div>
      `;

      // Click listener for option selection
      optionCard.addEventListener('click', function() {
        userAnswers[index] = opt.id;
        // Update visual selection
        document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
        optionCard.classList.add('selected');
        const radio = optionCard.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        if (validationAlertEl) validationAlertEl.style.display = 'none';
      });

      optionsListEl.appendChild(optionCard);
    });
  }

  // Manage Nav Button states
  if (prevBtnEl) {
    prevBtnEl.disabled = (index === 0);
  }

  const isLast = (index === ASSESSMENT_QUESTIONS.length - 1);
  if (nextBtnEl) {
    nextBtnEl.style.display = isLast ? 'none' : 'inline-flex';
  }
  if (submitBtnEl) {
    submitBtnEl.style.display = isLast ? 'inline-flex' : 'none';
  }

  // Scroll smoothly to question top
  window.scrollTo({ top: 100, behavior: 'smooth' });
}

// -----------------------------------------------------------------------------
// Navigation Handlers
// -----------------------------------------------------------------------------
function handlePrevious() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion(currentQuestionIndex);
  }
}

function handleNext() {
  // Validate that current question has an answer
  if (!userAnswers[currentQuestionIndex]) {
    showValidationError('Please select an option before moving to the next question.');
    return;
  }

  if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex);
  }
}

function handleSubmit() {
  // Validate all questions
  for (let i = 0; i < ASSESSMENT_QUESTIONS.length; i++) {
    if (!userAnswers[i]) {
      currentQuestionIndex = i;
      renderQuestion(currentQuestionIndex);
      showValidationError(`Please answer question ${i + 1} before submitting.`);
      return;
    }
  }

  // Calculate results
  const results = calculateCareerRecommendations();
  
  // Save to localStorage
  Storage.saveResults(results);

  // Navigate to results page
  window.location.href = 'results.html';
}

function showValidationError(message) {
  if (validationAlertEl) {
    validationAlertEl.textContent = message;
    validationAlertEl.style.display = 'block';
  } else {
    alert(message);
  }
}

// -----------------------------------------------------------------------------
// Scoring & Recommendation Algorithm
// -----------------------------------------------------------------------------
function calculateCareerRecommendations() {
  // Initialize scores map for all registered careers
  const scores = {};
  CAREERS_DATA.forEach(career => {
    scores[career.id] = 0;
  });

  // Track rationale key phrases based on answers
  const rationales = {
    'data-analyst': [],
    'web-developer': [],
    'ui-ux-designer': [],
    'digital-marketing-analyst': [],
    'business-analyst': [],
    'software-developer': []
  };

  // Tally points based on selected options
  ASSESSMENT_QUESTIONS.forEach((q, qIndex) => {
    const selectedOptId = userAnswers[qIndex];
    const selectedOption = q.options.find(o => o.id === selectedOptId);
    if (!selectedOption) return;

    for (const [careerId, weight] of Object.entries(selectedOption.weights)) {
      if (scores[careerId] !== undefined) {
        scores[careerId] += weight;

        // Collect rationales for primary weights (>= 3)
        if (weight >= 3) {
          if (q.id === 1) rationales[careerId].push('strong interest in primary domain activities');
          if (q.id === 2) rationales[careerId].push('natural instinctive problem-solving approach');
          if (q.id === 3) rationales[careerId].push('enthusiasm for industry-standard toolsets');
          if (q.id === 6) rationales[careerId].push('comfort with domain quantitative & logic requirements');
          if (q.id === 10) rationales[careerId].push('aligned long-term career aspirations');
        }
      }
    }
  });

  // Maximum potential points achievable in theoretical perfect alignment ~ 27-30
  const maxPossibleScore = 30;

  // Transform scores to structured results array
  const scoredCareers = CAREERS_DATA.map(career => {
    const rawScore = scores[career.id] || 0;
    
    // Normalize percentage between 42% and 96%
    // Formula: baseline 40% + (score / maxPossible) * 55%
    let percentage = Math.round(40 + (rawScore / maxPossibleScore) * 55);
    percentage = Math.min(96, Math.max(42, percentage));

    // Construct sensible rationale summary
    const domainRationales = rationales[career.id];
    let rationaleText = '';
    if (domainRationales.length >= 2) {
      rationaleText = `Recommended because of your ${domainRationales.slice(0, 3).join(', ')}.`;
    } else if (domainRationales.length === 1) {
      rationaleText = `Recommended based on your ${domainRationales[0]} and related assessment preferences.`;
    } else {
      rationaleText = `Shows moderate alignment with your technical interests and secondary preferences.`;
    }

    return {
      careerId: career.id,
      title: career.title,
      category: career.category,
      shortDesc: career.shortDesc,
      rawScore: rawScore,
      matchPercentage: percentage,
      requiredSkills: career.requiredSkills,
      skillsToImprove: career.skillsToImprove,
      rationale: rationaleText
    };
  });

  // Sort descending by rawScore. Tie-break using match percentage and alphabetical title
  scoredCareers.sort((a, b) => {
    if (b.rawScore !== a.rawScore) {
      return b.rawScore - a.rawScore;
    }
    return a.title.localeCompare(b.title);
  });

  return scoredCareers;
}
