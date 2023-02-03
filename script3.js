"use strict";

//Event propogation bubbling and capturing 

 //rgb(255,255,255);
 const randomInt=(min,max)=>Math.floor(Math.random()*(max-min+1)+min);
 const randomColor=()=>`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
 console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click',function (e){
    this.style.backgroundColor=randomColor(); 
    console.log(e.target,e.currentTarget)
    //stop event propogation
    e.stopPropagation();
})

document.querySelector('.nav__links').addEventListener('click',function(e){
    this.style.backgroundColor=randomColor(); 
    console.log(e.target,e.currentTarget)
})

document.querySelector('.nav').addEventListener('click',function(e){
    this.style.backgroundColor=randomColor(); 
    console.log(e.target,e.currentTarget)
});

