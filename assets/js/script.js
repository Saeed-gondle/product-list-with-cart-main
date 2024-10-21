'strict';
let data;

const addToCart = () => {
  alert('added');
};

const increment = (n, el) => {
  document.querySelector(`el[data-id="${item.id}"]`).innerHTML = n++;
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
    this.addHTML();
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
    });
  }

  addHTML() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart ??= 'Is Null';
    // this.updateUi(cart);
    this.#main.innerHTML = data.map(item => {
      return `
        <div class="menu__item rounded">
          <div class="menu__img h-70% w-full object-fill">
            <img
              src="${item.image.thumbnail}"
              class="h-full w-full rounded-2xl object-cover"
              alt=""
            />
          </div>
          <button
            class="menu__btn"
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
    }
  }

  addCart(e) {
    if (!e.target.matches('.menu__btn')) {
      return;
    }
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart ??= [];
    const id = e.target.dataset.id;
    const item = data.find(item => item.id === id);
    item.quantity ??= 1;
    if (this.#cartItems.includes(item) || cart.includes(item)) {
      return;
    }
    e.target.classList.add('added');
    this.#cartItems.push(item);
    localStorage.setItem('cart', JSON.stringify(this.#cartItems));
    e.target.innerHTML = `
      <button class="icon__btn decrement" data-id="${item.id}">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <use xlink:href="./assets/images/icons.svg#icon-decrement-quantity"></use>
        </svg>
      </button> 
      <span>${item.quantity}</span>
      <button class="icon__btn increment" data-id="${item.id}">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <use xlink:href="./assets/images/icons.svg#icon-increment-quantity"></use>
        </svg>
      </button>
    `;
    this.updateUi(this.#cartItems);
    localStorage.setItem('cart', JSON.stringify(this.#cartItems));

    document.querySelector('.close').addEventListener('click', e => {
      console.log(e.target);
      e.target.parentElement.parentElement.remove();
      e.target.closest('.cart__item').remove();
      this.#cartItems = this.#cartItems.filter(item => item.id !== e.target.dataset.id);
    });
    this.addEvents(item.quantity, document.querySelector('.close'));
  }

  addEvents(number, cross) {
    console.log(cross);
    cross.addEventListener('click', e => {
      console.log(e.target);
      e.target.parentElement.parentElement.remove();
      e.target.closest('.cart__item').remove();
      this.#cartItems = this.#cartItems.filter(item => item.id !== e.target.dataset.id);
    });
    const decrement = (e, n) => {
      const item = this.#cartItems.find(item => item.id === e.target.dataset.id);
      item.quantity -= 1;
      e.target.nextElementSibling.textContent = item.quantity;
      return n;
    };
    const increment = (e, n) => {
      const item = this.#cartItems.find(item => item.id === e.target.dataset.id);
      item.quantity += 1;
      e.target.previousElementSibling.textContent = item.quantity;
      return n;
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
        if (e.target.matches('.icon__btn')) {
          if (e.target.matches('.icon__btn:first-child')) {
            decrement(e, number);
          }
          if (e.target.matches('.icon__btn:last-child')) {
            increment(e, number);
          }
        }
      });
    });
    this.updateUi(this.#cartItems);
  }

  updateUi(arr) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let price = 0;
    this.#cartContainer.innerHTML = `<h3 class="text-[#c83c10] text-4xl font-bold">Your Cart(${arr.length})</h3>
    <div class=" max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div class="space-y-4">
        ${arr.map(item => {
      price += item.price;
      return `<div class="cart__item flex justify-between items-center">
          <div>
            <h3 class="font-semibold text-xl">${item.name}</h3>
            <p class=" text-gray-600 text-xl">
            <span class="text-[#c83c10] mx-3 text-xl font-extrabold">${item.quantity}x</span> @
            $${item.price}
            </p> 
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-2xl">$${item.price}</span>
            <button class="ml-2 text-gray-400 hover:text-gray-600  close icon" data-id="${item.id}">
           
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
  }
}

try {
  const response = await fetch('data.json');
  data = await response.json();
  const cart = new Cart();
} catch (err) {
  console.error(err);
}
