// URL of the JSON data
const url = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448';

fetch(url)
  .then(response => response.json())
  .then(data => {
    //title
    const title = data.product.title;
    const titleElement = document.querySelector('.headingText span');
    titleElement.textContent = title;
    //vendor
    const vendor = data.product.vendor;
    const vendorElement = document.querySelector('.headingText p');
    vendorElement.textContent = vendor;
    //description
    const description = data.product.description;
    const descriptionElement = document.querySelector('#description');
    descriptionElement.innerHTML = description;
    //size
    const sizes = data.product.options.filter(option => option.name === 'Size')[0].values;
    sizes.forEach((size, index) => {
      const radioButton = document.getElementById(`btn${index + 1}`).querySelector('input');
      radioButton.id = size.toLowerCase();
      radioButton.value = size;

      const label = document.getElementById(`btn${index + 1}`).querySelector('label');
      label.htmlFor = size.toLowerCase();
      label.textContent = size;
      //color
      const colors = data.product.options.filter(option => option.name === 'Color')[0].values;
        colors.forEach((color, index) => {
      const block = document.getElementById(`block${index + 1}`);
      block.style.backgroundColor = Object.values(color)[0];
    });
    //priceCalculation
    const currentPrice = Number(data.product.price.replace('$', ''));
    const discountedPrice = Number(data.product.compare_at_price.replace('$', ''));
    const percentOff = Math.round((1 - currentPrice / discountedPrice) * 100);

    const currentPriceElement = document.querySelector('.currentPrice');
    const discountedPriceElement = document.querySelector('.discounted');
    const percentOffElement = document.querySelector('.percentOff');

    currentPriceElement.textContent = `$${currentPrice.toFixed(2)}`;
    discountedPriceElement.textContent = `$${discountedPrice.toFixed(2)}`;
    percentOffElement.textContent = `${percentOff}% Off`;
    });

  })
  .catch(error => console.error('Error:', error));

// Select the quantity number and the increase and decrease buttons
const quantityNumber = document.getElementById('quantity-number');
const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');

increaseButton.addEventListener('click', () => {
  quantityNumber.textContent = Number(quantityNumber.textContent) + 1;
});

decreaseButton.addEventListener('click', () => {
  quantityNumber.textContent = Math.max(Number(quantityNumber.textContent) - 1, 1);
});

//update color
const colorButtons = document.querySelectorAll('.colorOptions button');
let chosenColor = '';
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        chosenColor = getComputedStyle(button).backgroundColor;
    });
});


//Add To Cart
const addToCartButton = document.querySelector('.btnCart');
addToCartButton.addEventListener('click', () => {
    const productTitle = document.querySelector('.headingText span').textContent;
    const onPurchaseSpan = document.querySelector('.onPurchase span');
    const chosenSizeRadio = document.querySelector('input[name="size"]:checked');
    let chosenSize = '';
    if (chosenSizeRadio) {
        chosenSize = chosenSizeRadio.id;
    }
    onPurchaseSpan.textContent = `${productTitle} with Color ${chosenColor} and Size ${chosenSize} added to cart`;
    onPurchaseSpan.parentElement.style.display = 'flex';
});

//Update the images
var mainImage = document.querySelector('.mainImageContainer img');
var smallImages = document.querySelectorAll('.smallImageContainer img');

smallImages.forEach(function(smallImage) {
  smallImage.addEventListener('click', function() {
    mainImage.src = this.src;
  });
});