var _=Object.defineProperty;var b=i=>{throw TypeError(i)};var L=(i,t,s)=>t in i?_(i,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[t]=s;var y=(i,t,s)=>L(i,typeof t!="symbol"?t+"":t,s),w=(i,t,s)=>t.has(i)||b("Cannot "+s);var a=(i,t,s)=>(w(i,t,"read from private field"),s?s.call(i):t.get(i)),g=(i,t,s)=>t.has(i)?b("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,s),m=(i,t,s,d)=>(w(i,t,"write to private field"),d?d.call(i,s):t.set(i,s),s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&d(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();let f;var p,x,v,u,n;class S{constructor(){g(this,p,document.querySelector(".main__items"));g(this,x,document.querySelector(".main__cart"));g(this,v);g(this,u);g(this,n,[]);y(this,"data");a(this,p).innerHTML="",this.getId(),f?this.addHTML():console.error("Data is not loaded yet."),m(this,v,document.querySelectorAll(".menu__btn")),m(this,u,document.querySelectorAll(".menu__item")),a(this,u).forEach((t,s)=>{t.addEventListener("click",this.addCart.bind(this))})}getId(){const t=new Date;this.data=f.map((s,d)=>(s.id=t.toISOString()+d++,s))}getLocalStorage(){let t=JSON.parse(localStorage.getItem("cart"));return t??(t=[]),t}setLocalStorage(t){localStorage.setItem("cart",JSON.stringify(t))}addHTML(){const t=this.getLocalStorage();this.updateUi(t),a(this,p).innerHTML=f.map(s=>`
        <div class="menu__item rounded">
          <div class="menu__img h-70% w-full object-fill">
            <img
              src="${s.image.thumbnail}"
              class="h-full w-full rounded-2xl object-cover"
              alt=""
            />
          </div>
          <button
            class="menu__btn"
            data-id="${s.id}"
          >           
          <svg class="icon w-8 h-8 hover:stroke-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <use xlink:href="./assets/images/icons.svg#icon-add-to-cart"></use>
          </svg>
            Add to cart
          </button>
          <div class="menu__content space-y-0 px-2">
            <h3 class="menu__title text-gray-500">${s.category}</h3>
            <p class="menu__description text-2xl font-bold text-black">
              ${s.name}
            </p>
            <div class="menu__price text-1xl font-bold text-[#c83c10]">
              $${s.price}
            </div>
          </div>
        </div>
      `).join("")}checkCart(t){t.type==="click"&&(this.addCart(t),a(this,u).forEach((s,d)=>{s.addEventListener("click",this.addCart.bind(this))}))}addCart(t){if(!t.target.matches(".menu__btn"))return;const s=this.getLocalStorage(),d=t.target.dataset.id,e=f.find(r=>r.id===d);e.quantity??(e.quantity=1),!(a(this,n).includes(e)||s.some(r=>r.id===e.id))&&(t.target.classList.add("added"),a(this,n).push(e),t.target.innerHTML=`
    <button type="button" class="icon__btn decrement" data-id="${e.id}">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" data-id="${e.id}" viewBox="0 0 24 24">
    <use xlink:href="./assets/images/icons.svg#icon-decrement-quantity"></use>
    </svg>
    </button> 
    <span>${e.quantity}</span>
    <button type="button" class="icon__btn increment" data-id="${e.id}">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" data-id="${e.id}" viewBox="0 0 24 24">
    <use xlink:href="./assets/images/icons.svg#icon-increment-quantity"></use>
    </svg>
    </button>
    `,this.updateUi(a(this,n)),this.setLocalStorage(a(this,n)),this.addEvents(e.quantity,document.querySelector(".close")))}addEvents(t,s){const d=(o,l)=>{const c=a(this,n).find(h=>h.id===o.target.dataset.id);return c.quantity-=1,this.setLocalStorage(a(this,n)),this.updateUi(a(this,n)),o.target.nextElementSibling.textContent=c.quantity,c.quantity===0&&(this.addHTML(),m(this,n,a(this,n).filter(h=>h.id!==o.target.dataset.id)),this.setLocalStorage(a(this,n)),this.updateUi(a(this,n))),c.quantity},e=(o,l)=>{const c=a(this,n).find(h=>h.id===o.target.dataset.id);return c.quantity+=1,this.setLocalStorage(a(this,n)),this.updateUi(a(this,n)),o.target.previousElementSibling.textContent=c.quantity,c.quantity};a(this,v).forEach((o,l)=>{o.addEventListener("click",c=>{c.target.matches(".icon__btn")})}),document.querySelectorAll(".icon__btn").forEach(o=>{o.addEventListener("click",l=>{l.target.matches(".icon__btn:first-child")&&d(l),l.target.matches(".icon__btn:last-child")&&e(l)})}),this.updateUi(a(this,n))}updateUi(t){this.getLocalStorage();let s=0;a(this,x).innerHTML=`<h3 class="text-[#c83c10] text-4xl font-bold">Your Cart(${t.length})</h3>
    <div class=" max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div class="space-y-4">
        ${t.map(e=>(s+=e.price*e.quantity,`<div class="cart__item flex justify-between items-center">
          <div>
            <h3 class="font-semibold text-xl">${e.name}</h3>
            <p class=" text-gray-600 text-xl">
            <span class="text-[#c83c10] mx-3 text-xl font-extrabold">${e.quantity}x</span> @
            $${e.price}
            </p> 
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-2xl">$${e.price*e.quantity}</span>
            <button class="ml-2 text-gray-400 hover:text-gray-600  close icon" data-id="${e.id}">
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <use xlink:href="./assets/images/icons.svg#icon-close"></use>
              </svg>
            </button>
          </div>
          </div>`)).join("")}
        </div>
        <div class="mt-6 border-t pt-4">
          <div class="flex justify-between items-center">
          <span class="font-semibold">Order Total</span>
          <span class="font-bold text-xl">$${s}</span>
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
        </div>`,document.querySelectorAll(".close").forEach(e=>{e.addEventListener("click",r=>{r.target.closest(".cart__item").remove(),m(this,n,a(this,n).filter(c=>c.id!==r.target.dataset.id)),this.setLocalStorage(a(this,n)),this.updateUi(a(this,n)),this.addHTML(),a(this,u).forEach((c,h)=>{c.addEventListener("click",this.addCart.bind(this))});const o=r.target.dataset.id,l=document.querySelector(`button[data-id="${o}"]`);l.classList.remove("added"),l.addEventListener("click",this.addCart.bind(this))})})}}p=new WeakMap,x=new WeakMap,v=new WeakMap,u=new WeakMap,n=new WeakMap;(async()=>{try{f=await(await fetch("data.json")).json(),new S}catch(i){console.error(i)}})();
