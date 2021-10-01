//selctors
const countTotalCart = document.getElementById("count-total-cart");
const productGrid = document.querySelector(".product-grid");

//cart section
const cartContiner = document.querySelector(".cart-continer");
const cartCloaseIcon = document.getElementById("cart-close");
const cartItemContainer = document.getElementById("cart-item");
const cartTotalPrice = document.getElementById("cart-total-price");

//cart drawer open click
countTotalCart.addEventListener("click", function () {
  const totalQuantityCount = shoppingCart.totalQuantityCount();

  if (totalQuantityCount) {
    cartContiner.classList.toggle("cart-open");
    document.querySelector("body").classList.add("stop-scroll");
    return;
  }
});

//cart drawer close click
cartCloaseIcon.addEventListener("click", function (evt) {
  cartContiner.classList.remove("cart-open");
  document.querySelector("body").classList.remove("stop-scroll");
});

//**PRODUCTS*/
//create product
function createProduct(product) {
  const card = document.createElement("div");
  card.classList.add("product");

  card.innerHTML = `<img src="./images/${product.image}" alt="product image" />
  <div class="product-info">
    <h4>${product.name}</h4>
    <p>${product.price}/-</p>
    <button id="${product.productId}" data-name="${product.name}" data-price="${product.price}" data-img="${product.image}" class="add-to-cart">
      Add to Cart
    </button>
  </div>`;

  return card;
}

//init product
function initProducts() {
  const fragment = document.createDocumentFragment();

  //data from data.js file
  data.forEach((product) => {
    fragment.appendChild(createProduct(product));
  });

  productGrid.appendChild(fragment);
}

//show product
initProducts();

//*cart */
//on click add to cart button
productGrid.addEventListener("click", function (evt) {
  const element = evt.target;
  const onCartClicked = element.classList.contains("add-to-cart");

  if (!onCartClicked) return;

  const productId = element.id;
  const name = element.getAttribute("data-name");
  const price = +element.getAttribute("data-price");
  const image = element.getAttribute("data-img");

  const product = {
    productId,
    name,
    price,
    quantity: 1,
    lineTotal: price,
    image,
  };

  showAddedMessage(element, true);

  const isAdded = shoppingCart.addItemToCart(product);
  if (isAdded) {
    showAddedMessage(element, isAdded);
    return;
  }

  cartItemContainer.appendChild(createCartItem(product));
  renderCartCountPrice();
});

//show added cart
function showAddedMessage(element, isAdded) {
  element.textContent = isAdded ? "Product Added" : "Add to Cart";
  const addedClass = element.classList.contains("product-added");

  if (!addedClass) {
    if (isAdded) element.classList.add("product-added");

    setTimeout(function () {
      element.classList.remove("product-added");
      element.textContent = "Add to Cart";
    }, 3000);
  }
}

//render total count and price
function renderCartCountPrice() {
  const totalQuantityCount = shoppingCart.totalQuantityCount();
  const totalAmountCart = shoppingCart.totalAmountCart();

  countTotalCart.textContent = `Cart (${totalQuantityCount})`;
  cartTotalPrice.textContent = `${totalAmountCart}/-`;
}

//create Cart Item
function createCartItem(product) {
  const item = document.createElement("div");
  item.classList.add("list-item");

  item.innerHTML = `<img src="./images/${product.image}" alt="${product.name}" />
  <div>
    <p>${product.name}</p>
    <strong>${product.price}</strong>
    x <input id="${product.productId}" class="quantity" min="1" value="${product.quantity}" type="number" required /> =
    <strong>${product.lineTotal}/-</strong>
  </div>
  <button id="${product.productId}" class="btn-remove-item" type="button">x</button>`;

  return item;
}

//bind to cart container
function initCartItems() {
  const cartList = shoppingCart.getCart();
  const fragment = document.createDocumentFragment();

  cartList.forEach((product) => {
    fragment.appendChild(createCartItem(product));
  });

  cartItemContainer.appendChild(fragment);
  renderCartCountPrice();
}

//delete cart item
cartItemContainer.addEventListener("click", function (evt) {
  const element = evt.target;
  const onRemove = element.classList.contains("btn-remove-item");

  if (!onRemove) return;

  shoppingCart.removeProduct(element.id);
  element.parentElement.remove();

  const totalQuantityCount = shoppingCart.totalQuantityCount();

  if (!totalQuantityCount) {
    cartContiner.classList.remove("cart-open");
  }

  renderCartCountPrice();
});

//input quantity
cartItemContainer.addEventListener("input", function (evt) {
  const element = evt.target;
  const onQuantity = element.classList.contains("quantity");

  if (!onQuantity) return;

  const id = element.id;
  const quantity = +element.value;

  if (quantity < 1) return;

  const lineTotal = shoppingCart.inputQuantity(id, quantity);
  element.nextElementSibling.textContent = `${lineTotal}/-`;
  renderCartCountPrice();
});

//load cart item to cart container
initCartItems();

//****CHECKOUT */
const formCart = document.getElementById("formCart");
formCart.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const body = {
    cartList: shoppingCart.getCart(),
    totalAmount: shoppingCart.totalAmountCart(),
  };

  //submit data to server
  console.log(body);

  //claer the local store
  //shoppingCart.clearCart();
});
