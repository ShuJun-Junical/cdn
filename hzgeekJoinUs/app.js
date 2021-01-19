let t = 0;
for (var i of $(".fadein")) {
    (function(e) {
        t += 2000;
        setTimeout(() => $(e).fadeIn(1500), t);

    })(i);
}
particlesJS.load('particles-js', './particles.json', function() {});
btn = $("button")[0]
btn.onclick = () => { alert('1') }
btn.onmouseover = () => { btn.classList.add('shadow'); }
btn.onmouseout = () => { btn.classList.remove('shadow'); }