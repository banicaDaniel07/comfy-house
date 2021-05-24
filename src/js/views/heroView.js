class HeroView {

    
_shopButton = document.querySelector('#shop__now');
_productsSection = document.querySelector('#products');

addScrollHandler(){
    this._shopButton.addEventListener( 'click', () => {
        this._productsSection.scrollIntoView({behavior: 'smooth'});
    })
}
}

export default new HeroView;