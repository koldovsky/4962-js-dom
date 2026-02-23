export const stickers = [
    {
        id: 1,
        name: 'Baby Yoda',
        price: 10.99,
        description: 'A cute sticker of Baby Yoda from The Mandalorian.',
        image: 'img/baby-yoda.svg'
    },
    {
        id: 2,
        name: 'Banana',
        price: 8.99,
        description: 'A funny banana sticker with character.',
        image: 'img/banana.svg'
    },
    {
        id: 3,
        name: 'Girl',
        price: 9.99,
        description: 'A stylish girl character sticker.',
        image: 'img/girl.svg'
    },
    {
        id: 4,
        name: 'Viking',
        price: 11.99,
        description: 'A fierce viking warrior sticker.',
        image: 'img/viking.svg'
    }
];

const productListContainer = document.querySelector('.products__list');

function renderProductList(products) {
    const productHtmls = [];
    for (const product of products) {
        const productHtml = `
            <article class="products__item">
                <img class="products__image" src="${product.image}" alt="${product.name}">
                <h3 class="products__name">${product.name}</h3>
                <p class="products__description">${product.description}</p>
                <div class="products__actions">
                    <button class="products__button products__button--info button button-card">
                        Info
                    </button>
                    <button class="products__button products__button--buy button button-card">
                        Buy for ${product.price}
                    </button>
                </div>
            </article>
        `;
        productHtmls.push(productHtml);
    }
    productListContainer.innerHTML = productHtmls.join('');
}

renderProductList(stickers);