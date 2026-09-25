document.documentElement.classList.add("js");
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Mobile drawer: overlay, Esc to close, focus moves in and back
const btn = $(".menu-btn"), nav = $("nav");
if (btn && nav) {
  const scrim = Object.assign(document.createElement("div"), { className: "scrim" });
  document.body.appendChild(scrim);
  const set = (open) => {
    nav.classList.toggle("open", open); scrim.classList.toggle("show", open);
    btn.setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : "";
    (open ? $("a", nav) : btn).focus();
  };
  btn.addEventListener("click", () => set(!nav.classList.contains("open")));
  scrim.addEventListener("click", () => set(false));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => nav.classList.contains("open") && set(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && nav.classList.contains("open") && set(false));
}

// Touch devices: "What we do" opens on tap instead of relying on hover
$$("nav li.has-sub > a").forEach((a) => {
  a.addEventListener("click", (e) => {
    if (matchMedia("(hover: hover)").matches) return; // desktop keeps hover+click-through
    const li = a.parentElement, isOpen = li.classList.contains("open");
    if (!isOpen) { e.preventDefault(); $$("nav li.has-sub").forEach((x) => x.classList.remove("open")); li.classList.add("open"); }
  });
});

// Header shadow + reading progress (fallback where CSS scroll timelines are unsupported)
const header = $(".site-header"), bar = $(".progress");
const css = CSS.supports("animation-timeline: scroll()");
const onScroll = () => {
  header && header.classList.toggle("scrolled", scrollY > 8);
  if (bar && !css) bar.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`;
};
addEventListener("scroll", onScroll, { passive: true }); onScroll();

// Highlight the nav link for the section in view
const norm = (p) => p.replace(/index\.html$/, "");
const links = $$('nav a[href*="#"]').filter((a) => norm(new URL(a.href).pathname) === norm(location.pathname));
if (links.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => a.toggleAttribute("aria-current", a.hash === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((a) => { const s = $(a.hash); s && io.observe(s); });
}

// Gentle reveals for rows, timeline items, photos
const items = $$(".row,.timeline li,.gallery figure,.paths>div,.doc,.tier");
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const rv = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } }), { threshold: 0.12 });
  items.forEach((el, i) => { el.classList.add("reveal"); el.style.transitionDelay = (i % 4) * 60 + "ms"; rv.observe(el); });
}

// Contact form: inline field errors (aria-describedby) + a focusable error summary,
// per ui-ux-pro-max's Forms guidance (High severity: "top-level error only" is a Don't).
const form = $("#contact-form");
if (form) {
  const LABELS = { name: "your name", email: "a valid email address", message: "a short message" };
  const summary = Object.assign(document.createElement("div"), { className: "form-summary", role: "alert", tabIndex: -1 });
  summary.innerHTML = '<h3 id="form-summary-title" style="margin-bottom:6px">There is a problem</h3><ul></ul>';
  form.prepend(summary);
  const okBox = Object.assign(document.createElement("div"), { className: "form-ok", role: "status" });
  okBox.textContent = "Message ready — check your email app to send it.";
  form.prepend(okBox);

  const fieldError = (input) => {
    let p = document.getElementById(input.name + "-error");
    if (!p) {
      p = Object.assign(document.createElement("p"), { id: input.name + "-error", className: "field-error" });
      input.insertAdjacentElement("afterend", p);
      input.setAttribute("aria-describedby", p.id);
    }
    return p;
  };
  const validate = (input) => {
    const p = fieldError(input), ok = input.checkValidity();
    input.classList.add("touched");
    p.textContent = ok ? "" : `Please enter ${LABELS[input.name] || "a value"}.`;
    p.classList.toggle("show", !ok);
    return ok;
  };
  $$("input,textarea", form).forEach((el) => el.addEventListener("blur", () => validate(el)));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = $$("input,textarea", form);
    const bad = inputs.filter((el) => !validate(el));
    const list = $("ul", summary); list.innerHTML = "";
    if (bad.length) {
      bad.forEach((el) => { const li = document.createElement("li"); const a = document.createElement("a");
        a.href = "#" + el.id || "#"; a.textContent = `Please enter ${LABELS[el.name] || "a value"}.`;
        a.addEventListener("click", (ev) => { ev.preventDefault(); el.focus(); });
        li.appendChild(a); list.appendChild(li); });
      summary.classList.add("show"); okBox.classList.remove("show"); summary.focus();
      return;
    }
    summary.classList.remove("show");
    const d = new FormData(form);
    location.href = "mailto:dgrassroot@yahoo.com?subject=" + encodeURIComponent("Message from COMSSI website") +
      "&body=" + encodeURIComponent(`${d.get("message")}\n\nFrom: ${d.get("name")} (${d.get("email")})`);
    okBox.classList.add("show");
  });
}

// Gallery lightbox with previous/next, arrow keys
const lb = $("#lightbox");
if (lb) {
  const zs = $$(".zoom"), img = $("img", lb), cap = Object.assign(document.createElement("p"), { className: "lb-cap" }); lb.insertBefore(cap, $("button", lb)); let i = 0;
  const show = (n) => { i = (n + zs.length) % zs.length; const s = $("img", zs[i]); img.src = s.src; img.alt = s.alt; const fc = zs[i].closest("figure").querySelector("figcaption"); cap.textContent = fc ? fc.textContent : ""; };
  ["prev", "next"].forEach((d) => {
    const b = Object.assign(document.createElement("button"), { className: "lb-nav lb-" + d, type: "button", textContent: d === "prev" ? "‹" : "›" });
    b.setAttribute("aria-label", d); b.addEventListener("click", () => show(i + (d === "prev" ? -1 : 1))); lb.appendChild(b);
  });
  zs.forEach((z, n) => z.addEventListener("click", () => { show(n); lb.showModal(); }));
  $("button", lb).addEventListener("click", () => lb.close());
  lb.addEventListener("click", (e) => e.target === lb && lb.close());
  lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") show(i - 1); if (e.key === "ArrowRight") show(i + 1); });
}
