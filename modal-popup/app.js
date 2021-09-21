const btnModal = document.getElementById("btn-open-modal");
const btnClose = document.querySelector(".close-popup");
const ModalContainer = document.getElementById("modal-popup");

//open modal click on btn
btnModal.addEventListener("click", function () {
  ModalContainer.classList.add("show");
});

//clse modal click on header close
btnClose.addEventListener("click", function () {
  ModalContainer.classList.remove("show");
});

//close modal click on outside modal
document.body.addEventListener("click", function (evt) {
  const element = evt.target;
  evt.stopPropagation();

  const onModalClick = element.classList.contains("show");
  if (!onModalClick) return;
  console.log("click");
  ModalContainer.classList.remove("show");
});
