// Importing YAML parser
const yaml = require('js-yaml');

// Function to fetch YAML file and parse it
async function fetchYAML() {
  try {
    const response = await fetch('template/assets/Vinicius_Guerra_e_Ribas_CV.yaml');
    const yamlText = await response.text();
    const data = yaml.load(yamlText);
    updateResume(data);
  } catch (error) {
    console.error('Error fetching or parsing YAML file:', error);
  }
}

// Function to update the HTML content with parsed YAML data
function updateResume(data) {
  document.querySelector('.resume-name').textContent = data.cv.name;
  document.querySelector('.resume-role-title').textContent = 'Data Engineer | Data Science and Analytics | Python Developer';

  const contactList = document.querySelector('.resume-contact-list');
  contactList.innerHTML = `
    <li class="list-inline-item me-md-3 me-lg-5">
      <i class="resume-contact-icon bi bi-whatsapp me-2"></i>
      <a href="https://wa.me/${data.cv.phone.replace(/tel:/, '')}">${data.cv.phone}</a>
    </li>
    <li class="list-inline-item me-md-3 me-lg-5">
      <i class="resume-contact-icon bi bi-google me-2"></i>
      <a href="mailto:${data.cv.email}">${data.cv.email}</a>
    </li>
  `;

  const educationSection = document.querySelector('.resume-educate-section ul');
  educationSection.innerHTML = data.cv.sections.education.map(edu => `
    <li class="mb-2">
      <div class="resume-degree font-weight-bold">${edu.degree} in ${edu.area}</div>
      <div class="resume-degree-org">${edu.institution}</div>
      <div class="resume-degree-time">${edu.start_date} - ${edu.end_date}</div>
    </li>
  `).join('');

  // Similarly, update other sections like work experience, skills, etc.
}

// Fetch and update the resume on page load
window.onload = fetchYAML;
