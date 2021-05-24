class NavView {

    _cartButton = document.querySelector('#cart-button');

    addCartButtonHandler(handler){
        this._cartButton.addEventListener( 'click', handler);
    }

    showCount(number) {
        document.querySelector('.nav__cart__count').textContent = number;
    }
}

export default new NavView;