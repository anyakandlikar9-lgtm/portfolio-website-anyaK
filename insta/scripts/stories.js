const Viewstory = document.getElementById("Viewstory");
const imageView = document.getElementById("imageView");
const stopView = document.getElementById("stopView");

const stories = document.querySelectorAll(".story .view");


stories.forEach(story => {
  story.addEventListener("click",() => {
  const imgSrc = story.getAttribute("src");
  imageView.setAttribute("src",imgSrc );
  Viewstory.style.display = "flex";
  })
});

stopView.addEventListener("click",() => {
  Viewstory.style.display = "none";
})

document.addEventListener("keydown",function(event) {
  if(event.key === 'Escape') {
    Viewstory.style.display = "none";
  }
})
