// Coornet — starfield + scroll reveals
(function () {
  // starfield in hero — distant stars twinkle, near stars get pulled into the orb
  var holder = document.getElementById("stars");
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (holder) {
    var rect = holder.getBoundingClientRect();
    var W = rect.width || window.innerWidth;
    var H = rect.height || window.innerHeight;
    // orb center: horizontally centered, top 5% + half orb height (~250px)
    var cx = W / 2;
    var cy = H * 0.05 + 250;
    for (var i = 0; i < 150; i++) {
      var s = document.createElement("i");
      var size = Math.random() * 1.6 + 0.6;
      var x = Math.random() * W;
      var y = Math.random() * H;
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.left = x + "px";
      s.style.top = y + "px";
      var dx = cx - x;
      var dy = cy - y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (!reduced && dist < 640 && dist > 40 && typeof s.animate === "function") {
        // accretion: drift into the orb, fade out, restart
        var dur = 6000 + Math.random() * 12000;
        s.style.opacity = (Math.random() * 0.5 + 0.25).toFixed(2);
        s.animate(
          [
            { transform: "translate(0,0)", opacity: s.style.opacity },
            { transform: "translate(" + dx * 0.88 + "px," + dy * 0.88 + "px)", opacity: 0 }
          ],
          { duration: dur, delay: Math.random() * -dur, easing: "cubic-bezier(0.5, 0, 0.9, 0.4)", iterations: Infinity }
        );
      } else {
        s.style.setProperty("--o1", (Math.random() * 0.25 + 0.05).toFixed(2));
        s.style.setProperty("--o2", (Math.random() * 0.6 + 0.3).toFixed(2));
        s.style.setProperty("--d", (Math.random() * 4 + 2.5).toFixed(1) + "s");
        s.style.setProperty("--dl", (Math.random() * 5).toFixed(1) + "s");
      }
      holder.appendChild(s);
    }
  }

  // reveal on scroll
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in");
    });
  }
})();
