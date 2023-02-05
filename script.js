'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach((btn)=>{
  btn.addEventListener('click',openModal)
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//-----------------------------
//
//Implementing smooth scrolling 
//
//-----------------------------

//old way


btnScrollTo.addEventListener('click',(e)=>{
  //getting the coordinates of section 1
  const s1coords=section1.getBoundingClientRect();
  /*
  console.log(e.target.getBoundingClientRect());
  -getBoundingClientRect- is relative to visible browser
  -getting cooardinates 
  console.log('current scroll x/y',window.pageXOffset,window.pageYOffset)
  -measure the height and width of viewport [the visible area ]
  console.log('height and width of viewport',document.documentElement.clientHeight,document.documentElement.clientWidth)
  */
 //scrolling feature //telling where to scroll on button click 
 //here s1coords.top is relative to the viewport and not to the document[ie top of the page]

 //OLD WAY--------------1
//   window.scrollTo(
//     s1coords.left+window.pageXOffset,
//     s1coords.top+window.pageYOffset
//     );
// })
// //OLD WAY ---------------2
// window.scrollTo({
//   left:s1coords.left+window.pageXOffset,
//   top:s1coords.top+window.pageYOffset,
//   behavior:"smooth"  
// });

//MODERN WAY- works in only modern browsers
  section1.scrollIntoView({behavior:'smooth'});
})


//-----------------------------
//
//Page Navigation --smooth navigation
//
//-----------------------------
/*
document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click',function(e){
    e.preventDefault();
    const id=this.getAttribute('href');//used getAttribute to get the absolute href
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
    console.log('link')
  })
})
*/
//now smooth navigation using Event deligation
  //it needs two steps: 1) add event listener to the common paraent element 2) in that event listener find the element where evenet 
  //originated

  document.querySelector('.nav__links').addEventListener('click',function(e){
    e.preventDefault();
      
    //e.target is where the event happend
      if(e.target.classList.contains('nav__link')){
         const id=e.target.getAttribute('href');
         document.querySelector(id).scrollIntoView({behavior:'smooth'})
      }
  })

//-----------------------------
//
//tabbed components------------
//
//-----------------------------

const tabs=document.querySelectorAll(".operations__tab");
const tabsContainer=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll(".operations__content");

tabsContainer.addEventListener('click',function(e){
  //const clicked=e.target.parentElement;
  //this will work for clicking on span but when we click on button itself it select div contaier
  const clicked=e.target.closest('.operations__tab');
  //guard clause, when we get null for click event
  if(!clicked)return;
  //REMOVE active classes
  tabs.forEach((t)=>t.classList.remove('operations__tab--active'));//this will first remove the active class from all tabs 
  //applying active class
  clicked.classList.add('operations__tab--active');//then here we put active class on the one we need to make active


  //ACTIVATE CONTENT AREA
  tabsContent.forEach((tc)=>tc.classList.remove('operations__content--active'))//remvoing active class from 
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')//here we took dataset value from button 

})



