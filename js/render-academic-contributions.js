// Render Academic Contributions from JSON data

function renderContributionItem(item, type) {
  let metaInfo = '';

  if (type === 'research' || type === 'review') {
    metaInfo = `
            <div class="contribution-meta">
                <span><strong>Journal:</strong> ${item.journal}</span> • 
                <span><strong>Year:</strong> ${item.year}</span>
                ${item.doi ? ` • <span><strong>DOI:</strong> ${item.doi}</span>` : ''}
            </div>
        `;
  } else if (type === 'bookChapter') {
    metaInfo = `
            <div class="contribution-meta">
                <span><strong>Book:</strong> ${item.bookTitle}</span> • 
                <span><strong>Publisher:</strong> ${item.publisher}</span> • 
                <span><strong>Year:</strong> ${item.year}</span>
                ${item.isbn ? ` • <span><strong>ISBN:</strong> ${item.isbn}</span>` : ''}
            </div>
        `;
  } else if (type === 'book') {
    metaInfo = `
            <div class="contribution-meta">
                <span><strong>Publisher:</strong> ${item.publisher}</span> • 
                <span><strong>Year:</strong> ${item.year}</span>
                ${item.isbn ? ` • <span><strong>ISBN:</strong> ${item.isbn}</span>` : ''}
            </div>
        `;
  } else if (type === 'conference') {
    metaInfo = `
            <div class="contribution-meta">
                <span><strong>Conference:</strong> ${item.conference}</span> • 
                <span><strong>Location:</strong> ${item.location}</span> • 
                <span><strong>Year:</strong> ${item.year}</span>
                ${item.presentationType ? ` • <span><strong>Type:</strong> ${item.presentationType}</span>` : ''}
            </div>
        `;
  } else if (type === 'other') {
    metaInfo = `
            <div class="contribution-meta">
                <span><strong>Type:</strong> ${item.type}</span> • 
                <span><strong>Year:</strong> ${item.year}</span>
            </div>
        `;
  }

  const stats = (item.citations !== undefined || item.reads !== undefined) ? `
        <div class="contribution-stats">
            ${item.citations !== undefined ? `<span>📊 Citations: ${item.citations}</span>` : ''}
            ${item.reads !== undefined ? `<span>👁️ Reads: ${item.reads}</span>` : ''}
        </div>
    ` : '';

  return `
        <div class="contribution-item">
            <h3 class="contribution-title">
                <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                    ${item.title} <i class="fa fa-external-link" style="font-size: 14px;"></i>
                </a>
            </h3>
            ${metaInfo}
            <p class="contribution-abstract">${item.abstract}</p>
            ${stats}
        </div>
    `;
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
      .map(item => renderContributionItem(item, 'research'))
      .join('');
  } else if (researchContainer) {
    researchContainer.innerHTML = '<p class="no-contributions">No research articles yet.</p>';
  }

  // Render Review Articles
  const reviewContainer = document.getElementById('review-articles');
  if (reviewContainer && academicContributions.reviewArticles.length > 0) {
    reviewContainer.innerHTML = academicContributions.reviewArticles
      .map(item => renderContributionItem(item, 'review'))
      .join('');
  } else if (reviewContainer) {
    reviewContainer.innerHTML = '<p class="no-contributions">No review articles yet.</p>';
  }

  // Render Books
  const booksContainer = document.getElementById('books');
  if (booksContainer && academicContributions.books.length > 0) {
    booksContainer.innerHTML = academicContributions.books
      .map(item => renderContributionItem(item, 'book'))
      .join('');
  } else if (booksContainer) {
    booksContainer.innerHTML = '<p class="no-contributions">No books yet.</p>';
  }

  // Render Book Chapters
  const chaptersContainer = document.getElementById('book-chapters');
  if (chaptersContainer && academicContributions.bookChapters.length > 0) {
    chaptersContainer.innerHTML = academicContributions.bookChapters
      .map(item => renderContributionItem(item, 'bookChapter'))
      .join('');
  } else if (chaptersContainer) {
    chaptersContainer.innerHTML = '<p class="no-contributions">No book chapters yet.</p>';
  }

  // Render Conference Papers
  const conferenceContainer = document.getElementById('conference-papers');
  if (conferenceContainer && academicContributions.conferencePapers.length > 0) {
    conferenceContainer.innerHTML = academicContributions.conferencePapers
      .map(item => renderContributionItem(item, 'conference'))
      .join('');
  } else if (conferenceContainer) {
    conferenceContainer.innerHTML = '<p class="no-contributions">No conference papers yet.</p>';
  }

  // Render Others
  const othersContainer = document.getElementById('others');
  if (othersContainer && academicContributions.others.length > 0) {
    othersContainer.innerHTML = academicContributions.others
      .map(item => renderContributionItem(item, 'other'))
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
