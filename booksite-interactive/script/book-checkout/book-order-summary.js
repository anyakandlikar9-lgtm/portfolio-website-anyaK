import { cart, BookRemovedFromCart, calculateCartQuantity, updateQuantity, bookDeliveryUpdate } from '../../data/book-cart.js';
import { products, getBook } from '../../data/book-product.js';
import { formatBookCurrency } from '../money/book-money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliverBookOpt } from '../../data/delivery-book.js';
import { bookPaymentSummary } from './book-payemnt-summary.js';

export function bookOrderSummary () {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
  
    console.log('Cart product:', productId);
  
    const matchingProduct = getBook(productId);
  
    console.log('Matching product:', matchingProduct);
  
    const deliveryOptionId = cartItem.deliveryOptionId;

   const deliveryOption = getDeliverBookOpt(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML += `
      <div class="cart-item-container
       js-book-cart-book-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.showPrice()}
            </div>
            <div class="product-quantity
              js-book-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link"
              data-product-id="${matchingProduct.id}">
                Update
              </span>

              <input type="number" min="1"
              class="quantity-input js-quantity-input-${matchingProduct.id}"
              value="${cartItem.quantity}">
              <span
              class="save-quantity-link js-save-quantity-link"
              data-product-id="${matchingProduct.id}">
              Save
              </span>
              <span class="delete-quantity-link
               link-primary js-delete-quantity-link
               js-book-delete-${matchingProduct.id}
               "
              data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML (matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption)=> {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatBookCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
        data-product-id = "${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
          ${isChecked ? 'checked': ''} class="delivery-option-input" name="${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    })
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        BookRemovedFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        if (container) container.remove();

        updateCartQuantity();

        bookPaymentSummary();
      });
    });

    function updateCartQuantity() {
      const cartQuantity = calculateCartQuantity();

      const returnToHome = document.querySelector('.js-return-to-home-link');
      if (returnToHome) {
        returnToHome.innerHTML = `${cartQuantity} items`
      }

      const cartQuantityEl = document.querySelector('.js-cart-quantity');
      if (cartQuantityEl) {
      cartQuantityEl.textContent = cartQuantity;
      }
    }
    updateCartQuantity();

    document.querySelectorAll('.js-update-link')
      .forEach((link) => {
        link.addEventListener(('click'), () => {
          const productId = link.dataset.productId;
          if(!productId) {
            console.error('Update link clicked but no productId on link', link);
            return;
          };

          const container = document.querySelector(`.js-cart-item-container-${productId}`)
          if (!container) {
            console.error('Could not find cart item container for productId', productId);
            return;
          }

          const quantityLabel = container.querySelector(`.js-quantity-label-${productId}`);
          const quantityInput = container.querySelector(`.js-quantity-input-${productId}`);

          if(quantityLabel && quantityInput) {
            const current = Number(quantityLabel.textContent) || 1;
            quantityInput.value = current;
          }

          container.classList.add('is-editing-quantity');

          bookPaymentSummary();
        });
      });

      document.querySelectorAll('.js-save-quantity-link')
        .forEach((link) => {
          link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            if(!productId) {
              console.error('Save link clicked but no productId on link', link);
              return;
            }

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            if(!container) {
              console.error('Could not find cart item container for productId:', productId);
              return;
            }

            const quantityInput = container.querySelector(`.js-quantity-input-${productId}`);
            if(!quantityInput) {
              console.error('Could not find quantity input for productId:', productId);
              return
            }

            let newQuantity = Number(quantityInput.value);
            if(!Number.isFinite (newQuantity)|| newQuantity < 1) {
              newQuantity =1;
            }
            newQuantity = Math.floor(newQuantity);

            updateQuantity(productId, newQuantity);

            const quantityLabel = container.querySelector(`.js-quantity-label-${productId}`);
            if(quantityLabel) {
              quantityLabel.innerHTML = newQuantity;
            }

            container.classList.remove
            ('is-editing-quantity');

            updateCartQuantity()
            bookPaymentSummary();
          });
        });
  
      document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
          element.addEventListener('click', ()=> {
            const {productId, deliveryOptionId} = element.dataset;
            bookDeliveryUpdate(productId, deliveryOptionId);
            bookOrderSummary();
            bookPaymentSummary();
          });
        });
    }


        

        