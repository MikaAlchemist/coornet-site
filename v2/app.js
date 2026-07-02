// Coornet v2 — typing email demo + scroll reveals
(function () {
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // reveal on scroll
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  // typing email
  var typed = document.getElementById("typed");
  var caret = document.getElementById("caret");
  var sent = document.getElementById("sentChip");
  var toast = document.getElementById("replyToast");
  if (!typed) return;

  var TEXT = "Hi Sarah, saw NovaBio moved its lead asset into Phase II last month.\n\nWe connect biotechs at that stage with pharma BD teams already looking for exactly this profile.\n\nWorth a short call next week?";

  if (reduced) {
    typed.textContent = TEXT;
    caret.style.display = "none";
    sent.classList.add("on");
    toast.classList.add("on");
    return;
  }

  function loop() {
    typed.textContent = "";
    sent.classList.remove("on");
    toast.classList.remove("on");
    caret.style.display = "inline-block";
    var i = 0;
    function tick() {
      if (i <= TEXT.length) {
        typed.textContent = TEXT.slice(0, i);
        i++;
        var ch = TEXT.charAt(i - 1);
        var delay = ch === "\n" ? 140 : 26 + Math.random() * 34;
        setTimeout(tick, delay);
      } else {
        caret.style.display = "none";
        setTimeout(function () { sent.classList.add("on"); }, 420);
        setTimeout(function () { toast.classList.add("on"); }, 1700);
        setTimeout(loop, 7200);
      }
    }
    tick();
  }
  setTimeout(loop, 700);
})();
