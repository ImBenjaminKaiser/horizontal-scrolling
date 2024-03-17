
// Wait for the DOM to be fully loaded
// Fixes gsap throwing error "scrollWrapperWrapper not defined"
document.addEventListener("DOMContentLoaded", function() {
    const scrollWrapperWrapper = document.querySelector('.scroll-wrapper-wrapper');
    const scrollWrapper = document.querySelector('.scroll-wrapper');
    const scrollWrapperWidth = scrollWrapper.getBoundingClientRect();
    // Used getBoundingClientRect because it includes the margin, while element.offsetWidth does not
    // From here: https://www.geeksforgeeks.org/how-to-get-the-elements-actual-width-and-height-in-javascript/


    // From lenis docs: https://github.com/darkroomengineering/lenis?tab=readme-ov-file#gsap-scrolltrigger
    const lenis = new Lenis({
        duration:1.5,// How long it takes to catch up with the actual scroll position
        wheelMultiplier: 1.3,// Makes the user scroll faster
        smooth: true,
    })

    lenis.on('scroll', (e) => {
    //   console.log(e) // Shows information about the current scrolling state
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // learned form gsap docs and previous knowledge
    // ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
    // Gsap docs: https://gsap.com/docs/v3/
    // Create a GSAP animation for the scroll-wrapper element to create a horizontal scrolling effect
    gsap.to(scrollWrapper, {
        x: -(scrollWrapperWidth.width - (window.innerWidth)) + "px", // Moves the scroll-wrapper element to the left so that the scroll-wrapper's right border ends on the right side of the screen
        scrollTrigger: {
            trigger: scrollWrapperWrapper, // Use the scroll-wrapper-wrapper as the trigger for the animation
            start: "top top", // Start the animation when the top of the scroll-wrapper-wrapper hits the top of the viewport
            end: "+="+ scrollWrapperWidth.width/1.1, // End the animation when the user has scrolled down the same amount as the width of the scroll-wrapper element. 
            // Divided by 1.1 to make the distance between the start and end shorter, which causes the animation to play slightly faster
            scrub: true, // Makes the animation animate as the user scrolls
            pin: true, // Pin the scroll-wrapper-wrapper in place while it's being animated, stops user from scrolling past it
            anticipatePin: 1, // Prevents a jittery effect when the animation is reversed, best practice
            // markers: true, // Uncomment to see where the start and ending triggers are
            ease:"none",
        }
    });


});

