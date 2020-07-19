function Gallery(gallery) {
  if (!gallery) {
    throw new Error(" No Gallery found");
  }
  // Select all images from index file
  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");

  function openModal() {
    console.log("opening modal");

    // Check if modal is already open
    if (modal.matches(".open")) {
      console.info("modal already open");
      return;
    }
    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
    // add event listeners for clicks and keyboard
    console.log("modal closed!");
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(e) {
    if (e.key === "Escape") closeModal();
  }

  function showNextImage() {}

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

  modal.addEventListener("click", handleClickOutside);
  window.addEventListener("keyup", handleKeyUp);
  nextButton.addEventListener("click", showNextImage);
  console.log(images);
}

const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
