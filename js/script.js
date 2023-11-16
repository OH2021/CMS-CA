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