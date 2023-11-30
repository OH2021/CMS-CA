// single-product.js

function fetchSingleProduct(productId) {
    return fetch(`https://fl-power.no/exam/wp-json/wc/v3/products/${productId}?consumer_key=ck_3ff46144f22e06ae275285802b5b282129a841f2&consumer_secret=cs_ae3ebd41e2a7ef6caba586991663ac0e05bf6c2a`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Product not found');
            }
            return response.json();
        });
}

function updateProductDetails(product) {
    const productNameElement = document.getElementById('productName');
    const productPriceElement = document.getElementById('productPrice');
    const productDescriptionElement = document.getElementById('productDescription');

    if (productNameElement && productPriceElement && productDescriptionElement) {
        productNameElement.textContent = product.name;
        productPriceElement.textContent = `$${product.price}`;
        const descriptionDiv = document.createElement('div');
        descriptionDiv.innerHTML = product.description;
        productDescriptionElement.textContent = descriptionDiv.textContent;
    } else {
        console.error('Error: Product details elements not found.');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const url = new URL(window.location.href);
    const productId = url.searchParams.get('id');

    console.log('Product ID from URL:', productId);

    if (productId) {
        fetchSingleProduct(productId)
            .then(product => {
                updateProductDetails(product);
            })
            .catch(error => console.error('Error fetching product details:', error));
    } else {
        console.error('Error: Product ID not found in the URL.');
    }
});
