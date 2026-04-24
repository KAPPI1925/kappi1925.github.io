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

function renderOthersItems(items) {
  return items.map((item, index) => {
    // Support both certificatePath and certificatePaths
    let paths = [];
    if (item.certificatePaths) {
      paths = item.certificatePaths;
    } else if (item.certificatePath) {
      paths = Array.isArray(item.certificatePath) ? item.certificatePath : [item.certificatePath];
    }

    // Store cert data globally
    const certId = 'cert_' + (++certDataCounter);
    window.certDataStore[certId] = { paths, title: item.title };

    return `
    <div class="others-item">
      <div class="others-content">
        <div class="others-left">
          <h3 class="others-title">${item.title}</h3>
          <div class="others-meta">
            <p class="others-type"><strong>Type:</strong> ${item.type}</p>
            <p class="others-year"><strong>Year:</strong> ${item.year}</p>
          </div>
          <p class="others-description">${item.description}</p>
        </div>
        <div class="others-right">
          <div class="others-image-card" onclick="openCertificateModal(window.certDataStore['${certId}'].paths, window.certDataStore['${certId}'].title)" style="cursor: pointer;">
            <img src="${paths[0]}" alt="${item.title}" class="others-image" />
          </div>
        </div>
      </div>
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

  // Courses (standalone section)
  const coursesHtml = renderCertificationCategory('Courses', certificationsData.courses);
  const coursesContainer = document.getElementById('courses-standalone');
  if (coursesContainer) {
    coursesContainer.innerHTML = coursesHtml;
  }

  // Trainings (standalone section)
  const trainingsHtml = renderCertificationCategory('Trainings', certificationsData.trainings);
  const trainingsContainer = document.getElementById('trainings-standalone');
  if (trainingsContainer) {
    trainingsContainer.innerHTML = trainingsHtml;
  }

  // Webinars (standalone section)
  const webinarsHtml = renderCertificationCategory('Webinars', certificationsData.webinars);
  const webinarsContainer = document.getElementById('webinars-standalone');
  if (webinarsContainer) {
    webinarsContainer.innerHTML = webinarsHtml;
  }

  // Workshops (standalone section)
  const workshopsHtml = renderCertificationCategory('Workshops', certificationsData.workshops);
  const workshopsContainer = document.getElementById('workshops-standalone');
  if (workshopsContainer) {
    workshopsContainer.innerHTML = workshopsHtml;
  }

  // Conferences (standalone section)
  const conferencesHtml = renderCertificationCategory('Conferences', certificationsData.conferences);
  const conferencesContainer = document.getElementById('conferences-standalone');
  if (conferencesContainer) {
    conferencesContainer.innerHTML = conferencesHtml;
  }

  // Invited Talks (standalone section)
  const invitedTalksHtml = renderCertificationCategory('Invited Talks', certificationsData.invitedTalks);
  const invitedTalksContainer = document.getElementById('invited-talks-standalone');
  if (invitedTalksContainer) {
    invitedTalksContainer.innerHTML = invitedTalksHtml;
  }

  // Hackathons (standalone section)
  const hackathonHtml = renderCertificationCategory('Hackathons', certificationsData.hackathon);
  const hackathonContainer = document.getElementById('hackathon-standalone');
  if (hackathonContainer) {
    hackathonContainer.innerHTML = hackathonHtml;
  }

  // Awards (standalone section)
  const awardsHtml = renderCertificationCategory('Awards', certificationsData.awards);
  const awardsContainer = document.getElementById('awards-standalone');
  if (awardsContainer) {
    awardsContainer.innerHTML = awardsHtml;
  }

  // Others (special rendering for expandable cards with image preview)
  const othersHtml = renderOthersItems(certificationsData.others || []);
  const othersContainer = document.getElementById('others');
  if (othersContainer) {
    othersContainer.innerHTML = othersHtml;
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

// Load certifications when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  renderCertifications();
});
