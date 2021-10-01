/**selectors */
const formAddAccount = document.getElementById("formAddAccount");
const tBody = document.getElementById("tBody");
const labelTotalBalance = document.getElementById("labelTotalBalance");

//submit add account
formAddAccount.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const accountName = this.accountName.value.trim();
  const isAccountName = app.isAccountExist(accountName);

  //check account name
  if (isAccountName) {
    alert(`'${accountName}' already inserted!`);
    return;
  }

  //insert data
  const objData = { id: Date.now(), accountName, accountBalance: 0 };
  app.addAccount(objData);

  //append data to table
  const row = app.createTableRow(objData);
  tBody.appendChild(row);

  //reset form
  this.reset();
});

//on edit/delete click
tBody.addEventListener("click", function (evt) {
  const element = evt.target;

  const onEditClick = element.classList.contains("on-edit");
  const onEditing = element.classList.contains("editing");
  const onDeleteClick = element.classList.contains("delete");

  if (onEditClick) {
    if (onEditing) return;

    element.classList.add("editing");
    element.setAttribute("contenteditable", true);
    element.focus();
  }

  if (onDeleteClick) {
    const isDeleted = app.deleteAccount(+element.id);

    if (!isDeleted) {
      alert("accout has balance and logs");
      return;
    }

    element.parentElement.parentElement.remove();
  }
});

//on edit focus out
tBody.addEventListener("focusout", function (evt) {
  getContentText(evt);
});

//focus out if press enter
tBody.addEventListener("keypress", function (evt) {
  if (evt.code === "Enter") {
    evt.preventDefault();

    getContentText(evt);

    return false;
  }
});

//get data from content
function getContentText(evt) {
  const element = evt.target;
  const onEditClick = element.classList.contains("on-edit");

  if (onEditClick) {
    element.classList.remove("editing");
    element.removeAttribute("contenteditable", true);

    const id = +element.id;
    const oldAccount = element.getAttribute("data-old");
    const editedAccount = element.textContent.trim();

    //if empty set the old value
    if (!editedAccount) {
      element.textContent = oldAccount;
      return;
    }

    const isAccount = app.isAccountExist(editedAccount, id);
    if (isAccount) {
      alert(`'${editedAccount}' already inserted!`);
      element.textContent = oldAccount;
      return;
    }

    app.updateAccount(id, editedAccount);
  }
}

//on loaded
app.initTable();
labelTotalBalance.textContent = app.totalAccountBalance();
