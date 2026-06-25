/* O Funil da Lagos — progressive enhancement only (zero dependencies). */
(function () {
  document.documentElement.classList.remove("no-js");
  document.body.classList.remove("no-js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal-on-scroll
  var items = [].slice.call(document.querySelectorAll(".reveal"));
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  // Draw the loop arc when the funnel enters view
  var loop = [].slice.call(document.querySelectorAll(".loop-path"));
  if (reduce) { loop.forEach(function (p) { p.classList.add("drawn"); }); }
  else if ("IntersectionObserver" in window && loop.length) {
    var lo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { loop.forEach(function (p) { p.classList.add("drawn"); }); lo.disconnect(); } });
    }, { threshold: 0.3 });
    lo.observe(loop[0].ownerSVGElement || loop[0]);
  } else { loop.forEach(function (p) { p.classList.add("drawn"); }); }
})();