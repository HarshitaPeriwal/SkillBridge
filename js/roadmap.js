/**
 * SkillBridge — Smart Career & Skill Navigator
 * File: js/roadmap.js
 * Description: Dynamic career learning roadmap with beginner/intermediate milestones,
 *              practice project ideas, interactive completion checklist, and progress tracking.
 */

document.addEventListener('DOMContentLoaded', function() {
  const careerSelectDropdown = document.getElementById('roadmapCareerSelect');
  const roadmapTitle = document.getElementById('roadmapCareerTitle');
  const roadmapCategory = document.getElementById('roadmapCategoryBadge');
  const roadmapDesc = document.getElementById('roadmapCareerDesc');
  const beginnerList = document.getElementById('beginnerMilestonesList');
  const intermediateList = document.getElementById('intermediateMilestonesList');
  const projectsList = document.getElementById('practiceProjectsList');
  const checklistList = document.getElementById('readinessChecklist');
  const progressPercentText = document.getElementById('roadmapProgressPercent');
  const progressBarFill = document.getElementById('roadmapProgressBarFill');
  const completedCountText = document.getElementById('roadmapCompletedCount');

  // Determine active career from URL parameter, or saved selected career, or default
  const urlParams = new URLSearchParams(window.location.search);
  let activeCareerId = urlParams.get('career') || Storage.getSelectedCareer() || 'web-developer';

  // Ensure active career exists in catalog
  if (!getCareerById(activeCareerId)) {
    activeCareerId = 'web-developer';
  }

  // Populate dropdown options
  if (careerSelectDropdown) {
    careerSelectDropdown.innerHTML = '';
    CAREERS_DATA.forEach(career => {
      const opt = document.createElement('option');
      opt.value = career.id;
      opt.textContent = career.title;
      if (career.id === activeCareerId) {
        opt.selected = true;
      }
      careerSelectDropdown.appendChild(opt);
    });

    careerSelectDropdown.addEventListener('change', function(e) {
      activeCareerId = e.target.value;
      Storage.setSelectedCareer(activeCareerId);
      // Update URL without full reload for clean state
      const newUrl = `${window.location.pathname}?career=${activeCareerId}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
      renderRoadmap(activeCareerId);
    });
  }

  // Render current career roadmap
  renderRoadmap(activeCareerId);

  // ---------------------------------------------------------------------------
  // Roadmap Renderer
  // ---------------------------------------------------------------------------
  function renderRoadmap(careerId) {
    const career = getCareerById(careerId);
    if (!career) return;

    Storage.setSelectedCareer(careerId);

    // Update Header Meta
    if (roadmapTitle) roadmapTitle.textContent = `${career.title} Learning Roadmap`;
    if (roadmapCategory) roadmapCategory.textContent = career.category;
    if (roadmapDesc) roadmapDesc.textContent = career.shortDesc;

    const checklistState = Storage.getChecklistState();

    // 1. Beginner Milestones
    if (beginnerList) {
      beginnerList.innerHTML = '';
      career.roadmap.beginner.forEach(item => {
        const isDone = !!checklistState[item.id];
        beginnerList.appendChild(createChecklistItemElement(item, isDone));
      });
    }

    // 2. Intermediate Milestones
    if (intermediateList) {
      intermediateList.innerHTML = '';
      career.roadmap.intermediate.forEach(item => {
        const isDone = !!checklistState[item.id];
        intermediateList.appendChild(createChecklistItemElement(item, isDone));
      });
    }

    // 3. Practice Projects
    if (projectsList) {
      projectsList.innerHTML = '';
      career.roadmap.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card-item';
        card.innerHTML = `
          <div class="project-title">${escapeHtml(project.title)}</div>
          <div class="project-desc">${escapeHtml(project.desc)}</div>
          <div class="project-tags">
            ${project.skills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
          </div>
        `;
        projectsList.appendChild(card);
      });
    }

    // 4. Readiness Checklist
    if (checklistList) {
      checklistList.innerHTML = '';
      career.roadmap.readinessChecklist.forEach(item => {
        const isDone = !!checklistState[item.id];
        checklistList.appendChild(createChecklistItemElement(item, isDone));
      });
    }

    // Recalculate progress metrics
    updateProgressDisplay(career);
  }

  // ---------------------------------------------------------------------------
  // Checklist Item Creator
  // ---------------------------------------------------------------------------
  function createChecklistItemElement(item, isDone) {
    const wrapper = document.createElement('label');
    wrapper.className = `checklist-item ${isDone ? 'checked' : ''}`;
    wrapper.htmlFor = `chk_${item.id}`;

    wrapper.innerHTML = `
      <input 
        type="checkbox" 
        id="chk_${item.id}" 
        class="checklist-checkbox" 
        ${isDone ? 'checked' : ''} 
      />
      <div class="checklist-text">
        <div class="checklist-title">${escapeHtml(item.title)}</div>
        ${item.desc ? `<div class="checklist-desc">${escapeHtml(item.desc)}</div>` : ''}
      </div>
    `;

    const checkbox = wrapper.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function() {
      const newState = Storage.toggleChecklistItem(item.id);
      if (newState) {
        wrapper.classList.add('checked');
      } else {
        wrapper.classList.remove('checked');
      }
      const career = getCareerById(activeCareerId);
      updateProgressDisplay(career);
    });

    return wrapper;
  }

  // ---------------------------------------------------------------------------
  // Progress Calculator
  // ---------------------------------------------------------------------------
  function updateProgressDisplay(career) {
    if (!career) return;

    // Collect all item IDs for current career roadmap
    const allTrackItemIds = [
      ...career.roadmap.beginner.map(i => i.id),
      ...career.roadmap.intermediate.map(i => i.id),
      ...career.roadmap.readinessChecklist.map(i => i.id)
    ];

    const checklistState = Storage.getChecklistState();
    let completedCount = 0;

    allTrackItemIds.forEach(id => {
      if (checklistState[id]) {
        completedCount++;
      }
    });

    const totalCount = allTrackItemIds.length;
    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    if (progressPercentText) progressPercentText.textContent = `${percent}%`;
    if (progressBarFill) progressBarFill.style.width = `${percent}%`;
    if (completedCountText) completedCountText.textContent = `${completedCount} of ${totalCount} completed`;
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
