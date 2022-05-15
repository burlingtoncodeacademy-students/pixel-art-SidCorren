let gridWrapper = document.getElementById("gridWrapper");
let colorButtonWrapper = document.getElementById("colorButtonWrapper");
let body = document.getElementById("body");
let sizeInput = document.getElementById("sizeInput");
let submitButton = document.getElementById("submitButton");
let fillButton = document.getElementById("fillButton");
let colorIndicator = document.getElementById("colorIndicator");

let cells = [];
let gridLength = 8;
let palette = [
  "#200429",
  "#135437",
  "#1A923C",
  "#AAB14E",
  "#E0AF90",
  "#F0EDB4",
  "#EBCB59",
  "#EB7E35",
  "#BD2A2F",
  "#6F1669",
  "#6645D1",
  "#7AB9E4",
  "#917951",
  "#8B4C15",
  "#523532",
];
let selectedColor = "#200429";
let mouseDown = false;

function buildGrid() {
  cells = [];

  while (gridWrapper.firstChild) {
    gridWrapper.removeChild(gridWrapper.firstChild);
  }

  let cellDimension = `${(1 / gridLength) * 100}%`;
  for (let i = 0; i < gridLength ** 2; i++) {
    let cell = document.createElement("div");
    cell.style.height = cellDimension;
    cell.style.width = cellDimension;
    cell.className = "cell";
    cell.addEventListener("mousedown", changeCellColor);
    cell.addEventListener("mouseenter", changeCellColorIfMouseDown);
    cells.push(cell);
    gridWrapper.appendChild(cell);
  }
}

function buildPalette() {
  palette.forEach((color) => {
    let colorButton = document.createElement("div");
    colorButton.style.backgroundColor = color;
    colorButton.className = "colorButton";
    colorButton.id = color;
    colorButton.addEventListener("click", (event) => {
      selectedColor = event.target.id;
      colorIndicator.style.backgroundColor = selectedColor;
    });
    colorButtonWrapper.appendChild(colorButton);
  });
}

function changeCellColor(event) {
  event.preventDefault();
  mouseDown = true;
  event.target.style.backgroundColor = selectedColor;
}

function changeCellColorIfMouseDown(event) {
  if (mouseDown) {
    event.target.style.backgroundColor = selectedColor;
  }
}

function handleSubmit() {
  let input = parseFloat(sizeInput.value);
  if (input < 1 || !Number.isInteger(input) || input > 32) {
    window.alert("Please type a whole number from 1 to 32.");
  } else {
    gridLength = input;
    buildGrid();
  }
}

body.addEventListener("mouseup", () => mouseDown = false);
submitButton.addEventListener("click", handleSubmit);
sizeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSubmit();
  }
});
fillButton.addEventListener("click", () => {
  for (let cell of cells) {
    cell.style.backgroundColor = selectedColor;
  }
});

buildGrid();
buildPalette();
colorIndicator.style.backgroundColor = selectedColor;