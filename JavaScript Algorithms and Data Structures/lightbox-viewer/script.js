const galleryImages = document.querySelectorAll("img.gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("#lightbox-image");
const lightboxContent = lightbox.querySelector("#caption");
const numberText = lightbox.querySelector(".number-text");
const demoImages = document.querySelectorAll("img.demo");
const closeBtn = lightbox.querySelector("#close-btn");
const prevBtn = lightbox.querySelector(".prev");
const nextBtn = lightbox.querySelector(".next");

let currentIndex = 0;

/* Open and close the lightbox */
function openLightbox() {
  lightbox.style.display = "flex";
}

function closeLightbox() {
  lightbox.style.display = "none";
}

/* RRender the selected image and update the UI */
function renderImage(image, index) {
  currentIndex = index;

  demoImages.forEach((demoImage) => demoImage.classList.remove("active"));
  demoImages[currentIndex].classList.add("active");

  lightboxImage.src = image.src.replace("-thumbnail", "");
  lightboxContent.textContent = image.alt || "No caption available";
  numberText.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
}

/* Show the image in the lightbox when an image is clicked */
function showImage(image, index) {
  openLightbox();
  renderImage(image, index);
}

/* Image navigation */
function handlePrevious() {
  currentIndex =
    currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
  renderImage(galleryImages[currentIndex], currentIndex);
}

function handleNext() {
  currentIndex =
    currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
  renderImage(galleryImages[currentIndex], currentIndex);
}

/* Event listeners */
galleryImages.forEach((image, index) =>
  image.addEventListener("click", () => showImage(image, index)),
);

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

prevBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  handlePrevious();
});

nextBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  handleNext();
});

demoImages.forEach((demoImage, index) => {
  demoImage.addEventListener("click", () => renderImage(demoImage, index));
});

document.addEventListener("keydown", (event) => {
  if (lightbox.style.display === "flex") {
    if (event.key === "ArrowLeft") handlePrevious();
    if (event.key === "ArrowRight") handleNext();
    if (event.key === "Escape") closeLightbox();
  }
});