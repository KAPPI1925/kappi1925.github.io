// Render Academic Contributions from JSON data

function renderContributionItem(item, type, index) {
  const itemId = `${type}-${index}`;
  let metaInfo = '';

  // Authors link
  const authorsHtml = item.authors ? `
    <div class="contribution-authors">
      <i class="fa fa-user"></i> ${item.authors}
    </div>
  ` : '';

  if (type === 'research' || type === 'review') {
    // Auto-detect DOI vs ISBN
    const identifierLabel = item.isbn ? 'ISBN' : 'DOI';
    const identifierValue = item.isbn || item.doi;
    const identifierUrl = item.isbn
      ? `https://isbnsearch.org/isbn/${item.isbn.replace(/-/g, '')}`
      : (item.doi ? `https://doi.org/${item.doi}` : '');

    metaInfo = `
        <div class="contribution-meta">
          <div><strong>Journal:</strong> ${item.journal}</div>
          <div><strong>Year:</strong> ${item.year}</div>
          ${identifierValue ? `<div><strong>${identifierLabel}:</strong> <a href="${identifierUrl}" target="_blank" rel="noopener noreferrer" class="doi-link">${identifierValue}</a></div>` : ''}
        </div>
      `;
  } else if (type === 'bookChapter') {
    const identifierLabel = item.isbn ? 'ISBN' : 'DOI';
    const identifierValue = item.isbn || item.doi;
    const identifierUrl = item.isbn
      ? `https://isbnsearch.org/isbn/${item.isbn.replace(/-/g, '')}`
      : (item.doi ? `https://doi.org/${item.doi}` : '');

    metaInfo = `
        <div class="contribution-meta">
          <div><strong>Book:</strong> ${item.bookTitle}</div>
          <div><strong>Publisher:</strong> ${item.publisher}</div>
          <div><strong>Year:</strong> ${item.year}</div>
          ${identifierValue ? `<div><strong>${identifierLabel}:</strong> <a href="${identifierUrl}" target="_blank" rel="noopener noreferrer" class="doi-link">${identifierValue}</a></div>` : ''}
        </div>
      `;
  } else if (type === 'book') {
    const identifierLabel = item.isbn ? 'ISBN' : 'DOI';
    const identifierValue = item.isbn || item.doi;
    const identifierUrl = item.isbn
      ? `https://isbnsearch.org/isbn/${item.isbn.replace(/-/g, '')}`
      : (item.doi ? `https://doi.org/${item.doi}` : '');

    metaInfo = `
        <div class="contribution-meta">
          <div><strong>Publisher:</strong> ${item.publisher}</div>
          <div><strong>Year:</strong> ${item.year}</div>
          ${identifierValue ? `<div><strong>${identifierLabel}:</strong> <a href="${identifierUrl}" target="_blank" rel="noopener noreferrer" class="doi-link">${identifierValue}</a></div>` : ''}
        </div>
      `;
  } else if (type === 'conference') {
    metaInfo = `
        <div class="contribution-meta">
          <div><strong>Conference:</strong> ${item.conference}</div>
          <div><strong>Location:</strong> ${item.location}</div>
          <div><strong>Year:</strong> ${item.year}</div>
          ${item.presentationType ? `<div><strong>Type:</strong> ${item.presentationType}</div>` : ''}
        </div>
      `;
  } else if (type === 'other') {
    metaInfo = `
        <div class="contribution-meta">
          <div><strong>Type:</strong> ${item.type}</div>
          <div><strong>Year:</strong> ${item.year}</div>
        </div>
      `;
  }

  return `
        <div class="contribution-item">
            <h3 class="contribution-title contribution-toggle" onclick="toggleContribution('${itemId}')">
                ${item.title} <i class="fa fa-chevron-down toggle-icon" id="icon-${itemId}"></i>
            </h3>
            <div class="contribution-content" id="${itemId}" style="display: none;">
                ${authorsHtml}
                ${metaInfo}
                <p class="contribution-abstract">${item.abstract}</p>
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="read-button">
                    <i class="fa fa-external-link"></i> Read
                </a>
            </div>
        </div>
    `;
}

function toggleContribution(id) {
  const content = document.getElementById(id);
  const icon = document.getElementById(`icon-${id}`);

  if (content.style.display === 'none') {
    content.style.display = 'block';
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
  } else {
    content.style.display = 'none';
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  }
}

function renderAcademicContributions() {
  if (typeof academicContributions === 'undefined') {
    console.error('Academic contributions data not loaded');
    return;
  }

  // Render Research Articles
  const researchContainer = document.getElementById('research-articles');
  if (researchContainer && academicContributions.researchArticles.length > 0) {
    researchContainer.innerHTML = academicContributions.researchArticles
      .map((item, index) => renderContributionItem(item, 'research', index))
      .join('');
  } else if (researchContainer) {
    researchContainer.innerHTML = '<p class="no-contributions">No research articles yet.</p>';
  }

  // Render Review Articles
  const reviewContainer = document.getElementById('review-articles');
  if (reviewContainer && academicContributions.reviewArticles.length > 0) {
    reviewContainer.innerHTML = academicContributions.reviewArticles
      .map((item, index) => renderContributionItem(item, 'review', index))
      .join('');
  } else if (reviewContainer) {
    reviewContainer.innerHTML = '<p class="no-contributions">No review articles yet.</p>';
  }

  // Render Books
  const booksContainer = document.getElementById('books');
  if (booksContainer && academicContributions.books.length > 0) {
    booksContainer.innerHTML = academicContributions.books
      .map((item, index) => renderContributionItem(item, 'book', index))
      .join('');
  } else if (booksContainer) {
    booksContainer.innerHTML = '<p class="no-contributions">No books yet.</p>';
  }

  // Render Book Chapters
  const chaptersContainer = document.getElementById('book-chapters');
  if (chaptersContainer && academicContributions.bookChapters.length > 0) {
    chaptersContainer.innerHTML = academicContributions.bookChapters
      .map((item, index) => renderContributionItem(item, 'bookChapter', index))
      .join('');
  } else if (chaptersContainer) {
    chaptersContainer.innerHTML = '<p class="no-contributions">No book chapters yet.</p>';
  }

  // Render Conference Papers
  const conferenceContainer = document.getElementById('conference-papers');
  if (conferenceContainer && academicContributions.conferencePapers.length > 0) {
    conferenceContainer.innerHTML = academicContributions.conferencePapers
      .map((item, index) => renderContributionItem(item, 'conference', index))
      .join('');
  } else if (conferenceContainer) {
    conferenceContainer.innerHTML = '<p class="no-contributions">No conference papers yet.</p>';
  }

  // Render Others
  const othersContainer = document.getElementById('others');
  if (othersContainer && academicContributions.others.length > 0) {
    othersContainer.innerHTML = academicContributions.others
      .map((item, index) => renderContributionItem(item, 'other', index))
      .join('');
  } else if (othersContainer) {
    othersContainer.innerHTML = '<p class="no-contributions">No other contributions yet.</p>';
  }
}

// Auto-render when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderAcademicContributions);
} else {
  renderAcademicContributions();
}
