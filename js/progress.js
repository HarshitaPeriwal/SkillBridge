/**
 * SkillBridge — Smart Career & Skill Navigator
 * File: js/progress.js
 * Description: Student progress dashboard, assessment results overview,
 *              active roadmap status, and confirmed progress reset.
 */

document.addEventListener('DOMContentLoaded', function() {
  const emptyStateContainer = document.getElementById('progressEmptyState');
  const dashboardContent = document.getElementById('progressDashboardContent');

  // Summary widgets
  const topCareerTitle = document.getElementById('summaryTopCareer');
  const topCareerMatch = document.getElementById('summaryTopMatch');
  const activeRoadmapTitle = document.getElementById('summaryActiveRoadmap');
  const overallMilestonesText = document.getElementById('summaryMilestonesCount');
  const overallProgressBar = document.getElementById('summaryProgressBarFill');
  const overallPercentText = document.getElementById('summaryPercentText');
  const assessmentDateText = document.getElementById('summaryAssessmentDate');

  // Lists
  const topRecommendationsList = document.getElementById('dashboardTopCareersList');
  const completedMilestonesList = document.getElementById('dashboardCompletedMilestones');

  // Reset modal elements
  const resetBtn = document.getElementById('resetProgressBtn');
  const resetModal = document.getElementById('resetConfirmModal');
  const cancelResetBtn = document.getElementById('cancelResetBtn');
  const confirmResetBtn = document.getElementById('confirmResetBtn');

  // Load and render
  renderDashboard();

  // Reset progress handlers
  if (resetBtn && resetModal) {
    resetBtn.addEventListener('click', function() {
      resetModal.classList.add('open');
    });
  }

  if (cancelResetBtn && resetModal) {
    cancelResetBtn.addEventListener('click', function() {
      resetModal.classList.remove('open');
    });
  }

  if (resetModal) {
    resetModal.addEventListener('click', function(e) {
      if (e.target === resetModal) {
        resetModal.classList.remove('open');
      }
    });
  }

  if (confirmResetBtn) {
    confirmResetBtn.addEventListener('click', function() {
      Storage.resetAllProgress();
      if (resetModal) resetModal.classList.remove('open');
      renderDashboard();
    });
  }

  // ---------------------------------------------------------------------------
  // Dashboard Renderer
  // ---------------------------------------------------------------------------
  function renderDashboard() {
    const results = Storage.getResults();
    const activeCareerId = Storage.getSelectedCareer();
    const activeCareer = getCareerById(activeCareerId) || (results && results[0] ? getCareerById(results[0].careerId) : null);
    const checklistState = Storage.getChecklistState();

    // Check if user has taken assessment or has any progress
    const hasResults = !!(results && results.length > 0);
    const hasAnyChecklist = Object.values(checklistState).some(Boolean);

    if (!hasResults && !hasAnyChecklist) {
      if (emptyStateContainer) emptyStateContainer.style.display = 'block';
      if (dashboardContent) dashboardContent.style.display = 'none';
      return;
    }

    if (emptyStateContainer) emptyStateContainer.style.display = 'none';
    if (dashboardContent) dashboardContent.style.display = 'block';

    // 1. Top Recommended Career Widget
    if (results && results.length > 0) {
      const topMatch = results[0];
      if (topCareerTitle) topCareerTitle.textContent = topMatch.title;
      if (topCareerMatch) topCareerMatch.textContent = `${topMatch.matchPercentage}% Match`;
    } else {
      if (topCareerTitle) topCareerTitle.textContent = activeCareer ? activeCareer.title : 'Not assessed yet';
      if (topCareerMatch) topCareerMatch.textContent = 'Explore Careers';
    }

    // 2. Active Roadmap Widget
    if (activeRoadmapTitle && activeCareer) {
      activeRoadmapTitle.textContent = activeCareer.title;
    }

    // 3. Assessment Date
    const savedDate = localStorage.getItem(STORAGE_KEYS.LAST_ASSESSMENT_DATE) || 'Recently';
    if (assessmentDateText) {
      assessmentDateText.textContent = hasResults ? `Assessed on: ${savedDate}` : 'Assessment pending';
    }

    // 4. Calculate Milestones Progress for Active Career Track
    let totalItems = 0;
    let completedItems = 0;
    const completedMilestoneObjects = [];

    if (activeCareer) {
      const allItems = [
        ...activeCareer.roadmap.beginner.map(i => ({ ...i, phase: 'Beginner' })),
        ...activeCareer.roadmap.intermediate.map(i => ({ ...i, phase: 'Intermediate' })),
        ...activeCareer.roadmap.readinessChecklist.map(i => ({ ...i, phase: 'Readiness' }))
      ];

      totalItems = allItems.length;

      allItems.forEach(item => {
        if (checklistState[item.id]) {
          completedItems++;
          completedMilestoneObjects.push(item);
        }
      });
    }

    const percent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    if (overallMilestonesText) overallMilestonesText.textContent = `${completedItems} of ${totalItems} items completed`;
    if (overallPercentText) overallPercentText.textContent = `${percent}%`;
    if (overallProgressBar) overallProgressBar.style.width = `${percent}%`;

    // 5. Render Top Career Recommendations Card List
    if (topRecommendationsList) {
      topRecommendationsList.innerHTML = '';
      if (results && results.length > 0) {
        const topThree = results.slice(0, 3);
        topThree.forEach((res, idx) => {
          const itemEl = document.createElement('div');
          itemEl.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border: 1px solid var(--border-light); border-radius: var(--radius-sm); margin-bottom: 8px; background-color: #FFFFFF;';
          itemEl.innerHTML = `
            <div>
              <div style="font-weight: 700; color: var(--navy-900); font-size: 0.95rem;">
                #${idx + 1} ${escapeHtml(res.title)}
              </div>
              <div style="font-size: 0.8rem; color: var(--navy-500);">${escapeHtml(res.category)}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="badge badge-purple" style="font-size: 0.85rem;">${res.matchPercentage}% Match</span>
              <a href="roadmap.html?career=${res.careerId}" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 0.8rem;">
                Roadmap
              </a>
            </div>
          `;
          topRecommendationsList.appendChild(itemEl);
        });
      } else {
        topRecommendationsList.innerHTML = `
          <p style="font-size: 0.9rem; color: var(--navy-500); padding: 12px 0;">
            No assessment results recorded yet. Take the 10-question assessment to unlock personalized recommendations.
          </p>
          <a href="assessment.html" class="btn btn-primary btn-sm">Start Assessment</a>
        `;
      }
    }

    // 6. Render Completed Milestones List
    if (completedMilestonesList) {
      completedMilestonesList.innerHTML = '';
      if (completedMilestoneObjects.length > 0) {
        completedMilestoneObjects.forEach(m => {
          const li = document.createElement('div');
          li.style.cssText = 'display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--border-light); font-size: 0.88rem;';
          li.innerHTML = `
            <span style="color: var(--success); font-weight: 800;">✓</span>
            <div style="flex: 1;">
              <span style="font-weight: 600; color: var(--navy-900);">${escapeHtml(m.title)}</span>
              <span class="badge badge-navy" style="margin-left: 8px; font-size: 0.72rem;">${m.phase}</span>
            </div>
          `;
          completedMilestonesList.appendChild(li);
        });
      } else {
        completedMilestonesList.innerHTML = `
          <div style="text-align: center; padding: 24px 10px; color: var(--navy-500); font-size: 0.9rem;">
            No milestones checked off yet in the active roadmap. Check off items in the 
            <a href="roadmap.html?career=${activeCareer ? activeCareer.id : ''}" style="color: var(--purple-700); font-weight: 600;">Learning Roadmap</a> 
            to track your progress here.
          </div>
        `;
      }
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
