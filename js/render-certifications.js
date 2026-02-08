// Render Certifications

function openCertificateModal(certificatePath, title) {
  const modal = document.getElementById('certificateModal');
  const modalImage = document.getElementById('modalCertificateImage');
  const modalTitle = document.getElementById('modalCertificateTitle');

  modalTitle.textContent = title;
  modalImage.src = certificatePath;
  modal.style.display = 'flex';
}

function closeCertificateModal() {
  const modal = document.getElementById('certificateModal');
  modal.style.display = 'none';
}

function renderCertificationCategory(category, items) {
  return items.map((cert, index) => `
    <div class="cert-item ${index === 0 ? 'featured-cert' : ''}">
      <div class="cert-title ${index === 0 ? 'featured-cert-title' : ''}" onclick="openCertificateModal('${cert.certificatePath}', '${cert.title}')">
        <i class="fa fa-certificate"></i> ${cert.title}
      </div>
      <div class="cert-year">${cert.year}</div>
    </div>
  `).join('');
}

function renderCertifications() {
  if (typeof certificationsData === 'undefined') {
    console.error('Certifications data not loaded');
    return;
  }

  // Web Courses
  const webCoursesHtml = Object.entries(certificationsData.webCourses).map(([provider, certs]) => `
    <div class="cert-provider-group">
      <h4 class="provider-title">${provider}</h4>
      <div class="certs-list">
        ${renderCertificationCategory(provider, certs)}
      </div>
    </div>
  `).join('');

  const webCoursesContainer = document.getElementById('web-courses');
  if (webCoursesContainer) {
    webCoursesContainer.innerHTML = webCoursesHtml;
  }

  // Courses
  const coursesHtml = renderCertificationCategory('Courses', certificationsData.courses);
  const coursesContainer = document.getElementById('courses');
  if (coursesContainer) {
    coursesContainer.innerHTML = coursesHtml;
  }

  // Trainings
  const trainingsHtml = renderCertificationCategory('Trainings', certificationsData.trainings);
  const trainingsContainer = document.getElementById('trainings');
  if (trainingsContainer) {
    trainingsContainer.innerHTML = trainingsHtml;
  }

  // Webinars
  const webinarsHtml = renderCertificationCategory('Webinars', certificationsData.webinars);
  const webinarsContainer = document.getElementById('webinars');
  if (webinarsContainer) {
    webinarsContainer.innerHTML = webinarsHtml;
  }

  // Workshops
  const workshopsHtml = renderCertificationCategory('Workshops', certificationsData.workshops);
  const workshopsContainer = document.getElementById('workshops');
  if (workshopsContainer) {
    workshopsContainer.innerHTML = workshopsHtml;
  }

  // Conferences
  const conferencesHtml = renderCertificationCategory('Conferences', certificationsData.conferences);
  const conferencesContainer = document.getElementById('conferences');
  if (conferencesContainer) {
    conferencesContainer.innerHTML = conferencesHtml;
  }

  // Invited Talks
  const invitedTalksHtml = renderCertificationCategory('Invited Talks', certificationsData.invitedTalks);
  const invitedTalksContainer = document.getElementById('invited-talks');
  if (invitedTalksContainer) {
    invitedTalksContainer.innerHTML = invitedTalksHtml;
  }
}

// Close modal when clicking outside
window.addEventListener('click', function (event) {
  const modal = document.getElementById('certificateModal');
  if (event.target === modal) {
    closeCertificateModal();
  }
});

// Load certifications when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  renderCertifications();
});
