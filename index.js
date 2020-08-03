function Gallery(gallery) {
  if (!gallery) {
    throw new Error(" No Gallery found");
  }
  // Select all images from index file
  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");
  let currentImage;

  function openModal() {
    console.log("opening modal");

    // Check if modal is already open
    if (modal.matches(".open")) {
      console.info("modal already open");
      return;
    }
    modal.classList.add("open");

    // Event Listeners
    window.addEventListener("keyup", handleKeyUp);
    nextButton.addEventListener("click", showNextImage);
    prevButton.addEventListener("click", showPrevImage);
  }

  function closeModal() {
    modal.classList.remove("open");
    // add event listeners for clicks and keyboard
    window.removeEventListener("keyup", handleKeyUp);
    nextButton.removeEventListener("click", showNextImage);
    prevButton.removeEventListener("click", showPrevImage);
    // console.log("modal closed!");
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(e) {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") showNextImage();
    if (e.key === "ArrowLeft") showPrevImage();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }
  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(el) {
    if (!el) {
      console.info("no image to show");
      return;
    }
    // update modul with info
    console.log(el);
    modal.querySelector("img").src = el.src;
    modal.querySelector("h2").textContent = el.title;
    modal.querySelector("figure p").textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }
  // Event Listeners
  images.forEach((image) =>
    image.addEventListener("click", (e) => showImage(e.currentTarget))
  );

  images.forEach((image) => {
    // Attach an event listener for each image
    image.addEventListener("keyup", (e) => {
      // When that key is up'd, check it it was enter key
      if (e.key === "Enter") {
        // if it was enter show image in modal
        showImage(e.currentTarget);
      }
    });
  });

  // modal.addEventListener("click", handleClickOutside);
}

const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
