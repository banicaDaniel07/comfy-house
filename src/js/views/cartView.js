class CartView {
    
    _cartOverlay = document.querySelector('#cart');
    _cartMenu = document.querySelector('#cart__menu');
    _closeButton = document.querySelector('#close');
    _parent = document.querySelector('.cart__container');

    _genaerateItemMarkup = ({id, imageUrl, title, price, quantity}) => {
        return(
            `<div class="cart__item item" id="item" data-id=${id}>
                <div class="item__info">
                    <img src="${imageUrl}" alt="item" class="item__image">
                    <div class="item__infos">
                        <h3 class="item__name">${title}</h3>
                        <h4 class="item__price">$ ${price}</h4>
                    </div>
                </div>
                <div class="item__count">
                    <i class="fas fa-chevron-up" id="increase__item"></i>
                    <span class="item__count__number">${quantity}</span>
                    <i class="fas fa-chevron-down" id="decrease__item"></i>
                </div>
            </div>`
        )
    }


updateCountCart = (clicked, quantity) => {
    
    clicked.querySelector('.item__count__number').textContent = quantity;
}

addCloseButtonHandler(handler) {
    this._closeButton.addEventListener( 'click', handler);
}

addDecreaseItemHandeler(handler) {
    
    const decreaseItems = document.querySelectorAll('#decrease__item');
    decreaseItems.forEach( item => item.addEventListener( 'click', handler));
}

addClearHandeler(handler) {
document.querySelector('.cart__clear').addEventListener( 'click', handler);
}

addIncreaseItemHandeler(handler) {
    
    const increaseItems = document.querySelectorAll('#increase__item');
    increaseItems.forEach( item => item.addEventListener( 'click', handler));
}


hideCart = (e) => {
    if(e) {
        e.preventDefault();
    }
        this._cartMenu.classList.remove('slide-in');
        this._cartMenu.classList.add('slide-out');
        setTimeout( () => {
            this._cartOverlay.classList.remove('fade-in');
            this._cartOverlay.classList.add('fade-out');
        } , 300); 
    }
    
showCart = (e = null) => {
    if(e) {
        e.preventDefault();
    }
        this._cartOverlay.classList.add('fade-in');
        this._cartOverlay.classList.remove('fade-out');
        setTimeout( () => {
            this._cartMenu.classList.add('slide-in');
            this._cartMenu.classList.remove('slide-out');
        } , 200); 
    }

clearCart = () => {
    this._parent.innerHTML = '';
} 

renderCart = (item) => {
    this._parent.insertAdjacentHTML( 'beforeend' , this._genaerateItemMarkup(item));
} 

showTotal(total) {
    document.querySelector('.cart__total__text').textContent = total;
}


}

export default new CartView;