'use strict';
let data;

const addToCart = () => {
  alert('added');
};

const increment = (n, el) => {
  document.querySelector(`${el}[data-id="${item.id}"]`).innerHTML = n++;
  return n++;
};

const decrement = (e) => e--;

class Cart {
  #main = document.querySelector('.main__items');
  #cartContainer = document.querySelector('.main__cart');
  #addCart;
  #item;
  #cartItems = [];
  data;

  constructor() {
    this.#main.innerHTML = ``;
    this.getId();
    if (data) {
      this.addHTML();
    } else {
      console.error('Data is not loaded yet.');
    }
    this.#addCart = document.querySelectorAll('.menu__btn');
    this.#item = document.querySelectorAll('.menu__item');
    this.#item.forEach((item, index) => {
      item.addEventListener('click', this.addCart.bind(this));
    });
  }

  getId() {
    const date = new Date();
    this.data = data.map((item, index) => {
      item.id = date.toISOString() + index++;
      return item; // Added return statement
    });
  }
  getLocalStorage() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart ??= [];
    return cart;
  }
  setLocalStorage(arr) {
    localStorage.setItem('cart', JSON.stringify(arr));
  }
  addHTML() {
    const cart = this.getLocalStorage();
    this.updateUi(cart);
    this.#main.innerHTML = data.map(item => {

      return `
        <div class="menu__item rounded mx-2">
          <div class="menu__img h-[20rem] w-[20rem]">
           <picture class="  object-contain h-70% w-full inline-block">
           <source media="(min-width:768px)" srcset="${item.image.tablet}">
           <source media="(min-width:465px)" srcset="${item.image.mobile}">
           <source media="(min-width:1440px)" srcset="${item.image.dekstop}">
  <img src="${item.image.thumbnail}" alt="Flowers" class="menu__img object-contain h-[20rem] w-[25rem]" style="max-width:20rem !important;">
</picture>
          </div>
          <button
            class="menu__btn focus:outline-0"
            data-id="${item.id}"
          >           
          <svg class="icon w-8 h-8 hover:stroke-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <use xlink:href="./assets/images/icons.svg#icon-add-to-cart"></use>
          </svg>
            Add to cart
          </button>
          <div class="menu__content space-y-0 px-2">
            <h3 class="menu__title text-gray-500">${item.category}</h3>
            <p class="menu__description text-2xl font-bold text-black">
              ${item.name}
            </p>
            <div class="menu__price text-1xl font-bold text-[#c83c10]">
              $${item.price}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  checkCart(e) {
    if (e.type === 'click') {
      this.addCart(e);
      this.#item.forEach((item, index) => {
        item.addEventListener('click', this.addCart.bind(this));
      });
    }
  }

  addCart(e) {
    if (!e.target.matches('.menu__btn')) {
      return;
    }
    const cart = this.getLocalStorage();
    const id = e.target.dataset.id;
    const item = data.find(item => item.id === id);
    item.quantity ??= 1;
    if (this.#cartItems.includes(item) || cart.some(cartItem => cartItem.id === item.id)) {
      return;
    }
    e.target.classList.add('added');
    this.#cartItems.push(item);
    e.target.innerHTML = `
    <button type="button" class="icon__btn decrement" data-id="${item.id}">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" data-id="${item.id}" viewBox="0 0 24 24">
    <use xlink:href="./assets/images/icons.svg#icon-decrement-quantity"></use>
    </svg>
    </button> 
    <span>${item.quantity}</span>
    <button type="button" class="icon__btn increment" data-id="${item.id}">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" data-id="${item.id}" viewBox="0 0 24 24">
    <use xlink:href="./assets/images/icons.svg#icon-increment-quantity"></use>
    </svg>
    </button>
    `;
    this.updateUi(this.#cartItems);
    this.setLocalStorage(this.#cartItems);
    this.addEvents(item.quantity, document.querySelector('.close'));
  }

  addEvents(number, cross) {
    // if (cross) {
    //   cross.addEventListener('click', e => {
    //     e.target.parentElement.parentElement.remove();
    //     e.target.closest('.cart__item').remove();
    //     this.#cartItems = this.#cartItems.filter(item => item.id !== e.target.dataset.id);
    //     this.setLocalStorage(this.#cartItems);
    //     this.updateUi(this.#cartItems);
    //     this.addHTML();
    //     const button = document.querySelector(`button[data-id="${e.target.dataset.id}"]`);
    //     button.classList.remove('added');
    //     button.addEventListener('click', this.addCart.bind(this)); // Reattach the event listener
    //   });
    // }
    const decrement = (e) => {
      const item = this.#cartItems.find(item => item.id === e.target.dataset.id);
      item.quantity -= 1;

      this.setLocalStorage(this.#cartItems);
      this.updateUi(this.#cartItems);
      e.target.nextElementSibling.textContent = item.quantity;
      if (item.quantity <= 0) {
        this.#cartItems = this.#cartItems.filter(cartItem => cartItem.id !== item.id);
        this.addHTML();
        this.setLocalStorage(this.#cartItems);
        this.updateUi(this.#cartItems);
        const buttons = document.querySelectorAll(`button.menu__btn`);
        buttons.forEach(button => {
          button.addEventListener('click', this.addCart.bind(this));
        });
        return;
      }
      return item.quantity;
    };
    const increment = (e) => {
      const item = this.#cartItems.find(item => item.id === e.target.dataset.id);
      item.quantity += 1;
      this.setLocalStorage(this.#cartItems);
      this.updateUi(this.#cartItems);
      e.target.previousElementSibling.textContent = item.quantity;
      return item.quantity;
    };
    this.#addCart.forEach((item, index) => {
      item.addEventListener('click', e => {
        if (!e.target.matches('.icon__btn')) {
          return;
        }
      });
    });
    const buttons = document.querySelectorAll('.icon__btn');
    buttons.forEach(button => {
      button.addEventListener('click', e => {
        if (e.target.matches('.icon__btn:first-child')) {
          decrement(e);
        }
        if (e.target.matches('.icon__btn:last-child')) {
          increment(e);
        }
      });
    });
    this.updateUi(this.#cartItems);
  }

  updateUi(arr) {
    const cart = this.getLocalStorage();
    if (!arr.length) {
      return;
    }
    let price = 0;
    this.#cartContainer.innerHTML = `<h3 class="text-[#c83c10] text-4xl font-bold">Your Cart(${arr.length})</h3>
    <div class=" max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div class="space-y-4">
        ${arr.map(item => {
      price += item.price * item.quantity;
      return `<div class="cart__item flex justify-between items-center">
          <div>
            <h3 class="font-semibold text-xl">${item.name}</h3>
            <p class=" text-gray-600 text-xl">
            <span class="text-[#c83c10] mx-3 text-xl font-extrabold">${item.quantity}x</span> @
            $${item.price}
            </p> 
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-2xl">$${item.price * item.quantity}</span>
            <button class="ml-2 text-gray-400 hover:text-gray-600  close icon" data-id="${item.id}">
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" data-id="${item.id}" viewBox="0 0 24 24">
                <use xlink:href="./assets/images/icons.svg#icon-close"></use>
              </svg>
            </button>
          </div>
          </div>`;
    }).join('')}
        </div>
        <div class="mt-6 border-t pt-4">
          <div class="flex justify-between items-center">
          <span class="font-semibold">Order Total</span>
          <span class="font-bold text-xl">$${price}</span>
          </div>
        </div>
        <p class="mt-4 text-sm text-gray-600 flex items-center">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1 text-green-500 "
          viewBox="0 0 20 20"
          fill="currentColor"
          >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
          </svg>
          This is a carbon-neutral delivery
        </p>
        <button
          class="mt-6 w-full bg-orange-600 text-white py-3 rounded-md font-semibold hover:bg-orange-700 transition duration-300"
        >
          Confirm Order
        </button>
        </div>`;
    const closeButtons = document.querySelectorAll('.cart__item');
    closeButtons.forEach(button => {
      button.addEventListener('click', e => {
        if (!e.target.matches('.close')) { return }


        // Reattach the event listener
        e.target.parentElement.parentElement.remove();
        e.target.closest('.cart__item').remove();

        this.#cartItems = this.#cartItems.filter(cartItem => cartItem.id !== item.id);
        this.addHTML();
        this.setLocalStorage(this.#cartItems);
        this.updateUi(this.#cartItems);
        const buttons = document.querySelectorAll(`button.menu__btn`);
        buttons.forEach(button => {
          button.addEventListener('click', this.addCart.bind(this));
        });
        if (!this.#cartItems.length) {
          this.#cartContainer.innerHTML = `  <h3 class="text-[#c83c10] text-4xl font-bold">Your Cart(0)</h3>
          <img
            src="./assets/images/illustration-empty-cart.svg"
            alt=""
            class="m-auto"
          />
          <p class="text-[#c83c10] text-2xl font-normal text-center">
            Items you will add will be here
          </p>`;
        }
        price = 0;

        // button.addEventListener('click', this.addCart.bind(this));
        // const button = document.querySelector(`button[data-id="${item.id}"]`);
        // button.classList.remove('added');
        // button.addEventListener('click', this.addCart.bind(this)); // Reattach the event listener
      });
    });
  }
}

(async () => {
  try {
    const response = await fetch('data.json');
    data = await response.json();
    new Cart(); // Instantiate Cart class after data is loaded
  } catch (err) {
    console.error(err);
  }
})();
