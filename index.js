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
  "#346246",
  "#4D8945",
  "#86B855",
  "#BFD071",
  "#E0E29B",
  "#29254B",
  "#32446B",
  "#3A648D",
  "#44A2BA",
  "#61CAC8",
  "#5B3240",
  "#7D3D3D",
  "#B2614F",
  "#C28962",
  "#D4BB73",
  "#66386B",
  "#974A9D",
  "#C163BD",
  "#D58CBC",
  "#E9B5C4",
  "#4B4B69",
  "#586386",
  "#6E87AC",
  "#84ADC3",
  "#B3DADE",
];
let selectedColor = "#32446B";
let mouseDown = false;

// Gets rid of the old cells and makes a new number of cells based on gridLength.

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
    cell.style.backgroundColor = selectedColor;
    cell.className = "cell";
    cell.addEventListener("mousedown", changeCellColor);
    cell.addEventListener("mouseenter", changeCellColorIfMouseDown);
    cells.push(cell);
    gridWrapper.appendChild(cell);
  }
}

// Creates color buttons for all of the colors in the palette.

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

// This is called on mousedown so it can track the mouseDown variable as well as changing the cell color.

function changeCellColor(event) {
  event.preventDefault();
  mouseDown = true;
  event.target.style.backgroundColor = selectedColor;
}

// This is called on mouseenter so it allows for dragging across cells to change their color.

function changeCellColorIfMouseDown(event) {
  if (mouseDown) {
    event.target.style.backgroundColor = selectedColor;
  }
}

// Checks if the input is correct, confirms, then updates the gridLength and calls buildGrid.

function handleSubmit() {
  let input = parseFloat(sizeInput.value);
  if (input < 1 || !Number.isInteger(input) || input > 32) {
    window.alert("Please pick a whole number from 1 to 32.");
  } else {
    if (
      window.confirm(
        `Are you sure you want to make a new grid that is ${input}x${input}?`
      )
    ) {
      gridLength = input;
      buildGrid();
    }
  }
}

// Tracks mouseup for when the click and drag stops.

body.addEventListener("mouseup", () => (mouseDown = false));

// A new grid side length can be submitted by clicking the button or hitting enter.

submitButton.addEventListener("click", handleSubmit);

sizeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSubmit();
  }
});

// Confirms and then changes all the cells to the selected color.

fillButton.addEventListener("click", () => {
  if (
    window.confirm(
      "Are you sure you want to fill the grid with the selected color?"
    )
  ) {
    for (let cell of cells) {
      cell.style.backgroundColor = selectedColor;
    }
  }
});

// Initialization.

buildGrid();
buildPalette();
colorIndicator.style.backgroundColor = selectedColor;
