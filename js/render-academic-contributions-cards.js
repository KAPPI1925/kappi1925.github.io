// Global storage for academic contribution data
window.academicDataStore = {};
let academicDataCounter = 0;

function openAcademicModal(certificatePath, title) {
  if (certificatePath === "#") {
    // Show placeholder message if no image
    alert("Image to be added soon for: " + title);
    return;
  }

  const modal = document.getElementById('certificateModal');
  const modalImagesContainer = document.getElementById('modalCertificateImagesContainer');
  const modalTitle = document.getElementById('modalCertificateTitle');

  modalTitle.textContent = title;

  // Handle both single path (string) and multiple paths (array)
  const paths = Array.isArray(certificatePath) ? certificatePath : [certificatePath];

  // Generate image HTML for all paths
  const imagesHTML = paths.map(path => `<img src="${path}" alt="${title}" class="certificate-image">`).join('');
  modalImagesContainer.innerHTML = imagesHTML;

  // Prevent background scrolling
  document.body.style.overflow = 'hidden';

  modal.style.display = 'flex';
}

function closeCertificateModal() {
  const modal = document.getElementById('certificateModal');
  modal.style.display = 'none';

  // Restore background scrolling
  document.body.style.overflow = '';
}

function renderAcademicContributionItem(item, category) {
  // Handle certificatePath
  let certificatePath = item.certificatePath || "#";
  let isPlaceholder = certificatePath === "#";

  // Store data globally
  const dataId = 'academic_' + (++academicDataCounter);
  window.academicDataStore[dataId] = {
    certificatePath,
    title: item.title,
    isPlaceholder
  };

  // Build metadata based on category
  let metadata = `<p class="academic-year"><i class="fa fa-calendar"></i> ${item.year}</p>`;

  if (item.journal) {
    metadata += `<p class="academic-meta"><i class="fa fa-book"></i> ${item.journal}</p>`;
  }
  if (item.publisher) {
    metadata += `<p class="academic-meta"><i class="fa fa-institution"></i> ${item.publisher}</p>`;
  }
  if (item.conference) {
    metadata += `<p class="academic-meta"><i class="fa fa-users"></i> ${item.conference}</p>`;
  }

  // Truncate abstract to 200 chars
  const truncatedAbstract = item.abstract ? (item.abstract.substring(0, 200) + "...") : "";

  // Image section
  const imageSection = isPlaceholder
    ? `<div class="academic-image-card placeholder" onclick="openAcademicModal(window.academicDataStore['${dataId}'].certificatePath, window.academicDataStore['${dataId}'].title)" style="cursor: pointer;">
         <i class="fa fa-file-pdf-o"></i>
         <span>Image to add</span>
       </div>`
    : `<div class="academic-image-card" onclick="openAcademicModal(window.academicDataStore['${dataId}'].certificatePath, window.academicDataStore['${dataId}'].title)" style="cursor: pointer;">
         <img src="${certificatePath}" alt="${item.title}" class="academic-image" />
       </div>`;

  return `
    <div class="academic-contribution-item">
      <div class="academic-content">
        <div class="academic-left">
          <h3 class="academic-title">${item.title}</h3>
          <div class="academic-authors">${item.authors}</div>
          <div class="academic-metadata">
            ${metadata}
          </div>
          <p class="academic-abstract">${truncatedAbstract}</p>
        </div>
        <div class="academic-right">
          ${imageSection}
        </div>
      </div>
    </div>
  `;
}

function renderAcademicContributions() {
  if (typeof academicContributions === 'undefined') {
    console.error('Academic contributions data not loaded');
    return;
  }

  // Research Articles
  if (academicContributions.researchArticles && academicContributions.researchArticles.length > 0) {
    const html = academicContributions.researchArticles
      .map(item => renderAcademicContributionItem(item, 'researchArticles'))
      .join('');
    const container = document.getElementById('research-articles');
    if (container) container.innerHTML = html;
  }

  // Review Articles
  if (academicContributions.reviewArticles && academicContributions.reviewArticles.length > 0) {
    const html = academicContributions.reviewArticles
      .map(item => renderAcademicContributionItem(item, 'reviewArticles'))
      .join('');
    const container = document.getElementById('review-articles');
    if (container) container.innerHTML = html;
  }

  // Popular Articles
  if (academicContributions.popularArticles && academicContributions.popularArticles.length > 0) {
    const html = academicContributions.popularArticles
      .map(item => renderAcademicContributionItem(item, 'popularArticles'))
      .join('');
    const container = document.getElementById('popular-articles');
    if (container) container.innerHTML = html;
  }

  // Books
  if (academicContributions.books && academicContributions.books.length > 0) {
    const html = academicContributions.books
      .map(item => renderAcademicContributionItem(item, 'books'))
      .join('');
    const container = document.getElementById('books');
    if (container) container.innerHTML = html;
  }

  // Book Chapters
  if (academicContributions.bookChapters && academicContributions.bookChapters.length > 0) {
    const html = academicContributions.bookChapters
      .map(item => renderAcademicContributionItem(item, 'bookChapters'))
      .join('');
    const container = document.getElementById('book-chapters');
    if (container) container.innerHTML = html;
  }

  // Conference Papers
  if (academicContributions.conferencePapers && academicContributions.conferencePapers.length > 0) {
    const html = academicContributions.conferencePapers
      .map(item => renderAcademicContributionItem(item, 'conferencePapers'))
      .join('');
    const container = document.getElementById('conference-papers');
    if (container) container.innerHTML = html;
  }

  // Others
  if (academicContributions.others && academicContributions.others.length > 0) {
    const html = academicContributions.others
      .map(item => renderAcademicContributionItem(item, 'others'))
      .join('');
    const container = document.getElementById('others');
    if (container) container.innerHTML = html;
  }
}

// Close modal when clicking outside
window.addEventListener('click', function (event) {
  const modal = document.getElementById('certificateModal');
  if (event.target === modal) {
    closeCertificateModal();
  }
});

// Close modal when pressing ESC key
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' || event.keyCode === 27) {
    const modal = document.getElementById('certificateModal');
    if (modal && modal.style.display === 'flex') {
      closeCertificateModal();
    }
  }
});

// Load academic contributions when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  renderAcademicContributions();
});
