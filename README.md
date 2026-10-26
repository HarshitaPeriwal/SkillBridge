# SkillBridge — Smart Career & Skill Navigator
**Bachelor of Computer Applications (BCA) Mini-Project**

---

## 1. Project Title
**SkillBridge — Smart Career & Skill Navigator**

---

## 2. Abstract
Undergraduate computer science and BCA students frequently struggle to identify suitable career paths amidst a rapidly evolving technology ecosystem. Traditional career guidance is often generic, expensive, or overly complex. **SkillBridge** is a lightweight, responsive, client-side web application designed to help college students discover suitable technology career options tailored to their technical interests, problem-solving preferences, and working styles. SkillBridge assesses responses through an interactive 10-question evaluation, algorithmically computes career match scores, highlights skill gaps, and presents structured learning roadmaps with persistent checklist tracking using browser `localStorage`.

---

## 3. Problem Statement
Many BCA and engineering freshmen and sophomores lack clarity regarding which technology specialization aligns with their natural aptitudes. Common issues include:
1. **Information Overload:** Students struggle to navigate fragmented online career resources.
2. **Lack of Structured Milestones:** Students know what job titles exist, but do not know the step-by-step competencies required (beginner vs. intermediate vs. practice projects).
3. **No Self-Assessment Tracking:** Students lack a simple, free tool to record and review their progress toward career readiness.

SkillBridge addresses these issues through a zero-dependency, local web application that guides students without requiring accounts, subscriptions, or complex setup.

---

## 4. Objectives
- **Assess Interests:** Provide an engaging, interactive 10-question evaluation covering daily work habits, analytical preferences, debugging patience, and tool affinities.
- **Recommend Career Roles:** Algorithmically score and rank 6 primary technology career paths:
  1. Data Analyst
  2. Web Developer
  3. UI/UX Designer
  4. Digital Marketing Analyst
  5. Business Analyst
  6. Software Developer
- **Identify Skill Deficits:** Clearly outline mandatory foundational skills and specific areas where students can improve.
- **Provide Actionable Roadmaps:** Supply 4-phase learning roadmaps with practical capstone project ideas and an entry-level readiness checklist.
- **Enable Local Progress Tracking:** Store assessment results and completed milestone checkboxes persistently in `localStorage`.

---

## 5. Technologies Used
- **HTML5:** Semantic document structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS3:** Custom responsive layout engine using Flexbox, CSS Grid, CSS Custom Properties (Variables), modern card aesthetics, and media queries.
- **Vanilla JavaScript (ES6+):** Modular DOM manipulation, deterministic scoring algorithm, event listeners, dynamic filtering, and client-side routing.
- **Web Storage API (`localStorage`):** Persistent client-side data persistence for assessment scores, active career track, and milestone checklist statuses across browser sessions.

*Zero external paid APIs, external database engines, or heavy framework runtimes are needed.*

---

## 6. Proposed Modules
1. **Home / Landing Module (`index.html`, `js/app.js`):**
   - Brand overview, hero call-to-action, 3-step explanation, and sample category exploration.
2. **Assessment Engine Module (`assessment.html`, `js/assessment.js`):**
   - Single-question pagination, progress bar, radio button selection, validation guard, and weighted scoring computation.
3. **Results & Recommendation Module (`results.html`, `js/results.js`):**
   - Displays top 3 recommendations ranked by match percentage, specific rationales, skills to improve, and curriculum links.
4. **Career Exploration Module (`careers.html`, `js/careers.js`):**
   - Search bar filtering, category tab filtering, career card previews, and modal details view.
5. **Interactive Learning Roadmap Module (`roadmap.html`, `js/roadmap.js`):**
   - 4-phase structured pathway (Beginner, Intermediate, Practice Projects, Readiness Checklist) with interactive checkboxes and real-time completion percentage.
6. **Student Progress Dashboard Module (`progress.html`, `js/progress.js`):**
   - Comprehensive summary of latest assessment, active career track, completed milestones, and confirmed progress reset.

---

## 7. Main Features
- **Responsive Design:** Operates cleanly on mobile smartphones, tablets, laptops, and desktop screens.
- **Interactive Multi-Step Assessment:** One question at a time with instant visual feedback and back/forward navigation.
- **Validation Guard:** Prevents advancing without an answer to guarantee data integrity.
- **Deterministic Recommendation Algorithm:** Objective weighted scoring model that handles tie-breaks transparently.
- **Live Search & Category Filtering:** Instant client-side search across career titles, descriptions, and skill tags.
- **State Persistence:** Assessment history and checked milestone items persist across browser page reloads.
- **Indicative Guidance Disclaimer:** Clearly indicates that recommendations are guidance-oriented rather than psychometric tests.

---

## 8. Instructions to Run the Website

### Option A: Local Browser Direct Execution (Zero Install)
1. Clone or download the project files.
2. Open `index.html` directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. The website runs 100% locally with all features active.

### Option B: Local Web Server (Vite / Node / Live Server)
1. In the project directory, run:
   ```bash
   npm install
   npm run dev
   ```
2. Open `http://localhost:3000` (or the URL output in your terminal).

---

## 9. Limitations and Future Enhancements
### Limitations:
- Data is stored in client browser `localStorage`; clearing browser cookies/cache resets saved progress.
- Does not connect to cloud databases or multi-device account synchronization.
- Recommendations are indicative guidelines based on a 10-question model.

### Future Enhancements:
- Cloud synchronization with user login authentication (e.g. Firebase or PostgreSQL).
- Downloadable PDF resume/readiness scorecard.
- Integration with live job market APIs (e.g. GitHub Jobs / LinkedIn) to show current entry-level vacancies.
- Peer community discussion boards and mentorship connect.
