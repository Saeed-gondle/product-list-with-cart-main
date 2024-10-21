'strict';
let data;

(async () => {
    try {
        const response = await fetch('data.json');
        data = await response.json();
        const cart = new Cart();
        // console.log(data);
    }
    catch (err) {
        console.error(err);
    }
})()
class Cart {
    #main = document.querySelector('.main__items');
    constructor() {

        this.addHTML();
        // this.#main.innerHTML = ` <div class="menu__item rounded">
        //     <div class="menu__img h-70% w-full object-cover">
        //     ${data.map(item => {
        //     return `
        //     <picture class="h-full w-full rounded-2xl>
        //     <source media="(min-width: 768px)" srcset="${item.image.tablet}" />
        //     <source media="(min-width: 480px)" srcset="${item.image.mobile}" />
        //     <img src="${item.image.thumbnail}" alt="Image description" />        
        //     </picture>
        //     </div>
        //     <button
        //       class="menu__btn border-1 mx-auto flex -translate-y-7 items-center justify-center gap-2 rounded-3xl border-2 border-gray-700 bg-white px-4 py-2 text-xl text-black transition-all hover:bg-[#c83c10]"
        //     >
        //       <img
        //         class="feature__icon h-8"
        //         src="https://www.svgrepo.com/show/80543/shopping-cart-outline.svg"
        //         alt="Shopping Cart"
        //       />
        //       Add to cart
        //     </button>
        //     <div class="menu__content space-y-0 px-2">
        //       <h3 class="menu__title text-gray-500">${item.category}</h3>
        //       <p class="menu__description text-2xl font-bold text-black">
        //         ${item.name}
        //       </p>
        //       <div class="menu__price text-1xl font-bold text-[#c83c10]">
        //         $${item.price}
        //       </div>`
        // }).join("")}

        //     </div>
        //   </div>`
    }
    addHTML() {
        this.#main.innerHTML = data.map(item => {
            return ` <div class="menu__item rounded">
                        <div class="menu__img h-70% w-full object-cover">
                          <img
                            src="${item.image.thumbnail}"
                            class="h-full w-full rounded-2xl object-cover"
                            alt=""
                          />
                        </div>
                        <button
                          class="menu__btn border-1 mx-auto flex -translate-y-7 items-center justify-center gap-2 rounded-3xl border-2 border-gray-700 bg-white px-8 py-6 text-xl text-black transition-all hover:bg-[#c83c10] hover:text-white"
                        >           
                        <svg class="icon w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
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
                      </div>`
        }).join("");


    }
    addCart() {

    }
}



{/* <svg class="icon">
  <use xlink:href="#icon-add-to-cart"></use>
</svg><svg class="icon">
  <use xlink:href="#icon-carbon-neutral"></use>
</svg><svg class="icon">
  <use xlink:href="#icon-decrement-quantity"></use>
</svg><svg class="icon">
  <use xlink:href="#icon-increment-quantity"></use>
</svg><svg class="icon">
  <use xlink:href="#icon-remove-item"></use>
</svg><svg class="icon">
  <use xlink:href="#icon-order-confirmed"></use>
</svg> */}

// [
//     {
//         "image": {
//             "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
//             "mobile": "./assets/images/image-waffle-mobile.jpg",
//             "tablet": "./assets/images/image-waffle-tablet.jpg",
//             "desktop": "./assets/images/image-waffle-desktop.jpg"
//         },
//         "name": "Waffle with Berries",
//         "category": "Waffle",
//         "price": 6.5
//     },
//     {
//         "image": {
//             "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
//             "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
//             "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
//             "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
//         },
//         "name": "Vanilla Bean Crème Brûlée",
//         "category": "Crème Brûlée",
//         "price": 7
//     },
//     {
//         "image": {
//             "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
//             "mobile": "./assets/images/image-macaron-mobile.jpg",
//             "tablet": "./assets/images/image-macaron-tablet.jpg",
//             "desktop": "./assets/images/image-macaron-desktop.jpg"
//         },
//         "name": "Macaron Mix of Five",
//         "category": "Macaron",
//         "price": 8
//     },
//     {
//         "image": {
//             "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
//             "mobile": "./assets/images/image-tiramisu-mobile.jpg",
//             "tablet": "./assets/images/image-tiramisu-tablet.jpg",
//             "desktop": "./assets/images/image-tiramisu-desktop.jpg"
//         },
//         "name": "Classic Tiramisu",
//         "category": "Tiramisu",
//         "price": 5.5
//     },
//     {
//         "image": {
//             "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
//             "mobile": "./assets/images/image-baklava-mobile.jpg",
//             "tablet": "./assets/images/image-baklava-tablet.jpg",
//             "desktop": "./assets/images/image-baklava-desktop.jpg"
//         },
//         "name": "Pistachio Baklava",
//         "category": "Baklava",
//         "price": 4
//     },
//     {
//         "image": {
//             "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
//             "mobile": "./assets/images/image-meringue-mobile.jpg",
//             "tablet": "./assets/images/image-meringue-tablet.jpg",
//             "desktop": "./assets/images/image-meringue-desktop.jpg"
//         },
//         "name": "Lemon Meringue Pie",
//         "category": "Pie",
//         "price": 5
//     },
//     {
//         "image": {
//             "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
//             "mobile": "./assets/images/image-cake-mobile.jpg",
//             "tablet": "./assets/images/image-cake-tablet.jpg",
//             "desktop": "./assets/images/image-cake-desktop.jpg"
//         },
//         "name": "Red Velvet Cake",
//         "category": "Cake",
//         "price": 4.5
//     },
//     {
//         "image": {
//             "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
//             "mobile": "./assets/images/image-brownie-mobile.jpg",
//             "tablet": "./assets/images/image-brownie-tablet.jpg",
//             "desktop": "./assets/images/image-brownie-desktop.jpg"
//         },
//         "name": "Salted Caramel Brownie",
//         "category": "Brownie",
//         "price": 4.5
//     },
//     {
//         "image": {
//             "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
//             "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
//             "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
//             "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
//         },
//         "name": "Vanilla Panna Cotta",
//         "category": "Panna Cotta",
//         "price": 6.5
//     }
// ]