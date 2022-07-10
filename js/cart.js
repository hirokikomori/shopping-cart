    function closeCart() {
        const cart = document.querySelector('.cart');
        cart.classList.toggle('hide');
        document.querySelector('body').classList.toggle('stopScrolling')
    }
    const openShopCart = document.querySelector('.fa-shopping-cart');
    openShopCart.addEventListener('click', () => {
        const cart = document.querySelector('.cart');
        cart.classList.toggle('hide');
        document.querySelector('body').classList.toggle('stopScrolling');
    });
    const closeShopCart = document.querySelector('#closeButton');
    const overlay = document.querySelector('.overlay');
    closeShopCart.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);





    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready();
    }

    function ready() {
        let removeCartButtons = document.getElementsByClassName('btn-danger');
        for (let i = 0; i < removeCartButtons.length; i++) {
            let button = removeCartButtons[i];
            button.addEventListener('click', removeCartItem);
        }

        let inputQuantity = document.getElementsByClassName('cart-quantity-input');
        for (let i = 0; i < inputQuantity.length; i++) {
            let quantity = inputQuantity[i];
            quantity.addEventListener('change', changeQuantity);
        }

        let addToCartButtons = document.getElementsByClassName('shop-item-button');
        for (let i = 0; i < addToCartButtons.length; i++) {
            let addToCartButton = addToCartButtons[i];
            addToCartButton.addEventListener('click', addToCartItem);
        }

        let btnPurchase = document.getElementsByClassName('btn-purchase')[0];
        btnPurchase.addEventListener('click', purchased);
    }

    function inCart(){
        let cartItems = document.querySelectorAll('.cart-row');
        let checkout = document.querySelector('.checkout');
        let empty = document.querySelector('.empty');
            if (cartItems.length > 0){
            checkout.classList.remove('hide');
            empty.classList.add('hide');
        }else {
            checkout.classList.add('hide');
            empty.classList.remove('hide');            
        }
        }


    function purchased() {
        alert('お支払いページへ遷移します');
        let cartItems = document.getElementsByClassName('cart-items')[0];
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal();
        inCart();
    }

    function changeQuantity(event) {
        let input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCartTotal();
    }

    function removeCartItem(event) {
        let clickedButton = event.target;
        clickedButton.parentElement.parentElement.parentElement.remove();
        updateCartTotal();
        inCart();
    }

    function addToCartItem(event) {
        let button = event.target;
        let item = button.parentElement.parentElement.parentElement;
        let getImage = item.getElementsByClassName('shop-image')[0];
        let getImageSrc = getImage.getAttribute('src');
        let getTitle = item.getElementsByClassName('shop-item-title')[0].innerText;
        let getPrice = item.getElementsByClassName('shop-item-price')[0].innerText;

        button.parentElement.style.backgroundColor = '#a6a6a6';
        addToCart(getImageSrc, getTitle, getPrice);
        updateCartTotal();
        inCart();
    }



    function addToCart(getImageSrc, getTitle, getPrice) {
        let cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        cartRow.classList.add('cart-column');
        let cartItems = document.getElementsByClassName('cart-items')[0];
        let cartItemsName = cartItems.getElementsByClassName('cart-item-title');
        for (i = 0; i < cartItemsName.length; i++) {
            if (cartItemsName[i].innerText == getTitle) {
                alert('この商品はすでにカートに入っています');
                return
            }
        }
        let cartRowContent = `
                    <div class="cart-item fisrt">
                        <img class="cart-item-image" src="${getImageSrc}" width="100" height="100">
                    </div>

                    <div class="cart-item">                   
                    <span class="cart-item-title">${getTitle}</span>
                    <span class="cart-price">${getPrice}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger" type="button">削除する</button>
                    </div>
                    </div>`
        cartRow.innerHTML = cartRowContent;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changeQuantity);
    }

    function updateCartTotal() {
        let cartContainer = document.getElementsByClassName('cart-items')[0];
        let cartRows = cartContainer.getElementsByClassName('cart-row');
        let total = 0;
        for (let i = 0; i < cartRows.length; i++) {
            let cartRow = cartRows[i];
            let priceElement = cartRow.getElementsByClassName('cart-price')[0];
            let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
            let price = parseFloat(priceElement.innerText.replace('¥', ''));
            let quantity = quantityElement.value;
            total = total + (price * quantity);
        }
        // total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = '¥' + total;
    }