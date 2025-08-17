exports.id=479,exports.ids=[479],exports.modules={8377:(e,t,a)=>{let n={"542960be04681112d741a2a3f5e8fc0f53af5c16":()=>Promise.resolve().then(a.bind(a,4581)).then(e=>e.removePointAction),"6becc9296ec16a583b265ab89f2ebc3af8a23b05":()=>Promise.resolve().then(a.bind(a,4581)).then(e=>e.addPointAction),"912709f89d08a3096f530f5e3d245e6fe7302994":()=>Promise.resolve().then(a.bind(a,4581)).then(e=>e.evaluateYearAction),"99c2275e86d9edd182d20fd717ee39fb305cf39f":()=>Promise.resolve().then(a.bind(a,4581)).then(e=>e.evaluateMonthAction),"9d7f909a3caa3ade7084d546f26deb80f9cbbcd2":()=>Promise.resolve().then(a.bind(a,4581)).then(e=>e.checkPreviousMonthAction)};async function r(e,...t){return(await n[e]()).apply(null,t)}e.exports={"542960be04681112d741a2a3f5e8fc0f53af5c16":r.bind(null,"542960be04681112d741a2a3f5e8fc0f53af5c16"),"6becc9296ec16a583b265ab89f2ebc3af8a23b05":r.bind(null,"6becc9296ec16a583b265ab89f2ebc3af8a23b05"),"912709f89d08a3096f530f5e3d245e6fe7302994":r.bind(null,"912709f89d08a3096f530f5e3d245e6fe7302994"),"99c2275e86d9edd182d20fd717ee39fb305cf39f":r.bind(null,"99c2275e86d9edd182d20fd717ee39fb305cf39f"),"9d7f909a3caa3ade7084d546f26deb80f9cbbcd2":r.bind(null,"9d7f909a3caa3ade7084d546f26deb80f9cbbcd2")}},3444:(e,t,a)=>{Promise.resolve().then(a.bind(a,8183))},2671:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,2583,23)),Promise.resolve().then(a.t.bind(a,6840,23)),Promise.resolve().then(a.t.bind(a,8771,23)),Promise.resolve().then(a.t.bind(a,3225,23)),Promise.resolve().then(a.t.bind(a,9295,23)),Promise.resolve().then(a.t.bind(a,3982,23))},8151:(e,t,a)=>{"use strict";a.d(t,{$J:()=>s,CR:()=>o,VV:()=>i,_q:()=>r}),a(3664);var n=a(8371);(0,n.$)("9d7f909a3caa3ade7084d546f26deb80f9cbbcd2");var r=(0,n.$)("6becc9296ec16a583b265ab89f2ebc3af8a23b05"),o=(0,n.$)("542960be04681112d741a2a3f5e8fc0f53af5c16"),s=(0,n.$)("99c2275e86d9edd182d20fd717ee39fb305cf39f"),i=(0,n.$)("912709f89d08a3096f530f5e3d245e6fe7302994")},8652:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>l});var n=a(5344),r=a(3729),o=a(1223),s=a.n(o),i=a(7606);function l({isOpen:e,onClose:t,winners:a,month:o}){return((0,r.useEffect)(()=>{let a=e=>{"Escape"===e.key&&t()};return e&&(document.addEventListener("keydown",a),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",a),document.body.style.overflow="unset"}},[e,t]),e)?n.jsx("div",{className:"modal-overlay",children:(0,n.jsxs)("div",{className:"modal-content",children:[n.jsx("button",{onClick:t,className:"modal-close",children:"✕"}),(0,n.jsxs)("div",{className:"modal-header",children:[n.jsx(s(),{src:"/images/winner.png",alt:"V\xedtěz",width:80,height:80,className:"winner-icon"}),n.jsx("h2",{className:"modal-title",children:o.includes("(cel\xfd rok)")?1===a.length?"Celkov\xfd v\xedtěz roku:":"Celkov\xed v\xedtězov\xe9 roku:":1===a.length?"Tenhle měs\xedc chleb\xedčky připravuje:":"Tenhle měs\xedc chleb\xedčky připravuj\xed:"})]}),0===a.length?(0,n.jsxs)("div",{className:"no-winners",children:[n.jsx("p",{children:"Ž\xe1dn\xfd hr\xe1č nem\xe1 přesně 3 chleb\xedčky"}),n.jsx("p",{children:"Zkuste to př\xedšt\xed měs\xedc! \uD83E\uDD6A"})]}):n.jsx("div",{className:`winners-list ${a.length>2?"multiple-winners":""}`,children:a.map((e,t)=>(0,n.jsxs)("div",{className:"winner-item",style:{animationDelay:`${.2*t}s`},children:[n.jsx("div",{className:"winner-avatar",children:n.jsx(s(),{src:`/avatars/${e.avatar_file}`,alt:`Avatar ${e.name}`,width:80,height:80})}),n.jsx("h3",{className:"winner-name",children:e.name}),n.jsx("div",{className:"trophy",children:"\uD83C\uDFC6"})]},e.id))}),n.jsx("div",{className:"modal-footer",children:n.jsx("p",{className:"month-info",children:o.includes("(cel\xfd rok)")?o:`${(0,i.ZY)(o)} ${o.split("-")[0]}`})})]})}):null}},8183:(e,t,a)=>{"use strict";a.r(t),a.d(t,{AuthProvider:()=>i,useAuthContext:()=>l});var n=a(5344),r=a(3729);function o({isOpen:e,onClose:t,onSuccess:a}){let[o,s]=(0,r.useState)(""),[i,l]=(0,r.useState)(""),[c,d]=(0,r.useState)(!1);(0,r.useEffect)(()=>{e&&(s(""),l(""))},[e]);let h=async e=>{e.preventDefault(),d(!0),l(""),await new Promise(e=>setTimeout(e,300)),"chlebicky2025"===o?(a(),t()):(l("Nespr\xe1vn\xe9 heslo"),s("")),d(!1)};return e?n.jsx("div",{className:"modal-overlay password-modal-overlay",onClick:t,children:(0,n.jsxs)("div",{className:"modal-content password-modal-large",onClick:e=>e.stopPropagation(),children:[(0,n.jsxs)("div",{className:"modal-header",children:[n.jsx("h2",{children:"\uD83D\uDD10 Ověřen\xed př\xedstupu"}),n.jsx("button",{className:"modal-close",onClick:t,"aria-label":"Zavř\xedt",children:"\xd7"})]}),n.jsx("div",{className:"modal-body",children:(0,n.jsxs)("div",{className:"password-content",children:[n.jsx("div",{className:"password-icon",children:"\uD83D\uDD12"}),n.jsx("h3",{children:"Př\xedstup k \xfaprav\xe1m"}),n.jsx("p",{children:"Pro přid\xe1n\xed nebo odebr\xe1n\xed bodů zadej heslo:"}),(0,n.jsxs)("form",{onSubmit:h,children:[(0,n.jsxs)("div",{className:"password-input-group",children:[n.jsx("input",{type:"password",value:o,onChange:e=>s(e.target.value),onKeyDown:e=>{"Escape"===e.key&&t()},placeholder:"Zadej heslo...",className:"password-input-large",autoFocus:!0,disabled:c}),i&&n.jsx("div",{className:"error-message",children:i})]}),(0,n.jsxs)("div",{className:"password-actions",children:[n.jsx("button",{type:"button",onClick:t,className:"btn btn-secondary",disabled:c,children:"Zrušit"}),n.jsx("button",{type:"submit",className:"btn btn-primary",disabled:c||!o.trim(),children:c?"Ověřuji...":"Ověřit"})]})]})]})})]})}):null}let s=(0,r.createContext)(void 0);function i({children:e}){let[t,a]=(0,r.useState)(!1),{isAuthenticated:i,authenticate:l,isLoading:c,logout:d}=function(){let[e,t]=(0,r.useState)(!1),[a,n]=(0,r.useState)(!0);return(0,r.useEffect)(()=>{(()=>{try{let e=localStorage.getItem("sandwich-auth");if(e){let{timestamp:a}=JSON.parse(e);Date.now()-a<18e5?t(!0):(localStorage.removeItem("sandwich-auth"),t(!1))}else t(!1)}catch(e){console.error("Chyba při kontrole ověřen\xed:",e),t(!1)}finally{n(!1)}})()},[]),{isAuthenticated:e,isLoading:a,authenticate:()=>{try{let e={timestamp:Date.now()};localStorage.setItem("sandwich-auth",JSON.stringify(e)),t(!0)}catch(e){console.error("Chyba při ukl\xe1d\xe1n\xed ověřen\xed:",e)}},logout:()=>{try{localStorage.removeItem("sandwich-auth"),t(!1)}catch(e){console.error("Chyba při odhl\xe1šen\xed:",e)}}}}(),h=()=>{a(!1)};return(0,n.jsxs)(s.Provider,{value:{showPasswordModal:()=>{i||a(!0)},hidePasswordModal:h,isPasswordModalOpen:t,isAuthenticated:i,isLoading:c,logout:()=>{d()}},children:[e,t&&n.jsx(o,{isOpen:t,onClose:h,onSuccess:()=>{l(),h()}})]})}function l(){let e=(0,r.useContext)(s);if(void 0===e)throw Error("useAuthContext must be used within an AuthProvider");return e}},7606:(e,t,a)=>{"use strict";a.d(t,{ZY:()=>r});let n=["Leden","\xdanor","Březen","Duben","Květen","Červen","Červenec","Srpen","Z\xe1ř\xed","Ř\xedjen","Listopad","Prosinec"];function r(e){return n[parseInt(e.split("-")[1])-1]}},4581:(e,t,a)=>{"use strict";a.r(t),a.d(t,{addPointAction:()=>s,checkPreviousMonthAction:()=>d,evaluateMonthAction:()=>l,evaluateYearAction:()=>c,removePointAction:()=>i});var n=a(8601);a(5811);var r=a(3811),o=a(6612);async function s(e){try{return await (0,o.addPoint)(e),(0,r.revalidatePath)("/"),{success:!0}}catch(e){return console.error("Chyba při přid\xe1v\xe1n\xed bodu:",e),{success:!1,error:"Nepodařilo se přidat bod"}}}async function i(e){try{return await (0,o.removePoint)(e),(0,r.revalidatePath)("/"),{success:!0}}catch(e){return console.error("Chyba při odeb\xedr\xe1n\xed bodu:",e),{success:!1,error:"Nepodařilo se odebrat bod"}}}async function l(e){try{let t=await (0,o.evaluateMonth)(e);return{success:!0,winners:t}}catch(e){return console.error("Chyba při vyhodnocov\xe1n\xed měs\xedce:",e),{success:!1,error:"Nepodařilo se vyhodnotit měs\xedc"}}}async function c(e){try{let t=await (0,o.evaluateYear)(e);return{success:!0,winners:t}}catch(e){return console.error("Chyba při vyhodnocov\xe1n\xed roku:",e),{success:!1,error:"Nepodařilo se vyhodnotit rok"}}}async function d(){return{shouldShowModal:!1}}(0,a(6893).ensureServerEntryExports)([s,i,l,c,d]),(0,n.createActionProxy)("6becc9296ec16a583b265ab89f2ebc3af8a23b05",s),(0,n.createActionProxy)("542960be04681112d741a2a3f5e8fc0f53af5c16",i),(0,n.createActionProxy)("99c2275e86d9edd182d20fd717ee39fb305cf39f",l),(0,n.createActionProxy)("912709f89d08a3096f530f5e3d245e6fe7302994",c),(0,n.createActionProxy)("9d7f909a3caa3ade7084d546f26deb80f9cbbcd2",d)},4250:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>d,metadata:()=>c});var n=a(5036);a(7272);var r=a(6843);let o=(0,r.createProxy)(String.raw`/Users/veva/Desktop/NewGitRepository/SandwichMaker/app/contexts/AuthContext.tsx`),{__esModule:s,$$typeof:i}=o;o.default;let l=(0,r.createProxy)(String.raw`/Users/veva/Desktop/NewGitRepository/SandwichMaker/app/contexts/AuthContext.tsx#AuthProvider`);(0,r.createProxy)(String.raw`/Users/veva/Desktop/NewGitRepository/SandwichMaker/app/contexts/AuthContext.tsx#useAuthContext`);let c={title:"SandwichMaker - Kdo chyst\xe1 chleb\xedčky?",description:"Aplikace pro sledov\xe1n\xed, kdo tento měs\xedc chyst\xe1 chleb\xedčky"};function d({children:e}){return n.jsx("html",{lang:"cs",children:n.jsx("body",{className:"antialiased",children:n.jsx(l,{children:e})})})}},9264:(e,t,a)=>{"use strict";a.d(t,{ZY:()=>r});let n=["Leden","\xdanor","Březen","Duben","Květen","Červen","Červenec","Srpen","Z\xe1ř\xed","Ř\xedjen","Listopad","Prosinec"];function r(e){return n[parseInt(e.split("-")[1])-1]}},6612:(e,t,a)=>{"use strict";a.d(t,{addPoint:()=>l,evaluateMonth:()=>d,evaluateYear:()=>h,getCurrentMonth:()=>s,removePoint:()=>c});var n=a(5652),r=a(2143),o=a(8594);function s(){let e=(0,n.utcToZonedTime)(new Date,"Europe/Prague");return(0,n.format)(e,"yyyy-MM")}let i="1"===process.env.VERCEL;async function l(e){return i?r.addPoint(e):o.addPoint(e)}async function c(e){return i?r.removePoint(e):o.removePoint(e)}async function d(e){return i?r.evaluateMonth(e):o.evaluateMonth(e)}async function h(e){return i?r.evaluateYear(e):o.evaluateYear(e)}},2790:(e,t,a)=>{"use strict";a.d(t,{Cl:()=>T,Yi:()=>S,Q:()=>b,pv:()=>w});var n=a(6702),r=a(8727),o=a(2409);let s=process.env.NEXT_PUBLIC_SUPABASE_URL,i=process.env.SUPABASE_SERVICE_ROLE_KEY,l=s&&i?(0,o.eI)(s,i):null;async function c(e){if(!l)throw Error("Supabase not configured");let{data:t,error:a}=await l.from("players").select(`
      id,
      name,
      avatar_file,
      monthly_scores(points)
    `).eq("monthly_scores.month",e);if(a)throw a;return t.map(e=>({id:e.id,name:e.name,avatar_file:e.avatar_file,points:e.monthly_scores?.[0]?.points||0}))}async function d(e){if(!l)throw Error("Supabase not configured");let t=[];for(let a=1;a<=12;a++){let n=`${e}-${a.toString().padStart(2,"0")}`,{data:r}=await l.from("players").select("id, name, avatar_file").eq("monthly_scores.month",n).eq("monthly_scores.points",3);t.push({month:n,winners:r||[]})}return t}async function h(e){if(!l)throw Error("Supabase not configured");let{data:t,error:a}=await l.from("players").select("id, name, avatar_file").order("name");if(a)throw a;let{data:n,error:r}=await l.from("monthly_scores").select("month, player_id, points").like("month",`${e}-%`).order("month");if(r)throw r;let o=[];for(let a=1;a<=12;a++){let r=`${e}-${a.toString().padStart(2,"0")}`,s=n?.filter(e=>e.month===r)||[],i=t?.map(e=>{let t=s.find(t=>t.player_id===e.id);return{...e,points:t?t.points:0}})||[];o.push({month:r,players:i})}return o}var m=a(661),u=a.n(m),p=a(8290);let E=null;async function f(){if(!E&&(E=await (0,p.bA)({filename:"./sandwichmaker.db",driver:u().Database}),await E.exec(`
      CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        avatar_file TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS monthly_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player_id TEXT NOT NULL,
        month TEXT NOT NULL,
        points INTEGER NOT NULL DEFAULT 0,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(player_id, month),
        FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS monthly_meta (
        month TEXT PRIMARY KEY,
        winner_shown_at DATETIME
      );

      CREATE INDEX IF NOT EXISTS idx_monthly_scores_month ON monthly_scores(month);
      CREATE INDEX IF NOT EXISTS idx_monthly_scores_player_month ON monthly_scores(player_id, month);
      CREATE INDEX IF NOT EXISTS idx_monthly_scores_points ON monthly_scores(points);
    `),0===(await E.all("SELECT COUNT(*) as count FROM players"))[0].count)){let e=T();await E.exec(`
        INSERT INTO players (id, name, avatar_file) VALUES
        ('1', 'Petr', 'BigC.png'),
        ('2', 'Marcus', 'Marcus.png'),
        ('3', 'Vratis', 'Vratis.png'),
        ('4', 'Verča', 'Verča.png')
      `),await E.exec(`
        INSERT INTO monthly_scores (player_id, month, points) VALUES
        ('1', '${e}', 3),
        ('2', '${e}', 0),
        ('3', '${e}', 2),
        ('4', '${e}', 1)
      `)}return E}async function y(e){let t=await f();return await t.all(`
    SELECT p.id, p.name, p.avatar_file, COALESCE(ms.points, 0) as points
    FROM players p
    LEFT JOIN monthly_scores ms ON p.id = ms.player_id AND ms.month = ?
    ORDER BY p.name
  `,[e])}async function v(e){let t=await f(),a=await t.all(`
    SELECT ms.month, p.id, p.name, p.avatar_file
    FROM monthly_scores ms
    JOIN players p ON ms.player_id = p.id
    WHERE ms.month LIKE ? AND ms.points = 3
    ORDER BY ms.month
  `,[`${e}-%`]),n={};for(let e of a)n[e.month]||(n[e.month]=[]),n[e.month].push({id:e.id,name:e.name,avatar_file:e.avatar_file});let r=[];for(let t=1;t<=12;t++){let a=`${e}-${t.toString().padStart(2,"0")}`;r.push({month:a,winners:n[a]||[]})}return r}async function N(e){let t=await f(),a=await t.all(`
    SELECT ms.month, p.id, p.name, p.avatar_file, COALESCE(ms.points, 0) as points
    FROM players p
    CROSS JOIN (
      SELECT '${e}-01' as month UNION SELECT '${e}-02' UNION SELECT '${e}-03' UNION SELECT '${e}-04'
      UNION SELECT '${e}-05' UNION SELECT '${e}-06' UNION SELECT '${e}-07' UNION SELECT '${e}-08'
      UNION SELECT '${e}-09' UNION SELECT '${e}-10' UNION SELECT '${e}-11' UNION SELECT '${e}-12'
    ) months
    LEFT JOIN monthly_scores ms ON p.id = ms.player_id AND ms.month = months.month
    ORDER BY months.month, p.name
  `),n={};for(let e of a)n[e.month]||(n[e.month]=[]),n[e.month].push({id:e.id,name:e.name,avatar_file:e.avatar_file,points:e.points});let r=[];for(let t=1;t<=12;t++){let a=`${e}-${t.toString().padStart(2,"0")}`;r.push({month:a,players:n[a]||[]})}return r}function T(){let e=(0,n.Z)(new Date,"Europe/Prague");return(0,r.Z)(e,"yyyy-MM")}let _="1"===process.env.VERCEL;async function S(e){return _?c(e):y(e)}async function w(e){return _?d(e):v(e)}async function b(e){return _?h(e):N(e)}},8594:(e,t,a)=>{"use strict";a.d(t,{addPoint:()=>c,evaluateMonth:()=>m,evaluateYear:()=>p,removePoint:()=>d});var n=a(661),r=a.n(n),o=a(396),s=a(6612);let i=null;async function l(){if(!i&&(i=await (0,o.open)({filename:"./sandwichmaker.db",driver:r().Database}),await i.exec(`
      CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        avatar_file TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS monthly_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player_id TEXT NOT NULL,
        month TEXT NOT NULL,
        points INTEGER NOT NULL DEFAULT 0,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(player_id, month),
        FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS monthly_meta (
        month TEXT PRIMARY KEY,
        winner_shown_at DATETIME
      );

      CREATE INDEX IF NOT EXISTS idx_monthly_scores_month ON monthly_scores(month);
      CREATE INDEX IF NOT EXISTS idx_monthly_scores_player_month ON monthly_scores(player_id, month);
      CREATE INDEX IF NOT EXISTS idx_monthly_scores_points ON monthly_scores(points);
    `),0===(await i.all("SELECT COUNT(*) as count FROM players"))[0].count)){let e=(0,s.getCurrentMonth)();await i.exec(`
        INSERT INTO players (id, name, avatar_file) VALUES
        ('1', 'Petr', 'BigC.png'),
        ('2', 'Marcus', 'Marcus.png'),
        ('3', 'Vratis', 'Vratis.png'),
        ('4', 'Verča', 'Verča.png')
      `),await i.exec(`
        INSERT INTO monthly_scores (player_id, month, points) VALUES
        ('1', '${e}', 3),
        ('2', '${e}', 0),
        ('3', '${e}', 2),
        ('4', '${e}', 1)
      `)}return i}async function c(e){let t=await l(),a=(0,s.getCurrentMonth)();await t.run(`
    INSERT INTO monthly_scores (player_id, month, points) 
    VALUES (?, ?, 1) 
    ON CONFLICT(player_id, month) 
    DO UPDATE SET points = MIN(3, points + 1), updated_at = CURRENT_TIMESTAMP
  `,[e,a])}async function d(e){let t=await l(),a=(0,s.getCurrentMonth)();await t.run(`
    INSERT INTO monthly_scores (player_id, month, points) 
    VALUES (?, ?, 0) 
    ON CONFLICT(player_id, month) 
    DO UPDATE SET points = MAX(0, points - 1), updated_at = CURRENT_TIMESTAMP
  `,[e,a])}async function h(e){let t=await l();return await t.all(`
    SELECT p.id, p.name, p.avatar_file, COALESCE(ms.points, 0) as points
    FROM players p
    LEFT JOIN monthly_scores ms ON p.id = ms.player_id AND ms.month = ?
    ORDER BY p.name
  `,[e])}async function m(e){let t=await l(),a=await t.all(`
    SELECT p.id, p.name, p.avatar_file
    FROM players p
    JOIN monthly_scores ms ON p.id = ms.player_id
    WHERE ms.month = ? AND ms.points = 3
  `,[e]);return await t.run(`
    INSERT OR REPLACE INTO monthly_meta (month, winner_shown_at) 
    VALUES (?, CURRENT_TIMESTAMP)
  `,[e]),a}async function u(e){let t=await l(),a=await t.all(`
    SELECT ms.month, p.id, p.name, p.avatar_file
    FROM monthly_scores ms
    JOIN players p ON ms.player_id = p.id
    WHERE ms.month LIKE ? AND ms.points = 3
    ORDER BY ms.month
  `,[`${e}-%`]),n={};for(let e of a)n[e.month]||(n[e.month]=[]),n[e.month].push({id:e.id,name:e.name,avatar_file:e.avatar_file});let r=[];for(let t=1;t<=12;t++){let a=`${e}-${t.toString().padStart(2,"0")}`;r.push({month:a,winners:n[a]||[]})}return r}async function p(e){let t=await u(e),a=new Map;t.forEach(e=>{e.winners.forEach(e=>{a.set(e.id,(a.get(e.id)||0)+1)})});let n=Math.max(...Array.from(a.values()),0);return(await h((0,s.getCurrentMonth)())).filter(e=>a.get(e.id)===n)}},2143:(e,t,a)=>{"use strict";a.d(t,{addPoint:()=>l,evaluateMonth:()=>d,evaluateYear:()=>m,removePoint:()=>c});var n=a(3094),r=a(6612);let o=process.env.NEXT_PUBLIC_SUPABASE_URL,s=process.env.SUPABASE_SERVICE_ROLE_KEY,i=o&&s?(0,n.createClient)(o,s):null;async function l(e){if(!i)throw Error("Supabase not configured");let t=(0,r.getCurrentMonth)(),{data:a}=await i.from("monthly_scores").select("points").eq("player_id",e).eq("month",t).single(),n=a?.points||0,{error:o}=await i.from("monthly_scores").upsert({player_id:e,month:t,points:Math.min(3,n+1),updated_at:new Date().toISOString()},{onConflict:"player_id,month"});if(o)throw o}async function c(e){if(!i)throw Error("Supabase not configured");let t=(0,r.getCurrentMonth)(),{data:a}=await i.from("monthly_scores").select("points").eq("player_id",e).eq("month",t).single(),n=a?.points||0,{error:o}=await i.from("monthly_scores").upsert({player_id:e,month:t,points:Math.max(0,n-1),updated_at:new Date().toISOString()},{onConflict:"player_id,month"});if(o)throw o}async function d(e){if(!i)throw Error("Supabase not configured");console.log("Vyhodnocuji měs\xedc:",e);let{data:t,error:a}=await i.from("monthly_scores").select("player_id").eq("month",e).eq("points",3);if(console.log("V\xfdsledek dotazu:",{scores:t,error:a}),a)throw a;if(!t||0===t.length)return console.log("Ž\xe1dn\xed v\xedtězov\xe9"),[];let n=t.map(e=>e.player_id),{data:r,error:o}=await i.from("players").select("id, name, avatar_file").in("id",n);if(console.log("Hr\xe1či:",{players:r,playersError:o}),o)throw o;await i.from("monthly_meta").upsert({month:e,winner_shown_at:new Date().toISOString()});let s=r||[];return console.log("Vr\xe1cen\xe9 v\xedtěze:",s),s}async function h(e){if(!i)throw Error("Supabase not configured");let t=[];for(let a=1;a<=12;a++){let n=`${e}-${a.toString().padStart(2,"0")}`,{data:r}=await i.from("players").select("id, name, avatar_file").eq("monthly_scores.month",n).eq("monthly_scores.points",3);t.push({month:n,winners:r||[]})}return t}async function m(e){if(!i)throw Error("Supabase not configured");let t=await h(e),a=new Map;t.forEach(e=>{e.winners.forEach(e=>{a.set(e.id,(a.get(e.id)||0)+1)})});let n=Math.max(...Array.from(a.values()),0),{data:r,error:o}=await i.from("players").select("id, name, avatar_file").order("name");if(o)throw o;return r?.filter(e=>a.get(e.id)===n)||[]}},7272:()=>{}};