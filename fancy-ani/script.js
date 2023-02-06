if (localStorage.getItem("bg-color") == null) {
  localStorage.setItem("bg-color", "rgb(7, 7, 39)")
}

if (localStorage.getItem("primary-color") == null) {
  localStorage.setItem("primary-color", "red")
}

if (localStorage.getItem("secondary-color") == null) {
  localStorage.setItem("secondary-color", "blue")
}

if (localStorage.getItem("animation-length") == null) {
  localStorage.setItem("animation-length", "20s")
}

gradient = document.querySelector(".gradient")

document.querySelector("body").style.backgroundColor = localStorage.getItem("bg-color")
gradient.style.backgroundImage = `linear-gradient(${localStorage.getItem("primary-color")}, ${localStorage.getItem("secondary-color")})`
gradient.style.animationDuration = localStorage.getItem("animation-length")

// alert("For at ændre på siden kan du klikke på (L)")

// document.querySelector("body").addEventListener("keyup", function(e) {
//   console.log(e.keyCode)
//   if(e.keyCode === 76) {
//       console.log("click");
//   }
// });