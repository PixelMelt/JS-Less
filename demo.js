// a script that repeatedly changes the background color of the page in a rainbow pattern

let x = setInterval(changeColor, 1000);

function changeColor() {
    let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    let color = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = color;
}