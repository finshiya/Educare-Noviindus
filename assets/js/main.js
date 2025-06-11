document.querySelectorAll('.navmenu .dropdown .dropdown > a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    // Close other dropdowns if you want only one open at a time
    document.querySelectorAll('.navmenu .dropdown .dropdown').forEach(item => {
      if (item !== this.parentElement) {
        item.classList.remove('active');
      }
    });

    // Toggle the clicked one
    this.parentElement.classList.toggle('active');
  });
});


(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 10 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();









document.querySelectorAll('.read-more-btn').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.previousElementSibling; // Find the content <p>
    const moreText = content.querySelector('.more-text');
    const dots = content.querySelector('.dots');

    if (moreText.style.display === 'none' || !moreText.style.display) {
      moreText.style.display = 'inline';
      dots.style.display = 'none';
      button.textContent = 'Read Less';
    } else {
      moreText.style.display = 'none';
      dots.style.display = 'inline';
      button.textContent = 'Read More';
    }
  });
});




// send mail function
function sendEmail(event) {
  event.preventDefault(); 

  const loadingElement = document.querySelector('.loading');
  const successMessageElement = document.querySelector('.sent-message');
  const errorMessageElement = document.querySelector('.error-message');

  loadingElement.style.display = 'block';
  successMessageElement.style.display = 'none';
  errorMessageElement.style.display = 'none';

  let params = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };

  emailjs.send("service_3vjecj7", "template_u5r3ss4", params).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);

      loadingElement.style.display = "none";
      successMessageElement.style.display = "block";

      setTimeout(() => {
        successMessageElement.style.display = "none";
      }, 3000);

      document.getElementById("emailForm").reset();
    },
    function (error) {
      console.log("FAILED...", error);

      loadingElement.style.display = "none";
      errorMessageElement.style.display = "block";

      setTimeout(() => {
        errorMessageElement.style.display = "none";
      }, 3000);
    }
  );
}