// THIS IS NOT THE CROSS-COURSE PROJECT!!! 
// I have spoken to Connor O'brien to only make a index.html and a single-product.html to use for this CA.
window.onload = function () {
    if (window.location.pathname === '/single-product.html') {
        const url = new URL(window.location.href);
        const productId = url.searchParams.get('id');

        console.log('Product ID from URL:', productId);

        if (productId) {
            const updateProductDetails = (product) => {
                console.log('Updating product details:', product);

                const productNameElement = document.getElementById('productName');
                const productPriceElement = document.getElementById('productPrice');

                if (productNameElement && productPriceElement) {
                    productNameElement.textContent = product.name;
                    productPriceElement.textContent = `$${product.price}`;
                } else {
                    console.error('Error');
                }
            };

            fetch(`https://fl-power.no/exam/wp-json/wc/v3/products/${productId}?consumer_key=ck_3ff46144f22e06ae275285802b5b282129a841f2&consumer_secret=cs_ae3ebd41e2a7ef6caba586991663ac0e05bf6c2a`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Product not found');
                    }
                    return response.json();
                })
                .then(product => {
                    updateProductDetails(product);
                })
                .catch(error => console.error('Error', error));
        } else {
            console.error('Error');
        }
    } else if (window.location.pathname === '/index.html') {
        fetch('https://fl-power.no/exam/wp-json/wc/v3/products?consumer_key=ck_3ff46144f22e06ae275285802b5b282129a841f2&consumer_secret=cs_ae3ebd41e2a7ef6caba586991663ac0e05bf6c2a')
            .then(response => response.json())
            .then(products => {
                const productContainer = document.querySelector('.product-list');

                if (productContainer) {
                    console.log('Product container found:', productContainer);

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
                        a.href = `single-product.html?id=${product.id}`;
                        a.classList.add('view-details-btn');
                        a.textContent = 'View Details';

                        productItem.appendChild(h2);
                        productItem.appendChild(span);
                        productItem.appendChild(a);

                        productContainer.appendChild(productItem);
                    });
                } else {
                    console.error('Error: Product container element not found.');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
};
