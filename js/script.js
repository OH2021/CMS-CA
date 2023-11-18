document.addEventListener('DOMContentLoaded', function () {
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.dataset.productId;
            window.location.href = `single-product.html?id=${productId}`;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetchProductDetails(productId);
});

function fetchProductDetails(productId) {
    const productDetails = getDummyProductDetails(productId);

    displayProductDetails(productDetails);
}

function getDummyProductDetails(productId) {
    return {
        name: `Product ${productId}`,
        description: `Description of Product ${productId}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        price: `$${(productId * 10).toFixed(2)}`,
        image: `product${productId}.jpg` 
    };
}

function displayProductDetails(productDetails) {
    document.getElementById('productImage').src = productDetails.image;
    document.getElementById('productName').textContent = productDetails.name;
    document.getElementById('productDescription').textContent = productDetails.description;
    document.getElementById('productPrice').textContent = productDetails.price;
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData();
    addDataToWebsite(data);
  });

// API
document.addEventListener('DOMContentLoaded', () => {
    // Fetch product details from the WordPress API
    fetch('https://fl-power.no/exam/wp-json/wc/v3/products?consumer_key=ck_3ff46144f22e06ae275285802b5b282129a841f2&consumer_secret=cs_ae3ebd41e2a7ef6caba586991663ac0e05bf6c2a')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            const product = products[0];

            const productImage = document.getElementById('productImage');
            const productName = document.getElementById('productName');
            const productDescription = document.getElementById('productDescription');
            const productPrice = document.getElementById('productPrice');

            const imageUrl = product.images && product.images.length > 0 ? product.images[0].src : '';

            productImage.src = imageUrl || '';
            productName.textContent = product.name || 'Product Name';
            productDescription.innerHTML = product.description || 'Product Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            productPrice.textContent = `$${product.price || '0.00'}`;
        })
        .catch(error => console.error('Error fetching product details:', error));
});
