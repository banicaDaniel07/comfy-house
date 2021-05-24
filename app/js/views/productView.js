
class ProductView {
    
    _parent = document.querySelector('.product__spinner');

    _generateMarkup = (item) => {
        return (`<div class="product__content" id="product" data-index=${item.id}>
                <img src="${item.imageUrl}" alt="product" class="product__image">
                <h1 class="product__name">${item.title}</h1>
                <h3 class="product__price">$ ${item.price}</h3>
                <div class="product__add-button  "><i class="fas fa-shopping-cart"></i> ADD TO CART</div>
                <!--<div class="product__add-button  ">IN CART</div> -->
            </div> 
        `)
    }

    _generateContainerMarkup = () => {
        return(
            `<div class="product__container container" id="products__container">
            </div>`
        )
    }
    
    _generateSpinerMarkup = () => {
        return(
            `
            <div class="product__spinner__container">
                <div class="load__spinner">Loading...</div>
            </div>
            `
        );
    };

    clearSpinner() {
        this._parent.innerHTML = '';
        this._parent.insertAdjacentHTML('beforeend', this._generateContainerMarkup());

    }

    renderSpinner() {
        this._parent.insertAdjacentHTML('beforeend', this._generateSpinerMarkup());
    }

    render = (item) => {
        const parent = document.querySelector('#products__container');
        parent.insertAdjacentHTML('beforeend', this._generateMarkup(item));
    }
}

export default new ProductView;