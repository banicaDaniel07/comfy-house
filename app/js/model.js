import {async}  from 'regenerator-runtime';
import {API_URL} from './config';

export const state = {
    products: [],
    cart: [],
    count: 0,
    total: 0
    
}


export const fetchData = async function(){
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        data.forEach( product => {
            state.products.push(product);
        });
    } catch(error){
        console.log(error);
    }
}

export const getCount = () => {
   const count = state.cart.reduce( (accumulator, _ , index) => 
        accumulator + state.cart[index].quantity
    , 0);
    
    state.count = count;
} 

const updateLocal = () => {
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(state.cart));
}

export const updateCartState = (localCart) => {
    state.cart = localCart;
}

export const getTotal = () => {
   const total = state.cart.reduce( (accumulator, _ , index) => 
        accumulator + state.cart[index].quantity * state.cart[index].price
    , 0);
    
    state.total = total.toFixed(2);
} 

export const removeItemFromCartState = (index) => {
    const newCart = [];
    for (let i = 0; i < state.cart.length; i++) {
        if(state.cart[i].id !== state.products[index-1].id) {
            newCart.push(state.cart[i])
        }
    }
    state.cart = newCart;
    updateLocal();
}

export const clearCart = () => {
    state.cart = [];
    updateLocal();
}

export const decreaseItemFromCartState = (index) => {
    let exists;
    for (let i = 0; i < state.cart.length; i++) {
        if(state.cart[i].id === state.products[index-1].id) exists = i;
    }
    state.cart[exists].quantity -= 1;
    updateLocal();
}

export const addItemToCartState = (index) => {

    let exists = undefined;  

    if(state.cart.length)
    for (let i = 0; i < state.cart.length; i++) {
        if(state.cart[i].id === state.products[index-1].id) exists = i;
    }

    if(exists !== undefined){
             state.cart[exists].quantity += 1;
    }

    if(exists === undefined){
        const {id, imageUrl, title, price} = state.products[index-1];
        const cartItem = {
            id,
            imageUrl,
            title,
            price,
            quantity: 1
        }
        state.cart.push(cartItem);
    }

    updateLocal();
}


