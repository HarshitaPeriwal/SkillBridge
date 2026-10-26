/**
 * SkillBridge — Smart Career & Skill Navigator
 * File: js/careers.js
 * Description: Career exploration catalog, keyword search filter, category filter pills,
 *              and interactive career profile modal view.
 */

window.renderCareers = function() {
  const careersGrid = document.getElementById('careersGrid');
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const emptyState = document.getElementById('careersEmptyState');

  const modalBackdrop = document.getElementById('careerModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalSalary = document.getElementById('modalSalary');
  const modalRequiredSkills = document.getElementById('modalRequiredSkills');
  const modalSkillsToImprove = document.getElementById('modalSkillsToImprove');
  const modalRoadmapBtn = document.getElementById('modalRoadmapBtn');

  if (!careersGrid) return;

  let activeCategory = window._activeCategory || 'all';
  let searchTerm = window._searchTerm || '';

  // Setup search input listener once
  if (searchInput && !searchInput._bound) {
    searchInput._bound = true;
    searchInput.addEventListener('input', function(e) {
      window._searchTerm = e.target.value.toLowerCase().trim();
      executeFilter();
    });
  }

  // Setup filter buttons once
  filterButtons.forEach(btn => {
    if (!btn._bound) {
      btn._bound = true;
      btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        window._activeCategory = btn.getAttribute('data-category') || 'all';
        executeFilter();
      });
    }
  });

  // Setup modal close handlers once
  if (modalCloseBtn && !modalCloseBtn._bound) {
    modalCloseBtn._bound = true;
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modalBackdrop && !modalBackdrop._bound) {
    modalBackdrop._bound = true;
    modalBackdrop.addEventListener('click', function(e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  executeFilter();

  function executeFilter() {
    activeCategory = window._activeCategory || 'all';
    searchTerm = window._searchTerm || '';

    const filtered = CAREERS_DATA.filter(career => {
      const matchesCategory = (activeCategory === 'all') || (career.categorySlug === activeCategory);
      const searchHaystack = `${career.title} ${career.shortDesc} ${career.requiredSkills.join(' ')}`.toLowerCase();
      const matchesSearch = !searchTerm || searchHaystack.includes(searchTerm);
      return matchesCategory && matchesSearch;
    });

    careersGrid.innerHTML = '';

    if (filtered.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      return;
    } else {
      if (emptyState) emptyState.style.display = 'none';
    }

    filtered.forEach(career => {
      const card = document.createElement('div');
      card.className = 'card career-browse-card';

      const skillTagsHtml = career.requiredSkills.slice(0, 4).map(skill => `
        <span class="skill-tag">${escapeHtml(skill)}</span>
      `).join('');

      card.innerHTML = `
        <div class="career-browse-header">
          <span class="badge badge-purple">${escapeHtml(career.category)}</span>
          <h3 class="career-browse-title">${escapeHtml(career.title)}</h3>
        </div>
        <p class="career-browse-desc">${escapeHtml(career.shortDesc)}</p>
        <div style="margin-bottom: 20px;">
          <div class="skills-heading">Key Required Skills:</div>
          <div class="skill-tags-list">
            ${skillTagsHtml}
            ${career.requiredSkills.length > 4 ? `<span class="skill-tag">+${career.requiredSkills.length - 4} more</span>` : ''}
          </div>
        </div>
        <div style="display: flex; gap: 10px; margin-top: auto;">
          <button type="button" class="btn btn-secondary btn-sm view-details-btn" data-id="${career.id}" style="flex: 1;">
            View Details
          </button>
          <a href="roadmap.html?career=${career.id}" data-view="roadmap" data-career="${career.id}" class="btn btn-primary btn-sm" style="flex: 1;">
            Roadmap →
          </a>
        </div>
      `;

      const viewBtn = card.querySelector('.view-details-btn');
      if (viewBtn) {
        viewBtn.addEventListener('click', function() {
          openModal(career);
        });
      }

      careersGrid.appendChild(card);
    });
  }

  function openModal(career) {
    if (!modalBackdrop) return;
    if (modalTitle) modalTitle.textContent = career.title;
    if (modalCategory) modalCategory.textContent = career.category;
    if (modalDesc) modalDesc.textContent = career.fullDesc || career.shortDesc;
    if (modalSalary) modalSalary.textContent = career.averageSalaryNote || 'Entry level competitive';

    if (modalRequiredSkills) {
      modalRequiredSkills.innerHTML = career.requiredSkills.map(s => `
        <span class="skill-tag">${escapeHtml(s)}</span>
      `).join('');
    }

    if (modalSkillsToImprove) {
      modalSkillsToImprove.innerHTML = career.skillsToImprove.map(s => `
        <span class="skill-tag improve-tag">${escapeHtml(s)}</span>
      `).join('');
    }

    if (modalRoadmapBtn) {
      modalRoadmapBtn.setAttribute('href', `roadmap.html?career=${career.id}`);
      modalRoadmapBtn.setAttribute('data-view', 'roadmap');
      modalRoadmapBtn.setAttribute('data-career', career.id);
      modalRoadmapBtn.onclick = function() {
        Storage.setSelectedCareer(career.id);
        closeModal();
      };
    }

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
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
  if (typeof window.renderCareers === 'function') {
    window.renderCareers();
  }
});
