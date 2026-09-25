document.documentElement.classList.add("js");
const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Mobile drawer: overlay, Esc to close, focus moves in and back
const btn = $(".menu-btn"),
  nav = $("nav");
if (btn && nav) {
  const scrim = Object.assign(document.createElement("div"), {
    className: "scrim",
  });
  document.body.appendChild(scrim);

  const set = (open) => {
    const mobile = matchMedia("(max-width: 860px)").matches;
    if (!mobile) {
      nav.classList.remove("open");
      scrim.classList.remove("show");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      return;
    }

    nav.classList.toggle("open", open);
    scrim.classList.toggle("show", open);
    btn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      const firstLink = $("a", nav);
      firstLink && firstLink.focus();
    } else {
      btn.focus();
    }
  };

  const syncMenuState = () => {
    const mobile = matchMedia("(max-width: 860px)").matches;
    if (!mobile) {
      nav.classList.remove("open");
      scrim.classList.remove("show");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      return;
    }
    btn.setAttribute("aria-expanded", String(nav.classList.contains("open")));
    scrim.classList.toggle("show", nav.classList.contains("open"));
  };

  btn.addEventListener("click", (event) => {
    event.preventDefault();
    set(!nav.classList.contains("open"));
  });
  scrim.addEventListener("click", () => set(false));
  document.addEventListener("click", (event) => {
    const clickInsideMenu =
      nav.contains(event.target) || btn.contains(event.target);
    if (nav.classList.contains("open") && !clickInsideMenu) {
      set(false);
    }
  });
  $$("a", nav).forEach((a) => {
    a.addEventListener("click", (event) => {
      const hasSub = a.closest("li.has-sub");
      const touchNav = !matchMedia("(hover: hover)").matches;
      if (hasSub && touchNav && !hasSub.classList.contains("open")) {
        event.preventDefault();
        $$("nav li.has-sub").forEach((item) => item.classList.remove("open"));
        hasSub.classList.add("open");
        return;
      }

      if (nav.classList.contains("open")) {
        setTimeout(() => set(false), 0);
      }
    });
  });
  document.addEventListener(
    "keydown",
    (e) => e.key === "Escape" && nav.classList.contains("open") && set(false),
  );
  addEventListener("resize", syncMenuState, { passive: true });
  syncMenuState();
}

// Touch devices: "What we do" opens on tap instead of relying on hover
$$("nav li.has-sub > a").forEach((a) => {
  a.addEventListener("click", (e) => {
    if (matchMedia("(hover: hover)").matches) return; // desktop keeps hover+click-through
    const li = a.parentElement,
      isOpen = li.classList.contains("open");
    if (!isOpen) {
      e.preventDefault();
      $$("nav li.has-sub").forEach((x) => x.classList.remove("open"));
      li.classList.add("open");
    }
  });
});

// Header shadow + reading progress (fallback where CSS scroll timelines are unsupported)
const header = $(".site-header"),
  bar = $(".progress");
const css = CSS.supports("animation-timeline: scroll()");
const onScroll = () => {
  header && header.classList.toggle("scrolled", scrollY > 8);
  if (bar && !css)
    bar.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`;
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Highlight the nav link for the section in view
const norm = (p) => p.replace(/index\.html$/, "");
const links = $$('nav a[href*="#"]').filter(
  (a) => norm(new URL(a.href).pathname) === norm(location.pathname),
);
if (links.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) =>
          a.toggleAttribute("aria-current", a.hash === "#" + e.target.id),
        );
      }),
    { rootMargin: "-45% 0px -50% 0px" },
  );
  links.forEach((a) => {
    const s = $(a.hash);
    s && io.observe(s);
  });
}

// Add the recent field documentation to the existing gallery and lightbox.
const extraGalleryImages = [
  "CEHPI CAT members during advocacy visit to Uba Galadima , the Imam of Kunshama A community Kura LGA  Kano..jpeg",
  "CEHPI CAT members during follow up advocacy visit to Hassan Jibrin Kunshama A community member Kura LGA  Kano..jpeg",
  "GHON CAT Team during CEI at Kwami Health Post, Kwami Ward, Tofa LGA..jpeg",
  "GHON CAT Team during follow up Advocacy visit to community Stakeholder at Kwami Community, Tofa LGA.jpeg",
  "GHON CAT Team during follow up Advocacy visit to Religion leader at Kwami Community, Tofa LGA.jpeg",
  "GHON CAT Team during follow_up Advocacy visit to community Stakeholder at Kwami Community, Tofa LGA.jpeg",
  "Giopini CLMT during Exit FGD at kadandani Community Makoda LGA.jpeg",
  "GPHI during Advocacy Visit to the Ward Head Kadawa Community.jpeg",
  "HACHEI CAT member during follow up viti to ward head Tudun Gunsau community with the supportive supervision of SPO Mal Abubakar sharref during the conduct.jpeg",
  "Hamdala health support Initiative at Karari community Bich L.G.A conducting  follows up advocacy visit to stakeholders..jpeg",
  "Hamdala health support Initiative conducting follows up advocacy to community stakeholder's in Karari Bichi L.G.A..jpeg",
  "Hamdala health support Initiative today during advocacy visit to community stakeholders at Karari village Bichi L.GA. under the supervision of SPO ..jpeg",
  "Hamdala health support Initiative.jpeg",
  "HYDI CAT TEAM during ADVOCACY VISIT TO YOUTH LEADER AND ALSO THE  VILLAGE REPRESENTATIVE.jpeg",
  "HYDI CAT TEAM during CEI AT NAFISATU MAHMUD HEALTH CENTRE GAYA LG.jpeg",
  "image (1).jpeg",
  "image (5).jpeg",
  "image (7).jpeg",
  "image (13).jpeg",
  "image (14).jpeg",
  "image (15).jpeg",
  "image (16).jpeg",
  "image (17).jpeg",
  "image (18).jpeg",
  "image (19).jpeg",
  "image (20).jpeg",
  "image (21).jpeg",
  "image (22).jpeg",
  "image (23).jpeg",
  "image (24).jpeg",
  "image (25).jpeg",
  "image (26).jpeg",
  "Interfaith Peace Foundation CAT members during the conduct of follow-up advocacy visit to the women leader of Barkum community in Bunkure LGA.jpeg",
  "Interfaith Peace Foundation during an Advocacy visit to the WDC of Barkum community in Bunkure LGA..jpeg",
  "Swochi CLM Teams during follow up Advocacy to Haj. Lami at her residence in Fagwalawa Community Danbatta.jpeg",
  "TEMAKO CAT TEAM during CEI activities at Sabo Health Post, Badume ward Bichi LGA.jpeg",
  "VOHEDI CAT members and the SPO in a joint follow up Advocacy visit to the Rano LGA M and E officer today 11112025.jpeg",
  "VOHEDI CAT members during the conduct of CEI at Lausau HP.jpeg",
  "WAZOBIA CATs Team during Advocacy to TB LS in his office at local government.jpeg",
  "community-group-2009.jpg",
  "community-leaders-gathering.jpg",
  "kano-mosque-aerial.jpg",
  "workshop-discussion.jpg",
];
const liveGallery = $(".gallery-live");
if (liveGallery) {
  const isHausa = document.documentElement.lang === "ha";
  const labels = isHausa
    ? ["Aikin wayar da kai a cikin al'umma.", "Ziyarar bibiyar riƙon amana."]
    : ["Community advocacy and engagement.", "Follow-up accountability visit."];
  extraGalleryImages.forEach((name, index) => {
    const figure = document.createElement("figure");
    const button = Object.assign(document.createElement("button"), {
      className: "zoom",
      type: "button",
    });
    const image = Object.assign(document.createElement("img"), {
      src: "../assets/images/gallery/" + encodeURIComponent(name),
      alt: name.replace(/\.jpeg$/i, ""),
      loading: "lazy",
    });
    button.setAttribute("aria-label", image.alt);
    button.appendChild(image);
    figure.append(button);
    const caption = document.createElement("figcaption");
    caption.textContent = labels[index % labels.length];
    figure.append(caption);
    liveGallery.append(figure);
  });
}

const galleryTools = $("[data-gallery-tools]");
if (galleryTools && liveGallery) {
  const search = $("input", galleryTools);
  const result = $(".gallery-result", galleryTools);
  const filters = $$("[data-filter]", galleryTools);
  const cards = $$("figure", liveGallery);
  const isHausa = document.documentElement.lang === "ha";
  cards.forEach((card) => {
    const image = $("img", card);
    const source = `${image?.alt || ""} ${image?.src || ""}`.toLowerCase();
    const category = /community|image \(/.test(source)
      ? "community"
      : /workshop|training|study|proposal|cobtak|eu-|nirtag|signpost|budget/.test(
            source,
          )
        ? "archive"
        : "field";
    card.dataset.category = category;
    card.dataset.search = `${source} ${card.textContent}`.toLowerCase();
  });
  const updateGallery = () => {
    const active =
      $("[data-filter].is-selected", galleryTools)?.dataset.filter || "all";
    const term = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const matchesCategory =
        active === "all" || card.dataset.category === active;
      const matchesSearch = !term || card.dataset.search.includes(term);
      const show = matchesCategory && matchesSearch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    result.textContent = isHausa
      ? `${visible} daga cikin ${cards.length} hotuna`
      : `${visible} of ${cards.length} photos`;
    liveGallery.dispatchEvent(new CustomEvent("galleryfilterchange"));
  };
  filters.forEach((filter) =>
    filter.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("is-selected"));
      filter.classList.add("is-selected");
      updateGallery();
    }),
  );
  search.addEventListener("input", updateGallery);
  updateGallery();
}

const archiveGalleryImages = [
  "cobtak-launch-2008.jpg",
  "budget-advocacy-workshop-kaduna.jpg",
  "report-writing-workshop-kaduna.jpg",
  "osun-study-tour.jpg",
  "cobtak-officials-eu-experts.jpg",
  "eu-delegation-abuja.jpg",
  "cobtak-budget-ministry-visit.jpg",
  "proposal-writing-training-kano.jpg",
  "ec-mission-cobtak-office.jpg",
  "nirtag-meeting-kaduna.jpg",
  "cobtak-office-signpost.jpg",
  "community-meeting-outdoors.jpg",
  "community-gathering.jpg",
  ...extraGalleryImages,
];
const archiveSlideshow = $(".archive-slideshow");
if (archiveSlideshow) {
  const stage = $(".archive-stage", archiveSlideshow);
  const count = $(".archive-count", archiveSlideshow);
  const previous = $(".archive-prev", archiveSlideshow);
  const next = $(".archive-next", archiveSlideshow);
  const toggle = $(".archive-toggle", archiveSlideshow);
  const basePath = archiveSlideshow.dataset.galleryPath;
  const isHausa = document.documentElement.lang === "ha";
  const total = archiveGalleryImages.length;
  const motionAllowed = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let timer = null;

  const captionFor = (name) =>
    name
      .replace(/\.[^.]+$/, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  const show = (index) => {
    current = (index + total) % total;
    const name = archiveGalleryImages[current];
    const caption = captionFor(name);
    const figure = document.createElement("figure");
    figure.className = "archive-slide is-active";
    const image = Object.assign(document.createElement("img"), {
      src: basePath + encodeURIComponent(name),
      alt: caption,
    });
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = caption;
    figure.append(image, figcaption);
    stage.replaceChildren(figure);
    stage.classList.remove("is-changing");
    requestAnimationFrame(() => stage.classList.add("is-changing"));
    count.textContent = `${current + 1} / ${total}`;
    count.setAttribute(
      "aria-label",
      isHausa
        ? `Hoto na ${current + 1} cikin ${total}`
        : `Photo ${current + 1} of ${total}`,
    );
  };
  const start = () => {
    if (!motionAllowed || timer) return;
    timer = setInterval(() => show(current + 1), 5000);
    archiveSlideshow.classList.add("is-playing");
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
    archiveSlideshow.classList.remove("is-playing");
  };
  const restart = () => {
    stop();
    start();
  };
  previous.addEventListener("click", () => {
    show(current - 1);
    restart();
  });
  next.addEventListener("click", () => {
    show(current + 1);
    restart();
  });
  toggle.addEventListener("click", () => {
    const playing = toggle.getAttribute("aria-pressed") === "true";
    toggle.setAttribute("aria-pressed", String(!playing));
    toggle.textContent = playing
      ? isHausa
        ? "Ci gaba"
        : "Play"
      : isHausa
        ? "Dakatar"
        : "Pause";
    if (playing) stop();
    else restart();
  });
  show(0);
  start();
}

// Gentle reveals for rows, timeline items, photos
const items = $$(".row,.timeline li,.gallery figure,.paths>div,.doc,.tier");
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const rv = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          rv.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  items.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 4) * 60 + "ms";
    rv.observe(el);
  });
}

// Contact form: inline field errors (aria-describedby) + a focusable error summary,
// per ui-ux-pro-max's Forms guidance (High severity: "top-level error only" is a Don't).
const form = $("#contact-form");
if (form) {
  const LABELS = {
    name: "your name",
    email: "a valid email address",
    message: "a short message",
  };
  const summary = Object.assign(document.createElement("div"), {
    className: "form-summary",
    role: "alert",
    tabIndex: -1,
  });
  summary.innerHTML =
    '<h3 id="form-summary-title" style="margin-bottom:6px">There is a problem</h3><ul></ul>';
  form.prepend(summary);
  const okBox = Object.assign(document.createElement("div"), {
    className: "form-ok",
    role: "status",
  });
  okBox.textContent = "Message ready — check your email app to send it.";
  form.prepend(okBox);

  const fieldError = (input) => {
    let p = document.getElementById(input.name + "-error");
    if (!p) {
      p = Object.assign(document.createElement("p"), {
        id: input.name + "-error",
        className: "field-error",
      });
      input.insertAdjacentElement("afterend", p);
      input.setAttribute("aria-describedby", p.id);
    }
    return p;
  };
  const validate = (input) => {
    const p = fieldError(input),
      ok = input.checkValidity();
    input.classList.add("touched");
    p.textContent = ok
      ? ""
      : `Please enter ${LABELS[input.name] || "a value"}.`;
    p.classList.toggle("show", !ok);
    return ok;
  };
  $$("input,textarea", form).forEach((el) =>
    el.addEventListener("blur", () => validate(el)),
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = $$("input,textarea", form);
    const bad = inputs.filter((el) => !validate(el));
    const list = $("ul", summary);
    list.innerHTML = "";
    if (bad.length) {
      bad.forEach((el) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#" + el.id || "#";
        a.textContent = `Please enter ${LABELS[el.name] || "a value"}.`;
        a.addEventListener("click", (ev) => {
          ev.preventDefault();
          el.focus();
        });
        li.appendChild(a);
        list.appendChild(li);
      });
      summary.classList.add("show");
      okBox.classList.remove("show");
      summary.focus();
      return;
    }
    summary.classList.remove("show");
    const d = new FormData(form);
    location.href =
      "mailto:dgrassroot@yahoo.com?subject=" +
      encodeURIComponent("Message from COMSSI website") +
      "&body=" +
      encodeURIComponent(
        `${d.get("message")}\n\nFrom: ${d.get("name")} (${d.get("email")})`,
      );
    okBox.classList.add("show");
  });
}

// Gallery lightbox with previous/next, arrow keys
const lb = $("#lightbox");
if (lb) {
  let zs = $$(".gallery-live figure:not([hidden]) .zoom");
  const img = $("img", lb),
    cap = Object.assign(document.createElement("p"), { className: "lb-cap" }),
    count = Object.assign(document.createElement("span"), {
      className: "lb-count",
    });
  img.setAttribute("tabindex", "-1");
  lb.insertBefore(cap, $("button", lb));
  lb.insertBefore(count, $("button", lb));
  let i = 0;
  const show = (n) => {
    if (!zs.length) return;
    i = (n + zs.length) % zs.length;
    const s = $("img", zs[i]);
    img.src = s.src;
    img.alt = s.alt;
    img.classList.remove("lb-change");
    requestAnimationFrame(() => img.classList.add("lb-change"));
    const fc = zs[i].closest("figure").querySelector("figcaption");
    cap.textContent = fc ? fc.textContent : "";
    count.textContent = `${i + 1} / ${zs.length}`;
  };
  const refreshVisible = () => {
    zs = $$(".gallery-live figure:not([hidden]) .zoom");
    if (i >= zs.length) i = 0;
  };
  const gallery = $(".gallery-live");
  gallery && gallery.addEventListener("galleryfilterchange", refreshVisible);
  ["prev", "next"].forEach((d) => {
    const b = Object.assign(document.createElement("button"), {
      className: "lb-nav lb-" + d,
      type: "button",
      textContent: d === "prev" ? "‹" : "›",
    });
    b.setAttribute("aria-label", d);
    b.addEventListener("click", () => {
      show(i + (d === "prev" ? -1 : 1));
      img.focus();
    });
    lb.appendChild(b);
  });
  zs.forEach((z, n) =>
    z.addEventListener("click", () => {
      show(n);
      lb.showModal();
    }),
  );
  $("button", lb).addEventListener("click", () => lb.close());
  lb.addEventListener("click", (e) => e.target === lb && lb.close());
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(i - 1);
    if (e.key === "ArrowRight") show(i + 1);
  });
}
