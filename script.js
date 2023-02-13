'use strict';
//MODEL COMPOENT ELEMENTS
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

//BTN COMPONENT ELEMENTS
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');

//TABBED COMPONENT ELEMENTS
const tabs=document.querySelectorAll(".operations__tab");
const tabsContainer=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll(".operations__content");

//FADE ANIMATION ELEMENTS
const nav= document.querySelector('.nav');


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

//-----------------------------
//
//MENU FADE ANIMATION------------
//
//-----------------------------


//creating a single fucntion to change the opacity back and forth [refactoring original code]
const handleHover=function(e,opacity){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const sibiling=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    sibiling.forEach((s)=>{
      if( s !== link) s.style.opacity=this;
    })
    logo.style.opacity=this;
}
}


//here we will use mouseove, here beacuse it bubbles unlike mouseenter
//nav.addEventListener('mouseover',function(e){
    //code after refactoring METHOD 1
  //  handleHover(e,0.5);

    //code before refactoring
                      /*if(e.target.classList.contains('nav__link')){
                        const link=e.target;
                        const sibiling=link.closest('.nav').querySelectorAll('.nav__link');
                        const logo=link.closest('.nav').querySelector('img');
                        sibiling.forEach((s)=>{
                          if( s !== link) s.style.opacity=0.5;
                        })
                        logo.style.opacity=0.5;
                        } 
                      */
//})

//CODE REFACTORING METHOD 2 [using bind]
//passing 'argument' into handler
    nav.addEventListener('mouseover',handleHover.bind(.5));

//opposite of mouseover moueout
    nav.addEventListener('mouseout',handleHover.bind(1))

//nav.addEventListener('mouseout',function(e){
 
  //handleHover(e,1);
  
  
                        /* if(e.target.classList.contains('nav__link')){
                          const link=e.target;
                          const sibiling=link.closest('.nav').querySelectorAll('.nav__link');
                          const logo=link.closest('.nav').querySelector('img');
                          sibiling.forEach((s)=>{
                            if( s !== link) s.style.opacity=1;
                          })
                          logo.style.opacity=1;
                          }
                        */

//})


//-----------------------------
//
//Sticky Navigation------------
//
//-----------------------------

/*
 older but uneffecient method-------

const initialCoords=section1.getBoundingClientRect(); //GETTING THE positon of 1st section from where ssticky needs to be added
window.addEventListener('scroll',function(){
  if(window.scrollY > initialCoords.top){
    nav.classList.add('sticky');
  }else{
    nav.classList.remove('sticky')
  }
})
*/
//sticky navigation :intersection observer API

const header=document.querySelector('.header');
const navHeight=nav.getBoundingClientRect().height;
 
const stickyNav=function(entries){
  const [entry]=entries;
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else{
    nav.classList.remove('sticky')
  }
}

const headerObserver=new IntersectionObserver(stickyNav,{root: null,threshold:0,rootMargin:`-${navHeight}px`})

headerObserver.observe(header);


//-----------------------------
// SHOW SECTION OF SCROLL EFFECT
//-----------------------------

const allSections=document.querySelectorAll('.section')


const revealSection=function(entries,observe){
  const [entry]=entries;
  // console.log(entry)
  if(!entry.isIntersecting) return ;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target)
}

const sectionObserver=new IntersectionObserver(revealSection,{
  root:null, 
  threshold: 0.15
});
allSections.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden');
})



//-----------------------------
//Lazy loading images feature
//-----------------------------

//selecting all the images with the data attribute of data-src
const imgTarget=document.querySelectorAll('img[data-src]');
// console.log(imgTarget)
const loadImg=function(entries,observer){
  const[entry]=entries;
  if(!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src=entry.target.dataset.src;
  //removing lazy img class only after it is loaded
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);

}


const imgObserver=new IntersectionObserver(loadImg,{
root:null,
threshold:0,
rootMargin:'200px',
})

imgTarget.forEach((img)=>imgObserver.observe(img));


//-----------------------------
//-----------------------------
//slider components
//-----------------------------
//-----------------------------

const slides=document.querySelectorAll('.slide');

const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');
const dotContainer=document.querySelector('.dots')

let currentSlide=0;
const maxSlide=slides.length;
//setting up the initial position of the slides
//0% 100% 200% 300%
// slides.forEach((s,i)=>{
//   s.style.transform=`translateX(${100*i}%)`
// })

const createDots=function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`)
  
  })
}
createDots();

//activate dots
const activateDot=function(slide){
  document.querySelectorAll('.dots__dot').forEach((dot)=>{
    dot.classList.remove('dots__dot--active');

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  })
}



const goToSlide=function(slide){
  slides.forEach((s,i)=>s.style.transform=`translateX(${100*(i-slide)}%)`)

}
goToSlide(0)

const nextSlide=function(){
  
  if(currentSlide===(maxSlide-1)){
    currentSlide=0
  }else{
    currentSlide++;
  }
  goToSlide(currentSlide)
  activateDot(currentSlide);
}

 const prevSlide=function(){
  if(currentSlide===0){
    currentSlide=maxSlide-1;
  }else{
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
}

//to go to next slide


btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown',function(e){
  // if(e.key==='ArrowLeft'){
  //   prevSlide();
  // }else if(e.key==='ArrowRight'){
  //   nextSlide();
  // }else{
  //   return;
  // }
  
  //Same functionalty using short circuting
   
  e.key==='ArrowLeft' && prevSlide();
  e.key==='ArrowRight' && nextSlide();
  

  
})

//implementing dot feature
dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide}=e.target.dataset;
    goToSlide(slide);
    activateDot(slide)
  }
})














