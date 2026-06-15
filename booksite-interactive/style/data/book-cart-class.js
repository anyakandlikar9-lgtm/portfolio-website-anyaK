class BookCart {
  bookCartItems;
  #localSKey;

  constructor(localSKey) {
    this.#localSKey = localSKey;
    this.#reloadStorage();
  }

  #reloadStorage () {
    this.bookCartItems = JSON.parse(localStorage.getItem(this.#localSKey));
  
    if(!this.bookCartItems) {
      this.bookCartItems = [{
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

  saveToStorage() {
    localStorage.setItem(this.#localSKey, JSON.stringify(this.bookCartItems));
  }

  addToCart (productId, quantity) {
    let matchingItem;
  
    this.bookCartItems.forEach((cartItem)=> {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.bookCartItems.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
      })
    };
  
    this.saveToStorage();
  }

  removeFromCart (productId) {
    const newCart = [];
  
    this.bookCartItems.forEach((cartItem) => {
      if(cartItem.productId != productId) {
        newCart.push(cartItem);
      }
    });
    this.bookCartItems = newCart;
  
    this.saveToStorage()
  }

  calculateCartQuantity(){
    let cartQuantity = 0;
  
    this.bookCartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

   updateQuantity (productId, newQuantity) {
    let matchingItem;
  
    this.bookCartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
  
    this.saveToStorage();
  }

  updateDeliveryOption(productId,    deliveryOptionId) {
    let matchingItem;
  
    this.bookCartItems.forEach((cartItem)=> {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }
}

const cart = new BookCart('cart-oop');
const businessPurchasesCart = new BookCart('cart-business');

console.log(cart);
console.log(businessPurchasesCart);
console.log(businessPurchasesCart instanceof BookCart);