const bola = document.querySelector(".bola");

document.addEventListener("mousemove", (event)=> {
    // console.log(event.offsetX);
    // console.log(event.offsetY);

    bola.style.top = event.offsetY + 'px';
    bola.style.left = event.offsetX + 'px';
})