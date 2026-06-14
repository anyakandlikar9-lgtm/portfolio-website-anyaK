let tablinks = document.getElementsByClassName("tab-links");

let tabcontents = document.getElementsByClassName("tab-contents");

function openTab(tabName){
  for(let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }

  for(let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

const navLinks =  document.querySelector("nav ul");
const menuIcon = document.querySelector(".menu");
const closeIcon = document.querySelector(".close")

menuIcon.addEventListener("click",() => {
  navLinks.style.right = "0";
});

closeIcon.addEventListener("click",() => {
  navLinks.style.right = "-280px";
});

const butterfly = document.querySelector('.butterfly');
const title = document.querySelector('.job');

butterfly.addEventListener("animationend", () => {
  title.style.opacity = 1;
  title.style.transform = "translateY(0)";
});

  const scriptURL = 'https://script.google.com/macros/s/AKfycbzmLYYVDGIeR0Y7cUt0t60_DFxJdRBSPTjFGCmyVxm-yPBl3vQf2r-2JxjX9lsVQIAv/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault();
    msg.innerHTML = "Sending...";
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML = "Message sent sucessfully"
        setTimeout(function(){
          msg.innerHTML = ""
        }, 3000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })

