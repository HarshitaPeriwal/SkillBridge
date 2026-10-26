/**
 * SkillBridge — Smart Career & Skill Navigator
 * File: js/results.js
 * Description: Dynamically renders the top 3 career recommendations based on the
 *              assessment scoring algorithm, along with rationale, skill gaps, and roadmap links.
 */

window.renderResults = function() {
  const resultsContainer = document.getElementById('resultsContainer');
  const emptyState = document.getElementById('resultsEmptyState');
  const retakeBtn = document.getElementById('retakeAssessmentBtn');

  if (!resultsContainer) return;

  const results = Storage.getResults();

  if (!results || results.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    resultsContainer.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  resultsContainer.style.display = 'block';
  resultsContainer.innerHTML = '';

  const topMatches = results.slice(0, 3);

  topMatches.forEach((match, index) => {
    const isTopOne = (index === 0);
    const card = document.createElement('div');
    card.className = `career-result-card ${isTopOne ? 'primary-match' : ''}`;

    const rankLabel = index === 0 ? 'Top Recommendation #1' : index === 1 ? 'Strong Match #2' : 'Alternative Match #3';

    const reqSkillsHtml = match.requiredSkills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('');
    const improveSkillsHtml = match.skillsToImprove.map(s => `<span class="skill-tag improve-tag">${escapeHtml(s)}</span>`).join('');

    card.innerHTML = `
      <div class="match-header">
        <div>
          <span class="match-rank-badge">${rankLabel}</span>
          <h2 class="career-title-lg">${escapeHtml(match.title)}</h2>
          <span class="badge badge-navy" style="margin-top: 4px;">${escapeHtml(match.category)}</span>
        </div>
        <div class="match-score-badge">
          <div class="match-percentage">${match.matchPercentage}%</div>
          <div class="match-score-label">Match Score</div>
        </div>
      </div>

      <p class="match-desc">${escapeHtml(match.shortDesc)}</p>

      <div class="recommendation-rationale">
        <strong>Why this fits you:</strong> ${escapeHtml(match.rationale)}
      </div>

      <div class="skills-section-block">
        <div>
          <div class="skills-heading">Core Skills Needed:</div>
          <div class="skill-tags-list">
            ${reqSkillsHtml}
          </div>
        </div>
        <div>
          <div class="skills-heading">Skills You Could Improve:</div>
          <div class="skill-tags-list">
            ${improveSkillsHtml}
          </div>
        </div>
      </div>

      <div class="result-card-actions">
        <a href="roadmap.html?career=${match.careerId}" data-view="roadmap" data-career="${match.careerId}" class="btn btn-primary" onclick="Storage.setSelectedCareer('${match.careerId}')">
          View Learning Roadmap →
        </a>
      </div>
    `;

    resultsContainer.appendChild(card);
  });

  if (retakeBtn && !retakeBtn._hasClickListener) {
    retakeBtn._hasClickListener = true;
    retakeBtn.addEventListener('click', function() {
      if (window.SkillBridgeRouter && document.getElementById('view-assessment')) {
        window.SkillBridgeRouter.switchView('assessment');
      } else {
        window.location.href = 'assessment.html';
      }
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};

document.addEventListener('DOMContentLoaded', function() {
  if (typeof window.renderResults === 'function') {
    window.renderResults();
  }
});
