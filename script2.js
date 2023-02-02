"use strict"
//style, attributes and classes

// ---------------------------------------------
//
//--------SELECTING ELEMENT---------------------
//
//----------------------------------------------
//selecting whole document
//queryselector needs selector like . and #
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const headerEl=document.querySelector('.header');
//querySelectorAll return an collection of nodes [NODE DOESN'T UPDATES AUTOMATICALLY LIKE HTMLCollection]
const allSections=document.querySelectorAll('.section');
console.log(allSections)
//queryselector are availbe for both ELEMENTS AND DOCUMENTS

//getElement doesn't need selector like . and #
document.getElementById('section-1');
//getElementsByTagName returns and HTMLCollection [THIS UPDATES  IF THE DOM CHANGES ]
const allButton=document.getElementsByTagName('button');
console.log(allButton)

//getElementByClassName
console.log(document.getElementsByClassName('btn'));// this as well return HTMLCollection

// ---------------------------------------------
//
//--------CREATING AND INSERTING ELEMENT---------------------
//
//----------------------------------------------

//CREATING ELEMENT------------------------------
//.insertAdjecentHTML

const message=document.createElement('div');//this will return an DOM element stored in message variable
message.classList.add('cookie-message');
message.textContent="We use cookies for improved functionalities and analytics."
message.innerHTML='We use cookies for improved functionalities and analytics. <button class="btn btn--close-cookie">Got IT</button>'

// headerEl.prepend(message);// insert as the first child of the element
headerEl.append(message)
// headerEl.append(message.cloneNode(true))// this will create a copy of message node in dom 

// headerEl.before(message);
// headerEl.after(message);

//DELETE ELEMENT---------------------------
document.querySelector('.btn--close-cookie').addEventListener('click',()=>{
  message.remove();
  // message.parentElement.remove(message);//before remove method this is the way elements were deleted 
})

// ---------------------------------------------
//
//--------STYLE, ATTRIBUTES AND CLASSES---------------------
//
//----------------------------------------------

message.style.backgroundColor="#37383d";
message.style.width='120%';

console.log(message.style.height);// this will not work
console.log(message.style.backgroundColor);// this worked because it is applied inline

//to get the style any how
//getComputedStyle
// console.log(getComputedStyle(message))//give all the applied styles
console.log(getComputedStyle(message).color)//gives specific style
message.style.height=Number.parseFloat(getComputedStyle(message).height,10)+30+'px';

//chaining the css style through js
document.documentElement.style.setProperty('--color-primary','orangered')

// ---------------------------------------------
//
//--------ATTRIBUTES---------------------
//
//----------------------------------------------
//to get the attributes of an element
const logo=document.querySelector('.nav__logo');
console.log(logo.alt)
console.log(logo.src)//get absolute attribute
console.log(logo.getAttribute('src'))//to get relative attribut

console.log(logo.className);//WE use className for fetching class of a an elemnt

//set the attriibute of element
logo.alt='Beautiful minimalist logo';
console.log(logo.alt)
//alternate //to set use defined attributes 
logo.setAttribute('company','Bankist');

//get href from link
const link=document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

const link2=document.querySelector('.nav__link--btn');
console.log(link2.href);
console.log(link2.getAttribute('href'));

//---------------------------------------------
//DATA ATTRIBUTES------------------------------
//---------------------------------------------

console.log(logo.dataset.versionNumber);

// ---------------------------------------------
//
//--------classes---------------------
//
//----------------------------------------------

logo.classList.add('c','j');
logo.classList.remove('');
logo.classList.toggle('');
logo.classList.contains('');

//set classes //avoid using as it will remove all exisitng classes and remove all others
// logo.className='jonas'