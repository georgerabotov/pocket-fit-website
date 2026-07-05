"use client";

/* "And that's not all" — feature list that switches phone screens.
   Ported verbatim from the standalone mockup (scoped under .mf-scope).
   Placeholder character images use /journey/kai*.png. */

import { useEffect, useRef } from "react";

const MF_CSS = `@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Nunito:wght@400;600;700;800;900&display=swap');
.mf-scope{
    --indigo:#5D5BD0; --indigo-ink:#414092; --indigo-soft:#E9E8FF;
    --turq:#5CC0BF; --berry:#D6457D; --amber:#F2A93B;
    --ink:#0F0E17; --ink2:#3a3950; --ink3:#7a7990;
    --bg:#FBFAFE; --line:rgba(15,14,23,.08);
  }
.mf-scope *{box-sizing:border-box;margin:0;padding:0}
.mf-scope{font-family:"Nunito",system-ui,sans-serif;color:var(--ink);background:var(--bg);-webkit-font-smoothing:antialiased;line-height:1.5}
.mf-scope #reveal{opacity:1;transform:none;will-change:auto}
.mf-scope .sect{max-width:1040px;margin:0 auto;padding:64px 40px 76px;display:grid;grid-template-columns:1fr 1.02fr;gap:48px;align-items:center}
.mf-scope /* ==== left column ==== */
  .lead h2{font-family:"Archivo",sans-serif;font-weight:900;letter-spacing:-.035em;line-height:.98;font-size:clamp(34px,4vw,54px)}
.mf-scope .lead .sub{font-size:clamp(15px,1.7vw,18px);color:var(--ink3);font-weight:600;margin:12px 0 24px}
.mf-scope .flist{display:flex;flex-direction:column;gap:9px}
.mf-scope .fitem{position:relative;text-align:left;width:100%;background:#F1F0F8;border:1.5px solid transparent;border-radius:18px;padding:14px 18px;display:flex;align-items:center;gap:13px;cursor:pointer;transition:background .35s ease,border-color .35s ease,box-shadow .35s ease,transform .25s ease;font-family:inherit}
.mf-scope .fitem:hover{background:#ECEBF6}
.mf-scope .fitem .txt{flex:1;min-width:0}
.mf-scope .fitem h3{font-family:"Archivo",sans-serif;font-weight:800;font-size:17px;letter-spacing:-.01em;color:var(--ink2);transition:color .35s ease}
.mf-scope .fitem .d{font-weight:600;font-size:13px;color:var(--ink3);margin-top:5px;line-height:1.4;max-height:0;opacity:0;overflow:hidden;transition:max-height .4s ease,opacity .35s ease,margin .35s ease}
.mf-scope .fitem .arw{width:33px;height:33px;flex:0 0 auto;border-radius:50%;border:1.5px solid rgba(15,14,23,.16);display:flex;align-items:center;justify-content:center;color:var(--ink3);transition:all .35s ease}
.mf-scope .fitem svg{transition:transform .35s ease}
.mf-scope /* active */
  .fitem.on{background:#fff;border-color:rgba(93,91,208,.28);box-shadow:0 18px 40px rgba(93,91,208,.14)}
.mf-scope .fitem.on h3{color:var(--indigo-ink)}
.mf-scope .fitem.on .d{max-height:80px;opacity:1;margin-top:8px}
.mf-scope .fitem.on .arw{background:var(--indigo);border-color:var(--indigo);color:#fff}
.mf-scope .fitem.on .arw svg{transform:rotate(90deg)}
.mf-scope /* ==== right column : phone ==== */
  .rightcol{display:flex;justify-content:center}
.mf-scope .stage{position:relative}
.mf-scope .stage::before{content:"";position:absolute;inset:-6% -12%;background:radial-gradient(closest-side,rgba(93,91,208,.16),transparent 72%);z-index:0}
.mf-scope .tphone{position:relative;z-index:1;width:320px;height:660px;border-radius:52px;background:#0d0c16;padding:12px;box-shadow:0 50px 100px rgba(40,36,90,.30),0 0 0 1px rgba(0,0,0,.05)}
.mf-scope .tphone .scr{position:relative;width:100%;height:100%;border-radius:42px;overflow:hidden;background:#F4F4F7}
.mf-scope .tphone .notch{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:112px;height:30px;background:#0d0c16;border-radius:99px;z-index:40}
.mf-scope .statusbar{position:absolute;top:0;left:0;right:0;height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 26px;font-size:13px;font-weight:800;color:#0A0A0F;z-index:30}
.mf-scope .statusbar.dk{color:#fff}
.mf-scope .sbicons{display:inline-flex;align-items:center;gap:5px}
.mf-scope /* screens */
  .screen{position:absolute;inset:0;padding:52px 16px 20px;display:flex;flex-direction:column;gap:11px;opacity:0;transform:translateY(14px) scale(.985);pointer-events:none;transition:opacity .5s ease,transform .5s ease;overflow:hidden}
.mf-scope .screen.show{opacity:1;transform:none;pointer-events:auto}
.mf-scope .screen.dark{background:#141024}
.mf-scope .shead{display:flex;align-items:flex-start;justify-content:space-between}
.mf-scope .shead .t{font-family:"Archivo";font-weight:900;font-size:20px;color:#0A0A0F;letter-spacing:-.02em;line-height:1}
.mf-scope .shead .t small{display:block;font-family:"Nunito";font-size:10.5px;font-weight:800;color:rgba(0,0,0,.4);letter-spacing:.01em;margin-top:6px}
.mf-scope .screen.dark .shead .t{color:#fff}
.mf-scope .screen.dark .shead .t small{color:rgba(255,255,255,.5)}
.mf-scope .sic{width:34px;height:34px;border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 7px rgba(0,0,0,.05);color:#0A0A0F;flex:0 0 auto}
.mf-scope .screen.dark .sic{background:rgba(255,255,255,.1);color:#fff}
.mf-scope .card{background:#fff;border-radius:18px;padding:15px;box-shadow:0 1px 2px rgba(0,0,0,.03),0 10px 22px rgba(0,0,0,.05)}
.mf-scope .lbl{font-weight:800;font-size:11px;color:rgba(0,0,0,.42);letter-spacing:.04em;text-transform:uppercase;margin-bottom:10px}
.mf-scope /* session */
  .sess{border-radius:20px;padding:17px;color:#fff;background:linear-gradient(150deg,#6260E0,#413F92);box-shadow:0 14px 28px rgba(65,64,146,.34);position:relative;overflow:hidden}
.mf-scope .sess::after{content:"";position:absolute;right:-30px;top:-30px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.1)}
.mf-scope .sess .st{display:flex;justify-content:space-between;align-items:center;position:relative}
.mf-scope .sess .tag2{font-weight:900;font-size:9.5px;letter-spacing:.08em;background:rgba(255,255,255,.2);padding:4px 9px;border-radius:99px}
.mf-scope .sess .dur{font-weight:800;font-size:11px;opacity:.9}
.mf-scope .sess h4{font-family:"Archivo";font-size:23px;font-weight:900;margin:12px 0 3px;letter-spacing:-.02em;position:relative}
.mf-scope .sess .subx{font-size:11.5px;font-weight:700;opacity:.82;position:relative}
.mf-scope .sess .go{margin-top:14px;background:#fff;color:#413F92;border-radius:13px;padding:12px;text-align:center;font-weight:900;font-size:13.5px;display:flex;align-items:center;justify-content:center;gap:7px;position:relative}
.mf-scope .exl{display:flex;flex-direction:column;gap:10px}
.mf-scope .exl li{list-style:none;display:flex;align-items:center;gap:11px;font-weight:800;font-size:13px;color:#0A0A0F}
.mf-scope .exl li.p{color:rgba(0,0,0,.34)}
.mf-scope .exl .ck{width:21px;height:21px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center}
.mf-scope .exl li.done .ck{background:var(--indigo);color:#fff}
.mf-scope .exl li.p .ck{border:2px solid rgba(0,0,0,.16)}
.mf-scope /* week schedule */
  .week{display:flex;justify-content:space-between}
.mf-scope .week div{display:flex;flex-direction:column;align-items:center;gap:7px;font-weight:800;font-size:10px;color:rgba(0,0,0,.4)}
.mf-scope .week .d{width:30px;height:30px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#F1F1F7;color:rgba(0,0,0,.3);font-size:12px}
.mf-scope .week .d.done{background:#5CC0BF;color:#fff}
.mf-scope .week .d.today{background:#5D5BD0;color:#fff;box-shadow:0 4px 10px rgba(93,91,208,.4)}
.mf-scope .week .d.plan{background:#E9E8FF;color:#5D5BD0}
.mf-scope .week .d.miss{background:#FBE3EC;color:#D6457D}
.mf-scope .legend{display:flex;gap:14px;margin-top:14px;flex-wrap:wrap}
.mf-scope .legend span{display:flex;align-items:center;gap:6px;font-weight:800;font-size:11px;color:rgba(0,0,0,.5)}
.mf-scope .legend i{width:11px;height:11px;border-radius:4px}
.mf-scope .btnp{margin-top:4px;background:linear-gradient(150deg,#6260E0,#4D4BC0);color:#fff;border-radius:14px;padding:14px;text-align:center;font-weight:900;font-size:14px;box-shadow:0 12px 24px rgba(77,75,192,.3)}
.mf-scope /* start card action row */
  .gorow{display:flex;gap:9px;margin-top:14px;position:relative}
.mf-scope .gorow .go{margin-top:0;flex:1}
.mf-scope .gocal{width:48px;border-radius:13px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;color:#fff;flex:0 0 auto}
.mf-scope .sess .movp{font-weight:900;font-size:8.5px;letter-spacing:.05em;background:rgba(255,255,255,.28);padding:4px 8px;border-radius:99px;line-height:1}
.mf-scope /* program cover cards (matches app.html) */
  .plist{display:flex;flex-direction:column;gap:11px}
.mf-scope .prog{background:#fff;border-radius:17px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,.03),0 8px 20px rgba(0,0,0,.06)}
.mf-scope .prog .cov{height:46px;position:relative}
.mf-scope .prog .cov .dbell{position:absolute;top:8px;right:10px;color:#fff;opacity:.9}
.mf-scope .prog .cov .apill{position:absolute;top:10px;left:11px;background:rgba(255,255,255,.95);color:#5D5BD0;font-weight:900;font-size:8px;letter-spacing:.05em;padding:3px 8px;border-radius:99px}
.mf-scope .prog .body{display:flex;align-items:center;gap:10px;padding:10px 12px}
.mf-scope .prog .pn{font-family:"Archivo";font-weight:900;font-size:15.5px;color:#0A0A0F;letter-spacing:-.01em;display:flex;align-items:center;gap:6px}
.mf-scope .prog .r2{background:#E9E8FF;color:#414092;font-weight:900;font-size:8.5px;padding:2px 6px;border-radius:99px;letter-spacing:.02em}
.mf-scope .prog .pm{font-weight:700;font-size:11px;color:rgba(0,0,0,.42);margin-top:3px}
.mf-scope .prog .chev{margin-left:auto;color:rgba(0,0,0,.22);flex:0 0 auto}
.mf-scope /* agenda calendar (matches app.html) */
  .cseg{display:inline-flex;background:#EAEAF1;border-radius:11px;padding:3px}
.mf-scope .cseg b{font-weight:800;font-size:12px;padding:6px 16px;border-radius:9px;color:rgba(0,0,0,.5)}
.mf-scope .cseg b.on{background:#fff;color:#0A0A0F;box-shadow:0 1px 3px rgba(0,0,0,.12)}
.mf-scope .crow{display:flex;align-items:center;justify-content:space-between}
.mf-scope .cmo{border:1.5px solid rgba(0,0,0,.1);background:#fff;border-radius:99px;padding:7px 14px;font-weight:800;font-size:12px;color:#0A0A0F;display:flex;align-items:center;gap:6px}
.mf-scope .schedbtn{width:100%;height:46px;border-radius:14px;background:#5D5BD0;color:#fff;font-weight:900;font-size:13.5px;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 11px 22px rgba(93,91,208,.32)}
.mf-scope .leg2{display:flex;gap:16px;padding:2px}
.mf-scope .leg2 span{display:flex;align-items:center;gap:6px;font-weight:800;font-size:11.5px;color:rgba(0,0,0,.55)}
.mf-scope .leg2 i{width:9px;height:9px;border-radius:50%}
.mf-scope .agenda{display:flex;flex-direction:column;gap:9px;overflow:hidden}
.mf-scope .arow{display:flex;gap:11px}
.mf-scope .arow .rail{width:34px;flex:0 0 auto;text-align:center;padding-top:9px}
.mf-scope .arow .rail .dw{font-weight:800;font-size:10px;color:rgba(0,0,0,.4)}
.mf-scope .arow .rail .dt{font-weight:900;font-size:18px;color:#0A0A0F;line-height:1.1}
.mf-scope .arow .rail .dt.tod{color:#5D5BD0}
.mf-scope .acard{flex:1;min-width:0;background:#fff;border-radius:15px;padding:10px 12px;display:flex;align-items:center;gap:10px;box-shadow:0 4px 12px rgba(0,0,0,.05)}
.mf-scope .acard .bar6{width:5px;height:38px;border-radius:99px;flex:0 0 auto}
.mf-scope .acard .an{font-weight:900;font-size:14px;color:#0A0A0F}
.mf-scope .acard .af{font-weight:700;font-size:10.5px;color:rgba(0,0,0,.5);margin-top:2px}
.mf-scope .acard .spill{margin-left:auto;font-weight:900;font-size:8.5px;letter-spacing:.04em;padding:4px 9px;border-radius:99px;flex:0 0 auto}
.mf-scope .arest{flex:1;display:flex;align-items:center;padding-left:2px;font-weight:700;font-size:12.5px;color:rgba(0,0,0,.3)}
.mf-scope .sp-done{background:#E4F5F4;color:#2E7A78}
.mf-scope .sp-plan{background:#E9E8FF;color:#414092}
.mf-scope .sp-miss{background:#FBE3EC;color:#C13C6E}
.mf-scope /* rings / food */
  .ring{position:relative;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:conic-gradient(var(--rc,#5CC0BF) calc(var(--p,50)*1%),rgba(0,0,0,.08) 0)}
.mf-scope .ring::before{content:"";position:absolute;width:70%;height:70%;border-radius:50%;background:#fff}
.mf-scope .ring b{position:relative;font-weight:900;color:#0A0A0F}
.mf-scope .macros{display:flex;justify-content:space-around;text-align:center}
.mf-scope .macros .mac b{display:block;font-weight:900;font-size:13px;color:#0A0A0F;margin-top:9px}
.mf-scope .macros .mac span{font-weight:800;font-size:10px;color:rgba(0,0,0,.42)}
.mf-scope .meal{display:flex;align-items:center;gap:12px}
.mf-scope .meal .th{width:44px;height:44px;border-radius:12px;flex:0 0 auto;background:linear-gradient(135deg,#F2A93B,#F0563A);display:flex;align-items:center;justify-content:center;font-size:22px}
.mf-scope .meal .mt{font-weight:900;font-size:14px;color:#0A0A0F}
.mf-scope .meal .ms{font-weight:700;font-size:11.5px;color:rgba(0,0,0,.5);margin-top:2px}
.mf-scope .meal .kc{margin-left:auto;font-weight:900;font-size:13px;color:#5D5BD0}
.mf-scope .scanbtn{background:#141024;color:#fff;border-radius:14px;padding:14px;text-align:center;font-weight:900;font-size:14px;display:flex;align-items:center;justify-content:center;gap:8px}
.mf-scope /* avatar */
  .avwrap{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;position:relative}
.mf-scope .avglow{position:absolute;width:210px;height:210px;border-radius:50%;background:radial-gradient(closest-side,rgba(120,110,255,.55),transparent);top:40%;transform:translateY(-50%)}
.mf-scope .avwrap .lv{font-family:"Archivo";font-weight:900;font-size:11px;letter-spacing:.16em;color:#9b9cfd;position:relative}
.mf-scope .avwrap img{height:250px;filter:drop-shadow(0 20px 34px rgba(0,0,0,.5));position:relative}
.mf-scope .avwrap .mth{font-family:"Archivo";font-weight:900;font-size:19px;color:#fff;position:relative;letter-spacing:-.01em}
.mf-scope .avbar{width:180px;height:8px;border-radius:99px;background:rgba(255,255,255,.14);margin-top:11px;overflow:hidden;position:relative}
.mf-scope .avbar i{display:block;height:100%;width:62%;border-radius:99px;background:linear-gradient(90deg,#9b9cfd,#5CC0BF)}
.mf-scope .avnote{font-weight:800;font-size:10.5px;color:rgba(255,255,255,.6);margin-top:10px;position:relative}
.mf-scope /* before/after projection */
  .ba{position:relative;border-radius:18px;overflow:hidden;flex:1;min-height:0;background:linear-gradient(135deg,#2a2350,#141024)}
.mf-scope .ba .half{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;font-weight:900}
.mf-scope .ba .now{background:linear-gradient(180deg,rgba(20,16,36,.1),rgba(20,16,36,.75))}
.mf-scope .ba .fut{clip-path:inset(0 0 0 52%);background:linear-gradient(180deg,rgba(93,91,208,.25),rgba(93,91,208,.6))}
.mf-scope .ba .fig{position:absolute;bottom:0;height:82%;width:auto}
.mf-scope .ba .fig.a{left:14%;transform:translateX(-50%);filter:grayscale(1) brightness(.85)}
.mf-scope .ba .fig.b{right:2%;filter:drop-shadow(0 0 22px rgba(155,156,253,.5))}
.mf-scope .ba .divider{position:absolute;top:0;bottom:0;left:52%;width:3px;background:#fff;box-shadow:0 0 14px rgba(255,255,255,.6)}
.mf-scope .ba .knob{position:absolute;top:50%;left:52%;transform:translate(-50%,-50%);width:34px;height:34px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.4);color:#5D5BD0;font-weight:900}
.mf-scope .ba .tagf{position:absolute;top:12px;right:12px;background:rgba(93,91,208,.9);color:#fff;font-weight:900;font-size:10.5px;padding:5px 10px;border-radius:99px;letter-spacing:.03em}
.mf-scope .ba .tagn{position:absolute;top:12px;left:12px;background:rgba(255,255,255,.9);color:#0A0A0F;font-weight:900;font-size:10.5px;padding:5px 10px;border-radius:99px}
.mf-scope .timeline{display:flex;gap:7px}
.mf-scope .timeline .tb{flex:1;text-align:center;font-weight:900;font-size:12px;color:rgba(0,0,0,.4);background:#F1F1F7;border-radius:11px;padding:9px 0}
.mf-scope .timeline .tb.on{background:var(--indigo);color:#fff}
.mf-scope /* chatbot */
  .chat{display:flex;flex-direction:column;gap:9px;flex:1;overflow:hidden}
.mf-scope .bub{max-width:82%;padding:11px 14px;border-radius:16px;font-weight:700;font-size:13px;line-height:1.35}
.mf-scope .bub.u{align-self:flex-end;background:linear-gradient(150deg,#6260E0,#4D4BC0);color:#fff;border-bottom-right-radius:5px}
.mf-scope .bub.b{align-self:flex-start;background:#fff;color:#0A0A0F;border-bottom-left-radius:5px;box-shadow:0 4px 12px rgba(0,0,0,.05)}
.mf-scope .bub .setpill{display:inline-flex;align-items:center;gap:6px;background:#EEF0FF;color:#413F92;font-weight:900;font-size:12px;padding:5px 10px;border-radius:99px;margin-top:8px}
.mf-scope .cbar{margin-top:auto;background:#fff;border-radius:99px;padding:11px 16px;display:flex;align-items:center;gap:8px;font-weight:700;font-size:13px;color:rgba(0,0,0,.4);box-shadow:0 4px 12px rgba(0,0,0,.05)}
.mf-scope .cbar .snd{margin-left:auto;width:30px;height:30px;border-radius:50%;background:var(--indigo);display:flex;align-items:center;justify-content:center}
.mf-scope /* social */
  .feed{display:flex;flex-direction:column;gap:10px}
.mf-scope .frow{display:flex;align-items:center;gap:12px;background:#fff;border-radius:16px;padding:13px;box-shadow:0 6px 16px rgba(0,0,0,.05)}
.mf-scope .av{width:42px;height:42px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:16px}
.mf-scope .frow .nm{font-weight:900;font-size:13.5px;color:#0A0A0F}
.mf-scope .frow .ac{font-weight:700;font-size:11.5px;color:rgba(0,0,0,.5);margin-top:2px}
.mf-scope .react{margin-left:auto;display:flex;gap:6px}
.mf-scope .react span{width:34px;height:34px;border-radius:11px;background:#F1F1F7;display:flex;align-items:center;justify-content:center;font-size:16px}
.mf-scope .react span.p{background:#EEF0FF}
.mf-scope /* app tab bar (matches app.html) */
  .appnav{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:center;padding-bottom:13px;z-index:120;pointer-events:none}
.mf-scope .appnav .bar{display:flex;align-items:center;gap:2px;padding:6px;pointer-events:auto;background:rgba(118,118,128,.22);backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);border-radius:9999px;border:1px solid rgba(255,255,255,.5);box-shadow:0 12px 34px rgba(0,0,0,.16)}
.mf-scope .appnav .tb{display:flex;flex-direction:column;align-items:center;gap:3px;border:0;padding:8px 12px;border-radius:9999px;background:transparent;color:rgba(0,0,0,.5);font-family:"Nunito";font-weight:800;font-size:9.5px;line-height:1}
.mf-scope .appnav .tb svg{width:20px;height:20px}
.mf-scope .appnav .tb.on{background:#fff;color:#141024;box-shadow:0 3px 10px rgba(0,0,0,.14)}
.mf-scope .screen.dark .appnav .bar{background:rgba(40,36,70,.42);border-color:rgba(255,255,255,.18)}
.mf-scope .screen.dark .appnav .tb{color:rgba(255,255,255,.55)}
.mf-scope .screen.dark .appnav .tb.on{background:rgba(255,255,255,.15);color:#fff}
.mf-scope /* nav */
  .nav{position:absolute;left:12px;right:12px;bottom:12px;height:54px;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-radius:0 0 40px 40px;display:flex;align-items:center;justify-content:space-around;box-shadow:0 -8px 20px rgba(0,0,0,.05);z-index:10}
.mf-scope .screen.dark .nav,.mf-scope .nav.dk{background:rgba(20,16,36,.92)}
.mf-scope .nav .ni{color:rgba(0,0,0,.28)}
.mf-scope .nav.dk .ni{color:rgba(255,255,255,.32)}
.mf-scope .nav .ni.act{color:#5D5BD0}
.mf-scope .nav.dk .ni.act{color:#9b9cfd}
.mf-scope /* stagger */
  .screen > *{animation:mfcIn .5s cubic-bezier(.19,1,.22,1) backwards}
.mf-scope .screen > *:nth-child(2){animation-delay:.05s}
.mf-scope .screen > *:nth-child(3){animation-delay:.11s}
.mf-scope .screen > *:nth-child(4){animation-delay:.17s}
.mf-scope .screen > *:nth-child(5){animation-delay:.23s}
.mf-scope .chatbody > *{animation:mfcIn .5s cubic-bezier(.19,1,.22,1) backwards}
.mf-scope .chatbody > *:nth-child(2){animation-delay:.14s}
.mf-scope .chatbody > *:nth-child(3){animation-delay:.26s}
.mf-scope .chatbody > *:nth-child(4){animation-delay:.40s}
.mf-scope .chatbody > *:nth-child(5){animation-delay:.54s}
@keyframes mfcIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.mf-scope /* projection reveal */
  .reveal{position:relative;height:284px;border-radius:15px;overflow:hidden;background:linear-gradient(180deg,#EFEEFB,#DAD9FF);cursor:ew-resize;touch-action:none;user-select:none}
.mf-scope .reveal img{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:auto;object-fit:contain;pointer-events:none}
.mf-scope .rv-after img{height:97%;filter:drop-shadow(0 14px 14px rgba(0,0,0,.18))}
.mf-scope .rv-before{position:absolute;inset:0;clip-path:inset(0 48% 0 0);background:linear-gradient(180deg,#E8E7F4,#CFCEEC)}
.mf-scope .rv-before img{height:91%;filter:grayscale(40%) drop-shadow(0 10px 10px rgba(0,0,0,.12))}
.mf-scope .rv-tagn{position:absolute;top:11px;left:11px;padding:4px 11px;border-radius:99px;background:rgba(255,255,255,.92);color:#0A0A0F;font-weight:800;font-size:11.5px}
.mf-scope .rv-tagf{position:absolute;top:11px;right:11px;padding:5px 11px;border-radius:99px;background:var(--indigo);color:#fff;font-weight:800;font-size:11.5px;display:inline-flex;align-items:center;gap:4px}
.mf-scope .rv-tagf svg{width:13px;height:13px}
.mf-scope .rv-div{position:absolute;top:0;bottom:0;left:52%;width:3px;transform:translateX(-50%);background:#fff;box-shadow:0 0 8px rgba(0,0,0,.25)}
.mf-scope .rv-knob{position:absolute;top:50%;left:52%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;color:var(--indigo)}
.mf-scope .seg{display:flex;gap:5px;background:#F1F1F7;border-radius:13px;padding:5px;margin-top:13px}
.mf-scope .seg button{flex:1;border:0;background:none;font-family:inherit;font-weight:800;font-size:12.5px;color:rgba(0,0,0,.5);padding:9px 0;border-radius:9px;cursor:pointer;transition:all .2s}
.mf-scope .seg button.on{background:#fff;color:var(--indigo-ink);box-shadow:0 2px 6px rgba(0,0,0,.08)}
.mf-scope .phint{display:flex;align-items:center;justify-content:center;gap:6px;font-weight:700;font-size:12px;color:var(--ink3);margin-top:12px;text-align:center;line-height:1.35;padding:0 6px}
.mf-scope .phint svg{width:14px;height:14px;color:var(--indigo);flex:0 0 auto}
.mf-scope .pcta{margin-top:12px;background:linear-gradient(150deg,#6260E0,#4D4BC0);color:#fff;border-radius:14px;padding:13px;text-align:center;font-weight:900;font-size:14px;display:flex;align-items:center;justify-content:center;gap:8px}
.mf-scope /* chatbot */
  .chdr{display:flex;align-items:center;gap:11px;padding:2px 2px 13px;border-bottom:1px solid rgba(0,0,0,.06)}
.mf-scope .chdr .sp{border-radius:13px;background:linear-gradient(135deg,var(--indigo),var(--indigo-ink));display:flex;align-items:center;justify-content:center;color:#fff;flex:0 0 auto}
.mf-scope .chdr .nm{font-weight:800;font-size:17px;color:#0A0A0F}
.mf-scope .chdr .lv{display:flex;align-items:center;gap:6px;margin-top:2px;font-weight:700;font-size:12px;color:var(--ink3)}
.mf-scope .chdr .lv i{width:7px;height:7px;border-radius:50%;background:var(--turq);flex:0 0 auto}
.mf-scope .chdr .x{margin-left:auto;width:34px;height:34px;border-radius:50%;background:#F1F1F7;border:0;display:flex;align-items:center;justify-content:center;color:var(--ink2);flex:0 0 auto;cursor:pointer}
.mf-scope .chatbody{flex:1;display:flex;flex-direction:column;gap:9px;overflow:hidden;padding-top:11px}
.mf-scope .chatbody .bub{max-width:86%;font-size:14px;padding:12px 15px;border-radius:18px}
.mf-scope .chatbody .bub.u{border-bottom-right-radius:5px}
.mf-scope .chatbody .bub.b{background:#F1F1F7;color:#0A0A0F;box-shadow:none;border-bottom-left-radius:5px}
.mf-scope .chatbody .bub b{font-weight:800}
.mf-scope .daypill{align-self:center;padding:5px 13px;border-radius:99px;background:rgba(0,0,0,.06);font-weight:700;font-size:11.5px;color:var(--ink3)}
.mf-scope .chips{display:flex;flex-wrap:wrap;gap:8px}
.mf-scope .chips span{padding:8px 13px;border-radius:99px;border:1.5px solid #C9C8FA;background:var(--indigo-soft);color:var(--indigo-ink);font-weight:800;font-size:12.5px}
.mf-scope .chg{align-self:flex-start;width:92%;border-radius:16px;overflow:hidden;border:1px solid rgba(0,0,0,.07);background:#fff;box-shadow:0 6px 16px rgba(40,36,90,.08)}
.mf-scope .chg .h{background:var(--indigo-soft);padding:9px 12px;display:flex;align-items:center;gap:10px}
.mf-scope .chg .h .ic{width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,var(--indigo),var(--indigo-ink));color:#fff;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.mf-scope .chg .h .ic svg{width:17px;height:17px}
.mf-scope .chg .h .t{font-weight:800;font-size:14px;color:#0A0A0F}
.mf-scope .chg .h .s{font-weight:700;font-size:11.5px;color:var(--ink3);margin-top:1px}
.mf-scope .chg .b{padding:10px 12px}
.mf-scope .chg .box{background:#F5F5FA;border-radius:12px;padding:9px 12px}
.mf-scope .chg .box b{font-weight:800;font-size:15px;color:#0A0A0F}
.mf-scope .chg .box span{display:block;font-weight:700;font-size:12px;color:var(--ink3);margin-top:2px}
.mf-scope .chg .applied{display:flex;align-items:center;gap:7px;margin-top:9px;font-weight:800;font-size:12.5px;color:#2E9E8F}
.mf-scope .composer{display:flex;align-items:center;gap:10px;padding-top:11px;border-top:1px solid rgba(0,0,0,.06)}
.mf-scope .composer .inp{flex:1;height:46px;border-radius:99px;background:#F1F1F7;display:flex;align-items:center;padding:0 18px;font-weight:600;font-size:14px;color:rgba(0,0,0,.4)}
.mf-scope .composer .snd{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--indigo),var(--indigo-ink));display:flex;align-items:center;justify-content:center;flex:0 0 auto;color:#fff}
.mf-scope .rise{opacity:0;transform:translateY(34px);transition:opacity .9s cubic-bezier(.19,1,.22,1),transform .9s cubic-bezier(.19,1,.22,1)}
.mf-scope .rise.in{opacity:1;transform:none}
@media (max-width:940px){.mf-scope .sect{grid-template-columns:1fr;gap:48px}.mf-scope .rightcol{order:-1}}
@media (prefers-reduced-motion:reduce){.mf-scope *{animation:none!important}}
`;

const MF_HTML = `<section class="sect">
  <!-- LEFT -->
  <div class="lead rise">
    <h2>And that's<br>not all</h2>
    <p class="sub">Pocket Fit is your whole training life in one app:</p>
    <div class="flist" id="flist">

      <button class="fitem on" data-scr="s-train">
        <div class="txt"><h3>Personalized training</h3><div class="d">A program built around your goal, equipment and level — that adapts every week as you train.</div></div>
        <span class="arw"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
      </button>

      <button class="fitem" data-scr="s-sched">
        <div class="txt"><h3>Smart scheduling</h3><div class="d">Lay out your whole week in one tap. Miss a day? Pocket Fit reshuffles so you stay on track.</div></div>
        <span class="arw"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
      </button>

      <button class="fitem" data-scr="s-food">
        <div class="txt"><h3>Food</h3><div class="d">Scan your plate or a barcode, confirm the macros, done. Fuel your training — no shame, no red numbers.</div></div>
        <span class="arw"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
      </button>

      <button class="fitem" data-scr="s-avatar">
        <div class="txt"><h3>AI avatar</h3><div class="d">Your real training becomes a character that levels up and gets visibly stronger as you do.</div></div>
        <span class="arw"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
      </button>

      <button class="fitem" data-scr="s-proj">
        <div class="txt"><h3>See your future self</h3><div class="d">Take one photo and watch a photorealistic you in 1, 2, 3 and 6 months of training.</div></div>
        <span class="arw"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
      </button>

      <button class="fitem" data-scr="s-chat">
        <div class="txt"><h3>AI chatbot</h3><div class="d">Log a set, ask what's next, or get a swap — just talk to it. It knows your whole plan.</div></div>
        <span class="arw"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
      </button>

      <button class="fitem" data-scr="s-social">
        <div class="txt"><h3>Friends &amp; socials</h3><div class="d">Nudge a friend, cheer a PR, or laugh at a skipped day. Training is better together.</div></div>
        <span class="arw"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
      </button>

    </div>
  </div>

  <!-- RIGHT : PHONE -->
  <div class="rightcol rise">
    <div class="stage">
      <div class="tphone"><div class="scr"><div class="notch"></div>

        <!-- 1 TRAIN -->
        <div class="screen show" id="s-train">
          <div class="statusbar"><span>9:41</span><span class="sbicons"><svg width="17" height="11" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"></rect><rect x="5" y="4.5" width="3" height="7.5" rx="1"></rect><rect x="10" y="2" width="3" height="10" rx="1"></rect><rect x="15" y="0" width="3" height="12" rx="1"></rect></svg><svg width="16" height="12" viewBox="0 0 18 13" fill="none"><path d="M9 11.5l7.5-7.5a10.5 10.5 0 00-15 0L9 11.5z" fill="currentColor"></path></svg><svg width="25" height="12" viewBox="0 0 26 13" fill="none"><rect x="1" y="1.5" width="21" height="10" rx="3" stroke="currentColor" stroke-width="1.4" opacity=".5"></rect><rect x="3" y="3.5" width="15" height="6" rx="1.5" fill="currentColor"></rect><rect x="23.2" y="4.5" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".5"></rect></svg></span></div>
          <div class="shead"><div class="t">Hello Alex<small>24 workouts · avatar levelling up</small></div><div class="sic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"></rect><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></div></div>
          <div class="sess">
            <div class="st"><span class="tag2">TODAY · TOTAL BODY · HIIT</span><span class="movp">MOVED TO TODAY</span><span class="dur">38 min</span></div>
            <h4>Full Body Burn</h4>
            <div class="subx">Today's deposit is ready — Full Body Burn, just press go.</div>
            <div class="gorow">
              <div class="go"><svg width="15" height="15" viewBox="0 0 24 24" fill="#413F92"><path d="M8 5.5v13l11-6.5z"></path></svg>Start workout</div>
              <div class="gocal"><svg width="19" height="19" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"></rect><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></div>
            </div>
          </div>
          <div class="lbl" style="margin:2px 0 -4px">Your programs</div>
          <div class="plist">
            <div class="prog">
              <div class="cov" style="background:linear-gradient(150deg,#7472E5,#3F3DBA)"><span class="apill">ACTIVE</span><span class="dbell"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M6.5 8.5v7M17.5 8.5v7M4 10v4M20 10v4M6.5 12h11" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></span></div>
              <div class="body"><div><div class="pn">Main Program <span class="r2">R2</span></div><div class="pm">4 workouts · 12 weeks · Intermediate</div></div><span class="chev"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></div>
            </div>
          </div>
          <div class="appnav"><div class="bar"><button class="tb on"><svg viewBox="0 0 24 24" fill="none"><path d="M3 12h2M19 12h2M7 8v8M17 8v8M7 12h10" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"></path></svg><span>Workouts</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M12 7c-1.5-2.5-5-2.6-6.5 0C4 9.5 5 15 8 18c1.2 1.2 2.3 1 4 1s2.8.2 4-1c3-3 4-8.5 2.5-11-1.5-2.6-5-2.5-6.5 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M12 7c0-2 .8-3.5 2.5-4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Food</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="2"></circle><circle cx="17" cy="9.5" r="2.4" stroke="currentColor" stroke-width="2"></circle><path d="M3.5 19c.6-3.2 3-5 5.5-5s4.9 1.8 5.5 5M15.5 14.2c2.2.1 3.6 1.7 4.2 4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Social</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Stats</span></button></div></div>
        </div>

        <!-- 2 SCHEDULE -->
        <div class="screen" id="s-sched">
          <div class="statusbar"><span>9:41</span><span class="sbicons"><svg width="17" height="11" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"></rect><rect x="5" y="4.5" width="3" height="7.5" rx="1"></rect><rect x="10" y="2" width="3" height="10" rx="1"></rect><rect x="15" y="0" width="3" height="12" rx="1"></rect></svg><svg width="16" height="12" viewBox="0 0 18 13" fill="none"><path d="M9 11.5l7.5-7.5a10.5 10.5 0 00-15 0L9 11.5z" fill="currentColor"></path></svg><svg width="25" height="12" viewBox="0 0 26 13" fill="none"><rect x="1" y="1.5" width="21" height="10" rx="3" stroke="currentColor" stroke-width="1.4" opacity=".5"></rect><rect x="3" y="3.5" width="15" height="6" rx="1.5" fill="currentColor"></rect><rect x="23.2" y="4.5" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".5"></rect></svg></span></div>
          <div class="shead"><div class="t">Calendar<small>Month 1 · 2 of 4 done this week</small></div><div class="sic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 20h4L18.5 9.5a2 2 0 000-3l-1-1a2 2 0 00-3 0L4 16v4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg></div></div>
          <div class="crow">
            <div class="cseg"><b class="on">Week</b><b>Month</b></div>
            <div class="cmo">June<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
          </div>
          <div class="schedbtn"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" fill="currentColor"></path></svg>Schedule my week</div>
          <div class="leg2"><span><i style="background:#5D5BD0"></i>Planned</span><span><i style="background:#5CC0BF"></i>Completed</span><span><i style="background:#E8607D"></i>Missed</span></div>
          <div class="agenda">
            <div class="arow"><div class="rail"><div class="dw">MON</div><div class="dt">9</div></div><div class="acard"><span class="bar6" style="background:#5CC0BF"></span><div><div class="an">Upper A</div><div class="af">Push emphasis · 1h 4m</div></div><span class="spill sp-done">DONE</span></div></div>
            <div class="arow"><div class="rail"><div class="dw">TUE</div><div class="dt">10</div></div><div class="arest">Rest day</div></div>
            <div class="arow"><div class="rail"><div class="dw">WED</div><div class="dt">11</div></div><div class="acard"><span class="bar6" style="background:#E8607D"></span><div><div class="an">Lower A</div><div class="af">Moved to Fri · self-healed</div></div><span class="spill sp-miss">MISSED</span></div></div>
            <div class="arow"><div class="rail"><div class="dw">THU</div><div class="dt tod">12</div></div><div class="acard" style="outline:2px solid #5D5BD0;outline-offset:-1px"><span class="bar6" style="background:#5D5BD0"></span><div><div class="an">Full Body Burn</div><div class="af">Total body · HIIT · 38 min</div></div><span class="spill sp-plan">TODAY</span></div></div>
            <div class="arow"><div class="rail"><div class="dw">FRI</div><div class="dt">13</div></div><div class="acard"><span class="bar6" style="background:#5D5BD0"></span><div><div class="an">Lower A</div><div class="af">Squat focus · 52 min</div></div><span class="spill sp-plan">PLANNED</span></div></div>
          </div>
          <div class="appnav"><div class="bar"><button class="tb on"><svg viewBox="0 0 24 24" fill="none"><path d="M3 12h2M19 12h2M7 8v8M17 8v8M7 12h10" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"></path></svg><span>Workouts</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M12 7c-1.5-2.5-5-2.6-6.5 0C4 9.5 5 15 8 18c1.2 1.2 2.3 1 4 1s2.8.2 4-1c3-3 4-8.5 2.5-11-1.5-2.6-5-2.5-6.5 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M12 7c0-2 .8-3.5 2.5-4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Food</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="2"></circle><circle cx="17" cy="9.5" r="2.4" stroke="currentColor" stroke-width="2"></circle><path d="M3.5 19c.6-3.2 3-5 5.5-5s4.9 1.8 5.5 5M15.5 14.2c2.2.1 3.6 1.7 4.2 4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Social</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Stats</span></button></div></div>
        </div>

        <!-- 3 FOOD -->
        <div class="screen" id="s-food">
          <div class="statusbar"><span>9:41</span><span class="sbicons"><svg width="17" height="11" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"></rect><rect x="5" y="4.5" width="3" height="7.5" rx="1"></rect><rect x="10" y="2" width="3" height="10" rx="1"></rect><rect x="15" y="0" width="3" height="12" rx="1"></rect></svg><svg width="16" height="12" viewBox="0 0 18 13" fill="none"><path d="M9 11.5l7.5-7.5a10.5 10.5 0 00-15 0L9 11.5z" fill="currentColor"></path></svg><svg width="25" height="12" viewBox="0 0 26 13" fill="none"><rect x="1" y="1.5" width="21" height="10" rx="3" stroke="currentColor" stroke-width="1.4" opacity=".5"></rect><rect x="3" y="3.5" width="15" height="6" rx="1.5" fill="currentColor"></rect><rect x="23.2" y="4.5" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".5"></rect></svg></span></div>
          <div class="shead"><div class="t">Food<small>1,540 kcal left today</small></div><div style="display:flex;align-items:center;gap:6px;background:#141024;color:#fff;font-weight:900;font-size:12.5px;padding:9px 14px;border-radius:99px;flex:0 0 auto"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#fff" stroke-width="2.6" stroke-linecap="round"></path></svg>Log</div></div>
          <div class="card">
            <div class="lbl" style="color:#5D5BD0;margin-bottom:7px">Today's fuel</div>
            <div style="font-weight:800;font-size:13px;color:#0A0A0F;line-height:1.35;margin-bottom:14px">Building nicely. Keep depositing — your body's stocking up for the day.</div>
            <div class="macros">
              <div class="mac"><div class="ring" style="--p:50;--rc:#5D5BD0;width:66px;height:66px"><b style="font-size:17px">64</b></div><b>/ 129g</b><span>PROTEIN</span></div>
              <div class="mac"><div class="ring" style="--p:66;--rc:#5CC0BF;width:66px;height:66px"><b style="font-size:17px">91</b></div><b>/ 137g</b><span>CARBS</span></div>
              <div class="mac"><div class="ring" style="--p:26;--rc:#F2A93B;width:66px;height:66px"><b style="font-size:17px">20</b></div><b>/ 77g</b><span>FAT</span></div>
            </div>
          </div>
          <div class="card" style="padding:0;overflow:hidden">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 15px 10px"><span style="font-weight:900;font-size:14px;color:#0A0A0F">Breakfast</span><span style="font-weight:900;font-size:12px;color:rgba(0,0,0,.4)">246 kcal</span></div>
            <div style="display:flex;align-items:center;gap:12px;padding:11px 15px;border-top:1px solid rgba(0,0,0,.05)"><div style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#5CC0BF,#2E9E8F);flex:0 0 auto"></div><div style="flex:1;min-width:0"><div style="font-weight:900;font-size:13.5px;color:#0A0A0F">Greek Yogurt &amp; Berries</div><div style="font-weight:700;font-size:11px;color:rgba(0,0,0,.5);margin-top:2px">22P · 28C · 6F · Scan</div></div><div style="font-weight:900;font-size:13px;color:#5D5BD0">240</div></div>
            <div style="display:flex;align-items:center;gap:12px;padding:11px 15px;border-top:1px solid rgba(0,0,0,.05)"><div style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#7A6A5A,#463A30);flex:0 0 auto"></div><div style="flex:1;min-width:0"><div style="font-weight:900;font-size:13.5px;color:#0A0A0F">Black Coffee</div><div style="font-weight:700;font-size:11px;color:rgba(0,0,0,.5);margin-top:2px">0P · 1C · 0F · Recents</div></div><div style="font-weight:900;font-size:13px;color:#5D5BD0">5</div></div>
          </div>
          <div class="scanbtn"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>Scan your plate</div>
          <div class="appnav"><div class="bar"><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M3 12h2M19 12h2M7 8v8M17 8v8M7 12h10" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"></path></svg><span>Workouts</span></button><button class="tb on"><svg viewBox="0 0 24 24" fill="none"><path d="M12 7c-1.5-2.5-5-2.6-6.5 0C4 9.5 5 15 8 18c1.2 1.2 2.3 1 4 1s2.8.2 4-1c3-3 4-8.5 2.5-11-1.5-2.6-5-2.5-6.5 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M12 7c0-2 .8-3.5 2.5-4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Food</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="2"></circle><circle cx="17" cy="9.5" r="2.4" stroke="currentColor" stroke-width="2"></circle><path d="M3.5 19c.6-3.2 3-5 5.5-5s4.9 1.8 5.5 5M15.5 14.2c2.2.1 3.6 1.7 4.2 4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Social</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Stats</span></button></div></div>
        </div>

        <!-- 4 AVATAR -->
        <div class="screen dark" id="s-avatar">
          <div class="statusbar dk"><span>9:41</span><span class="sbicons"><svg width="17" height="11" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"></rect><rect x="5" y="4.5" width="3" height="7.5" rx="1"></rect><rect x="10" y="2" width="3" height="10" rx="1"></rect><rect x="15" y="0" width="3" height="12" rx="1"></rect></svg><svg width="16" height="12" viewBox="0 0 18 13" fill="none"><path d="M9 11.5l7.5-7.5a10.5 10.5 0 00-15 0L9 11.5z" fill="currentColor"></path></svg><svg width="25" height="12" viewBox="0 0 26 13" fill="none"><rect x="1" y="1.5" width="21" height="10" rx="3" stroke="currentColor" stroke-width="1.4" opacity=".5"></rect><rect x="3" y="3.5" width="15" height="6" rx="1.5" fill="currentColor"></rect><rect x="23.2" y="4.5" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".5"></rect></svg></span></div>
          <div class="shead"><div class="t">Your character<small>Level 6 · Month 6</small></div><div class="sic"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"></path></svg></div></div>
          <div class="avwrap">
            <div class="avglow"></div>
            <div class="lv">LEVEL 6 UNLOCKED</div>
            <img src="/journey/kai6.png" alt="Character avatar at month 6">
            <div class="mth">6 months stronger</div>
            <div class="avbar"><i></i></div>
            <div class="avnote">4 more workouts to Level 7</div>
          </div>
          <div class="appnav"><div class="bar"><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M3 12h2M19 12h2M7 8v8M17 8v8M7 12h10" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"></path></svg><span>Workouts</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M12 7c-1.5-2.5-5-2.6-6.5 0C4 9.5 5 15 8 18c1.2 1.2 2.3 1 4 1s2.8.2 4-1c3-3 4-8.5 2.5-11-1.5-2.6-5-2.5-6.5 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M12 7c0-2 .8-3.5 2.5-4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Food</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="2"></circle><circle cx="17" cy="9.5" r="2.4" stroke="currentColor" stroke-width="2"></circle><path d="M3.5 19c.6-3.2 3-5 5.5-5s4.9 1.8 5.5 5M15.5 14.2c2.2.1 3.6 1.7 4.2 4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Social</span></button><button class="tb on"><svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Stats</span></button></div></div>
        </div>

        <!-- 5 PROJECTION -->
        <div class="screen" id="s-proj">
          <div class="statusbar"><span>9:41</span><span class="sbicons"><svg width="17" height="11" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"></rect><rect x="5" y="4.5" width="3" height="7.5" rx="1"></rect><rect x="10" y="2" width="3" height="10" rx="1"></rect><rect x="15" y="0" width="3" height="12" rx="1"></rect></svg><svg width="16" height="12" viewBox="0 0 18 13" fill="none"><path d="M9 11.5l7.5-7.5a10.5 10.5 0 00-15 0L9 11.5z" fill="currentColor"></path></svg><svg width="25" height="12" viewBox="0 0 26 13" fill="none"><rect x="1" y="1.5" width="21" height="10" rx="3" stroke="currentColor" stroke-width="1.4" opacity=".5"></rect><rect x="3" y="3.5" width="15" height="6" rx="1.5" fill="currentColor"></rect><rect x="23.2" y="4.5" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".5"></rect></svg></span></div>
          <div class="shead"><div class="t">Future you<small>AI body projection</small></div><div class="sic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"></rect><circle cx="12" cy="13" r="3.4" stroke="currentColor" stroke-width="2"></circle><path d="M9 6l1.2-2h3.6L15 6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg></div></div>
          <div class="card" style="padding:13px">
            <div class="reveal" id="reveal">
              <div class="rv-after"><img id="rvAfter" src="/journey/kai6.png" alt=""></div>
              <div class="rv-before"><img src="/journey/kai1.png" alt=""></div>
              <span class="rv-tagn">Now</span>
              <span class="rv-tagf" id="rvTag"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"></path></svg>+3 mo</span>
              <div class="rv-div"></div>
              <div class="rv-knob"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 7l-4 5 4 5M15 7l4 5-4 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
            </div>
            <div class="seg" id="proj-seg">
              <button data-mo="1" data-img="kai3">1 mo</button>
              <button data-mo="2" data-img="kai6">2 mo</button>
              <button data-mo="3" data-img="kai9" class="on">3 mo</button>
              <button data-mo="6" data-img="kai12">6 mo</button>
            </div>
            <div class="phint" id="proj-hint"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"></path></svg>AI projection of your 3-month self — drag to reveal</div>
            <div class="pcta"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 19V7M6 13l6-6 6 6" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>Upload a photo</div>
          </div>
          <div class="appnav"><div class="bar"><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M3 12h2M19 12h2M7 8v8M17 8v8M7 12h10" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"></path></svg><span>Workouts</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M12 7c-1.5-2.5-5-2.6-6.5 0C4 9.5 5 15 8 18c1.2 1.2 2.3 1 4 1s2.8.2 4-1c3-3 4-8.5 2.5-11-1.5-2.6-5-2.5-6.5 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M12 7c0-2 .8-3.5 2.5-4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Food</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="2"></circle><circle cx="17" cy="9.5" r="2.4" stroke="currentColor" stroke-width="2"></circle><path d="M3.5 19c.6-3.2 3-5 5.5-5s4.9 1.8 5.5 5M15.5 14.2c2.2.1 3.6 1.7 4.2 4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Social</span></button><button class="tb on"><svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Stats</span></button></div></div>
        </div>

        <!-- 6 CHATBOT -->
        <div class="screen" id="s-chat">
          <div class="statusbar"><span>9:41</span><span class="sbicons"><svg width="17" height="11" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"></rect><rect x="5" y="4.5" width="3" height="7.5" rx="1"></rect><rect x="10" y="2" width="3" height="10" rx="1"></rect><rect x="15" y="0" width="3" height="12" rx="1"></rect></svg><svg width="16" height="12" viewBox="0 0 18 13" fill="none"><path d="M9 11.5l7.5-7.5a10.5 10.5 0 00-15 0L9 11.5z" fill="currentColor"></path></svg><svg width="25" height="12" viewBox="0 0 26 13" fill="none"><rect x="1" y="1.5" width="21" height="10" rx="3" stroke="currentColor" stroke-width="1.4" opacity=".5"></rect><rect x="3" y="3.5" width="15" height="6" rx="1.5" fill="currentColor"></rect><rect x="23.2" y="4.5" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".5"></rect></svg></span></div>
          <div class="chdr">
            <div class="sp" style="width:42px;height:42px"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"></path></svg></div>
            <div style="flex:1;min-width:0">
              <div class="nm">Pocket Fit Chat</div>
              <div class="lv"><i></i>Live · Push Day A</div>
            </div>
            <button class="x"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path></svg></button>
          </div>
          <div class="chatbody">
            <div class="daypill">Today</div>
            <div class="bub b">Hey <b>Alex</b> 👋 I can <b>log sets</b>, tweak weight or reps, and tell you what's next.</div>
            <div class="chips"><span>What's my next set?</span></div>
            <div class="bub u">I did 80 kg for 8 reps 💪</div>
            <div class="chg">
              <div class="h"><span class="ic"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"></path></svg></span><div><div class="t">Logged &amp; progressed</div><div class="s">1 change · Live session</div></div></div>
              <div class="b">
                <div class="box"><b>Set 3 · 8 reps · 80 kg</b><span>Bench press</span></div>
                <div class="applied"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-11" stroke="#2E9E8F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>Logged ✓ · next week we'll try 82.5 kg</div>
              </div>
            </div>
          </div>
          <div class="composer">
            <div class="inp">Ask or log a set…</div>
            <div class="snd"><svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M5 12l7-7 7 7" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
          </div>
        </div>

        <!-- 7 SOCIAL -->
        <div class="screen" id="s-social">
          <div class="statusbar"><span>9:41</span><span class="sbicons"><svg width="17" height="11" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"></rect><rect x="5" y="4.5" width="3" height="7.5" rx="1"></rect><rect x="10" y="2" width="3" height="10" rx="1"></rect><rect x="15" y="0" width="3" height="12" rx="1"></rect></svg><svg width="16" height="12" viewBox="0 0 18 13" fill="none"><path d="M9 11.5l7.5-7.5a10.5 10.5 0 00-15 0L9 11.5z" fill="currentColor"></path></svg><svg width="25" height="12" viewBox="0 0 26 13" fill="none"><rect x="1" y="1.5" width="21" height="10" rx="3" stroke="currentColor" stroke-width="1.4" opacity=".5"></rect><rect x="3" y="3.5" width="15" height="6" rx="1.5" fill="currentColor"></rect><rect x="23.2" y="4.5" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".5"></rect></svg></span></div>
          <div class="shead"><div class="t">Social<small>4 friends training today</small></div><div class="sic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"></circle><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></div></div>
          <div style="display:flex;gap:5px;background:#F1F1F7;border-radius:13px;padding:5px">
            <span style="flex:1;text-align:center;font-weight:800;font-size:12.5px;padding:8px 0;border-radius:9px;background:#fff;color:#413F92;box-shadow:0 2px 6px rgba(0,0,0,.08)">Feed</span>
            <span style="flex:1;text-align:center;font-weight:800;font-size:12.5px;padding:8px 0;border-radius:9px;color:rgba(0,0,0,.45)">Groups</span>
            <span style="flex:1;text-align:center;font-weight:800;font-size:12.5px;padding:8px 0;border-radius:9px;color:rgba(0,0,0,.45)">Leaderboard</span>
          </div>
          <div style="border-radius:18px;padding:15px;color:#fff;background:linear-gradient(135deg,#5CC0BF,#2E9E8F);box-shadow:0 12px 24px rgba(46,158,143,.28);display:flex;align-items:center;gap:12px">
            <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#5D5BD0,#413F92);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;flex:0 0 auto">J</div>
            <div style="flex:1;min-width:0"><div style="font-weight:900;font-size:9.5px;letter-spacing:.1em;opacity:.85">● TRAINING RIGHT NOW</div><div style="font-weight:900;font-size:14px;margin-top:3px">Jess Lin</div><div style="font-weight:700;font-size:11.5px;opacity:.9;margin-top:1px">is training right now — train with them</div></div>
            <div style="background:#fff;color:#2E9E8F;font-weight:900;font-size:12.5px;padding:8px 16px;border-radius:99px;flex:0 0 auto">Join</div>
          </div>
          <div class="feed">
            <div class="frow" style="flex-wrap:wrap">
              <div class="av" style="background:linear-gradient(135deg,#5D5BD0,#413F92)">O</div>
              <div style="flex:1;min-width:0"><div class="nm">Omar Tariq</div><div class="ac">Skipped Leg Day yesterday · 2h</div></div>
              <div style="flex-basis:100%;display:flex;gap:8px;margin-top:11px"><span style="display:flex;align-items:center;gap:5px;background:#FBE3EC;color:#D6457D;font-weight:800;font-size:12px;padding:7px 13px;border-radius:99px">😂 Laugh · 5</span><span style="display:flex;align-items:center;gap:5px;background:#EEF0FF;color:#5D5BD0;font-weight:800;font-size:12px;padding:7px 13px;border-radius:99px">👉 Poke · 2</span></div>
            </div>
            <div class="frow" style="flex-wrap:wrap">
              <div class="av" style="background:linear-gradient(135deg,#5CC0BF,#2E9E8F)">J</div>
              <div style="flex:1;min-width:0"><div class="nm">Jess Lin · New PR</div><div class="ac">Deadlift · 3h</div></div>
              <div style="background:#F1F1F7;color:#413F92;font-weight:900;font-size:13px;padding:7px 12px;border-radius:11px">120 kg</div>
              <div style="flex-basis:100%;display:flex;gap:8px;margin-top:11px"><span style="display:flex;align-items:center;gap:5px;background:#E6F6F1;color:#2E9E8F;font-weight:800;font-size:12px;padding:7px 13px;border-radius:99px">👏 Cheer · 14</span></div>
            </div>
          </div>
          <div class="appnav"><div class="bar"><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M3 12h2M19 12h2M7 8v8M17 8v8M7 12h10" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"></path></svg><span>Workouts</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M12 7c-1.5-2.5-5-2.6-6.5 0C4 9.5 5 15 8 18c1.2 1.2 2.3 1 4 1s2.8.2 4-1c3-3 4-8.5 2.5-11-1.5-2.6-5-2.5-6.5 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M12 7c0-2 .8-3.5 2.5-4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Food</span></button><button class="tb on"><svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="2"></circle><circle cx="17" cy="9.5" r="2.4" stroke="currentColor" stroke-width="2"></circle><path d="M3.5 19c.6-3.2 3-5 5.5-5s4.9 1.8 5.5 5M15.5 14.2c2.2.1 3.6 1.7 4.2 4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>Social</span></button><button class="tb"><svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Stats</span></button></div></div>
        </div>

      </div></div>
    </div>
  </div>
</section>`;

export function MoreFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const SPARK =
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-2px"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"/></svg>';
    const items = Array.from(root.querySelectorAll<HTMLElement>(".fitem"));
    const scr = (id: string) => root.querySelector<HTMLElement>("#" + id);
    const retrig = (el: HTMLElement) => {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    };
    function activate(btn: HTMLElement) {
      items.forEach((i) => i.classList.remove("on"));
      root!.querySelectorAll(".screen").forEach((s) => s.classList.remove("show"));
      btn.classList.add("on");
      const s = scr(btn.dataset.scr || "");
      if (!s) return;
      s.classList.add("show");
      Array.from(s.children).forEach((c) => retrig(c as HTMLElement));
      const cb = s.querySelector(".chatbody");
      if (cb) Array.from(cb.children).forEach((c) => retrig(c as HTMLElement));
    }
    const cleaners: Array<() => void> = [];
    items.forEach((btn) => {
      const f = () => activate(btn);
      btn.addEventListener("click", f);
      btn.addEventListener("mouseenter", f);
      cleaners.push(() => {
        btn.removeEventListener("click", f);
        btn.removeEventListener("mouseenter", f);
      });
    });

    // projection reveal drag + segment switch
    const rev = root.querySelector<HTMLElement>("#reveal");
    if (rev) {
      const before = rev.querySelector<HTMLElement>(".rv-before");
      const div = rev.querySelector<HTMLElement>(".rv-div");
      const knob = rev.querySelector<HTMLElement>(".rv-knob");
      const set = (x: number) => {
        const r = rev.getBoundingClientRect();
        const p = Math.max(4, Math.min(96, ((x - r.left) / r.width) * 100));
        if (before) before.style.clipPath = "inset(0 " + (100 - p) + "% 0 0)";
        if (div) div.style.left = p + "%";
        if (knob) knob.style.left = p + "%";
      };
      let drag = false;
      const down = (e: PointerEvent) => {
        drag = true;
        set(e.clientX);
        try { rev.setPointerCapture(e.pointerId); } catch {}
      };
      const move = (e: PointerEvent) => { if (drag) set(e.clientX); };
      const up = () => { drag = false; };
      rev.addEventListener("pointerdown", down);
      rev.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      cleaners.push(() => {
        rev.removeEventListener("pointerdown", down);
        rev.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      });
      const seg = root.querySelector<HTMLElement>("#proj-seg");
      const after = root.querySelector<HTMLImageElement>("#rvAfter");
      const tag = root.querySelector<HTMLElement>("#rvTag");
      const hint = root.querySelector<HTMLElement>("#proj-hint");
      seg?.querySelectorAll<HTMLElement>("button").forEach((btn) => {
        const f = () => {
          seg.querySelectorAll("button").forEach((b) => b.classList.remove("on"));
          btn.classList.add("on");
          const img = btn.dataset.img || "";
          if (after) after.src = "/journey/" + img + ".png";
          const mo = btn.dataset.mo;
          if (tag) tag.innerHTML = SPARK + "+" + mo + " mo";
          if (hint) hint.innerHTML = SPARK + "AI projection of your " + mo + "-month self — drag to reveal";
        };
        btn.addEventListener("click", f);
        cleaners.push(() => btn.removeEventListener("click", f));
      });
    }

    // rise reveal
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15 },
    );
    root.querySelectorAll(".rise").forEach((el) => io.observe(el));
    cleaners.push(() => io.disconnect());

    return () => cleaners.forEach((c) => c());
  }, []);

  return (
    <div className="mf-scope">
      <style dangerouslySetInnerHTML={{ __html: MF_CSS }} />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: MF_HTML }} />
    </div>
  );
}
