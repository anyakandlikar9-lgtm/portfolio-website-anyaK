export let cart;

reloadStorage();

export function reloadStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart) {
    cart = [{
      productId: 'book-one',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: 'book-ten',
      quantity: 1,
      deliveryOptionId: '2'
    }]
  }
}

export function addBookToCart (productId, quantity = 1) {
  let matchingItem;

  cart.forEach((cartItem)=> {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'
    })
  };

  bookStorageSave();
}

export function BookRemovedFromCart (productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId != productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  bookStorageSave()
}

export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

function bookStorageSave() {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function updateQuantity (productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;

  bookStorageSave();
}

export function bookDeliveryUpdate(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem)=> {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  bookStorageSave();
}