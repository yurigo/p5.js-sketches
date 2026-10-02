const bola = document.querySelector(".bola");

document.addEventListener("mousemove", (event)=> {
    bola.style.top = event.pageY + 'px';
    bola.style.left = event.pageX + 'px';
})