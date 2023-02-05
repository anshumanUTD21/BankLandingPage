"use strict";

//Event propogation bubbling and capturing 

 //rgb(255,255,255);
 const randomInt=(min,max)=>Math.floor(Math.random()*(max-min+1)+min);
 const randomColor=()=>`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
 console.log(randomColor());


 //addeventlistner listen only during bubbling phase
document.querySelector('.nav__link').addEventListener('click',function (e){
    this.style.backgroundColor=randomColor(); 
    console.log(e.target,e.currentTarget)
    //stop event propogation
    // e.stopPropagation();
})

document.querySelector('.nav__links').addEventListener('click',function(e){
    this.style.backgroundColor=randomColor(); 
    console.log(e.target,e.currentTarget)
})

document.querySelector('.nav').addEventListener('click',function(e){
    this.style.backgroundColor=randomColor(); 
    console.log(e.target,e.currentTarget)
},true); // here true is the thired argument of addeventlistener and it tells addeventlistenr to capturing phase 


//-----------------------------------------

//DOM TRAVERSING

const h1=document.querySelector('h1');

//going downward selecting child

console.log(h1.querySelectorAll('.highlight'))// selecting childer of h1 with class name highlight

console.log(h1.childNodes)// everysingle node of every single type child of h1

console.log(h1.children)//html colltion is returned 

//first child
h1.firstElementChild.style.color="white"
h1.lastElementChild.style.color="orangered"



//going upward selecting parents

console.log(h1.parentNode)
console.log(h1.parentElement)
h1.closest('.header').style.background='var(--gradient-secondary)';// chosing closest parent element to h1 with class .header

//going sideways - selecting siblings( we can select only direct sibling like previous and next)

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);


console.log(h1.previousSibling);
console.log(h1.nextSibling)

//to get all the sibilings 
console.log(h1.parentElement.children);//html collection

[...h1.parentElement.children].forEach(function(el){
    if(el !== h1){
        el.style.transform='scale(.5)';
    }
})

//STICKY NAVIGATION INTERSECTION API


