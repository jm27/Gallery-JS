function Gallery(gallery) {
  if (!gallery) {
    throw new Error(" No Gallery found");
  }
  // Select all images from index file
  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");

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
  }

  images.forEach((image) =>
    image.addEventListener("click", (e) => showImage(e.currentTarget))
  );
  console.log(images);
}

const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
