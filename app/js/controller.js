import * as model from './model';
import {async}  from 'regenerator-runtime';

import ProductView from './views/productView';
import ItemView from './views/itemView';
import CartView from './views/cartView';
import NavView from './views/navView';
import HeroViev from './views/heroView';

// Show and hide cart overlay
const controlCart = () => {
    NavView.addCartButtonHandler(CartView.showCart)
    CartView.addCloseButtonHandler(CartView.hideCart)
}

const showCountAndTotal = () => {

    model.getCount();
    NavView.showCount(model.state.count);
    
    model.getTotal();
    CartView.showTotal(model.state.total);
}

const addButtonsListeners = () => {

    CartView.addDecreaseItemHandeler(decreaseItem);
    CartView.addIncreaseItemHandeler(increaseItem);
}

const increaseItem = (e) => {
    const clicked  = e.currentTarget.closest('#item');
    // get index from data set
    const clickedId = clicked.dataset.id;
    for(let item of model.state.cart){
        if(item.id === clickedId){
            model.addItemToCartState(clickedId);
            CartView.updateCountCart(clicked, item.quantity);
            
            showCountAndTotal();
        }
    }
}

const clearCart = () => {
    model.clearCart();
    CartView.clearCart();
    
    showCountAndTotal();
}



const decreaseItem = (e) => {
    const clicked  = e.currentTarget.closest('#item');
    // get index from data set
    const clickedId = clicked.dataset.id;
    for(let item of model.state.cart){
        if(item.id === clickedId){
            if(item.quantity == 1){
                model.removeItemFromCartState(clickedId);
                // CartView.hideCart();
                
                showCountAndTotal();
                
                CartView.clearCart();
                model.state.cart.forEach(item => {
                    CartView.renderCart(item);
                });
                
                addButtonsListeners();
            };
            if(item.quantity > 1){
                model.decreaseItemFromCartState(clickedId);
                CartView.updateCountCart(clicked, item.quantity);
                showCountAndTotal();
            }
        }
    }
}

const addItemToCart = (e) => {
    // get clicked parent item
    const clicked  = e.target.closest('#product');
    // get index from data set
    const clickedIndex = clicked.dataset.index;
    // add item to cart state
    model.addItemToCartState(clickedIndex);

    showCountAndTotal();
    // clear cart so we don t do update cart
    CartView.clearCart();
    // render item in cart
    model.state.cart.forEach(item => {
        CartView.renderCart(item);
    });
    // show cart after item added
    CartView.showCart();

    addButtonsListeners();
}



//  fetch data and render products with button
const controlProducts = async () => {

    ProductView.renderSpinner();
    //  get the data into state
   await model.fetchData();

    ProductView.clearSpinner();
    //  render Products
    await model.state.products.forEach( product => {
        ProductView.render(product);
    });

    // add mouseover and mouse effect
    await ItemView.mouseOver(ItemView.showButton);
    await ItemView.mouseOut(ItemView.hideButton);

    await ItemView.addInsertButtonHandler(addItemToCart);

}

const updateCart = () => {
    const cartJSON = localStorage.getItem('cart');
    const cart = JSON.parse(cartJSON);
    model.updateCartState(cart);
    model.state.cart.forEach(item => {
        CartView.renderCart(item);
    });

    showCountAndTotal();

    addButtonsListeners();
    
}



const init = () => {
    controlProducts();
    controlCart();
    HeroViev.addScrollHandler();
    updateCart();
    CartView.addClearHandeler(clearCart);
}

init();
