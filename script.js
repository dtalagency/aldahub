// Back to Top Button functionality
const backToTopButton = document.getElementById('back-to-top');

window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
};

backToTopButton.onclick = function() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

// Mobile Hamburger Menu Toggle
const hamburgerMenu = document.getElementById('hamburger-menu');
const navbarMenu = document.getElementById('navbar-menu');

hamburgerMenu.addEventListener('click', function() {
  navbarMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navbarMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navbarMenu.classList.contains('active')) {
      navbarMenu.classList.remove('active');
    }
  });
});

// Service Carousel Pagination
const serviceCarousel = document.getElementById('service-carousel');
const serviceItems = serviceCarousel.querySelectorAll('.service');
const servicePagination = document.getElementById('service-pagination');

// Generate dots dynamically
// This part only runs if the screen is mobile (<= 768px)
if (window.innerWidth < 768) {
  serviceItems.forEach((item, index) => {
    const dot = document.createElement('div');
    dot.classList.add('pagination-dot');
    dot.dataset.index = index; // Store index for reference
    servicePagination.appendChild(dot);

    dot.addEventListener('click', () => {
      const targetItem = serviceItems[index];
      // Get the computed padding-left of the scroll container
      const containerPaddingLeft = parseFloat(getComputedStyle(serviceCarousel).paddingLeft);
      
      // Calculate the scroll position: item's offsetLeft minus container's padding-left
      // This aligns the *visual start* of the item with the *visual start* of the scrollable area
      const targetScrollLeft = targetItem.offsetLeft - containerPaddingLeft;
      
      serviceCarousel.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    });
  });
}


const paginationDots = servicePagination.querySelectorAll('.pagination-dot');

// Function to update active dot based on scroll position
function updateActiveDot() {
  if (window.innerWidth >= 768) { // Only run on mobile (or smaller screens)
    paginationDots.forEach(dot => dot.classList.remove('active')); // Remove active from all dots
    servicePagination.style.display = 'none'; // Hide pagination on desktop
    return; // Exit if not on mobile
  } else {
    servicePagination.style.display = 'flex'; // Show pagination on mobile
  }

  const carouselScrollLeft = serviceCarousel.scrollLeft;
  const containerPaddingLeft = parseFloat(getComputedStyle(serviceCarousel).paddingLeft);
  
  let activeIndex = 0;
  let minDistance = Infinity;

  serviceItems.forEach((item, index) => {
    // Calculate the item's start position relative to the scroll container's content area
    const itemVisualStart = item.offsetLeft - containerPaddingLeft;
    
    // Distance from current scroll position to where this item should be
    const distance = Math.abs(carouselScrollLeft - itemVisualStart);

    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = index;
    }
  });

  paginationDots.forEach((dot, index) => {
    if (index === activeIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Initial active dot setup
updateActiveDot();

// Update active dot on scroll
serviceCarousel.addEventListener('scroll', updateActiveDot);

// FAQ Accordion (Mobile Only)
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', function() {
    if (window.innerWidth < 768) { // Only enable on mobile
      const answer = this.nextElementSibling; // The .faq-answer div
      const icon = this.querySelector('.faq-icon');

      // Close other open accordions
      document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
        if (otherAnswer !== answer && otherAnswer.style.maxHeight) {
          otherAnswer.style.maxHeight = null;
          otherAnswer.previousElementSibling.querySelector('.faq-icon').classList.remove('fa-minus');
          otherAnswer.previousElementSibling.querySelector('.faq-icon').classList.add('fa-plus');
        }
      });

      if (answer.style.maxHeight) {
        answer.style.maxHeight = null; // Collapse
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px"; // Expand
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    }
  });
});

// Footer Accordion (Mobile Only)
const footerToggles = document.querySelectorAll('.footer-toggle');

footerToggles.forEach(toggle => {
  toggle.addEventListener('click', function() {
    if (window.innerWidth < 768) { // Only enable on mobile
      const content = this.nextElementSibling; // The .footer-content div
      const icon = this.querySelector('.toggle-icon');

      if (content.style.maxHeight) {
        content.style.maxHeight = null; // Collapse
        icon.textContent = '+';
      } else {
        // Close other open accordions
        document.querySelectorAll('.footer-content').forEach(otherContent => {
          if (otherContent !== content && otherContent.style.maxHeight) {
            otherContent.style.maxHeight = null;
            otherContent.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
          }
        });
        content.style.maxHeight = content.scrollHeight + "px"; // Expand
        icon.textContent = '-';
      }
    }
  });
});

// Handle resize event for all accordions and service carousel pagination
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    // Reset footer accordions for desktop
    document.querySelectorAll('.footer-content').forEach(content => {
      content.style.maxHeight = null; // Remove maxHeight
      const icon = content.previousElementSibling.querySelector('.toggle-icon');
      if (icon) icon.textContent = ''; // Remove icon
    });
    // Reset FAQ accordions for desktop
    document.querySelectorAll('.faq-answer').forEach(answer => {
      answer.style.maxHeight = null; // Remove maxHeight
      const icon = answer.previousElementSibling.querySelector('.faq-icon');
      if (icon) {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      }
    });
    servicePagination.style.display = 'none'; // Hide pagination on desktop
  } else {
    // Ensure accordions are collapsed and icons are correct on mobile
    document.querySelectorAll('.footer-content').forEach(content => {
      if (!content.style.maxHeight) { // Only if not already expanded by user
        content.previousElementSibling.querySelector('.toggle-icon').textContent = '+'; // Ensure + icon
      }
    });
    document.querySelectorAll('.faq-answer').forEach(answer => {
      if (!answer.style.maxHeight) { // Only if not already expanded by user
        const icon = answer.previousElementSibling.querySelector('.faq-icon');
        if (icon) {
          icon.classList.remove('fa-minus');
          icon.classList.add('fa-plus');
        }
      }
    });
    servicePagination.style.display = 'flex'; // Show pagination on mobile
  }
  updateActiveDot(); // Re-evaluate active dot for services on resize
});

// Initial state for footer and FAQ on load (if loaded on mobile)
window.addEventListener('load', () => {
  if (window.innerWidth < 768) {
    document.querySelectorAll('.footer-content').forEach(content => {
      content.style.maxHeight = null; // Ensure collapsed on load
      content.previousElementSibling.querySelector('.toggle-icon').textContent = '+'; // Ensure + icon
    });
    document.querySelectorAll('.faq-answer').forEach(answer => {
      answer.style.maxHeight = null; // Ensure collapsed on load
      const icon = answer.previousElementSibling.querySelector('.faq-icon');
      if (icon) {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      }
    });
    // Generate dots for service carousel only on mobile load
    serviceItems.forEach((item, index) => {
      const dot = document.createElement('div');
      dot.classList.add('pagination-dot');
      dot.dataset.index = index; // Store index for reference
      servicePagination.appendChild(dot);

      dot.addEventListener('click', () => {
        const targetItem = serviceItems[index];
        const containerPaddingLeft = parseFloat(getComputedStyle(serviceCarousel).paddingLeft);
        const targetScrollLeft = targetItem.offsetLeft - containerPaddingLeft;
        
        serviceCarousel.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      });
    });
    updateActiveDot(); // Initial active dot setup for mobile
  } else {
    document.querySelectorAll('.footer-content').forEach(content => {
      content.style.maxHeight = null; // Ensure expanded on desktop
      const icon = content.previousElementSibling.querySelector('.toggle-icon');
      if (icon) icon.textContent = ''; // No icon on desktop
    });
    document.querySelectorAll('.faq-answer').forEach(answer => {
      answer.style.maxHeight = null; // Ensure expanded on desktop
      const icon = answer.previousElementSibling.querySelector('.faq-icon');
      if (icon) {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      }
    });
    servicePagination.style.display = 'none'; // Hide pagination on desktop
  }
});
