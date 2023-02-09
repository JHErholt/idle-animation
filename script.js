gradient = document.querySelector(".gradient");

gradient.addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("visible")
});

default_local_storage_items = {
  "items": [
    { "key": "bg-color", "value": "#070727", "function": "update_background" },

    { "key": "primary-color", "value": "#ff0000", "function": "update_gradient" },
    { "key": "secondary-color", "value": "#0000ff", "function": "update_gradient" },

    {
      "key": "size", "value": [
        { "key": "standard", "value": false },
        { "key": "equal-height-width", "value": true },
      ], "function": "update_gradient"
    },

    { "key": "animation-duration", "value": 10, "function": "update_gradient" },
    {
      "key": "animation-direction", "value": [
        { "key": "normal", "value": false },
        { "key": "reverse", "value": false },
        { "key": "alternate", "value": true },
        { "key": "alternate-reverse", "value": false },
      ], "function": "update_gradient"
    },
    {
      "key": "animation-timing", "value": [
        { "key": "ease", "value": false },
        { "key": "linear", "value": true },
        { "key": "ease-in", "value": false },
        { "key": "ease-out", "value": false },
      ], "function": "update_gradient"
    },

    { "key": "border_top-left-1", "value": 100, "function": "update_gradient" },
    { "key": "border_top-right-1", "value": 0, "function": "update_gradient" },
    { "key": "border_bottom-right-1", "value": 100, "function": "update_gradient" },
    { "key": "border_bottom-left-1", "value": 100, "function": "update_gradient" },
    { "key": "border_top-left-2", "value": 100, "function": "update_gradient" },
    { "key": "border_top-right-2", "value": 100, "function": "update_gradient" },
    { "key": "border_bottom-right-2", "value": 100, "function": "update_gradient" },
    { "key": "border_bottom-left-2", "value": 0, "function": "update_gradient" },

    { "key": "blur-effect", "value": 60, "function": "update_gradient" }
  ]

}

default_local_storage_items["items"].forEach(option => {
  if (typeof option.value == "object") {
    option.value.forEach(suboption => {
      if (localStorage.getItem(option.key) == null && suboption.value) {
        localStorage.setItem(option.key, suboption.key)
      }

      let input = document.querySelector(`#${suboption.key}`)

      if (suboption.key == localStorage.getItem(option.key)) {
        input.checked = true
      }

      input.addEventListener("input", function (e) {
        localStorage.setItem(option.key, e.target.id)
        window[option.function]()
      })
    })

  } else {
    if (localStorage.getItem(option.key) == null) {
      localStorage.setItem(option.key, option.value)
    }

    let input = document.querySelector(`#${option.key}`)
    input.value = localStorage.getItem(option.key)

    input.addEventListener("input", function (e) {
      localStorage.setItem(option.key, e.target.value)
      window[option.function]()
    })
  }
})

function update_background() {
  document.querySelector("body").style.backgroundColor = localStorage.getItem("bg-color");
}

function update_gradient() {
  gradient.style.backgroundImage = `linear-gradient(${localStorage.getItem("primary-color")}, ${localStorage.getItem("secondary-color")})`;
  gradient.style.animationDuration = `${localStorage.getItem("animation-duration")}s`;
  gradient.style.animationDirection = localStorage.getItem("animation-direction")
  gradient.style.animationTimingFunction = localStorage.getItem("animation-timing")
  gradient.style.borderRadius =
    `
    ${localStorage.getItem("border_top-left-1")}%
    ${localStorage.getItem("border_top-right-1")}%
    ${localStorage.getItem("border_bottom-right-1")}%
    ${localStorage.getItem("border_bottom-left-1")}%
    /
    ${localStorage.getItem("border_top-left-2")}%
    ${localStorage.getItem("border_top-right-2")}%
    ${localStorage.getItem("border_bottom-right-2")}%
    ${localStorage.getItem("border_bottom-left-2")}%
    `;
  gradient.style.filter = `blur(${localStorage.getItem("blur-effect")}px)`;

  if (localStorage.getItem("size") == "standard") {
    gradient.style.height = "40vh"
    gradient.style.width = "40vw"
  } else {
    gradient.style.height = "30vw"
    gradient.style.width = "30vw"
  }
}

function reset_to_default() {
  if (confirm("Are you sure?, this will delete all your settings")) {
    default_local_storage_items["items"].forEach(option => {

      if (typeof option.value == "object") {
        option.value.forEach(suboption => {
          let input = document.querySelector(`#${suboption.key}`)

          if (suboption.value) {
            localStorage.setItem(option.key, suboption.key)
            input.checked = true
          }
        });

      } else {
        let input = document.querySelector(`#${option.key}`)
        localStorage.setItem(option.key, option.value)
        input.value = localStorage.getItem(option.key)
      }
    })

    update_background()
    update_gradient()
  }
}

update_background()
update_gradient()

document.querySelector("#reset").addEventListener("click", reset_to_default)

setTimeout(() => {
  document.querySelector(".info-text").remove()
}, 4500)
