document.addEventListener("DOMContentLoaded", function() {
    fetch("static/data.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("container");
        let element = ""
        for(let i = 0; i < data.length; i++) {
            element+=`<div class="${data[i].class}"  style="opacity: 0; ${data[i].style}" data-animate="${data[i].animate_name}">${data[i].element}</div>`;
            script = document.createElement("script");
            script.textContent = data[i].script;
            document.body.appendChild(script);
        }
        element += `<div style="height: 30%; width: 1px; flex-shrink: 0;"></div>`;
        container.innerHTML += element;
        
        // 使用 Intersection Observer 监听元素进入视口
        let animationCount = 0;
        let lastIntersectionTime = 0;
        const intersectionThreshold = 200; // 毫秒，超过这个时间间隔就重置计数
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentTime = Date.now();
                    
                    // 如果距离上次元素进入超过阈值，重置计数（新的"批次"）
                    if (currentTime - lastIntersectionTime > intersectionThreshold) {
                        animationCount = 0;
                    }
                    
                    const child = entry.target;
                    const animateName = child.getAttribute("data-animate");
                    const delay = animationCount * 0.5;
                    
                    child.style.animation = animateName;
                    child.style.animationDelay = delay + "s";
                    
                    child.addEventListener("animationend", function() {
                        this.style.animation = "";
                        this.style.opacity = "1";
                    });
                    
                    animationCount++;
                    lastIntersectionTime = currentTime;
                    // 动画播放后停止观察此元素
                    observer.unobserve(child);
                }
            });
        }, { threshold: 0.1 });
        
        for(let i = 0; i < data.length; i++) {
            const child = container.children[i];
            observer.observe(child);
        }
    })
})