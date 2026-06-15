export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 299
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 799
}];

export function getDeliverBookOpt(deliveryOptionId) {
  let deliveryOption;
  
  deliveryOptions.forEach((bookOption) => {
    if(bookOption.id === deliveryOptionId) {
      deliveryOption = bookOption;
    };
   });

   return deliveryOption || deliveryOptions[0];
}