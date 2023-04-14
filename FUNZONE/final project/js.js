// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});
let sliderContainer = document.querySelector('.slider-container');
let slider = document.querySelector('.slider-items');
let items = slider.querySelectorAll('.slider-item');

// Variables globales
let initialDragOffset;
let currentDragOffset;

// Écouteur délégué des événements de clic
document.querySelector('.slider-arrows').addEventListener('click', (event) => {
  let clickEventPath = event.composedPath().slice(0, -2);
  
  console.log("Coucou");
  
  for (let element of clickEventPath) {
    if ('previous' in element.dataset) {
      previousSlideClickHandler(element, sliderContainer);
      break;
    } else if ('next' in element.dataset) {
      nextSlideClickHandler(element, sliderContainer);
      break;
    }
  }
});

// Gestionnaire du bouton précédent
function previousSlideClickHandler(element, section) {
  scrollToSlide('previous');
}

// Gestionnaire du bouton suivant
function nextSlideClickHandler(element, section) {
  scrollToSlide('next');
}

// Écouteur d'événements liés au drag du slider
sliderContainer.addEventListener('mousedown', (event) => desktopScrollMouseDownHandler(event));

document.addEventListener('mousemove', (event) => desktopScrollMouseMoveHandler(event));

document.addEventListener('mouseup', (event) => desktopScrollMouseUpHandler(event));

// Gestionnaire de l'initiation d'un drag slider
function desktopScrollMouseDownHandler(event) {
  if (event.target.classList.contains('slider-arrow')) return false;
  
  event.preventDefault();
  
  document.querySelector('body').setAttribute('data-sliding', '');
  
  initialDragOffset = event.clientX - sliderContainer.offsetLeft;
}

// Gestionnaire du drag slider
function desktopScrollMouseMoveHandler(event) {
 if (!document.querySelector('body').hasAttribute('data-sliding')) return false;
  
  currentDragOffset = event.clientX;
  
  let sliderScrollOffset = slider.scrollLeft;
  let nextSliderOffset = sliderScrollOffset - (currentDragOffset - initialDragOffset);
  
  slider.scroll({ left: nextSliderOffset, behavior: 'auto' });
  
  initialDragOffset = currentDragOffset;
}

// Gestionnaire de la fin d'un drag slider
async function desktopScrollMouseUpHandler(event) {
  if (!document.querySelector('body').hasAttribute('data-sliding')) return false;
  
  document.querySelector('body').removeAttribute('data-sliding');
  
  slider.style.scrollSnapType = "none";
  
  scrollToSlide();
  
  setTimeout(() => slider.style.scrollSnapType = null, 800)
}

// Gestionnaire du scroll
function scrollToSlide(command) {
  let numberOfItems = items.length;
  let itemWidth = items[0].offsetWidth;
  let sliderGap = parseInt(window.getComputedStyle(slider).rowGap);
  let numberOfItemsOnScreen = parseFloat((window.innerWidth / (itemWidth + sliderGap)).toFixed(2));
  let sliderScrollOffset = slider.scrollLeft;
  let activeItemIndex = Math.ceil(sliderScrollOffset / (itemWidth + sliderGap));
  let nextItemIndex;
  
  switch(command) {
    case 'previous':
      nextItemIndex = activeItemIndex - 1;      
      if (nextItemIndex < 0) {
        nextItemIndex = numberOfItems - Math.floor(numberOfItemsOnScreen);
      }
      break;
    case 'next':
      nextItemIndex = activeItemIndex + 1;
      if (nextItemIndex > numberOfItems - Math.floor(numberOfItemsOnScreen)) {
        nextItemIndex = 0;
      }
      break;
    default:
      nextItemIndex = Math.floor(sliderScrollOffset / (itemWidth + sliderGap));
  }
    
  let nextSliderOffset = nextItemIndex * (itemWidth + sliderGap);
  
  slider.scroll({ left: nextSliderOffset, behavior: 'smooth' });
}




// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     var current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });
$(".hover").mouseleave(
	function() {
	  $(this).removeClass("hover");
	}
  );