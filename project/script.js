document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // Image zoom functionality
  const mainImage = document.getElementById('mainImage');
  const zoomIn = document.getElementById('zoomIn');
  const zoomOut = document.getElementById('zoomOut');
  const resetZoom = document.getElementById('resetZoom');
  
  let scale = 1;
  const ZOOM_STEP = 0.2;
  const MAX_ZOOM = 3;
  const MIN_ZOOM = 1;

  zoomIn.addEventListener('click', () => {
    if (scale < MAX_ZOOM) {
      scale += ZOOM_STEP;
      mainImage.style.transform = `scale(${scale})`;
    }
  });

  zoomOut.addEventListener('click', () => {
    if (scale > MIN_ZOOM) {
      scale -= ZOOM_STEP;
      mainImage.style.transform = `scale(${scale})`;
    }
  });

  resetZoom.addEventListener('click', () => {
    scale = 1;
    mainImage.style.transform = `scale(${scale})`;
  });

  // Smooth scrolling for navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      
      target.scrollIntoView({
        behavior: 'smooth'
      });

      // Update active nav link
      document.querySelectorAll('nav a').forEach(a => {
        a.removeAttribute('aria-current');
      });
      this.setAttribute('aria-current', 'page');
    });
  });

  // Interactive variant cards with animation
  const variantCards = document.querySelectorAll('.variant-card');
  variantCards.forEach(card => {
    card.addEventListener('click', () => {
      card.style.transform = 'scale(1.05)';
      setTimeout(() => {
        card.style.transform = 'translateY(-5px)';
      }, 200);
    });
  });

  // Scroll spy for navigation
  const sections = document.querySelectorAll('.section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('nav a').forEach(a => {
      a.removeAttribute('aria-current');
      if (a.getAttribute('href') === `#${current}`) {
        a.setAttribute('aria-current', 'page');
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('customizationForm');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const data = new FormData(form);
      const customizationDetails = {
        dimension: data.get('dimension'),
        power: data.get('power'),
        color: data.get('color'),
        additionalNotes: data.get('additionalNotes'),
      };
  
      console.log('Customization Submitted:', customizationDetails);
      alert('Votre personnalisation a été envoyée avec succès!');
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('customizationForm');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const data = new FormData(form);
      const customizationDetails = Object.fromEntries(data.entries());
  
      console.log('Customization Submitted:', customizationDetails);
      alert('Votre personnalisation a été envoyée avec succès!');
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const choice = document.getElementById('choice');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const nextButton = document.getElementById('nextButton');
    const formPage1 = document.getElementById('formPage1');
    const formPage2 = document.getElementById('formPage2');
    const additionalFields = document.getElementById('additionalFields');
    const backButton = document.getElementById('backButton');
    const submitButton = document.getElementById('submitButton');
  
    // Enable "Suivant" only when all fields are filled
    const validatePage1 = () => {
      const isFormValid =
        choice.value && // Check if a valid choice is selected
        firstName.value.trim() && // Check if the first name is non-empty
        lastName.value.trim() && // Check if the last name is non-empty
        email.value.trim(); // Check if the email is non-empty
      
      console.log({
        choice: choice.value,
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        isFormValid,
      });
      
      nextButton.disabled = !isFormValid;
    };
  
    [choice, firstName, lastName, email].forEach((field) => {
      field.addEventListener('input', validatePage1); // For `input` and `email`
    });
    
    choice.addEventListener('change', validatePage1); // Specifically for dropdown
    
  
    // Navigate to the next page
    nextButton.addEventListener('click', () => {
      const selected = choice.value;
  
      // Clear previous additional fields
      additionalFields.innerHTML = '';
  
      // Create new fields based on the choice
      if (selected === 'complaint') {
        additionalFields.innerHTML = `
          <label for="complaintDetails">Détails de la plainte:</label>
          <textarea id="complaintDetails" name="complaintDetails" rows="4" placeholder="Expliquez votre plainte" required></textarea>
        `;
      } else if (selected === 'request') {
        additionalFields.innerHTML = `
          <label for="requestDetails">Détails de la demande/question:</label>
          <textarea id="requestDetails" name="requestDetails" rows="4" placeholder="Expliquez votre demande ou question" required></textarea>
        `;
      } else if (selected === 'simpleMessage') {
        additionalFields.innerHTML = `
          <label for="simpleMessage">Votre message:</label>
          <textarea id="simpleMessage" name="simpleMessage" rows="4" placeholder="Écrivez votre message" required></textarea>
        `;
      }
  
      // Show the second page and hide the first
      formPage1.style.display = 'none';
      formPage2.style.display = 'block';
    });
  
    // Navigate back to the first page
    backButton.addEventListener('click', () => {
      formPage1.style.display = 'block';
      formPage2.style.display = 'none';
    });
  
    // Handle form submission
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
  
      const formData = new FormData(document.querySelector('#client-form'));
      const formDetails = Object.fromEntries(formData.entries());
  
      console.log('Form Submitted:', formDetails);
      alert('Votre formulaire a été soumis avec succès!');
    });
  });
  
});