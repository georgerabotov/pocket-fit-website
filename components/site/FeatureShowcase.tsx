"use client";

/* "See the whole picture" feature grid — ported from the standalone design.
   Six interactive cards (Train / Progress / Transform · Fuel / Balance / Share).
   CSS is scoped under .pf-fs so the generic class names don't leak globally, and
   the original interactivity is re-run against the component root on mount. */

import { useEffect, useRef } from "react";

const CSS = String.raw`.pf-fs{
    --indigo:#5D5BD0; --indigo-ink:#414092; --indigo-soft:#E9E8FF; --indigo-tint:#DAD9FF;
    --turq:#5CC0BF; --berry:#D6457D; --amber:#F2A93B;
    --ink:#0F0E17; --ink2:#3a3950; --ink3:#6e6d83;
    --paper:#ffffff; --bg:#F6F5FC; --line:rgba(15,14,23,.08);
  }
.pf-fs *{box-sizing:border-box;margin:0;padding:0}
.pf-fs{scroll-behavior:smooth}
.pf-fs{font-family:"Nunito",system-ui,sans-serif;color:var(--ink);background:var(--bg);-webkit-font-smoothing:antialiased;line-height:1.5}
.pf-fs .wrap{max-width:1200px;margin:0 auto;padding:0 28px}
.pf-fs .features{padding:96px 0 110px}
.pf-fs .sec-head{max-width:720px;margin:0 auto 52px;text-align:center}
.pf-fs .eyebrow{display:inline-flex;align-items:center;gap:8px;font-weight:800;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--indigo);background:var(--indigo-soft);padding:7px 14px;border-radius:99px;margin-bottom:20px}
.pf-fs .sec-head h2{font-family:"Archivo",sans-serif;font-weight:900;letter-spacing:-.03em;line-height:1.0;font-size:clamp(34px,4.6vw,56px)}
.pf-fs .sec-head p{font-size:clamp(17px,2vw,20px);color:var(--ink2);font-weight:500;margin-top:16px;max-width:560px;margin-left:auto;margin-right:auto}
.pf-fs .fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.pf-fs .fcard{position:relative;border-radius:30px;overflow:hidden;min-height:540px;padding:40px 40px 44px;isolation:isolate;display:flex;flex-direction:column}
.pf-fs .fcard .cap{position:relative;z-index:3;flex:0 0 auto}
.pf-fs .fcard h3{font-family:"Archivo",sans-serif;font-weight:900;font-size:32px;letter-spacing:-.02em;line-height:1;color:var(--ink)}
.pf-fs .fcard p{font-size:16.5px;font-weight:600;color:var(--ink2);margin-top:14px;max-width:290px;line-height:1.45}
.pf-fs .fcard.t-train{background:linear-gradient(180deg,#EEEDFB 0%,#E4E3F8 100%)}
.pf-fs .fcard.t-progress{background:linear-gradient(180deg,#E7F5F4 0%,#DAEFEE 100%)}
.pf-fs .fcard.t-transform{background:linear-gradient(180deg,#EDECFC 0%,#DCD8FA 55%,#CFC9F7 100%)}
.pf-fs .fcard .glow{position:absolute;left:50%;bottom:2%;width:120%;height:56%;transform:translateX(-50%);z-index:1;border-radius:50%;filter:blur(34px);opacity:.6}
.pf-fs .fcard.t-train .glow{background:radial-gradient(closest-side,rgba(93,91,208,.24),transparent)}
.pf-fs .fcard.t-progress .glow{background:radial-gradient(closest-side,rgba(92,192,191,.30),transparent)}
.pf-fs .fcard.t-transform .glow{background:radial-gradient(closest-side,rgba(120,110,255,.40),transparent)}
.pf-fs .fcard.t-food{background:linear-gradient(180deg,#E7F5F4 0%,#DAEFEE 100%)}
.pf-fs .soon{position:absolute;top:26px;right:26px;z-index:4;font-family:"Nunito",sans-serif;font-weight:900;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:#fff;padding:6px 12px;border-radius:99px;background:linear-gradient(135deg,#5CC0BF,#2E9E8F);box-shadow:0 8px 18px -6px rgba(46,158,143,.5)}
.pf-fs .fcard.t-budget{background:linear-gradient(180deg,#EEEDFB 0%,#E4E3F8 100%)}
.pf-fs .fcard.t-share{background:linear-gradient(180deg,#EDECFC 0%,#DCD8FA 55%,#CFC9F7 100%)}
.pf-fs .fcard.t-food .glow{background:radial-gradient(closest-side,rgba(92,192,191,.30),transparent)}
.pf-fs .fcard.t-budget .glow{background:radial-gradient(closest-side,rgba(93,91,208,.24),transparent)}
.pf-fs .fcard.t-share .glow{background:radial-gradient(closest-side,rgba(120,110,255,.40),transparent)}
.pf-fs .fgrid.row2{margin-top:20px}
.pf-fs .compwrap{position:relative;z-index:2;flex:1;display:flex;align-items:center;justify-content:center;margin-top:26px}
.pf-fs .compcard{position:relative;width:100%;max-width:296px;background:#fff;border-radius:24px;padding:20px;box-shadow:0 30px 60px rgba(40,36,90,.18),0 4px 12px rgba(40,36,90,.06);font-family:"Nunito",sans-serif}
.pf-fs .compcard.float{animation:bob 7s ease-in-out infinite}
.pf-fs .compcard.float.s1{animation-delay:-1.4s;animation-duration:7.8s}
.pf-fs .compcard.float.s2{animation-delay:-2.8s;animation-duration:8.4s}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.pf-fs .cc-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.pf-fs .cc-tag{font-weight:900;font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--indigo)}
.pf-fs .cc-dur{font-weight:800;font-size:11px;color:var(--indigo-ink);background:var(--indigo-soft);padding:4px 10px;border-radius:99px}
.pf-fs .cc-title{font-family:"Archivo",sans-serif;font-weight:900;font-size:22px;letter-spacing:-.02em;color:#0A0A0F}
.pf-fs .cc-sub{font-weight:700;font-size:12.5px;color:rgba(0,0,0,.42);margin-top:4px}
.pf-fs .cc-go{margin-top:16px;width:100%;background:linear-gradient(150deg,#6260E0,#4D4BC0);color:#fff;border:none;border-radius:14px;padding:14px;font-family:"Nunito";font-weight:900;font-size:14.5px;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 10px 22px rgba(77,75,192,.32);cursor:pointer}
.pf-fs .cc-list{list-style:none;margin-top:16px;display:flex;flex-direction:column;gap:11px}
.pf-fs .cc-list li{display:flex;align-items:center;gap:11px;font-weight:800;font-size:13.5px;color:#0A0A0F}
.pf-fs .cc-list li.pending{color:rgba(0,0,0,.34)}
.pf-fs .cc-chk{width:22px;height:22px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center}
.pf-fs .cc-list li.done .cc-chk{background:var(--indigo);color:#fff}
.pf-fs .cc-list li.pending .cc-chk{border:2px solid rgba(0,0,0,.16)}
.pf-fs .view{display:none}
.pf-fs .view.on{display:block;animation:vin .34s cubic-bezier(.19,1,.22,1)}
@keyframes vin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.pf-fs .ex-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px}
.pf-fs .ex-step{font-weight:900;font-size:10.5px;letter-spacing:.07em;text-transform:uppercase;color:var(--indigo)}
.pf-fs .ex-rest{font-weight:800;font-size:10.5px;color:var(--indigo-ink);background:var(--indigo-soft);padding:3px 9px;border-radius:99px}
.pf-fs .ex-name{font-family:"Archivo",sans-serif;font-weight:900;font-size:20px;letter-spacing:-.02em;color:#0A0A0F;line-height:1}
.pf-fs .prog-wrap{margin:14px 0 4px}
.pf-fs .prog-lab{display:flex;justify-content:space-between;font-weight:800;font-size:11px;color:rgba(0,0,0,.44);margin-bottom:6px}
.pf-fs .prog-bar{height:7px;border-radius:99px;background:rgba(0,0,0,.08);overflow:hidden}
.pf-fs .prog-bar i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#6260E0,#4D4BC0);transition:width .4s cubic-bezier(.19,1,.22,1)}
.pf-fs .setlist{list-style:none;display:flex;flex-direction:column;gap:10px;margin-top:16px}
.pf-fs .exrow{position:relative;overflow:hidden;border-radius:16px;background:#F7F7FB;cursor:pointer;transition:.2s;-webkit-tap-highlight-color:transparent;box-shadow:0 1px 2px rgba(0,0,0,.03)}
.pf-fs .exrow:hover{background:#F2F2F8}
.pf-fs .exrow .fill{position:absolute;inset:0;width:0;background:var(--indigo-soft);transition:width .5s cubic-bezier(.22,.61,.36,1)}
.pf-fs .exrow.done .fill{background:rgba(45,178,120,.18)}
.pf-fs .exrow .body{position:relative;display:flex;align-items:center;gap:12px;padding:12px 13px}
.pf-fs .exrow .nm{font-weight:800;font-size:14.5px;color:#0A0A0F;line-height:1.15}
.pf-fs .exrow .mt{font-weight:800;font-size:11.5px;color:rgba(0,0,0,.45);margin-top:2px}
.pf-fs .exrow.done .mt{color:#1F8A5B}
.pf-fs .exrow .sbox{margin-left:auto;width:26px;height:26px;border-radius:9px;border:2px solid rgba(0,0,0,.15);flex:0 0 auto;display:flex;align-items:center;justify-content:center;color:#fff;transition:.2s}
.pf-fs .exrow.done .sbox{background:#2DB278;border-color:#2DB278}
.pf-fs .cc-next{margin-top:16px;width:100%;background:linear-gradient(150deg,#6260E0,#4D4BC0);color:#fff;border:none;border-radius:14px;padding:14px;font-family:"Nunito";font-weight:900;font-size:14.5px;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 10px 22px rgba(77,75,192,.32);cursor:pointer;opacity:.4;pointer-events:none;transition:.25s}
.pf-fs .cc-next.ready{opacity:1;pointer-events:auto;background:linear-gradient(150deg,#2DB278,#1F8A5B);box-shadow:0 10px 22px rgba(31,138,91,.3)}
.pf-fs .v-done{text-align:center;padding:8px 0 4px}
.pf-fs .done-badge{width:76px;height:76px;border-radius:50%;margin:6px auto 16px;background:linear-gradient(150deg,#6260E0,#4D4BC0);display:flex;align-items:center;justify-content:center;box-shadow:0 14px 30px rgba(77,75,192,.4);animation:pop .5s cubic-bezier(.2,1.4,.4,1)}
@keyframes pop{0%{transform:scale(0)}100%{transform:scale(1)}}
.pf-fs .done-t{font-family:"Archivo",sans-serif;font-weight:900;font-size:24px;letter-spacing:-.02em;color:#0A0A0F}
.pf-fs .done-s{font-weight:700;font-size:13px;color:rgba(0,0,0,.48);margin-top:6px}
.pf-fs .done-stats{display:flex;gap:10px;margin-top:18px}
.pf-fs .done-stats .m{flex:1;background:#F7F7FB;border-radius:14px;padding:11px 6px}
.pf-fs .done-stats .m .k{font-weight:800;font-size:10px;color:rgba(0,0,0,.42)}
.pf-fs .done-stats .m .v{font-family:"Archivo",sans-serif;font-weight:900;font-size:18px;color:#0A0A0F;margin-top:3px}
.pf-fs .cc-reset{margin-top:16px;background:none;border:none;font-family:"Nunito";font-weight:800;font-size:12.5px;color:var(--indigo);cursor:pointer}
.pf-fs .cc-head2{display:flex;align-items:center;justify-content:space-between;margin-bottom:2px}
.pf-fs .cc-h2t{font-weight:900;font-size:14px;color:#0A0A0F}
.pf-fs .cc-up{font-weight:900;font-size:12px;color:#2E9E8F;background:rgba(92,192,191,.18);padding:4px 9px;border-radius:99px;display:flex;align-items:center;gap:3px}
.pf-fs .cc-big{font-family:"Archivo",sans-serif;font-weight:900;font-size:30px;color:#0A0A0F;letter-spacing:-.03em;margin-top:6px}
.pf-fs .cc-big span{font-size:14px;color:rgba(0,0,0,.4)}
.pf-fs .cc-stats2{display:flex;gap:10px;margin-top:14px}
.pf-fs .cc-stats2 .m{flex:1;background:#F7F7FB;border-radius:14px;padding:11px 13px}
.pf-fs .cc-stats2 .m .k{font-weight:800;font-size:10.5px;color:rgba(0,0,0,.42)}
.pf-fs .cc-stats2 .m .v{font-family:"Archivo",sans-serif;font-weight:900;font-size:17px;color:#0A0A0F;margin-top:3px;letter-spacing:-.02em}
.pf-fs .compcard.dark{background:linear-gradient(165deg,#221C3E,#141024);padding:22px 20px 24px}
.pf-fs .cc-tlv{font-family:"Archivo",sans-serif;font-weight:900;font-size:11px;letter-spacing:.14em;color:#9b9cfd;text-align:center}
.pf-fs .cc-av{position:relative;display:flex;flex-direction:column;align-items:center;margin-top:6px}
.pf-fs .cc-av .avglow{position:absolute;width:190px;height:190px;border-radius:50%;background:radial-gradient(closest-side,rgba(120,110,255,.5),transparent);top:44%;transform:translateY(-50%)}
.pf-fs .cc-av img{height:196px;filter:drop-shadow(0 18px 30px rgba(0,0,0,.5));position:relative}
.pf-fs .cc-mth{font-family:"Archivo",sans-serif;font-weight:900;font-size:18px;color:#fff;margin-top:2px;position:relative;letter-spacing:-.01em}
.pf-fs .cc-bar{width:100%;height:8px;border-radius:99px;background:rgba(255,255,255,.14);margin-top:14px;overflow:hidden}
.pf-fs .cc-bar i{display:block;height:100%;width:62%;border-radius:99px;background:linear-gradient(90deg,#9b9cfd,#5CC0BF)}
.pf-fs .cc-note{font-weight:800;font-size:11px;color:rgba(255,255,255,.6);margin-top:10px;text-align:center}
.pf-fs .tf-chev{position:absolute;top:44%;transform:translateY(-50%);width:22px;height:22px;color:rgba(255,255,255,.4);z-index:2;pointer-events:none}
.pf-fs .tf-l{left:0}
.pf-fs .tf-r{right:0;animation:tfNudge 1.7s ease-in-out infinite}
@keyframes tfNudge{0%,100%{transform:translate(0,-50%)}50%{transform:translate(4px,-50%)}}
.pf-fs .pchart{position:relative;margin-top:8px}
.pf-fs .pguide{position:absolute;top:0;bottom:0;width:2px;background:rgba(92,192,191,.55);transform:translateX(-50%);pointer-events:none;opacity:0;transition:opacity .2s ease,left .25s cubic-bezier(.19,1,.22,1)}
.pf-fs .pdotel{position:absolute;width:13px;height:13px;border-radius:50%;background:#5CC0BF;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.22);transform:translate(-50%,-50%);pointer-events:none;transition:left .25s cubic-bezier(.19,1,.22,1),top .25s cubic-bezier(.19,1,.22,1)}
.pf-fs .ptip{position:absolute;transform:translate(-50%,calc(-100% - 15px));background:#15151c;color:#fff;border-radius:12px;padding:7px 13px;text-align:center;pointer-events:none;white-space:nowrap;box-shadow:0 10px 24px -6px rgba(0,0,0,.4);opacity:0;transition:opacity .2s ease,left .25s cubic-bezier(.19,1,.22,1),top .25s cubic-bezier(.19,1,.22,1)}
.pf-fs .ptip.show,.pf-fs .pguide.show{opacity:1}
.pf-fs .ptip b{display:block;font-family:"Archivo",sans-serif;font-weight:900;font-size:15px;line-height:1;letter-spacing:-.01em}
.pf-fs .ptip span{display:block;font-weight:800;font-size:10.5px;color:rgba(255,255,255,.6);margin-top:3px}
.pf-fs .wide{margin-top:20px;position:relative;border-radius:30px;overflow:hidden;min-height:520px;background:linear-gradient(120deg,#EFEDFC 0%,#E7E4FB 45%,#E9E0F4 100%);display:grid;grid-template-columns:1.02fr 1fr;align-items:center}
.pf-fs .wide .copy{padding:64px 20px 64px 60px;position:relative;z-index:3}
.pf-fs .wide h2{font-family:"Archivo",sans-serif;font-weight:900;letter-spacing:-.03em;line-height:.98;font-size:clamp(38px,4.4vw,58px);color:var(--ink)}
.pf-fs .wide p{font-size:18px;font-weight:600;color:var(--ink2);margin-top:20px;max-width:400px;line-height:1.45}
.pf-fs .wide .tag{display:inline-flex;align-items:center;gap:7px;font-weight:800;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--indigo-ink);background:rgba(255,255,255,.75);border:1px solid rgba(255,255,255,.9);padding:6px 13px;border-radius:99px;margin-bottom:22px}
.pf-fs .wide .dot{width:7px;height:7px;border-radius:50%;background:var(--amber);box-shadow:0 0 0 4px rgba(242,169,59,.22)}
.pf-fs .wide .stage{position:relative;height:100%;min-height:520px}
.pf-fs .wide .glow{position:absolute;right:6%;top:50%;width:520px;height:520px;transform:translateY(-50%);border-radius:50%;background:radial-gradient(closest-side,rgba(120,110,255,.28),transparent);z-index:0}
.pf-fs .panel{position:absolute;background:#fff;border-radius:22px;box-shadow:0 24px 60px rgba(40,36,90,.20),0 2px 6px rgba(40,36,90,.06);z-index:2}
.pf-fs .panel .ph{font-weight:900;font-size:14px;color:#0A0A0F;display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.pf-fs .panel .ph .g{font-weight:800;font-size:11px;color:rgba(0,0,0,.4)}
.pf-fs .ring{position:relative;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:conic-gradient(var(--rc,#5CC0BF) calc(var(--p,50)*1%),rgba(0,0,0,.08) 0)}
.pf-fs .ring::before{content:"";position:absolute;width:70%;height:70%;border-radius:50%;background:#fff}
.pf-fs .ring b{position:relative;font-weight:900;color:#0A0A0F}
@property --p{syntax:"<number>";inherits:true;initial-value:0}
.pf-fs .ring{transition:--p .85s cubic-bezier(.19,1,.22,1)}
.pf-fs .scanwrap{margin-top:16px;padding-top:15px;border-top:1px solid rgba(0,0,0,.06)}
.pf-fs .scanstate{display:none}
.pf-fs .scanstate.on{display:block;animation:vin .35s cubic-bezier(.19,1,.22,1)}
.pf-fs .scanbtn{width:100%;display:flex;align-items:center;justify-content:center;gap:9px;background:linear-gradient(150deg,#6260E0,#4D4BC0);color:#fff;border:none;border-radius:14px;padding:13px;font-family:"Nunito";font-weight:900;font-size:13.5px;cursor:pointer;box-shadow:0 10px 22px rgba(77,75,192,.3);transition:.2s;-webkit-tap-highlight-color:transparent}
.pf-fs .scanbtn:hover{transform:translateY(-1px)}
.pf-fs .scanview{position:relative;height:104px;border-radius:14px;overflow:hidden;background:#12121A;display:flex;align-items:center;justify-content:center}
.pf-fs .scanview .frame{width:66%;height:66px;border-radius:12px;position:relative}
.pf-fs .scanview .frame span{position:absolute;width:22px;height:22px;border:3px solid rgba(255,255,255,.85)}
.pf-fs .scanview .frame span:nth-child(1){top:0;left:0;border-right:0;border-bottom:0;border-top-left-radius:8px}
.pf-fs .scanview .frame span:nth-child(2){top:0;right:0;border-left:0;border-bottom:0;border-top-right-radius:8px}
.pf-fs .scanview .frame span:nth-child(3){bottom:0;left:0;border-right:0;border-top:0;border-bottom-left-radius:8px}
.pf-fs .scanview .frame span:nth-child(4){bottom:0;right:0;border-left:0;border-top:0;border-bottom-right-radius:8px}
.pf-fs .scanline{position:absolute;left:17%;right:17%;top:50%;height:2px;background:#5CC0BF;box-shadow:0 0 12px #5CC0BF;animation:scanmove 1.4s ease-in-out infinite}
@keyframes scanmove{0%,100%{transform:translateY(-26px)}50%{transform:translateY(26px)}}
.pf-fs .scanspin{position:absolute;display:flex;flex-direction:column;align-items:center;gap:9px}
.pf-fs .scanspin .sp{width:30px;height:30px;border-radius:50%;border:3px solid rgba(255,255,255,.25);border-top-color:#fff;animation:scanspin .8s linear infinite}
.pf-fs .scanspin b{font-family:"Nunito";font-weight:900;font-size:12px;color:#fff}
@keyframes scanspin{to{transform:rotate(360deg)}}
.pf-fs .est .en{font-family:"Archivo",sans-serif;font-weight:900;font-size:16px;color:#0A0A0F;letter-spacing:-.01em}
.pf-fs .est .ep{font-weight:700;font-size:11px;color:rgba(0,0,0,.5);margin-top:2px}
.pf-fs .est .tiles{display:flex;gap:6px;margin:11px 0}
.pf-fs .est .tiles .t{flex:1;text-align:center;background:#F7F7FB;border-radius:11px;padding:8px 2px}
.pf-fs .est .tiles .t b{display:block;font-family:"Archivo",sans-serif;font-weight:900;font-size:15px;line-height:1}
.pf-fs .est .tiles .t span{font-weight:800;font-size:8.5px;color:rgba(0,0,0,.42);letter-spacing:.03em}
.pf-fs .p-macros{width:330px;top:64px;left:2%;padding:20px 22px;animation:float1 7s ease-in-out infinite}
.pf-fs .macros{display:flex;justify-content:space-around;text-align:center}
.pf-fs .macros .mac b{display:block;font-weight:900;font-size:13px;color:#0A0A0F;margin-top:9px}
.pf-fs .macros .mac span{font-weight:800;font-size:10px;color:rgba(0,0,0,.42)}
.pf-fs .fuel-h{margin-bottom:16px}
.pf-fs .fuel-lab{font-weight:800;font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:rgba(0,0,0,.4)}
.pf-fs .fuel-num{display:flex;align-items:baseline;gap:6px;margin-top:3px}
.pf-fs .fuel-num b{font-family:"Archivo",sans-serif;font-weight:900;font-size:27px;color:#0A0A0F;line-height:1;transition:color .3s ease}
.pf-fs .fuel-num span{font-weight:800;font-size:12px;color:rgba(0,0,0,.42)}
.pf-fs .meal{display:flex;align-items:center;gap:12px;margin-top:18px;padding-top:16px;border-top:1px solid rgba(0,0,0,.06)}
.pf-fs .meal .th{width:44px;height:44px;border-radius:12px;flex:0 0 auto;background:linear-gradient(135deg,#F2A93B,#F0563A)}
.pf-fs .meal .mt{font-weight:900;font-size:14px;color:#0A0A0F}
.pf-fs .meal .ms{font-weight:700;font-size:11.5px;color:rgba(0,0,0,.5);margin-top:2px}
.pf-fs .meal .kc{margin-left:auto;font-weight:900;font-size:13px;color:#5D5BD0}
.pf-fs .p-budget{width:300px;bottom:56px;right:1%;padding:20px 22px;animation:float2 8s ease-in-out infinite}
.pf-fs .netrow{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:6px}
.pf-fs .netbig{font-weight:900;font-size:26px;color:#0A0A0F;letter-spacing:-.02em}
.pf-fs .netbig .u{font-size:13px;color:var(--turq)}
.pf-fs .netk{font-weight:800;font-size:11px;color:rgba(0,0,0,.42)}
.pf-fs .netflame{font-weight:900;font-size:12px;color:var(--amber);display:flex;align-items:center;gap:4px}
.pf-fs .scale{height:8px;border-radius:99px;margin:12px 0 6px;background:linear-gradient(90deg,#F0563A,#F2A93B 42%,#5CC0BF 62%,#5D5BD0);position:relative}
.pf-fs .scale{cursor:pointer;touch-action:none}
.pf-fs .scale i{position:absolute;top:50%;left:56%;width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #5CC0BF;transform:translate(-50%,-50%);box-shadow:0 2px 6px rgba(0,0,0,.2);transition:border-color .18s ease}
.pf-fs #budgetCard .netbig{transition:none}
.pf-fs .sh-title{font-family:"Archivo",sans-serif;font-weight:900;font-size:24px;letter-spacing:-.02em;color:#fff;text-align:center;margin-top:8px}
.pf-fs .sh-sub{font-weight:800;font-size:11.5px;color:rgba(255,255,255,.6);text-align:center;margin-top:4px}
.pf-fs .sh-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:16px 0 4px}
.pf-fs .sh-stats>div{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.09);border-radius:13px;padding:11px 6px;text-align:center}
.pf-fs .sh-stats b{display:block;font-family:"Archivo",sans-serif;font-weight:900;font-size:18px;color:#fff;letter-spacing:-.02em}
.pf-fs .sh-stats span{font-weight:800;font-size:8.5px;letter-spacing:.09em;color:rgba(255,255,255,.5)}
.pf-fs .sh-react{display:flex;gap:8px;margin-top:16px}
.pf-fs .sh-react button{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:13px;padding:9px 0;cursor:pointer;transition:transform .12s cubic-bezier(.19,1,.22,1),background .18s ease,border-color .18s ease}
.pf-fs .sh-react button .e{font-size:16px;line-height:1;transition:transform .18s cubic-bezier(.34,1.56,.64,1)}
.pf-fs .sh-react button b{font-weight:900;font-size:13px;color:rgba(255,255,255,.85)}
.pf-fs .sh-react button.on{background:rgba(124,111,255,.28);border-color:rgba(155,156,253,.6)}
.pf-fs .sh-react button.on .e{transform:scale(1.28)}
.pf-fs .sh-react button.on b{color:#fff}
.pf-fs .sh-react button:active{transform:scale(.94)}
.pf-fs .sh-btn{width:100%;margin-top:14px;border:0;border-radius:14px;padding:13px 0;font-family:"Nunito",sans-serif;font-weight:900;font-size:14.5px;color:#fff;cursor:pointer;background:linear-gradient(135deg,#7C6FFF,#5D5BD0);box-shadow:0 8px 22px rgba(93,91,208,.4);transition:transform .14s ease}
.pf-fs .sh-btn:active{transform:scale(.97)}
.pf-fs .sh-btn.done{background:linear-gradient(135deg,#5CC0BF,#2E9E8F);box-shadow:0 8px 22px rgba(46,158,143,.4)}
.pf-fs .bb-top{display:flex;align-items:center;gap:15px}
.pf-fs .bb-ring{flex:0 0 auto}
.pf-fs .bb-score{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;line-height:1}
.pf-fs .bb-score b{font-family:"Archivo",sans-serif;font-weight:900;font-size:24px;color:#0A0A0F}
.pf-fs .bb-score span{font-weight:800;font-size:8.5px;color:rgba(0,0,0,.4);letter-spacing:.04em;margin-top:2px}
.pf-fs .bb-copy{flex:1;min-width:0}
.pf-fs .bb-head{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.pf-fs .bb-t{font-weight:900;font-size:15px;color:#0A0A0F}
.pf-fs .bb-pill{padding:3px 9px;border-radius:999px;color:#fff;font-weight:800;font-size:10px;letter-spacing:.03em;transition:background .25s ease}
.pf-fs .bb-line{font-weight:700;font-size:12px;color:rgba(0,0,0,.55);line-height:1.4;margin-top:7px}
.pf-fs .bb-chips{display:flex;gap:7px;margin-top:16px}
.pf-fs .bb-chips button{flex:1;display:flex;flex-direction:column;align-items:center;gap:7px;padding:11px 4px;border-radius:13px;background:#fff;border:1px solid rgba(0,0,0,.08);cursor:pointer;transition:transform .12s ease,background .2s ease,border-color .2s ease}
.pf-fs .bb-chips .ic{width:26px;height:26px;border-radius:999px;display:flex;align-items:center;justify-content:center;border:1.5px solid rgba(0,0,0,.14);color:rgba(0,0,0,.28);transition:all .2s ease}
.pf-fs .bb-chips .lb{font-weight:800;font-size:10px;color:rgba(0,0,0,.5);text-align:center;line-height:1.1}
.pf-fs .bb-chips button.on{background:var(--soft,#EEEDFB);border-color:var(--rc,#5D5BD0)}
.pf-fs .bb-chips button.on .ic{background:var(--col,#5D5BD0);border-color:var(--col,#5D5BD0);color:#fff}
.pf-fs .bb-chips button.on .lb{color:rgba(0,0,0,.72)}
.pf-fs .bb-chips button:active{transform:scale(.94)}
.pf-fs .sg-h{font-weight:900;font-size:14px;text-align:center;margin-bottom:12px;background:linear-gradient(90deg,#7C6FFF,#5D5BD0);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.pf-fs .sg-seg{display:flex;background:#F0F0F5;border-radius:10px;padding:3px;margin:12px 0;gap:2px}
.pf-fs .sg-seg button{flex:1;border:0;background:none;border-radius:8px;padding:7px 0;font-family:"Nunito",sans-serif;font-weight:800;font-size:12px;color:rgba(0,0,0,.5);cursor:pointer;transition:all .18s ease}
.pf-fs .sg-seg button.on{background:#fff;color:#5D5BD0;box-shadow:0 1px 3px rgba(0,0,0,.12)}
.pf-fs .sg-tabs{display:flex;gap:6px;justify-content:center;margin-bottom:12px}
.pf-fs .sg-tabs button{border:1.5px solid transparent;background:none;border-radius:999px;padding:5px 10px;font-weight:800;font-size:10px;letter-spacing:.04em;color:rgba(0,0,0,.4);cursor:pointer;text-transform:uppercase;transition:all .18s ease}
.pf-fs .sg-tabs button.on{border-color:#5D5BD0;background:#EEEDFB;color:#5D5BD0}
.pf-fs .sg-card{border-radius:15px;padding:14px 14px;min-height:158px;display:flex;flex-direction:column;box-shadow:0 6px 18px rgba(0,0,0,.14);transition:background .3s ease}
.pf-fs .sg-card.light{background:#fff}
.pf-fs .sg-card.dark{background:#15151c}
.pf-fs .sg-body{flex:1}
.pf-fs .sg-lab{font-weight:700;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase}
.pf-fs .sg-name{font-family:"Archivo",sans-serif;font-weight:900;font-size:17px;line-height:1.1;margin-top:3px}
.pf-fs .sg-stat{margin-top:11px}
.pf-fs .sg-stat .v{font-family:"Archivo",sans-serif;font-weight:900;font-size:18px;margin-top:1px}
.pf-fs .sg-ex{font-weight:700;font-size:12.5px;margin-top:5px}
.pf-fs .sg-exrow{margin-top:9px}
.pf-fs .sg-pills{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
.pf-fs .sg-pill{padding:2px 7px;border-radius:999px;font-weight:700;font-size:9px}
.pf-fs .sg-foot{margin-top:auto;padding-top:12px;display:flex;flex-direction:column;gap:1px}
.pf-fs .sg-brand{font-weight:900;font-size:10px;letter-spacing:.08em}
.pf-fs .sg-date{font-weight:600;font-size:8.5px}
.pf-fs .sg-card.light .sg-lab, .pf-fs .sg-card.light .sg-date{color:rgba(0,0,0,.42)}
.pf-fs .sg-card.light .sg-name, .pf-fs .sg-card.light .sg-stat .v, .pf-fs .sg-card.light .sg-ex, .pf-fs .sg-card.light .sg-brand, .pf-fs .sg-card.light .sg-pill{color:#0A0A0F}
.pf-fs .sg-card.light .sg-pill{background:rgba(0,0,0,.06)}
.pf-fs .sg-card.dark .sg-lab, .pf-fs .sg-card.dark .sg-date{color:rgba(255,255,255,.55)}
.pf-fs .sg-card.dark .sg-name, .pf-fs .sg-card.dark .sg-stat .v, .pf-fs .sg-card.dark .sg-ex, .pf-fs .sg-card.dark .sg-brand, .pf-fs .sg-card.dark .sg-pill{color:#fff}
.pf-fs .sg-card.dark .sg-pill{background:rgba(255,255,255,.14)}
.pf-fs .sg-actions{display:flex;gap:7px;margin-top:12px}
.pf-fs .sg-actions button{flex:1;display:flex;flex-direction:row;align-items:center;justify-content:center;gap:5px;padding:8px 6px;border-radius:11px;border:1px solid rgba(0,0,0,.08);background:#fff;color:#0A0A0F;font-family:"Nunito",sans-serif;font-weight:800;font-size:11px;cursor:pointer;transition:transform .12s ease}
.pf-fs .sg-actions button.primary{flex:1.3;background:linear-gradient(135deg,#7C6FFF,#5D5BD0);border:0;color:#fff;box-shadow:0 6px 16px rgba(93,91,208,.35)}
.pf-fs .sg-actions button:active{transform:scale(.94)}
.pf-fs .sticks{display:flex;justify-content:space-between;font-weight:800;font-size:9.5px;color:rgba(0,0,0,.35)}
.pf-fs .nutri{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:16px}
.pf-fs .nutri .n{background:#F7F7FB;border-radius:12px;padding:10px 12px}
.pf-fs .nutri .nt{font-weight:900;font-size:12px;color:#0A0A0F;display:flex;align-items:center;justify-content:space-between}
.pf-fs .nutri .nv{font-weight:700;font-size:10.5px;color:rgba(0,0,0,.5);margin-top:5px}
.pf-fs .nutri .nbar{height:5px;border-radius:99px;background:rgba(0,0,0,.08);margin-top:7px;overflow:hidden}
.pf-fs .nutri .nbar i{display:block;height:100%;border-radius:99px}
@keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}
@media (prefers-reduced-motion: reduce){.pf-fs .p-macros, .pf-fs .p-budget, .pf-fs .compcard.float{animation:none}}
.pf-fs .rise{opacity:0;transform:translateY(38px);transition:opacity .9s cubic-bezier(.19,1,.22,1),transform .9s cubic-bezier(.19,1,.22,1)}
.pf-fs .rise.in{opacity:1;transform:none}
.pf-fs .rise.d1{transition-delay:.08s}
.pf-fs .rise.d2{transition-delay:.16s}
.pf-fs .rise.d3{transition-delay:.24s}
@media (max-width:960px){
.pf-fs .features{padding:64px 0 72px}
.pf-fs .fgrid{grid-template-columns:1fr;max-width:440px;margin:0 auto}
.pf-fs .fgrid.row2{margin-top:20px}
.pf-fs .fcard{min-height:auto;padding:34px 30px 36px}}
@media (max-width:520px){
.pf-fs .fcard{padding:30px 24px 32px}}`;

const MARKUP = String.raw`<section class="features">
  <div class="wrap">
    <div class="sec-head rise">
      <span class="eyebrow">One app, every part of the work</span>
      <h2>See the whole picture</h2>
      <p>Pocket Fit plans your training, tracks every lift, and turns real effort into a body you can watch change.</p>
    </div>

    <!-- ===== three feature cards ===== -->
    <div class="fgrid">

      <!-- TRAIN -->
      <article class="fcard t-train rise">
        <div class="cap">
          <h3>Train</h3>
          <p>Today's session is already built and scheduled — progressive overload handled for you.</p>
        </div>
        <div class="glow"></div>
        <div class="compwrap">
          <div class="compcard float" id="trainCard">
            <!-- READY -->
            <div class="view v-ready on">
              <div class="cc-head">
                <span class="cc-tag">Today · Push A</span>
                <span class="cc-dur">45 min</span>
              </div>
              <div class="cc-title">Push Day A</div>
              <div class="cc-sub">Ready when you are — just press go.</div>
              <button class="cc-go" id="startBtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M8 5.5v13l11-6.5z"></path></svg>Start workout</button>
              <ul class="cc-list">
                <li class="pending"><span class="cc-chk"></span>Bench press</li>
                <li class="pending"><span class="cc-chk"></span>Overhead press</li>
                <li class="pending"><span class="cc-chk"></span>Triceps rope</li>
              </ul>
            </div>
            <!-- ACTIVE -->
            <div class="view v-active">
              <div class="ex-top">
                <span class="ex-step">Track Progress</span>
                <span class="ex-rest" id="exTimer">00:00</span>
              </div>
              <div class="prog-wrap">
                <div class="prog-lab"><span id="progTxt">0 of 8 sets</span><span id="progPct">0%</span></div>
                <div class="prog-bar"><i id="progFill"></i></div>
              </div>
              <ul class="setlist" id="setList"></ul>
              <button class="cc-next" id="nextBtn">Complete session</button>
            </div>
            <!-- DONE -->
            <div class="view v-done">
              <div class="done-badge"><svg width="38" height="38" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-11" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
              <div class="done-t">Session done 💪</div>
              <div class="done-s">Nice work — recovery is where it sticks.</div>
              <div class="done-stats">
                <div class="m"><div class="k">EXERCISES</div><div class="v">3</div></div>
                <div class="m"><div class="k">SETS</div><div class="v">8</div></div>
                <div class="m"><div class="k">VOLUME</div><div class="v">3.9k</div></div>
              </div>
              <button class="cc-reset" id="resetBtn">↺ Run it again</button>
            </div>
          </div>
        </div>
      </article>

      <!-- PROGRESS -->
      <article class="fcard t-progress rise d1">
        <div class="cap">
          <h3>Progress</h3>
          <p>Watch every lift climb. See exactly what got stronger, week over week.</p>
        </div>
        <div class="glow"></div>
        <div class="compwrap">
          <div class="compcard float s1" id="progCard">
            <div class="cc-head2">
              <span class="cc-h2t">Bench press · top set</span>
              <span class="cc-up"><svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#2E9E8F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg><span id="progUp">+2.5 kg</span></span>
            </div>
            <div class="cc-big"><span id="progVal">82.5</span> <span>kg</span></div>
            <div class="pchart" id="progChart">
              <svg viewBox="0 0 260 130" style="width:100%;height:118px;display:block" preserveAspectRatio="none">
                <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5CC0BF" stop-opacity=".30"></stop><stop offset="1" stop-color="#5CC0BF" stop-opacity="0"></stop></linearGradient></defs>
                <path d="M6 104 L44 98 L82 84 L120 88 L158 62 L196 50 L240 24 L240 130 L6 130 Z" fill="url(#cg)"></path>
                <path d="M6 104 L44 98 L82 84 L120 88 L158 62 L196 50 L240 24" fill="none" stroke="#5CC0BF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <circle class="pt" data-w="70" data-wk="Week 1" data-d="" cx="6" cy="104" r="14" fill="transparent" style="cursor:pointer"></circle>
                <circle class="pt" data-w="72.5" data-wk="Week 2" data-d="2.5" cx="44" cy="98" r="14" fill="transparent" style="cursor:pointer"></circle>
                <circle class="pt" data-w="75" data-wk="Week 3" data-d="2.5" cx="82" cy="84" r="14" fill="transparent" style="cursor:pointer"></circle>
                <circle class="pt" data-w="74" data-wk="Week 4" data-d="-1" cx="120" cy="88" r="14" fill="transparent" style="cursor:pointer"></circle>
                <circle class="pt" data-w="78" data-wk="Week 5" data-d="4" cx="158" cy="62" r="14" fill="transparent" style="cursor:pointer"></circle>
                <circle class="pt" data-w="80" data-wk="Week 6" data-d="2" cx="196" cy="50" r="14" fill="transparent" style="cursor:pointer"></circle>
                <circle class="pt" data-w="82.5" data-wk="This week" data-d="2.5" cx="240" cy="24" r="14" fill="transparent" style="cursor:pointer"></circle>
              </svg>
              <div class="pguide"></div>
              <div class="pdotel"></div>
              <div class="ptip"><b id="ptipW">82.5 kg</b><span id="ptipK">This week</span></div>
            </div>
            <div class="cc-stats2">
              <div class="m"><div class="k">Weekly volume</div><div class="v">6.4k ↑</div></div>
              <div class="m"><div class="k">Week streak</div><div class="v">18 🔥</div></div>
            </div>
          </div>
        </div>
      </article>

      <!-- TRANSFORM -->
      <article class="fcard t-transform rise d2">
        <div class="cap">
          <h3>Transform</h3>
          <p>Your real training becomes a character that levels up as you do.</p>
        </div>
        <div class="glow"></div>
        <div class="compwrap">
          <div class="compcard dark float s2" id="transformCard">
            <div class="cc-tlv" id="tfLevel">LEVEL 6 UNLOCKED</div>
            <div class="cc-av">
              <div class="avglow"></div>
              <svg class="tf-chev tf-l" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"></path></svg>
              <img id="tfImg" src="/journey/kai6.png" alt="Character avatar">
              <svg class="tf-chev tf-r" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg>
            </div>
            <div class="cc-mth" id="tfMonths" style="text-align:center">6 months stronger</div>
            <div class="cc-bar"><i id="tfBar"></i></div>
            <div class="cc-note" id="tfNote">Tap to reach Level 7</div>
          </div>
        </div>
      </article>

    </div>

    <!-- ===== second row: Fuel · Balance · Share ===== -->
    <div class="fgrid row2">

      <!-- FUEL -->
      <article class="fcard t-food rise">
        <span class="soon">Coming soon</span>
        <div class="cap">
          <h3>Fuel</h3>
          <p>Scan your plate or a barcode, confirm the macros, done — no red numbers, no shame.</p>
        </div>
        <div class="glow"></div>
        <div class="compwrap">
          <div class="compcard float" id="foodCard">
            <div class="fuel-h">
              <div class="fuel-lab">Today's fuel</div>
              <div class="fuel-num"><b id="kcalLeft">1,960</b><span>kcal left</span></div>
            </div>
            <div class="macros">
              <div class="mac"><div class="ring" id="ringP" style="--p:51;--rc:#5D5BD0;width:62px;height:62px"><b style="font-size:13px">51%</b></div><b id="gP">90g</b><span>PROTEIN</span></div>
              <div class="mac"><div class="ring" id="ringC" style="--p:43;--rc:#5CC0BF;width:62px;height:62px"><b style="font-size:13px">43%</b></div><b id="gC">130g</b><span>CARBS</span></div>
              <div class="mac"><div class="ring" id="ringF" style="--p:28;--rc:#F2A93B;width:62px;height:62px"><b style="font-size:13px">28%</b></div><b id="gF">34g</b><span>FAT</span></div>
            </div>
            <div class="scanwrap">
              <!-- idle -->
              <div class="scanstate on" data-s="idle">
                <button class="scanbtn" id="scanBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="3" stroke="#fff" stroke-width="2"></rect><circle cx="12" cy="13" r="3.4" stroke="#fff" stroke-width="2"></circle><path d="M8 6l1.4-2h5.2L16 6" stroke="#fff" stroke-width="2" stroke-linejoin="round"></path></svg>Scan a meal</button>
              </div>
              <!-- scanning -->
              <div class="scanstate" data-s="scanning">
                <div class="scanview">
                  <div class="frame"><span></span><span></span><span></span><span></span></div>
                  <div class="scanline"></div>
                  <div class="scanspin"><div class="sp"></div><b>Reading your plate…</b></div>
                </div>
              </div>
              <!-- estimate -->
              <div class="scanstate est" data-s="estimate">
                <div class="en">Chicken Stir Fry</div>
                <div class="ep">medium plate · ~1.5 cups</div>
                <div class="tiles">
                  <div class="t"><b style="color:#0A0A0F">420</b><span>KCAL</span></div>
                  <div class="t"><b style="color:#5D5BD0">38g</b><span>PROT</span></div>
                  <div class="t"><b style="color:#5CC0BF">34g</b><span>CARB</span></div>
                  <div class="t"><b style="color:#F2A93B">14g</b><span>FAT</span></div>
                </div>
                <button class="scanbtn" id="confirmBtn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-11" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>Confirm &amp; log</button>
              </div>
              <!-- logged -->
              <div class="scanstate" data-s="logged">
                <div class="meal" style="margin-top:0;padding-top:0;border-top:0">
                  <div class="th"></div>
                  <div><div class="mt">Chicken Stir Fry</div><div class="ms">Logged · 38g protein</div></div>
                  <div class="kc">+420</div>
                </div>
                <button class="scanbtn" id="againBtn" style="margin-top:12px;background:#F7F7FB;color:#5D5BD0;box-shadow:none"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="3" stroke="#5D5BD0" stroke-width="2"></rect><circle cx="12" cy="13" r="3.4" stroke="#5D5BD0" stroke-width="2"></circle></svg>Scan another</button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- BALANCE / BODY BUDGET -->
      <article class="fcard t-budget rise d1">
        <div class="cap">
          <h3>Balance</h3>
          <p>Your body runs on an energy ledger. Tap the deposits you've made today and watch it top up.</p>
        </div>
        <div class="glow"></div>
        <div class="compwrap">
          <div class="compcard float s1" id="budgetCard">
            <div class="bb-top">
              <div class="ring bb-ring" id="bbRing" style="--p:40;--rc:#5D5BD0;width:82px;height:82px">
                <div class="bb-score"><b id="bbScore">40</b><span>/ 100</span></div>
              </div>
              <div class="bb-copy">
                <div class="bb-head"><span class="bb-t">Body budget</span><span class="bb-pill" id="bbPill">Balanced</span></div>
                <div class="bb-line" id="bbLine">Solid balance today. A workout is the biggest deposit still open.</div>
              </div>
            </div>
            <div class="bb-chips" id="bbChips">
              <button data-k="workout" data-w="40"><span class="ic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6.5 6.5v11M17.5 6.5v11M4 9v6M20 9v6M6.5 12h11"></path></svg></span><span class="lb">Workout</span></button>
              <button data-k="streak" data-w="25"><span class="ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3c0 4-5 5-5 10a5 5 0 0010 0c0-2-1-3-2-4 1 4-3 4-3 1 0-3 3-3 0-7z"></path></svg></span><span class="lb">Streak</span></button>
              <button data-k="sleep" data-w="20"><span class="ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20 14a8 8 0 11-9.9-9.9A7 7 0 0020 14z"></path></svg></span><span class="lb">Sleep</span></button>
              <button data-k="food" data-w="15"><span class="ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8c-1.5-3-6-3-6 1s4 8 6 9c2-1 6-5 6-9s-4.5-4-6-1z"></path><path d="M12 8V4M12 4c0-1 1-1.5 2-1.5"></path></svg></span><span class="lb">Nutrition</span></button>
            </div>
          </div>
        </div>
      </article>

      <!-- SHARE -->
      <article class="fcard t-share rise d2">
        <div class="cap">
          <h3>Share</h3>
          <p>Turn a finished session into a branded card. Pick a layout and post it.</p>
        </div>
        <div class="glow"></div>
        <div class="compwrap">
          <div class="compcard float s2" id="shareCard">
            <div class="sg-h">You crushed it! 🎉</div>
            <div class="sg-tabs" id="sgTabs">
              <button data-t="summary" class="on">Summary</button>
              <button data-t="exercises">Exercises</button>
              <button data-t="sets">Sets</button>
            </div>
            <div class="sg-card light" id="sgCard">
              <div class="sg-body" id="sgBody"></div>
              <div class="sg-foot">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" style="color:inherit" class="sg-brand"><path d="M6.5 6.5v11M17.5 6.5v11M4 9v6M20 9v6M6.5 12h11"></path></svg>
                <span class="sg-brand">POCKET FIT</span>
                <span class="sg-date">03.06.2026</span>
              </div>
            </div>
            <div class="sg-actions" id="sgActions">
              <button class="primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor"></circle></svg>Share</button>
              <button><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M8 11l4 4 4-4M4 21h16"></path></svg>Save</button>
              <button><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2.5"></rect><path d="M6 15H5a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v1"></path></svg>Copy</button>
            </div>
          </div>
        </div>
      </article>

    </div>

  </div>
</section>`;

export function FeatureShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = (s: string): any => root.querySelector(s);
    const cleanups: Array<() => void> = [];

    // reveal on scroll
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.18 },
    );
    root.querySelectorAll(".rise").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // interactive Push Day A session
    (function () {
      const EX = [
        { name: "Bench press", reps: "8–10", w: 60, sets: 3 },
        { name: "Overhead press", reps: "8–10", w: 35, sets: 3 },
        { name: "Triceps rope", reps: "12", w: 25, sets: 2 },
      ];
      const TOTAL = EX.reduce((n, e) => n + e.sets, 0);
      const card = q("#trainCard");
      if (!card) return;
      const views: Record<string, any> = { ready: card.querySelector(".v-ready"), active: card.querySelector(".v-active"), done: card.querySelector(".v-done") };
      const startBtn = q("#startBtn"), nextBtn = q("#nextBtn"), resetBtn = q("#resetBtn");
      const setList = q("#setList");
      const progTxt = q("#progTxt"), progPct = q("#progPct"), progFill = q("#progFill");
      const exTimer = q("#exTimer");
      let logged: number[] = [], doneTotal = 0, t0 = 0, timer: ReturnType<typeof setInterval>;
      const show = (v: any) => { Object.values(views).forEach((x) => x.classList.remove("on")); views[v].classList.add("on"); };
      const updateProgress = () => {
        const pct = Math.round((doneTotal / TOTAL) * 100);
        progTxt.textContent = doneTotal + " of " + TOTAL + " sets";
        progPct.textContent = pct + "%";
        progFill.style.width = pct + "%";
        nextBtn.classList.toggle("ready", doneTotal >= TOTAL);
      };
      const tick = () => {
        const s = Math.floor((Date.now() - t0) / 1000);
        exTimer.textContent = String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
      };
      const render = () => {
        setList.innerHTML = "";
        EX.forEach((e, i) => {
          const done = logged[i], complete = done >= e.sets;
          const li = document.createElement("li");
          li.className = "exrow" + (complete ? " done" : "");
          const chk = complete ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-11" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : "";
          li.innerHTML = '<div class="fill" style="width:' + (done / e.sets) * 100 + '%"></div>' +
            '<div class="body"><div><div class="nm">' + e.name + "</div>" +
            '<div class="mt">' + (complete ? "All " + e.sets + " sets done" : done + " / " + e.sets + " sets · " + e.reps + " × " + e.w + " kg") + "</div></div>" +
            '<span class="sbox">' + chk + "</span></div>";
          li.addEventListener("click", () => {
            if (logged[i] >= e.sets) return;
            logged[i]++; doneTotal++; updateProgress(); render();
          });
          setList.appendChild(li);
        });
      };
      const start = () => {
        card.classList.remove("float");
        logged = EX.map(() => 0); doneTotal = 0;
        t0 = Date.now(); clearInterval(timer); timer = setInterval(tick, 1000); tick();
        updateProgress(); render(); show("active");
      };
      startBtn.addEventListener("click", start);
      nextBtn.addEventListener("click", () => { if (doneTotal >= TOTAL) { clearInterval(timer); show("done"); } });
      resetBtn.addEventListener("click", () => show("ready"));
      cleanups.push(() => clearInterval(timer));
    })();

    // interactive food scan
    (function () {
      const fc = q("#foodCard");
      if (!fc) return;
      const states: Record<string, any> = {};
      fc.querySelectorAll(".scanstate").forEach((el: any) => (states[el.dataset.s] = el));
      const show = (s: any) => { Object.values(states).forEach((e) => e.classList.remove("on")); states[s].classList.add("on"); };
      const ringP = fc.querySelector("#ringP"), ringC = fc.querySelector("#ringC"), ringF = fc.querySelector("#ringF");
      const setRing = (el: any, pct: any) => { el.style.setProperty("--p", pct); el.querySelector("b").textContent = Math.round(pct) + "%"; };
      const reset = () => {
        setRing(ringP, 51); setRing(ringC, 43); setRing(ringF, 28);
        fc.querySelector("#gP").textContent = "90g"; fc.querySelector("#gC").textContent = "130g"; fc.querySelector("#gF").textContent = "34g";
        fc.querySelector("#kcalLeft").textContent = "1,960";
        show("idle");
      };
      let scanT: ReturnType<typeof setTimeout>;
      fc.querySelector("#scanBtn").addEventListener("click", () => { show("scanning"); scanT = setTimeout(() => show("estimate"), 1600); });
      fc.querySelector("#confirmBtn").addEventListener("click", () => {
        show("logged");
        requestAnimationFrame(() => {
          setRing(ringP, 72); setRing(ringC, 54); setRing(ringF, 40);
          fc.querySelector("#gP").textContent = "128g"; fc.querySelector("#gC").textContent = "164g"; fc.querySelector("#gF").textContent = "48g";
          fc.querySelector("#kcalLeft").textContent = "1,540";
        });
      });
      fc.querySelector("#againBtn").addEventListener("click", reset);
      cleanups.push(() => clearTimeout(scanT));
    })();

    // interactive body budget
    (function () {
      const card = q("#budgetCard");
      if (!card) return;
      const ring = card.querySelector("#bbRing"), scoreEl = card.querySelector("#bbScore"),
        pill = card.querySelector("#bbPill"), line = card.querySelector("#bbLine"), chips = card.querySelector("#bbChips");
      const BAND: Record<string, any> = {
        depleted: { label: "Running low", col: "#E0903C", soft: "rgba(224,144,60,.14)", ring: "#E8A85A" },
        balanced: { label: "Balanced", col: "#5D5BD0", soft: "rgba(93,91,208,.12)", ring: "#5D5BD0" },
        charged: { label: "Charged", col: "#2E9E8F", soft: "rgba(46,158,143,.14)", ring: "#2E9E8F" },
      };
      const earned: Record<string, boolean> = { workout: false, streak: true, sleep: false, food: true };
      const render = () => {
        let score = 0;
        chips.querySelectorAll("button").forEach((b: any) => {
          const k = b.dataset.k, on = earned[k];
          b.classList.toggle("on", on);
          if (on) score += +b.dataset.w;
        });
        const band = score <= 33 ? "depleted" : score <= 66 ? "balanced" : "charged";
        const m = BAND[band];
        ring.style.setProperty("--p", score);
        ring.style.setProperty("--rc", m.ring);
        chips.style.setProperty("--col", m.col);
        chips.style.setProperty("--soft", m.soft);
        chips.style.setProperty("--rc", m.ring);
        scoreEl.textContent = score;
        pill.textContent = m.label; pill.style.background = m.col;
        let h;
        if (!earned.workout) h = band === "depleted"
          ? "Your body budget is running low. A workout is the biggest deposit you can make today."
          : "Solid balance today. A workout is the biggest deposit still open.";
        else if (!earned.sleep) h = "Nice deposit from that workout. A logged night of sleep will top it up further.";
        else if (!earned.food || !earned.streak) h = "You’re charged today. Keep topping up to bank even more.";
        else h = "Your body budget is full. Everything’s topped up — enjoy it.";
        line.textContent = h;
      };
      chips.querySelectorAll("button").forEach((b: any) => b.addEventListener("click", () => { earned[b.dataset.k] = !earned[b.dataset.k]; render(); }));
      render();
    })();

    // share-card generator
    (function () {
      const card = q("#shareCard");
      if (!card) return;
      const tabs = card.querySelector("#sgTabs"), sgCard = card.querySelector("#sgCard"), body = card.querySelector("#sgBody");
      let light = true, tab = "summary";
      const EX = [
        { name: "Bench press", rows: ["10×60", "8×62.5", "8×62.5"] },
        { name: "Overhead press", rows: ["10×35", "9×35", "8×37.5"] },
        { name: "Triceps rope", rows: ["12×25", "12×25"] },
      ];
      const render = () => {
        sgCard.classList.toggle("light", light);
        sgCard.classList.toggle("dark", !light);
        let html = "";
        if (tab === "summary") {
          html = '<div class="sg-lab">Workout</div><div class="sg-name">Push Day A</div>' +
            [["Duration", "45m"], ["Calories", "420 cal"], ["Total sets", "8"]].map(([l, v]) =>
              '<div class="sg-stat"><div class="sg-lab">' + l + '</div><div class="v">' + v + "</div></div>").join("");
        } else if (tab === "exercises") {
          html = '<div class="sg-lab">Push Day A</div><div class="sg-name" style="font-size:16px">Workout complete</div>' +
            '<div class="sg-lab" style="margin-top:4px;text-transform:none;letter-spacing:0">3 exercises · 8 sets · 45m</div>' +
            '<div style="margin-top:8px">' + EX.map((e) => '<div class="sg-ex">' + e.name + "</div>").join("") + "</div>";
        } else {
          html = '<div class="sg-name" style="font-size:15px">Sets &amp; reps</div>' +
            EX.map((e) => '<div class="sg-exrow"><div class="sg-ex" style="font-size:11.5px">' + e.name + "</div>" +
              '<div class="sg-pills">' + e.rows.map((r) => '<span class="sg-pill">' + r + "</span>").join("") + "</div></div>").join("");
        }
        body.innerHTML = html;
      };
      tabs.querySelectorAll("button").forEach((b: any) => b.addEventListener("click", () => {
        tabs.querySelectorAll("button").forEach((x: any) => x.classList.remove("on"));
        b.classList.add("on"); tab = b.dataset.t; render();
      }));
      render();
    })();

    // interactive progress chart — hover/tap a point for a tooltip of that week's top set
    (function () {
      const card = q("#progCard");
      if (!card) return;
      const chart = card.querySelector("#progChart");
      const val = card.querySelector("#progVal"), up = card.querySelector("#progUp");
      const guide = chart.querySelector(".pguide"), dot = chart.querySelector(".pdotel");
      const tip = chart.querySelector(".ptip"), tipW = chart.querySelector("#ptipW"), tipK = chart.querySelector("#ptipK");
      const pts = [...card.querySelectorAll(".pt")];
      const VBW = 260, VBH = 130;
      const select = (el: any) => {
        const cx = +el.getAttribute("cx"), cy = +el.getAttribute("cy");
        const xp = (cx / VBW) * 100, yp = (cy / VBH) * 100;
        guide.style.left = xp + "%";
        dot.style.left = xp + "%"; dot.style.top = yp + "%";
        tip.style.left = xp + "%"; tip.style.top = yp + "%";
        tipW.textContent = el.dataset.w + " kg"; tipK.textContent = el.dataset.wk;
        val.textContent = el.dataset.w;
        const d = el.dataset.d;
        if (up) up.textContent = d === "" ? "start" : (+d >= 0 ? "+" : "") + d + " kg";
        guide.classList.add("show"); tip.classList.add("show");
      };
      pts.forEach((p: any) => {
        p.addEventListener("mouseenter", () => select(p));
        p.addEventListener("click", () => select(p));
      });
      select(pts[pts.length - 1]); // default: this week
    })();

    // interactive transform — tap the card to level the character up
    (function () {
      const card = q("#transformCard");
      if (!card) return;
      const lv = card.querySelector("#tfLevel"), img = card.querySelector("#tfImg"),
        mth = card.querySelector("#tfMonths"), bar = card.querySelector("#tfBar"), note = card.querySelector("#tfNote");
      const N = 12;
      let i = 5;
      const draw = () => {
        const lvl = i + 1;
        lv.textContent = "LEVEL " + lvl + (lvl === N ? " — MAXED" : " UNLOCKED");
        img.src = "/journey/kai" + lvl + ".png";
        mth.textContent = lvl + " month" + (lvl > 1 ? "s" : "") + " stronger";
        bar.style.width = 8 + 92 * (i / (N - 1)) + "%";
        note.textContent = lvl < N ? "Tap to reach Level " + (lvl + 1) : "Maxed out — tap to restart";
      };
      card.style.cursor = "pointer";
      card.addEventListener("click", () => { i = (i + 1) % N; draw(); });
      draw();
    })();

    return () => cleanups.forEach((fn) => fn());
}, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Nunito:wght@500;600;700;800;900&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div ref={rootRef} className="pf-fs" dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </>
  );
}
