document.addEventListener('DOMContentLoaded', function () {
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.dataset.productId;
            window.location.href = `single-product.html?id=${productId}`;
        });
    });
});
// API
fetch('https://fl-power.no/exam/wp-json/wc/v3/products?consumer_key=ck_3ff46144f22e06ae275285802b5b282129a841f2&consumer_secret=cs_ae3ebd41e2a7ef6caba586991663ac0e05bf6c2a')
    .then(response => response.json())
    .then(products => {
        const productContainer = document.querySelector('.product-list');
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
            productItem.appendChild(p);
            productItem.appendChild(span);
            productItem.appendChild(a);

            productContainer.appendChild(productItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

    document.addEventListener("DOMContentLoaded", function () {
        // Get the product ID from the query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
    
        // Fetch data for the specific product using the product ID
        fetch(`https://fl-power.no/exam/wp-json/wc/v3/products/${productId}?consumer_key=ck_3ff46144f22e06ae275285802b5b282129a841f2&consumer_secret=cs_ae3ebd41e2a7ef6caba586991663ac0e05bf6c2a`)
            .then(response => response.json())
            .then(product => {
                // Update the product details on the page
                document.getElementById('productName').textContent = product.name;
                document.getElementById('productDescription').textContent = product.description;
                document.getElementById('productPrice').textContent = `$${product.price}`;
            })
            .catch(error => console.error('Error fetching product details:', error));
    });