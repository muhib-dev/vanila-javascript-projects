//get query param
const params = new URLSearchParams(window.location.search);
const id = +params.get("id");

//get data from global store
const data = app.getTransactionDetails(id);

//return to accoutn if not found
if (!data) location.href = "../index.html";

//post deposit
const withdrawTBody = document.getElementById("withdrawTBody");

//on delete click
withdrawTBody.addEventListener("click", function (evt) {
  const element = evt.target;
  const onDeleteClick = element.classList.contains("delete");

  if (onDeleteClick) {
    app.deleteWithdraw(id, +element.id);
    element.parentElement.parentElement.remove();
  }
});

const formWithdraw = document.getElementById("formWithdraw");
formWithdraw.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const date = new Date();
  const data = {
    id: Date.now(),
    amount: this.amount.value,
    description: this.description.value,
    date: date.toLocaleDateString(),
  };

  //insert depost data
  app.addWithdraw(id, data);

  //append new row data
  const row = app.createRow(data);
  withdrawTBody.appendChild(row);

  updatedBalance();

  this.reset();
});

//update current balance data
function updatedBalance() {
  const balance = app.currentAccountBalance(id);

  //set account name
  const accountName = document.getElementById("accountNameLabel");
  formWithdraw.amount.max = balance;

  accountName.textContent = `${data.accountName}(${balance})`;
}

//render deposit data
(function initTable() {
  updatedBalance();

  data.withdraw.forEach((item) => {
    const row = app.createRow(item);
    withdrawTBody.appendChild(row);
  });
})();
