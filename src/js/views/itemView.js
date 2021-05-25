class ItemView {


    addInsertButtonHandler(handler){
        const buttons = document.querySelectorAll('.product__add-button');
        buttons.forEach(button => button.addEventListener('click', handler));
    }

    addItemToCartHandler() {
        
    }
    
    mouseOver(handler) {

        const productsEl = document.querySelectorAll('#product');
         
        productsEl.forEach( product => {
            product.addEventListener( "mouseover", handler);
        });
    };

    mouseOut(handler) {
        const productsEl = document.querySelectorAll('#product');
        
        productsEl.forEach( product => {
            product.addEventListener( "mouseout", handler);
        });
    };

    showButton(event) {
        const button = event.currentTarget.querySelector('.product__add-button');
        button.classList.add('button__show');
    }

    hideButton(event) {
        const button = event.currentTarget.querySelector('.product__add-button');
        button.classList.remove('button__show');
    }

}

export default new ItemView;