"""Rewrites the shared header, mobile action bar and footer in ALL pages (EN + HA).
Run from anywhere:  python3 tools/build_shell.py   (safe to re-run)"""
import re, glob, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PH, MAIL, ALT_MAIL = "+2348037115519", "info@comssi.org", "dgrassroot@yahoo.com"
IDS_EN = ["budget","education","health","trafficking","livelihoods","agribusiness","rights","training"]
L = {
 "en": dict(menu="Menu", tag="Social Accountability Initiative", about="About", work="What we do", tr="Track record",
   res="Resources", gal="Gallery", inv="Get involved", con="Contact us", ids=IDS_EN,
   subs=["Budget transparency","Education and literacy","Health awareness","Anti-trafficking","Livelihoods","Agribusiness","Human rights","Training"],
   mission="Helping communities know their rights and hold public institutions to account.", ex="Explore", pr="What we do", rc="Contact",
   addr="No 185 Zaria Road, Kano, Nigeria", legal="Nonprofit · Nonpartisan", top="Back to top", call="Call", wa="WhatsApp", nav="Main menu", home="Home"),
 "ha": dict(menu="Menu", tag="Riƙon Amana ga Jama'a", about="Game da mu", work="Abin da muke yi", tr="Nasarorinmu",
   res="Albarkatu", gal="Hotuna", inv="Mu haɗa kai", con="Tuntuɓe mu", ids=[f"p{i}" for i in range(8)],
   subs=["Gaskiya a kasafin kuɗi","Ilimi","Lafiya","Yaƙi da fataucin mutane","Sana'o'i","Noma","Haƙƙin ɗan Adam","Horaswa"],
   mission="Muna taimaka wa al'ummomi su san haƙƙinsu su kuma nemi hukumomin gwamnati su yi riƙon amana.", ex="Bincika", pr="Abin da muke yi", rc="Tuntuɓe mu",
   addr="Lamba 185 Titin Zariya, Kano, Najeriya", legal="Marar riba · Marar ɗaure wa jam'iyya", top="Koma sama", call="Kira", wa="WhatsApp", nav="Babban menu", home="Gida"),
}
KEY = {"about.html":"about","history.html":"about","track-record.html":"tr","contact.html":"con","programmes.html":"prog","resources.html":"res","gallery.html":"gal"}

def parts(kind, fname):
    lang = "ha" if kind == "ha" else "en"; t = L[lang]
    if kind == "root":  P = dict(home="index.html", about="pages/about.html", prog="pages/programmes.html", res="pages/resources.html", gal="pages/gallery.html", tr="pages/track-record.html", con="pages/contact.html", a="assets/", tog="ha/index.html")
    elif kind == "page": P = dict(home="../index.html", about="about.html", prog="programmes.html", res="resources.html", gal="gallery.html", tr="track-record.html", con="contact.html", a="../assets/", tog="../ha/"+(fname if os.path.exists(os.path.join(ROOT,"ha",fname)) else "about.html"))
    else: P = dict(home="index.html", about="about.html", prog="programmes.html", res="resources.html", gal="gallery.html", tr="track-record.html", con="contact.html", a="../assets/", tog="../index.html" if fname=="index.html" else "../pages/"+fname)
    key = KEY.get(fname); cur = lambda k: ' aria-current="page"' if key == k else ""
    lang_sw = ('<span class="lang"><span aria-current="true">EN</span><a href="%s" lang="ha" hreflang="ha">HA</a></span>' if lang=="en"
               else '<span class="lang"><a href="%s" lang="en" hreflang="en">EN</a><span aria-current="true">HA</span></span>') % P["tog"]
    sub = "".join(f'<li><a href="{P["prog"]}#{i}">{n}</a></li>' for i, n in zip(t["ids"], t["subs"]))
    nav = (f'<ul><li><a href="{P["about"]}"{cur("about")}>{t["about"]}</a></li>'
           f'<li class="has-sub"><a href="{P["prog"]}"{cur("prog")} aria-haspopup="true" aria-expanded="false">{t["work"]}</a><ul class="sub">{sub}</ul></li>'
           f'<li><a href="{P["tr"]}"{cur("tr")}>{t["tr"]}</a></li>'
           f'<li><a href="{P["res"]}"{cur("res")}>{t["res"]}</a></li><li><a href="{P["gal"]}"{cur("gal")}>{t["gal"]}</a></li>'
           f'<li class="lang-li">{lang_sw}</li><li><a class="btn btn-dark" href="{P["con"]}"{cur("con")}>{t["con"]}</a></li></ul>')
    header = ('<!--H--><div class="util"><div class="wrap"><span>'
      f'<a href="tel:{PH}">+234 803 711 5519</a><a href="mailto:{MAIL}">{MAIL}</a><a href="mailto:{ALT_MAIL}">{ALT_MAIL}</a></span>{lang_sw}</div></div>'
      f'<header class="site-header"><div class="wrap bar"><a class="brand" href="{P["home"]}"><img src="{P["a"]}images/brand/comssi-logo.png" alt="COMSSI" width="44" height="44">'
      f'<span>COMSSI<small>{t["tag"]}</small></span></a><button class="menu-btn" aria-expanded="false" aria-controls="nav">{t["menu"]}</button>'
      f'<nav id="nav" aria-label="{t["nav"]}">{nav}</nav></div><div class="progress" aria-hidden="true"></div></header><!--/H-->')
    ft = [(P["about"], t["about"])] + ([(P["about"].replace("about.html","history.html"), "Our history")] if lang=="en" else []) + [(P["prog"], t["work"]), (P["tr"], t["tr"]), (P["res"], t["res"]), (P["gal"], t["gal"]), (P["con"], t["con"])]
    fl = "".join(f'<li><a href="{h}">{n}</a></li>' for h, n in ft)
    fp = "".join(f'<li><a href="{P["prog"]}#{i}">{n}</a></li>' for i, n in zip(t["ids"][:6], t["subs"][:6]))
    footer = (f'<!--F--><footer><div class="wrap f-main"><div class="f-grid"><div class="f-brand"><img src="{P["a"]}images/brand/comssi-logo.png" alt="" width="56" height="56" loading="lazy">'
      f'<p>{t["mission"]}</p></div><div><h3>{t["ex"]}</h3><ul>{fl}</ul></div><div><h3>{t["pr"]}</h3><ul>{fp}</ul></div>'
      f'<div><h3>{t["rc"]}</h3><ul><li>{t["addr"]}</li><li><a href="tel:{PH}">+234 803 711 5519</a></li><li><a href="tel:+2348037877859">+234 803 787 7859</a></li>'
      f'<li><a href="mailto:{MAIL}">{MAIL}</a></li><li><a href="mailto:{ALT_MAIL}">{ALT_MAIL}</a></li></ul></div></div><!-- TODO: social media links --></div>'
      f'<div class="wrap f-legal"><span>© 2026 Community Support for Social Accountability Initiative (COMSSI) · CAC/IT/NO81968 · {t["legal"]}</span><a href="#main">{t["top"]}</a></div></footer>'
      f'<div class="action-bar"><a href="tel:{PH}">{t["call"]}</a><a href="https://wa.me/{PH[1:]}">{t["wa"]}</a></div><!--/F-->')
    return header, footer

def apply(path, kind):
    s = open(path, encoding="utf-8").read(); fname = os.path.basename(path); h, f = parts(kind, fname)
    for tag, new, old in (("H", h, r'<header class="site-header">.*?</header>'), ("F", f, r'<footer>.*?</footer>')):
        pat = rf'<!--{tag}-->.*?<!--/{tag}-->' if f'<!--{tag}-->' in s else old
        s = re.sub(pat, lambda m: new, s, count=1, flags=re.S)
    if kind in ("root", "ha") and fname == "index.html" and 'class="quote"' not in s:   # one-time pull-quote band
        q = ('<section class="quote"><div class="wrap"><p>' + ("Informed citizens get better services. So we start with information." if kind=="root"
             else "Jama'ar da aka sanar da su na samun ingantattun ayyuka. Shi ya sa muke farawa da bayani.") + '</p></div></section>\n  ')
        marker = "<!-- WHAT WE DO -->" if kind == "root" else '<section id="ayyuka"'
        s = s.replace(marker, q + marker, 1)
    open(path, "w", encoding="utf-8").write(s)

apply(os.path.join(ROOT, "index.html"), "root")
for p in glob.glob(os.path.join(ROOT, "pages", "*.html")): apply(p, "page")
for p in glob.glob(os.path.join(ROOT, "ha", "*.html")): apply(p, "ha")
print("shell updated")
