document.addEventListener("DOMContentLoaded", function () {

  const items = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;

  function updateCarousel() {
    items.forEach((item, index) => {
      item.classList.remove("active", "left", "right");

      if (index === currentIndex) {
        item.classList.add("active");
      } else if (
        index === (currentIndex - 1 + items.length) % items.length
      ) {
        item.classList.add("left");
      } else if (
        index === (currentIndex + 1) % items.length
      ) {
        item.classList.add("right");
      }
    });
  }

  function moveToNext() {
    if (items.length > 0) {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    }
  }

  if (items.length > 0) {
    updateCarousel();
    setInterval(moveToNext, 3000);
  }

  function smoothScrollToSection(event, sectionId) {
    event.preventDefault();

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  const goToHomeLink = document.getElementById("gotofirst");
  const goToAboutLink = document.getElementById("gotoabout");
  const goToContactLink = document.getElementById("gotocontact");
  const goToReviewsLink = document.getElementById("gotoreviews");

  if (goToHomeLink) {
    goToHomeLink.addEventListener("click", function(event) {
      smoothScrollToSection(event, "first");
    });
  }

  if (goToAboutLink) {
    goToAboutLink.addEventListener("click", function(event) {
      smoothScrollToSection(event, "programming-languages");
    });
  }

  if (goToContactLink) {
    goToContactLink.addEventListener("click", function(event) {
      smoothScrollToSection(event, "contact");
    });
  }

  if (goToReviewsLink) {
    goToReviewsLink.addEventListener("click", function(event) {
      smoothScrollToSection(event, "about");
    });
  }

  const butoni10 = document.getElementById("shiko");

  if (butoni10) {
    butoni10.addEventListener("click", function(event) {
      smoothScrollToSection(event, "features");
    });
  }

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

      event.preventDefault();

      const formData = new FormData(contactForm);

      const button = contactForm.querySelector(
        "button[type='submit']"
      );

      if (!button) return;

      const originalButton = button.innerHTML;

      button.disabled = true;
      button.innerHTML = "<span>Sending...</span>";

      try {

        const response = await fetch("send.php", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (result.success) {

          contactForm.style.opacity = "0";
          contactForm.style.transform = "translateY(15px)";

          setTimeout(function() {

            contactForm.innerHTML = `
              <div class="contact-success">

                <div class="success-icon">
                  ✓
                </div>

                <h2>Thank You!</h2>

                <p>
                  Your message has been received successfully.
                  I'll get back to you as soon as possible.
                </p>

              </div>
            `;

            contactForm.style.opacity = "1";
            contactForm.style.transform = "translateY(0)";

          }, 300);

        } else {

          alert(result.message);

          button.disabled = false;
          button.innerHTML = originalButton;

        }

      } catch (error) {

        console.error(error);

        alert("Something went wrong. Please try again.");

        button.disabled = false;
        button.innerHTML = originalButton;

      }

    });

  }

  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const slides = document.querySelectorAll(".portfolio-item");

  let index = 0;

  function showSlide() {

    const offset = -index * 100;

    slides.forEach(slide => {
      slide.style.transform = `translateX(${offset}%)`;
    });

  }

  if (slides.length > 0) {

    if (nextBtn) {

      nextBtn.addEventListener("click", function() {

        if (index < slides.length - 1) {
          index++;
        } else {
          index = 0;
        }

        showSlide();

      });

    }

    if (prevBtn) {

      prevBtn.addEventListener("click", function() {

        if (index > 0) {
          index--;
        } else {
          index = slides.length - 1;
        }

        showSlide();

      });

    }

    showSlide();

    setInterval(function() {

      if (index < slides.length - 1) {
        index++;
      } else {
        index = 0;
      }

      showSlide();

    }, 4000);

  }

  const feedbackBtn =
    document.getElementById("feedbackBtn");

  const feedbackModal =
    document.getElementById("feedbackModal");

  const closeFeedback =
    document.getElementById("closeFeedback");

  if (feedbackBtn && feedbackModal) {

    feedbackBtn.addEventListener("click", function(event) {

      event.preventDefault();

      feedbackModal.classList.add("active");

      document.body.style.overflow = "hidden";

    });

  }

  if (closeFeedback && feedbackModal) {

    closeFeedback.addEventListener("click", function() {

      feedbackModal.classList.remove("active");

      document.body.style.overflow = "";

    });

  }

  if (feedbackModal) {

    feedbackModal.addEventListener("click", function(event) {

      if (event.target === feedbackModal) {

        feedbackModal.classList.remove("active");

        document.body.style.overflow = "";

      }

    });

  }

  const feedbackForm =
    document.querySelector("#feedbackModal form");

  if (feedbackForm && feedbackModal) {

    feedbackForm.addEventListener("submit", function(event) {

      event.preventDefault();

      feedbackForm.style.opacity = "0";

      setTimeout(function() {

        feedbackForm.innerHTML = `
          <div class="feedback-success">

            <div class="success-icon">
              ✓
            </div>

            <h2>Thank You!</h2>

            <p>
              Thank you for your feedback.
              We really appreciate your time.
            </p>

            <button
              type="button"
              id="successClose"
            >
              Close
            </button>

          </div>
        `;

        feedbackForm.style.opacity = "1";

        const successClose =
          document.getElementById("successClose");

        if (successClose) {

          successClose.addEventListener(
            "click",
            function() {

              feedbackModal.classList.remove("active");

              document.body.style.overflow = "";

              setTimeout(function() {
                location.reload();
              }, 300);

            }
          );

        }

      }, 250);

    });

  }

});