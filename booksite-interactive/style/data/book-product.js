import {formatBookCurrency} from '../script/money/book-money.js'

export function getBook(productId) {
  let matchingProduct;

    products.forEach((product) => {
      if(product.id === productId) {
        matchingProduct = product;
      }
    })
    return matchingProduct;
}

class BookProduct {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(bookDetails) {
    this.id = bookDetails.id
    this.image = bookDetails.image
    this.name = bookDetails.name
    this.rating = bookDetails.rating
    this.priceCents = bookDetails.priceCents
  }

  rateStar() {
    return `img/ratings/rating-${this.rating.stars * 10}.png`;
  }

  showPrice() {
    return `$${formatBookCurrency(this.priceCents)}`;
  }
}

const bookp1 = new BookProduct({
  id:"book-one",
  image:"img/book/trending-booke-one.png",
  name: "My First Love",
  rating: {
    stars: 4.5,
    count: 829
  },
  priceCents: 1310,
  keywords: [
    "books",
    "urban-fantasy"
  ]
});

export const products = [
  {
    id:"book-one",
    image:"img/book/trending-booke-one.png",
    name: "My First Love",
    rating: {
      stars: 4.5,
      count: 829
    },
    priceCents: 1310,
    keywords: [
      "books",
      "cozy-fantasy"
    ]
  },
  {
    id: "book-two",
    image: "img/book/trending-booke-two.png",
    name: "The Very Last Hope",
    rating: {
      stars: 4.5,
      count: 523
    },
    priceCents: 1670,
    keywords: [
      "books",
      "romantasy"
    ]
  },
  {
    id: "book-three",
    image: "img/book/trending-booke-three.png",
    name: "Purple Sky Book",
    rating: {
      stars: 4.5,
      count: 120
    },
    priceCents: 1130,
    keywords: [
      "books",
      "contemporary-romance",
      "magical-realism"
    ]
  }, 
  {
    id: "book-four",
    image: "img/book/trending-booke-four.png",
    name: "Secrets",
    rating: {
      stars: 4,
      count: 338
    },
    priceCents: 1518,
    keywords: [
      "books",
      "thriller",
      "mystery"
    ]
  }, 
  {
    id: "book-five",
    image:"img/book/trending-booke-five.png",
    name: "My Story",
    rating: {
      stars: 5,
      count: 876
    }, 
    priceCents: 1998,
    keywords: [
      "books",
      "feminism"
    ]
  }, 
  {
    id: "book-six",
    image: "img/book/trending-booke-six.png",
    name: "Paradox",
    rating: {
      stars: 4,
      count: 995
    },
    priceCents: 1834,
    keywords:[
      "books",
      "feminism",
      "emotional"
    ]
  },
  {
    id:"book-seven",
    image:"img/book/trending-booke-seven.png",
    name:"The Bride Story",
    rating: {
      stars:3,
      count:262
    },
    priceCents:1326,
    keywords:[
      "books",
      "fantasy",
      "paranormal romance",
    ]
  },
  { 
    id:"book-eight",
    image:"img/book/trending-booke-eight.png",
    name: "My little Secret",
    rating:{
      stars: 4,
      count: 434
    },
    priceCents: 1290,
    keywords: [
      "books",
      "sad",
      "contemporary-romance"
    ]
  },
  {
    id:"book-nine",
    image:"img/book/trending-booke-nine.png",
    name: "Friends",
    rating: {
      stars: 5,
      count: 669
    },
    priceCents: 1990,
    keywords: [
      "books",
      "contemporary-romance"
    ]
  }, 
  {
    id: "book-ten",
    image: "img/book/trending-booke-ten.png",
    name: "Different World",
    rating: {
      stars: 3,
      count: 700
    },
    priceCents: 1473,
    keywords: [
      "books",
      "romance",
      "psychological-fiction"
    ]
  },
  {
    id: "book-eleven",
    image:"img/book/trending-booke-eleven.png",
    name: "Echoes of myself",
    rating: {
      stars: 4.5,
      count:116
    },
    priceCents: 1145,
    keywords:[
      "books",
      "cozy-fantasy",
      "romantasy"
    ]
  },
  {
    id:"book-twelve",
    image:"img/book/trending-booke-twelve.png",
    name:"Notebook",
    rating:{
      stars:4,
      count:260
    },
    priceCents: 1085,
    keywords:[
      "books",
      "romance",
      "magical-realism",
      "urban-fantasy"
    ]
  }, {
    id:"book-thirteen",
    image:"img/book/trending-booke-thirteen.png",
    name:"My Recpie Book",
    rating: {
      stars: 3.5,
      count: 330
    },
    priceCents: 1545,
    keywords: [
      "books",
      "mystery",
      "thriller"
    ]
  }, 
  {
    id: "book-fourteen",
    image: "img/book/trending-booke-fourteen.png",
    name: "My Personal Diary",
    rating: {
      stars: 4.5,
      count: 900
    },
    priceCents: 2000,
    keywords:[
      "books",
      "historical-romance",
      "comedy"
    ]
  },{
    id: "book-fifteen",
    image: "img/book/trending-booke-fifteen.png",
    name: "Bedtime Story",
    rating: {
      stars: 4,
      count: 755
    },
    priceCents: 1560,
    keywords:[
      "books",
      "romantasy"
    ]
  }, 
  {
    id: "book-sixteen",
    image: "img/book/trending-booke-sixteen.png",
    name: "The Family Stories",
    rating: {
      stars: 3.5,
      count: 933
    },
    priceCents: 1810,
    keywords:[
      "books",
      "non-fiction",
      "memoir"
    ]
  }, 
  {
    id: "book-seventeen",
    image: "img/book/trending-booke-seventeen.png",
    name: "Heart",
    rating: {
      stars: 5,
      count: 968
    },
    priceCents: 1833,
    keywords:[
      "books",
      "romantasy"
    ]
  }, 
  {
    id: "book-eighteen",
    image: "img/book/trending-booke-eighteen.png",
    name: "The Broken Mirror",
    rating: {
      stars: 4.5,
      count: 999
    },
    priceCents: 1795,
    keywords:[
      "books",
      "literary-fiction",
      "feminist literature'"
    ]
  }
].map((bookDetails) => {
  return new BookProduct(bookDetails);
});






