const shoppingCart = (function () {
  // Private methods
  let cart = [];

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Load cart from localStorage
  const loadCart = function () {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  };

  //get local store data on page loaded
  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  //* Public methods and properties
  const obj = {};

  // get cart data
  obj.getCart = function () {
    return [...cart];
  };

  // Add to cart
  obj.addItemToCart = function (product) {
    const found = cart.some((el) => el.productId === product.productId);

    if (!found) {
      cart.push(product);
      saveCart();
    }

    return found;
  };

  // input quantity
  obj.inputQuantity = function (id, quantity) {
    let linetotal = 0;

    for (let item in cart) {
      if (cart[item].productId === id) {
        cart[item].quantity = quantity;
        cart[item].lineTotal = cart[item].price * cart[item].quantity;

        linetotal = cart[item].lineTotal;
        break;
      }
    }

    saveCart();

    return linetotal;
  };

  // Remove product from cart
  obj.removeProduct = function (id) {
    for (let item in cart) {
      if (cart[item].productId === id) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  // get added product
  obj.getProductById = function (id) {
    for (let i in cart) {
      if (cart[i].productId === id) {
        return cart[i];
      }
    }
    return null;
  };

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  };

  //total quantity Count cart
  obj.totalQuantityCount = function () {
    var totalCount = 0;
    for (let item in cart) {
      totalCount += cart[item].quantity;
    }
    return totalCount;
  };

  // Total amount cart
  obj.totalAmountCart = function () {
    let totalCart = 0;
    for (let item in cart) {
      totalCart += cart[item].price * cart[item].quantity;
    }
    return Number(totalCart.toFixed(2));
  };

  return obj;
})();

//load cart on storage change on other tabs
// window.addEventListener("storage", function (e) {
//   //update cart to all opened tabs
// });
