"use strict";

let SQUARE = 324;
const container = document.querySelector(".container");

const randomColor = () => {
  // let randomColor = `rgb(${Math.floor(Math.random() * 255 + 1)},${Math.floor(
  //   Math.random() * 255 + 1
  // )},${Math.floor(Math.random() * 255 + 1)})`;
  let randomColor = `hsl(${Math.floor(Math.random() * 360 + 1)},49%,59%)`;
  console.log(randomColor);

  return randomColor;
};

for (let i = 0; i < SQUARE; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  container.appendChild(square);
}

container.addEventListener("mouseover", (e) => {
  let targetClassList = [...e.target.classList];

  if (targetClassList.includes("square")) {
    e.target.style.backgroundColor = randomColor();
  }
});

container.addEventListener("mouseout", (e) => {
  let targetClassList = [...e.target.classList];
  if (targetClassList.includes("square")) {
    setTimeout(() => {
      e.target.style.backgroundColor = `#423a3a`;
    }, 2000);
  }
});
