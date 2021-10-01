//get query param
const params = new URLSearchParams(window.location.search);
const id = +params.get("id");

//get data from global store
const data = app.getTransactionDetails(id);

//return to accoutn if not found
if (!data) location.href = "../index.html";

//set account name
const accountName = document.getElementById("accountNameLabel");
accountName.textContent = data.accountName;

//table body
const depositTBody = document.getElementById("depositTBody");

//on delete click
depositTBody.addEventListener("click", function (evt) {
  const element = evt.target;
  const onDeleteClick = element.classList.contains("delete");

  if (onDeleteClick) {
    app.deleteDeposit(id, +element.id);
    element.parentElement.parentElement.remove();
  }
});

//post deposit
const formDeposit = document.getElementById("formDeposit");
formDeposit.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const date = new Date();
  const data = {
    id: Date.now(),
    amount: this.amount.value,
    description: this.description.value,
    date: date.toLocaleDateString(),
  };

  //insert depost data
  app.addDeposit(id, data);

  //append new row data
  const row = app.createRow(data);
  depositTBody.appendChild(row);

  updatedBalance();

  this.reset();
});

//update current balance data
function updatedBalance() {
  const balance = app.currentAccountBalance(id);

  //set account name
  const accountName = document.getElementById("accountNameLabel");
  accountName.textContent = `${data.accountName}(${balance})`;
}

//render deposit data
(function initTable() {
  updatedBalance();

  data.deposit.forEach((item) => {
    const row = app.createRow(item);
    depositTBody.appendChild(row);
  });
})();
