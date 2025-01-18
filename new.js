let main = document.querySelector("#main")
let cursor = document.querySelector("#cursor")
main.addEventListener("mousemove",(e)=>{
    gsap.to(cursor,{
        x: e.x,
        y: e.y,
        backgroudnColor:"white",
      });
})

let timeline = gsap.timeline({})
let menu = document.querySelector("#menu")
let closed = document.querySelector("#close")
let ani =document.querySelector("#ani-section")
let account = document.querySelector("#account")
timeline.to("#ani-section",{
  right:0,
  duration:1,

})
timeline.from("#ani-section h3",{
  x:150,
  duration:0.5,
  stagger:0.28,
  opacity:0
})
timeline.to("#ani-section i",{
  // y:100,
  opacity:1,
  duration:0.2,
  delay:0.5
})
timeline.from(account,{
  y:-100,
  opacity:0,
  duration:1
})
timeline.pause()

menu.addEventListener("click",()=>{
  timeline.play()
})

closed.addEventListener("click",()=>{
  timeline.reverse()
})
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.getElementById("spline-container").classList.remove("hidden");
      }
    });
  },
  { threshold: 0.1 }
);

let element = document.querySelector("#spline-container");

let navbar = document.querySelector("#nav")

gsap.from(navbar,{
  y:-500,
  opacity:0,
  duration:1,
  delay:2
})

// setTimeout(navbar(),5000)
// gsap.from("#spline-container", {
//   y:100,
//   opacity:0,
//   duration:2,
//   delay:5
// })
gsap.from("#heading", {
  y:100,
  opacity:0,
  duration:1,
  delay:3
})
let time = gsap.timeline()
time.to("#carousel-1", {
  x: "-120%", 
  repeat: -1, 
  duration:20,
  ease: "none" ,
  modifiers: {
      xPercent: (x) => {
        // This ensures that after the scroll completes, we don't see a jump by continuously looping
        return x % 100;
      }
    }
});

let carousel = document.querySelector("#carousel-1")
carousel.addEventListener("mouseenter",()=>{
  time.pause()
})
carousel.addEventListener("mouseleave",()=>{
  time.play()
})

const canvas = document.getElementById("universeCanvas");
const ctx = canvas.getContext("2d");

// Resize the canvas to fit the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create an array of stars
const stars = [];
const numStars = 1000;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width - centerX,
    y: Math.random() * canvas.height - centerY,
    z: Math.random() * canvas.width,
  });
}

function drawWarpSpeed() {
  // Clear the canvas with a slight fade
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    const scale = canvas.width / star.z;
    const x = centerX + star.x * scale;
    const y = centerY + star.y * scale;
    const size = Math.max(1, 2 / star.z);

    // Draw the star
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // Move the star closer to the viewer
    star.z -= 15;

    // Reset the star if it moves past the viewer
    if (star.z <= 0) {
      star.x = Math.random() * canvas.width - centerX;
      star.y = Math.random() * canvas.height - centerY;
      star.z = canvas.width;
    }
  });
}

function animate() {
  drawWarpSpeed();
  requestAnimationFrame(animate);
}

// Adjust canvas size on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animate();
window.addEventListener("wheel",(e)=>{
  console.log(e.deltaY)
  if(e.deltaY>0){
      gsap.to(".marq",{
          transform:'translateX(-300%)',
          duration:2.5,
          repeat:-1,
          ease:"none"
      })
      gsap.to(".marq img",{
          rotate:180
      })
  }else{
      gsap.to(".marq",{
          transform:'translateX(0%)',
          duration:4,
          repeat:-1,
          ease:"none"
      })
      gsap.to(".marq img",{
          rotate:0
      })
  }
})
