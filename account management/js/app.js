/****self invoke function for private variable and method */
const app = (function () {
  /**global variable for store data */
  let localDb = [];

  //save data
  function saveData() {
    localStorage.setItem("db-account-management", JSON.stringify(localDb));
  }

  //save data
  function getData() {
    const data = localStorage.getItem("db-account-management");
    localDb = JSON.parse(data) || [];
  }

  //check account is unique
  function isAccountExist(accountName, id) {
    if (id) {
      return localDb.some(
        (item) =>
          toLower(item.accountName) === toLower(accountName) && item.id !== id
      );
    }

    return localDb.some(
      (item) => toLower(item.accountName) === toLower(accountName)
    );
  }

  //lowercase Characters
  function toLower(text) {
    return text.toLowerCase();
  }

  //create table row
  function createTableRow(data) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
      <td>
        <span title="click to edit" id="${data.id}" data-old="${data.accountName}" class="on-edit">${data.accountName}</span>
      </td>
      <td>${data.accountBalance}</td>
      <td>
        <span id="${data.id}" class="delete">Delete</span>
      </td>
      <td>
        <a href="./pages/deposit.html?id=${data.id}">Deposit</a>
      </td>
      <td>
        <a href="./pages/withdraw.html?id=${data.id}">Withdraw</a>
      </td>
    </tr>`;

    return tr;
  }

  //current balance
  function currentBalance(id) {
    const account = localDb.find((item) => item.id === id);
    return account.accountBalance;
  }

  //load saved data to table on page loaded
  function initTableData() {
    //get all data to local variable
    getData();

    if (!localDb.length) return;

    const fragment = document.createDocumentFragment();

    localDb.forEach((item) => {
      const row = createTableRow(item);
      fragment.appendChild(row);
    });

    tBody.appendChild(fragment);
  }

  //public methods
  const obj = {};

  //**ACCOUNT */
  //total balance
  obj.totalAccountBalance = function () {
    return localDb.reduce((prev, curr) => prev + curr.accountBalance, 0) || 0;
  };

  obj.initTable = initTableData;
  obj.isAccountExist = isAccountExist;

  //insert account
  obj.addAccount = function (objData) {
    objData.deposit = [];
    objData.withdraw = [];

    localDb.push(objData);
    saveData();
  };

  //delete account
  obj.deleteAccount = function (id) {
    const balance = currentBalance(id);
    if (balance > 0) return false;

    localDb = localDb.filter((item) => item.id !== id);
    saveData();

    return true;
  };

  //update account
  obj.updateAccount = function (id, editedAccount) {
    const index = localDb.findIndex((item) => item.id === id);
    localDb[index].accountName = editedAccount;

    saveData();
  };

  //create table row
  obj.createTableRow = createTableRow;

  //**DEPOSIT */
  //add deposit data
  obj.addDeposit = function (id, data) {
    const index = localDb.findIndex((item) => item.id === id);

    const amount = +data.amount;

    localDb[index].accountBalance += amount;
    localDb[index].deposit.push(data);

    saveData();
  };

  //delete deposit record
  obj.deleteDeposit = function (accointId, depositId) {
    const index = localDb.findIndex((item) => item.id === accointId);
    const account = localDb[index];

    account.deposit = account.deposit.filter((item) => item.id !== depositId);
    saveData();
  };

  //**WITHDRAW */
  //add withdraw data
  obj.addWithdraw = function (id, data) {
    const index = localDb.findIndex((item) => item.id === id);

    const amount = +data.amount;

    localDb[index].accountBalance -= amount;
    localDb[index].withdraw.push(data);

    saveData();
  };

  //delete deposit record
  obj.deleteWithdraw = function (accointId, withdrawId) {
    const index = localDb.findIndex((item) => item.id === accointId);
    const account = localDb[index];

    account.withdraw = account.deposit.filter((item) => item.id !== withdrawId);
    saveData();
  };

  //**common function deposit/withdraw*//
  //get Transaction Details by account id
  obj.getTransactionDetails = function (id) {
    getData();

    return localDb.find((item) => item.id === id) || null;
  };

  //create table row
  obj.createRow = function (data) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
      <td>${data.amount}</td>
      <td>${data.description}</td>
      <td>${data.date}</td>
      <td>
       <span id="${data.id}" class="delete">delete</span>
      </td>
    </tr>`;

    return tr;
  };

  //current account balance
  obj.currentAccountBalance = currentBalance;

  return obj;
})();
