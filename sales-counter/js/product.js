const tbody = document.getElementById("tBody");

//get product from api/file
async function getData() {
  const response = await fetch("./js/products.json");
  const data = await response.json();

  buildTable(data);
}

//create table row
function createRow(item) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${item.code}</td>
    <td>${item.title}</td>
    <td>${item.purchasePrice}</td>
    <td>${item.price}</td>
    <td>${item.currentStock}</td>`;
  return tr;
}

//render table
function buildTable(products) {
  const fragment = document.createDocumentFragment();
  products.forEach((item) => {
    fragment.appendChild(createRow(item));
  });

  tbody.appendChild(fragment);
}

//call function on page loaded
getData();
