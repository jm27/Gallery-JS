function Gallery(gallery) {
  if (!gallery) {
    throw new Error(" No Gallery found");
  }
  // Save passed reference div
  this.gallery = gallery;
  // Select all images from index file
  this.images = Array.from(gallery.querySelectorAll("img"));
  this.modal = document.querySelector(".modal");
  this.prevButton = this.modal.querySelector(".prev");
  this.nextButton = this.modal.querySelector(".next");

  // Bind methods to instance when we need them
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  // Event Listeners
  this.images.forEach((image) =>
    image.addEventListener("click", (e) => this.showImage(e.currentTarget))
  );

  this.images.forEach((image) => {
    // Attach an event listener for each image
    image.addEventListener("keyup", (e) => {
      // When that key is up'd, check it it was enter key
      if (e.key === "Enter") {
        // if it was enter show image in modal
        this.showImage(e.currentTarget);
      }
    });
  });

  // modal.addEventListener("click", handleClickOutside);
}

Gallery.prototype.openModal = function () {
  console.log("opening modal");

  // Check if modal is already open
  if (this.modal.matches(".open")) {
    console.info("modal already open");
    return;
  }
  this.modal.classList.add("open");

  // Event Listeners
  window.addEventListener("keyup", this.handleKeyUp);
  this.nextButton.addEventListener("click", this.showNextImage);
  this.prevButton.addEventListener("click", this.showPrevImage);
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove("open");
  // add event listeners for clicks and keyboard
  window.removeEventListener("keyup", this.handleKeyUp);
  this.nextButton.removeEventListener("click", () => this.showNextImage());
  this.prevButton.removeEventListener("click", this.showPrevImage);
  // console.log("modal closed!");
};

Gallery.prototype.handleClickOutside = function (e) {
  if (e.target === e.currentTarget) {
    this.closeModal();
  }
};

Gallery.prototype.handleKeyUp = function (e) {
  if (e.key === "Escape") this.closeModal();
  if (e.key === "ArrowRight") this.showNextImage();
  if (e.key === "ArrowLeft") this.showPrevImage();
};

Gallery.prototype.showNextImage = function () {
  this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
};
Gallery.prototype.showPrevImage = function () {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

Gallery.prototype.showImage = function (el) {
  if (!el) {
    console.info("no image to show");
    return;
  }
  // update modul with info
  console.log(el);
  this.modal.querySelector("img").src = el.src;
  this.modal.querySelector("h2").textContent = el.title;
  this.modal.querySelector("figure p").textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
};

const gallery1 = new Gallery(document.querySelector(".gallery1"));
const gallery2 = new Gallery(document.querySelector(".gallery2"));
