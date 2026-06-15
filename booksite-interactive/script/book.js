import { addBookToCart, calculateCartQuantity } from "../data/book-cart.js";
import { products } from "../data/book-product.js" ;

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
          <img class="product-book-image"
          src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="books-rating">
          <img class="books-rating-stars"
          src="${product.rateStar()}">
          <div class="book-rate-count">
            ${product.rating.count}
          </div>
        </div>

        <div class="book-price">
          ${product.showPrice()}
        </div>

        <div class="book-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="add-to-cart">
          <img src="img/cart-check.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id = "${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  })

  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

    function updateCartQuantity() {
      const cartQuantity = calculateCartQuantity();
      const cartQuantityEl = document.querySelector('.js-cart-quantity');
      if(cartQuantityEl) {
        cartQuantityEl.textContent = cartQuantity
      }
    }
    updateCartQuantity();

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        const productContainer = button.closest ('.product-container');
        const quantitySelector = 
        productContainer.querySelector('select');
        const quantity = Number(quantitySelector.value);

        addBookToCart(productId, quantity);
        updateCartQuantity();

        const addedMessage = productContainer.querySelector('.add-to-cart');
        addedMessage.style.opacity = 1;
        setTimeout(()=> addedMessage.style.opacity = 0, 2000);
      });
    });

const searchBooks = document.querySelector('.js-search-bar');
const searchBooksButton = document.querySelector('.js-search-bt');

function booksToFind () {
  const question = searchBooks.value.toLowerCase().trim();
  const stories = document.querySelectorAll('.product-container');

  stories.forEach(story => {
    const bookTitle = story.querySelector('.product-name').textContent.toLowerCase();
    if(bookTitle.includes(question)) {
      story.style.display = 'flex';
    } else {
      story.style.display = 'none'
    }
  });
}

searchBooks.addEventListener('input', booksToFind);
searchBooksButton.addEventListener('click', booksToFind);

document.querySelectorAll('.product-container').forEach(container => {
  container.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-button')) return;
    if (e.target.closest('.book-quantity-container')) return;

    const productId = container.querySelector('.js-add-to-cart').dataset.productId;
    window.location.href = `bookDescriptions.html?id=${productId}`;
  });
});