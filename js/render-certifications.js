// Global storage for cert data
window.certDataStore = {};
let certDataCounter = 0;

function openCertificateModal(certificatePaths, title) {
  const modal = document.getElementById('certificateModal');
  const modalImagesContainer = document.getElementById('modalCertificateImagesContainer');
  const modalTitle = document.getElementById('modalCertificateTitle');

  modalTitle.textContent = title;
  
  // Handle both single path (string) and multiple paths (array)
  const paths = Array.isArray(certificatePaths) ? certificatePaths : [certificatePaths];
  
  // Generate image HTML for all paths
  const imagesHTML = paths.map(path => `<img src="${path}" alt="${title}" class="certificate-image">`).join('');
  modalImagesContainer.innerHTML = imagesHTML;
  
  modal.style.display = 'flex';
}

function closeCertificateModal() {
  const modal = document.getElementById('certificateModal');
  modal.style.display = 'none';
}

function renderCertificationCategory(category, items) {
  return items.map((cert, index) => {
    // Support both certificatePath (string/array) and certificatePaths (array)
    let paths = [];
    if (cert.certificatePaths) {
      paths = cert.certificatePaths;
    } else if (cert.certificatePath) {
      paths = Array.isArray(cert.certificatePath) ? cert.certificatePath : [cert.certificatePath];
    }
    
    // Store cert data globally
    const certId = 'cert_' + (++certDataCounter);
    window.certDataStore[certId] = { paths, title: cert.title };
    
    return `
    <div class="cert-item ${index === 0 ? 'featured-cert' : ''}">
      <div class="cert-title ${index === 0 ? 'featured-cert-title' : ''}" onclick="openCertificateModal(window.certDataStore['${certId}'].paths, window.certDataStore['${certId}'].title)" style="cursor: pointer;">
        <i class="fa fa-certificate"></i> ${cert.title}
      </div>
      <div class="cert-year">${cert.year}</div>
    </div>
  `;
  }).join('');
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

  // Hackathons
  const hackathonHtml = renderCertificationCategory('Hackathons', certificationsData.hackathon);
  const hackathonContainer = document.getElementById('hackathon');
  if (hackathonContainer) {
    hackathonContainer.innerHTML = hackathonHtml;
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
