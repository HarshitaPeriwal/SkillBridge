/**
 * SkillBridge — Smart Career & Skill Navigator
 * File: js/careers.js
 * Description: Career exploration catalog, keyword search filter, category filter pills,
 *              and interactive career profile modal view.
 */

document.addEventListener('DOMContentLoaded', function() {
  const careersGrid = document.getElementById('careersGrid');
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const emptyState = document.getElementById('careersEmptyState');

  // Modal elements
  const modalBackdrop = document.getElementById('careerModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalSalary = document.getElementById('modalSalary');
  const modalRequiredSkills = document.getElementById('modalRequiredSkills');
  const modalSkillsToImprove = document.getElementById('modalSkillsToImprove');
  const modalRoadmapBtn = document.getElementById('modalRoadmapBtn');

  let activeCategory = 'all';
  let searchTerm = '';

  // Render initial careers list
  renderCareers();

  // Search input event
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      searchTerm = e.target.value.toLowerCase().trim();
      renderCareers();
    });
  }

  // Filter button clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category') || 'all';
      renderCareers();
    });
  });

  // Modal close handlers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function(e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // ---------------------------------------------------------------------------
  // Render Careers with Filtering
  // ---------------------------------------------------------------------------
  function renderCareers() {
    if (!careersGrid) return;

    const filtered = CAREERS_DATA.filter(career => {
      // Category match
      const matchesCategory = (activeCategory === 'all') || (career.categorySlug === activeCategory);

      // Search match across title, description, and required skills
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

      // Required skills tags (display up to 4 on preview card)
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
          <button class="btn btn-secondary btn-sm view-details-btn" data-id="${career.id}" style="flex: 1;">
            View Details
          </button>
          <a href="roadmap.html?career=${career.id}" class="btn btn-primary btn-sm" style="flex: 1;">
            Roadmap →
          </a>
        </div>
      `;

      // Attach View Details click listener
      const viewBtn = card.querySelector('.view-details-btn');
      if (viewBtn) {
        viewBtn.addEventListener('click', function() {
          openModal(career);
        });
      }

      careersGrid.appendChild(card);
    });
  }

  // ---------------------------------------------------------------------------
  // Modal Open & Populate
  // ---------------------------------------------------------------------------
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
      modalRoadmapBtn.onclick = function() {
        Storage.setSelectedCareer(career.id);
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
});
