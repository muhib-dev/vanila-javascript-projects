(function () {
  //store product cart data
  let storage = [];

  //selectors
  const formAddProduct = document.getElementById("formAddProduct");
  const tbody = document.getElementById("tBody");
  const codeError = formAddProduct.querySelector("#code-error-message");

  const formPayment = document.getElementById("formPayment");
  const setTotalAmountLabel = formPayment.querySelector(".total-price");
  const setPayableLabel = formPayment.querySelector(".total-payable");
  const inputDiscount = formPayment.inputDiscount;
  const inputPaid = formPayment.inputPaid;

  //get product from api/file
  const getProductByCode = async (code) => {
    const response = await fetch("./js/products.json");
    const data = await response.json();

    return data.find((item) => item.code === code);
  };

  // add product to list
  formAddProduct.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    const code = +this.code.value;

    const product = await getProductByCode(code);
    if (!product) {
      codeError.textContent = `'${this.code.value}' product not found!`;
      return;
    }

    //check product already added or not
    const isAdded = storage.some((item) => item.code == code);
    if (isAdded) {
      codeError.textContent = `'${code}' code already added!`;
      return;
    }

    //save to local variable
    product.quantity = 1;
    product.lineTotal = product.price.toFixed(2);

    storage.push(product);

    //save to session store
    saveData();

    //add table row
    tbody.appendChild(createRow(product));

    //set total price
    setTotalPrice();

    // reset input and error
    this.reset();

    //reset
    resetDom();
  });

  //create table row
  function createRow(item) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <small>${item.code}</small>
        <p>${item.title}</p>
      </td>
      <td>৳${item.price}</td>
      <td class="text-center">
        <input id="${item.id}" data-price="${item.price}" class="quantity" type="number" value="${item.quantity}" min="1" max="${item.currentStock}">
      </td>
      <td class="text-right line-total">৳${item.lineTotal}</td>
      <td class="text-center"><i id="${item.id}" class="remove fas fa-trash"></i></td>`;
    return tr;
  }

  //render table
  function initTable() {
    getData();

    const fragment = document.createDocumentFragment();
    storage.forEach((item) => {
      fragment.appendChild(createRow(item));
    });

    tbody.appendChild(fragment);

    //set Total Price
    setTotalPrice();

    resetDom();
  }

  //sum total product price
  function sumTotalPrice() {
    return storage.reduce((total, currentValue) => {
      return total + currentValue.price * currentValue.quantity;
    }, 0);
  }

  //set total amount
  function setTotalPrice() {
    const total = sumTotalPrice();
    setTotalAmountLabel.textContent = `৳${total.toFixed(2)}`;
    setPayableLabel.textContent = `৳${total.toFixed(2)}`;
  }

  //reset input
  function resetDom() {
    codeError.textContent = "";
    inputDiscount.value = "";
    inputPaid.value = "";
  }

  //remove product
  tbody.addEventListener("click", function (evt) {
    const element = evt.target;
    const onRemove = element.classList.contains("remove");
    if (!onRemove) return;

    storage = storage.filter((item) => item.id !== +element.id);
    saveData();

    //remove row
    element.parentElement.parentElement.remove();

    //set total price
    setTotalPrice();

    //reset
    resetDom();
  });

  //update product quantity
  tbody.addEventListener("focusout", function (evt) {
    const element = evt.target;
    const onQuantity = element.classList.contains("quantity");
    if (!onQuantity) return;

    const id = +element.id;
    const max = +element.max;
    const quantity = +element.value;
    const price = +element.getAttribute("data-price");
    const setLineTotal = element.parentElement.nextElementSibling;

    //check quantity no more than stock
    if (quantity < 1 || max < quantity) {
      element.classList.add("invalid");
      return;
    }

    const lineTotal = quantity * price;
    setLineTotal.textContent = `৳${lineTotal.toFixed(2)}`;

    element.classList.remove("invalid");

    storage = storage.map((obj) =>
      obj.id === id ? { ...obj, quantity, lineTotal } : obj
    );

    saveData();

    //sum total price
    setTotalPrice();

    //reset
    resetDom();
  });

  //save data to browser store
  function saveData() {
    sessionStorage.setItem("sales-counter-store", JSON.stringify(storage));
  }

  //get data from browser store
  function getData() {
    const sessionStore = sessionStorage.getItem("sales-counter-store");
    if (!sessionStore) return;

    storage = JSON.parse(sessionStore);
  }

  //input discount
  inputDiscount.addEventListener("input", function () {
    const total = sumTotalPrice();
    const payable = (total - +this.value).toFixed(2);

    this.max = total;
    inputPaid.value = "";
    inputPaid.max = payable;

    setPayableLabel.textContent = `৳${payable}`;
  });

  //submit data to server
  formPayment.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const totalAmount = sumTotalPrice();

    if (!totalAmount) return;

    const model = {
      productList: storage,
      totalAmount,
      discount: +inputDiscount.value,
      paidAmount: +inputPaid.value,
    };

    document.getElementById("model-code-demo").textContent =
      "open console to see data";
    console.log(model);
  });

  //on page loaded
  initTable();
})();

//disable wheel in number type input
document.addEventListener("wheel", () => {
  if (document.activeElement.type === "number") document.activeElement.blur();
});
