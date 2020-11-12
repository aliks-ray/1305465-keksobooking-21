(()=>{"use strict";(()=>{const e=(e,t=0)=>Math.floor(Math.random()*(e-t)+t);window.util={getRandomNumber:e,getRandomElement:e=>e[Math.floor(Math.random()*e.length)],getRandomProperty:function(t){const o=Object.keys(t);return t[o[e(0,o.length)]]},getRandomArray:t=>{const o=t.slice();let n,r;for(let e=o.length-1;e>0;e--)n=Math.floor(Math.random()*(e+1)),r=o[e],o[e]=o[n],o[n]=r;return o.slice(e(0,o.length))},getNoun:function(e,t,o,n){let r=Math.abs(e);return r%=100,r>=5&&r<=20?n:(r%=10,1===r?t:r>=2&&r<=4?o:n)},debounce:function(e){let t=!1;return function(o){t&&clearTimeout(t),t=setTimeout(e.bind(null,o),500)}}}})(),(()=>{const e=function(e,t,o,n){const r=new XMLHttpRequest;return r.responseType="json",r.addEventListener("load",(function(){switch(r.status){case 200:o(r.response);break;default:n("Ошибка соединения. Статус ответа: "+r.status+" "+r.statusText)}})),r.addEventListener("error",(function(){n("Ошибка соединения")})),r.addEventListener("timeout",(function(){n("Запрос не успел выполниться за "+r.timeout+"мс.")})),r.timeout=2e4,r.open(e,t),r};window.backend={load:function(t,o){e("GET","https://21.javascript.pages.academy/keksobooking/data",t,o).send()},save:function(t,o,n){e("POST","https://21.javascript.pages.academy/keksobooking",o,n).send(t)},onError:e=>{const t=document.createElement("div");t.style="z-index: 100;\n  margin: auto;\n  padding: 30px;\n  width: 900px;\n  top: 50%;\n  left: 50%;\n  text-align: center;\n  background-color: #be3827;\n  border: #be3827 1px solid;\n  border-radius: 10px;\n  color: white;\n  box-shadow: 0 10px 10px rgba(0, 1, 1, 0.3);",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t),setTimeout((function(){t.remove()}),5e3)}}})(),(()=>{let e=[];const t="any",o=document.querySelector(".map__filters"),n=o.querySelector("#housing-type"),r=o.querySelector("#housing-price"),i=o.querySelector("#housing-rooms"),a=o.querySelector("#housing-guests"),d=1e4,s=5e4,c=1e4,l=5e4,u=e=>{const o=n.value;let r=!1;return e.offer.type!==o&&o!==t||(r=!0),r},m=e=>{let o=!1;switch(r.value){case t:o=!0;break;case"middle":e.offer.price>=d&&e.offer.price<=s&&(o=!0);break;case"low":e.offer.price<c&&(o=!0);break;case"high":e.offer.price>l&&(o=!0)}return o},p=e=>{const o=i.value;let n=!1;return e.offer.rooms!==parseInt(o,10)&&o!==t||(n=!0),n},f=e=>{const o=a.value;let n=!1;return e.offer.guests!==parseInt(o,10)&&o!==t||(n=!0),n},w=e=>Array.from(o.querySelectorAll(".map__checkbox:checked")).every((t=>e.offer.features.includes(t.value))),v=e=>{const t=[];for(let o=0;o<e.length&&t.length<5;o++)u(e[o])&&m(e[o])&&p(e[o])&&f(e[o])&&w(e[o])&&t.push(e[o]);return t};o.addEventListener("change",window.util.debounce((()=>{window.pin.addPins(v(e))}))),window.filter={filterData:v,onDataLoad:t=>{e=t;const o=window.filter.filterData(e);window.pin.addPins(o,window.pin.PINS_MAX)}}})(),(()=>{const e=["12:00","13:00","14:00"],t=["12:00","13:00","14:00"],o=["wifi","dishwasher","parking","washer","elevator","conditioner"],n=["http://o0.github.io/assets/images/tokyo/hotel1.jpg","http://o0.github.io/assets/images/tokyo/hotel2.jpg","http://o0.github.io/assets/images/tokyo/hotel3.jpg"],r={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},i=["Квартира в центре","Современные апартаменты","Уютная студия","Видовая квартира","Собственный дом"],a=["Комфортное жилье недалеко от метро и транспортных развязок","Небольшая площадь компенсируется уютом и красивыми окрестностями","Захватывающий вид на телебашню, есть вся необходимая бытовая техника"],d=[1,2,3,100],s=[1,2,3,"не для гостей"],c=(c=>{const l=[];for(let c=1;c<=10;c++){const u=window.util.getRandomNumber(0,1200),m=window.util.getRandomNumber(130,630);l.push({author:{avatar:`img/avatars/user0${c}.png`},offer:{title:window.util.getRandomElement(i),address:`${u}, ${m}`,price:""+window.util.getRandomNumber(1e3,1e6),type:window.util.getRandomProperty(r),rooms:window.util.getRandomElement(d),guests:window.util.getRandomElement(s),checkin:window.util.getRandomElement(e),checkout:window.util.getRandomElement(t),features:window.util.getRandomArray(o),description:window.util.getRandomElement(a),photos:window.util.getRandomArray(n)},location:{x:""+u,y:""+m}})}return l})();window.data={pins:c,offerTypes:r}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelector("#address"),o=e.style.left,n=e.style.top,r={top:Math.floor(46),bottom:Math.floor(546),left:Math.floor(-31),right:Math.floor(1169)},i=o=>{t.value=Math.floor(parseInt(e.style.left,10)+31)+", "+Math.floor(parseInt(e.style.top,10)+o)};i();const a=(e,t)=>{e.addEventListener("mousedown",(e=>{e.preventDefault();let o={x:e.clientX,y:e.clientY};const n=function(e){e.preventDefault();let n=o.x-e.clientX,a=o.y-e.clientY;o={x:e.clientX,y:e.clientY};let d=t.style.top=t.offsetTop-a,s=t.style.left=t.offsetLeft-n;d>=r.bottom?d=r.bottom:d<=r.top&&(d=r.top),s<=r.left?s=r.left:s>r.right&&(s=r.right),t.style.top=d+"px",t.style.left=s+"px",i(84)},a=function(e){e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",a)}))};a(e,e),window.move={getAddress:i,mainPin:e,pinHeightDisable:31,ACTIVE_PIN_HEIGHT:84,moveMainPin:a,getDefaultPinPosition:()=>{e.style.left=o,e.style.top=n}}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector(".map__pins"),o=function(){let e=document.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active")};window.pin={addPins:n=>{window.pin.cardRemover(),window.pin.pinsRemover();const r=document.createDocumentFragment();n.forEach((function(t){r.appendChild((t=>{const n=e.cloneNode(!0);return n.style.left=t.location.x-25+"px",n.style.top=t.location.y-70+"px",n.querySelector("img").src=t.author.avatar,n.querySelector("img").alt=t.offer.title,n.addEventListener("click",(function(){o(),n.classList.add("map__pin--active"),window.card.createCard(t)})),n.addEventListener("keydown",(function(e){"Enter"===e.key&&window.card.createCard(t)})),n})(t))})),t.appendChild(r)},removeClassActivePin:o,pinsRemover:()=>{const e=document.querySelectorAll(".map__pin:not(.map__pin--main)");for(let t=0;t<e.length;t++)e[t].remove()},cardRemover:()=>{document.querySelector(".map__card")&&window.card.removeCard()},PINS_MAX:5}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t=document.querySelector(".map__filters-container");let o;const n=function(){o&&o.remove()};window.card={createCard:r=>{n(),o=e.cloneNode(!0);const i=o.querySelector(".popup__features"),a=o.querySelector(".popup__photos"),d=o.querySelector(".popup__close"),s=o.querySelector(".popup__title"),c=o.querySelector(".popup__text--address"),l=o.querySelector(".popup__text--price"),u=o.querySelector(".popup__type"),m=o.querySelector(".popup__text--capacity"),p=o.querySelector(".popup__text--time"),f=o.querySelector(".popup__description"),w=o.querySelector(".popup__avatar");for(s.textContent=r.offer.title,c.textContent=r.offer.address,l.textContent=r.offer.price+" ₽/ночь",u.textContent=window.data.offerTypes[r.offer.type],m.textContent=`${r.offer.rooms}\n    ${window.util.getNoun(r.offer.rooms,"комната","комнаты","комнат")}\n    ${r.offer.guests>0?`для ${r.offer.guests}\n    ${window.util.getNoun(r.offer.guests,"гостя","гостей","гостей")}`:"не для гостей"}`,p.textContent=`Заезд после ${r.offer.checkin},\n    выезд до ${r.offer.checkout}`,f.textContent=r.offer.description,w.setAttribute("src",""+r.author.avatar);i.firstChild;)i.removeChild(i.firstChild);for(let e=0;e<r.offer.features.length;e++)i.appendChild(document.createElement("li")).classList.add("popup__feature","popup__feature--"+r.offer.features[e]);for(;a.firstChild;)a.removeChild(a.firstChild);for(let e=0;e<r.offer.photos.length;e++){const t=document.createElement("img");t.src=""+r.offer.photos[e],t.alt="Фото квартиры",t.width=45,t.height=40,a.appendChild(t).classList.add("popup__photo")}const v=function(){n(),window.pin.removeClassActivePin(),d.removeEventListener("click",v),document.removeEventListener("keydown",y)},y=function(e){"Escape"===e.key&&(n(),window.pin.removeClassActivePin()),d.removeEventListener("click",v),document.removeEventListener("keydown",y)};d.addEventListener("click",v),d.addEventListener("keydown",(function(e){"Enter"===e.key&&(n(),window.pin.removeClassActivePin())})),document.addEventListener("keydown",y),window.main.map.insertBefore(o,t)},removeCard:n}})(),(()=>{const e={1:[1],2:[1,2],3:[1,2,3],100:[0]},t={flat:"1000",bungalow:"0",house:"5000",palace:"10000"},o=document.querySelector(".ad-form"),n=o.querySelector("#room_number"),r=o.querySelector("#capacity"),i=o.querySelector("#price"),a=o.querySelector("#type"),d=o.querySelector("#timein"),s=o.querySelector("#timeout"),c=()=>{const e=t[a.options[a.selectedIndex].value];i.placeholder=e,i.setAttribute("min",e)},l=()=>{const t=-1===e[n.value].indexOf(+r.value)?"Столько гостей не сможет разместиться, предложите больше комнат":"";r.setCustomValidity(t)},u=t=>{r.querySelectorAll("option").forEach((function(e){e.disabled=!0})),e[t].forEach((function(e){r.querySelector('option[value="'+e+'"]').disabled=!1,r.value=e}))};d.addEventListener("change",(function(){s.value=d.value})),s.addEventListener("change",(function(){d.value=s.value})),n.addEventListener("change",(e=>{e.target.setCustomValidity(""),u(n.value),l()})),a.addEventListener("change",(e=>{e.target.setCustomValidity(""),c(i.value),l()})),window.validation={mainForm:o,checkFormValidity:()=>{u(n.value),u(r.value),c()}}})(),(()=>{const e=document.getElementsByTagName("fieldset"),t=document.querySelector("#success").content.querySelector(".success"),o=document.querySelector(".ad-form__reset"),n=()=>{document.body.appendChild((()=>{const e=t.cloneNode(!0),o=t=>{"Escape"===t.key&&e.remove(),document.removeEventListener("keydown",o),document.removeEventListener("click",n)},n=()=>{e.remove(),document.removeEventListener("click",n),document.removeEventListener("keydown",o)};return document.addEventListener("keydown",o),document.addEventListener("click",n),e})()),window.validation.mainForm.reset(),window.validation.checkFormValidity(),window.move.getAddress(window.move.pinHeightDisable)},r=()=>{const e=document.querySelector("#error").content.querySelector(".error");document.main.appendChild((()=>{const t=e.cloneNode(!0),o=t.querySelector(".error__button"),n=e=>{"Escape"===e.key&&t.remove(),document.removeEventListener("keydown",n),document.removeEventListener("click",r)},r=()=>{t.remove(),document.removeEventListener("click",r),document.removeEventListener("keydown",n)};return o.addEventListener("click",r),document.addEventListener("click",r),document.addEventListener("keydown",n),t})())};window.validation.mainForm.addEventListener("submit",(e=>{window.backend.save(new FormData(window.validation.mainForm),n,r),e.preventDefault(),window.validation.mainForm.reset(),window.main.getDisablePages()})),o.addEventListener("click",(()=>{window.validation.mainForm.reset(),window.validation.checkFormValidity(),window.main.getDisablePages()})),window.form={formTurnOff:()=>{for(let t=0;t<e.length;t++)e[t].disabled=!0},formTurnOn:function(){for(let t=0;t<e.length;t++)e[t].disabled=!1}}})(),(()=>{const e=document.querySelector(".map"),t=e=>{0===e.button&&r()},o=e=>{"Enter"===e.key&&r()},n=()=>{window.pin.pinsRemover(),window.pin.cardRemover(),e.classList.add("map--faded"),window.validation.mainForm.classList.add("ad-form--disabled"),window.move.getDefaultPinPosition(),window.move.getAddress(window.move.pinHeightDisable),window.form.formTurnOff(),window.move.mainPin.addEventListener("mousedown",t),window.move.mainPin.addEventListener("keydown",o)},r=()=>{window.validation.mainForm.classList.remove("ad-form--disabled"),e.classList.remove("map--faded"),window.form.formTurnOn(),window.move.getAddress(window.move.ACTIVE_PIN_HEIGHT),window.backend.load(window.filter.onDataLoad,window.backend.onError),window.validation.checkFormValidity(),window.move.mainPin.removeEventListener("mousedown",t),window.move.mainPin.removeEventListener("keydown",o)};n(),window.main={map:e,getDisablePages:n}})()})();