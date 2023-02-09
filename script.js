gradient = document.querySelector(".gradient");

gradient.addEventListener("click", function() {
  document.querySelector(".sidebar").classList.toggle("visible")
});

default_local_storage_items = {
  "items":[
    {"key":"bg-color", "value":"#070727", "function":"update_background"},

    {"key":"primary-color", "value":"#ff0000", "function":"update_gradient_background"},
    {"key":"secondary-color", "value":"#0000ff", "function":"update_gradient_background"},

    {"key":"blur-effect", "value":"100", "function":"update_gradient_blur_effect"},

    {"key":"animation-duration", "value":"30", "function":"update_gradient_animation_duration"},
    {"key":"animation-direction", "value":[
      {"key":"normal", "value":""},
      {"key":"reverse", "value":""},
      {"key":"alternate", "value":true},
      {"key":"alternate-reverse", "value":""},
    ], "function":"update_gradient_animation_direction"},

    {"key":"border_top-left-1", "value":"30", "function":"update_gradient_border_radius"},
    {"key":"border_top-right-1", "value":"70", "function":"update_gradient_border_radius"},
    {"key":"border_bottom-right-1", "value":"70", "function":"update_gradient_border_radius"},
    {"key":"border_bottom-left-1", "value":"30", "function":"update_gradient_border_radius"},
    {"key":"border_top-left-2", "value":"30", "function":"update_gradient_border_radius"},
    {"key":"border_top-right-2", "value":"30", "function":"update_gradient_border_radius"},
    {"key":"border_bottom-right-2", "value":"70", "function":"update_gradient_border_radius"},
    {"key":"border_bottom-left-2", "value":"70", "function":"update_gradient_border_radius"}
  ]
}

for (i = 0; i < default_local_storage_items["items"].length; i++) {
  let key = default_local_storage_items["items"][i].key
  let value = default_local_storage_items["items"][i].value
  let item_function = default_local_storage_items["items"][i].function

  if (typeof value == "object") {

    for (let index = 0; index < value.length; index++) {
      let obj = value[index];

      if (localStorage.getItem(key) == null && obj.value) {
        localStorage.setItem(key, obj.key)
      }

      let input = document.querySelector(`#${obj.key}`)

      if (obj.key == localStorage.getItem(key)) {
        input.checked = true
      }

      input.addEventListener("input", function(e) {
        localStorage.setItem(key, e.target.id)
        window[item_function]()
      })
    }

  } else {
    if (localStorage.getItem(key) == null) {
      localStorage.setItem(key, value)
    }

    let input = document.querySelector(`#${key}`)
    input.value = localStorage.getItem(key)

    input.addEventListener("input", function(e) {
      localStorage.setItem(key, e.target.value)
      window[item_function]()
    })
  }
}

  function update_background() {
    document.querySelector("body").style.backgroundColor =
    localStorage.getItem("bg-color");
  }

function update_gradient_background() {
  gradient.style.backgroundImage =
    `linear-gradient(${localStorage.getItem("primary-color")}, ${localStorage.getItem("secondary-color")})`;
}

function update_gradient_animation_duration() {
  gradient.style.animationDuration =
    `${localStorage.getItem("animation-duration")}s`;
}

function update_gradient_animation_direction() {
  gradient.style.animationDirection = localStorage.getItem("animation-direction")
}

function update_gradient_border_radius() {
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
    `
}

function update_gradient_blur_effect() {
  gradient.style.filter =
    `blur(${localStorage.getItem("blur-effect")}px)`;
}

function reset_to_default() {
  let defaults = default_local_storage_items["items"]

  for (let i = 0; i < defaults.length; i++) {
    key = defaults[i].key
    value = defaults[i].value

    if (typeof value == "object") {
      value.forEach(obj => {
        if (obj.value) {
          localStorage.setItem(key, obj.key)
        }
      });

    } else {
      localStorage.setItem(key, value)
    }
  }

  update_background()
  update_gradient_background()
  update_gradient_animation_duration()
  update_gradient_animation_direction()
  update_gradient_border_radius()
  update_gradient_blur_effect()
}

update_background()
update_gradient_background()
update_gradient_animation_duration()
update_gradient_animation_direction()
update_gradient_border_radius()
update_gradient_blur_effect()

document.querySelector("#reset").addEventListener("click", reset_to_default)

setTimeout(() => {
  document.querySelector(".info-text").remove()
}, 4500)
