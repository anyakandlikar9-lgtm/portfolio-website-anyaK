import {cart, calculateCartQuantity} from '../../data/book-cart.js';
import { getBook } from '../../data/book-product.js'
import { getDeliverBookOpt } from '../../data/delivery-book.js';
import { formatBookCurrency } from '../money/book-money.js'


export function bookPaymentSummary() {
  let bookPriceCents = 0;
  let bookShippingPrice = 0;

  cart.forEach((cartItem) => {
    const bookProduct = getBook(cartItem.productId);
    bookPriceCents += bookProduct.priceCents * cartItem.quantity;

    const bookDelivery = getDeliverBookOpt(cartItem.deliveryOptionId);
    bookShippingPrice += bookDelivery.priceCents
  });

  const taxCentsTotalBefore = bookPriceCents + bookShippingPrice;

  const taxInCents = taxCentsTotalBefore * 0.1;

  const totalBookCents = taxCentsTotalBefore + taxInCents;

  const bookPaymentSummaryHTML = `
    <div class="payment-summary-title">
      Order-summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">
      $${formatBookCurrency(bookPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatBookCurrency(bookShippingPrice)}</div>
    </div>

    <div class = "payment-summary-row subtotal-row">
      <div>Total Before Tax:</div>
      <div class="payment-summary-money">
      $${formatBookCurrency(taxCentsTotalBefore)}
      </div>
    </div>      

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatBookCurrency(taxInCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order Total:</div>
      <div class="payment-summary-money">$${formatBookCurrency(totalBookCents)}</div>
    </div>

    <a class="check-order" href="thankyou.html">
      <button class="place-order-button primary-button">
        Place your Order
      </button>
    </a>
  `;

  document.querySelector('.js-book-payment-summary')
    .innerHTML = bookPaymentSummaryHTML;
} 