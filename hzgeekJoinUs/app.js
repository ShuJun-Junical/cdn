let t = 0;
for (var i of $(".fadein")) {
    (function(e) {
        t += 2000;
        setTimeout(() => $(e).fadeIn(1500), t);

    })(i);
}
particlesJS.load('particles-js', '//cdn.jsdelivr.net/gh/JupiterJun/cdn/hzgeekJoinUs@main/particles.min.json', function() {});
btn = $("button")[0]
btn.onclick = () => { window.location.href = "https://cdn.jsdelivr.net/gh/JupiterJun/picture@main/JupiterJun's_QQ.jpg" }
btn.onmouseover = () => { btn.classList.add('shadow'); }
btn.onmouseout = () => { btn.classList.remove('shadow'); }
