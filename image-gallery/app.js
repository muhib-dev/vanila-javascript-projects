//btn load more
const btnLoadMore = document.getElementById("btn-load-more");
btnLoadMore.addEventListener("click", setImages);

//set images to dom
const imageContainer = document.getElementById("grid");
function setImages() {
  const baseUrl = "https://source.unsplash.com/random/";
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 6; i++) {
    const img = document.createElement("img");
    img.classList.add("image");
    img.src = `${baseUrl}${getSizes()}`;
    fragment.appendChild(img);
  }

  imageContainer.appendChild(fragment);
}

//create sizes
function getSizes() {
  return `${sizeRandomNumber()}x${sizeRandomNumber()}`;
}

//get random size
function sizeRandomNumber() {
  return Math.floor(Math.random() * 10) + 380;
}

//init images on page loaded
setImages();

//show big image
const previewCard = document.querySelector(".preview-card");
const previewImg = previewCard.querySelector("img");
const totalImg = previewCard.querySelector(".total-img");
const closeIcon = previewCard.querySelector(".close-icon");
const shadow = document.querySelector(".shadow");

//settings variable
let images = [...document.querySelectorAll(".image")];
let currentIndex = 0;

//bind image
function renderImage() {
  totalImg.textContent = `Image ${currentIndex + 1} of ${images.length}`;
  previewImg.src = images[currentIndex].src;

  previewCard.classList.add("show");
  shadow.style.display = "block";
}

//on click image
imageContainer.addEventListener("click", function (evt) {
  const element = evt.target;
  const onImageClicked = element.classList.contains("image");

  if (!onImageClicked) return;

  images = [...document.querySelectorAll(".image")];
  currentIndex = images.indexOf(element);

  renderImage();
  previewCard.classList.add("show");
});

//preview btn
const prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex == 0) {
    prevBtn.style.display = "none";
  } else {
    nextBtn.style.display = "block";
  }
  renderImage();
});

//next btn
const nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex >= images.length - 1) {
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }
  renderImage();
});

//close preview
closeIcon.addEventListener("click", function () {
  prevBtn.style.display = "block";
  nextBtn.style.display = "block";
  shadow.style.display = "none";
  previewCard.classList.remove("show");
});
