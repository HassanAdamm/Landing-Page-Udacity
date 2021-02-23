/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navBarList = document.querySelector('#navbar__list');      // Variable holding the ul element
const sections   = document.querySelectorAll('section');         // Array with all the sections

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    // Looping over each section
    for(const section of sections){
        // Modifying the inner HTML of the ul tag appending new list items same no. of sections
        navBarList.innerHTML += `<li><a class="menu__link" href="#${section.id}">${section.dataset.nav}</a></li>`
    }
}

// Add class 'active' to section when near top of viewport

// Function to check if the section is in the viewport
function isInViewport (section) {
    const bounding = section.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (document.documentElement.clientHeight+150) &&
        bounding.right <= (document.documentElement.clientWidth)
    );
};

// Function to add or remove active class based on position in view port
function setActiveClass(){
    for(const section of sections){
        if (isInViewport(section))
            section.classList.add('your-active-class');
        else
            section.classList.remove('your-active-class');
    }
}


// Scroll to anchor ID using scrollTO event
function smoothScroll(){
    for(const link of links){
        const sectionId = link.getAttribute("href");
            link.addEventListener('click', function(event){
                event.preventDefault()
                window.scrollTo({
                    top: document.querySelector(sectionId).offsetTop-60,
                    behavior: 'smooth'
                });
            });
    }

}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();
const links      = document.querySelectorAll('.menu__link'); // Array with all the list anchor elements
// Scroll to section on link click
smoothScroll();
// Set sections as active
document.addEventListener('scroll', setActiveClass);
