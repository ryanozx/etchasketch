const canvas = document.querySelector('.container');
const colourDiv = document.querySelector('#currColour');
const colourInput = document.querySelector('#colourPicker');
const colourButton = document.querySelector('.colourButton');
const rainbowButton = document.querySelector('.rainbowButton');
const eraserButton = document.querySelector('.eraserButton');
const clearButton = document.querySelector('.clearButton');

let mouseDown = false;
let currMode = 'colour';
let currColour = "#000000";
let selectedButton = colourButton;

document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);
colourDiv.addEventListener('click', () => {
    colourInput.value = colourDiv.style.backgroundColor;
    colourInput.click();
    setCurrentMode('colour');
})
colourInput.addEventListener('input', () => {
    colourDiv.style.backgroundColor = currColour = colourInput.value;
})
colourButton.addEventListener('click', () => setCurrentMode('colour'));
rainbowButton.addEventListener('click', () => setCurrentMode('rainbow'));
eraserButton.addEventListener('click', () => setCurrentMode('eraser'));

function setCurrentMode(mode) {
    if (currMode != mode) {
        selectedButton.classList.remove("selectedButton");
        currMode = mode;
        if (mode == 'colour') {
            selectedButton = colourButton;
        } else if (mode == 'rainbow') {
            selectedButton = rainbowButton;
        } else {
            selectedButton = eraserButton;
        }
        selectedButton.classList.add("selectedButton");
    }
}

function debounce(callback, wait) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, wait);
    };
}

function resizeCanvas() {
    let canvasDimensions = Math.min(innerWidth, innerHeight) * 0.8;
    canvas.style.height = canvasDimensions + 'px';
    canvas.style.width = canvasDimensions + 'px';
}

function createSquares(size){
    console.log(100 / size + '%');
    for (let squareCounter = 0; squareCounter < size * size; squareCounter++) {
        let newSquare = document.createElement('div');
        newSquare.style.width = (100 / size) + '%';
        newSquare.addEventListener('mouseover', () => {
            if (mouseDown) {
                newSquare.style.backgroundColor = generateColourCode()
            }
        });
        canvas.appendChild(newSquare);
    }
}

function generateColourCode() {
    if (currMode == "rainbow") {
        return "hsl(" + Math.floor(Math.random() * 100) + " " + Math.floor(Math.random() * 100) + "% " + Math.floor(Math.random() * 80) + "%)";
    } else if (currMode == "colour") {
        return currColour;
    } else {
        return "#FFFFFF";
    }
}

window.addEventListener('resize', debounce(resizeCanvas, 500));
clearButton.addEventListener('click', () => {
    let newSize = prompt('How many squares do you want per side?', '16');
    if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
        while (canvas.firstChild) {
            canvas.removeChild(canvas.lastChild);
        }
        resizeCanvas();
        createSquares(newSize);
    }
    else {
        alert('Invalid input, please enter a number between 1 and 100.');
    }
})

resizeCanvas();
createSquares(16);
