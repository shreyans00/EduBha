// Hamburger 

const burger = document.querySelector('.burger')
const navbar = document.querySelector('.navbar')
const sidebar = document.querySelector('.sidebar')
const nav = document.querySelector('.nav')

burger.addEventListener('click', () => {
    sidebar.classList.toggle('v-class-responsive');
    nav.classList.toggle('v-class-responsive');
    navbar.classList.toggle('h-nav-responsive');
})


// Form responses

// const form = document.querySelector('form')

// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     alert("Currently not accepting responses.")
// })



// var time = document.querySelector(".time");

// var cntDate = new Date("Dec 15, 2022 23:59:59").getTime();
// var x = setInterval(function () {
//     var now = new Date().getTime();
//     var diff = cntDate - now;
//     var days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((diff % (1000 * 60)) / 1000);

//     time.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

//     if (diff < 0) {
//         clearInterval(x);
//         time.innerHTML = "Time's Up";
//     }
// }, 1000);
