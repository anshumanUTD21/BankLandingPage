'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');

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



