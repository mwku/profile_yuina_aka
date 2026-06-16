document.addEventListener("DOMContentLoaded", function() {
    fetch("static/data.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("container");
        let element = ""
        for(let i = 0; i < data.length; i++) {
            element+=`<div class="${data[i].class}"  style="opacity: 0;">${data[i].element}</div>`;
        }
        container.innerHTML += element;
        for(let i = 0; i < data.length; i++) {
            const child = container.children[i];
            child.style.animation = data[i].animate_name;
            child.style.animationDelay = (i * 0.5) + "s";
            child.addEventListener("animationend", function() {
                this.style.animation = "";
                this.style.opacity = "1";
            });
        }
    })
})