function fetchAllProducts() {
    return fetch('https://fl-power.no/exam/wp-json/wc/v3/products?consumer_key=ck_3ff46144f22e06ae275285802b5b282129a841f2&consumer_secret=cs_ae3ebd41e2a7ef6caba586991663ac0e05bf6c2a')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return response.json();
        });
}

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

    if (productNameElement && productPriceElement) {
        productNameElement.textContent = product.name;
        productPriceElement.textContent = `$${product.price}`;
    } else {
        console.error('Error: Product details elements not found.');
    }
}

function displayProducts(products) {
    const productContainer = document.querySelector('.product-list');

    if (productContainer) {
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.setAttribute('data-product-id', product.id);

            const h2 = document.createElement('h2');
            h2.textContent = product.name;

            const p = document.createElement('p');
            p.textContent = product.description;

            const span = document.createElement('span');
            span.textContent = `$${product.price}`;

            const a = document.createElement('a');
            a.href = `single-product.html?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}`;
            a.classList.add('view-details-btn');
            a.textContent = 'View Details';

            productItem.appendChild(h2);
            productItem.appendChild(span);
            productItem.appendChild(a);

            productContainer.appendChild(productItem);
        });
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
        console.warn('No Product ID in the URL. Proceeding to fetch all products.');

        fetchAllProducts()
            .then(products => {
                displayProducts(products);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});
