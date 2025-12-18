import{r as n,j as t,H as y,L as w}from"./app-BWfocxdu.js";import{A as v}from"./AuthenticatedLayout-BlGNKwXn.js";import"./transition-CkejyAL4.js";const $={modern:{name:"Modern",description:"Clean with colored accent"},minimal:{name:"Minimal",description:"Simple and professional"},corporate:{name:"Corporate",description:"Traditional business style"},creative:{name:"Creative",description:"Bold with personality"}};function C({card:e}){const[o,x]=n.useState("modern"),[r,m]=n.useState(!0),[c,h]=n.useState(!0),[f,a]=n.useState(!1),g=n.useRef(null),d=()=>{const i=e.color_primary||"#8b5cf6";return o==="modern"?`
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333333;">
    <tr>
        <td style="padding-right: 15px; border-right: 3px solid ${i};">
            ${r&&e.avatar?`<img src="${e.avatar}" alt="${e.display_name}" width="80" height="80" style="border-radius: 50%; display: block;" />`:""}
        </td>
        <td style="padding-left: 15px; vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td style="font-size: 18px; font-weight: bold; color: ${i}; padding-bottom: 2px;">
                        ${e.display_name}
                    </td>
                </tr>
                ${e.title?`<tr><td style="font-size: 14px; color: #666666; padding-bottom: 8px;">${e.title}${e.company?` | ${e.company}`:""}</td></tr>`:""}
                ${e.email?`<tr><td style="font-size: 13px; color: #333333; padding-bottom: 2px;">✉ <a href="mailto:${e.email}" style="color: #333333; text-decoration: none;">${e.email}</a></td></tr>`:""}
                ${e.phone?`<tr><td style="font-size: 13px; color: #333333; padding-bottom: 2px;">📱 <a href="tel:${e.phone}" style="color: #333333; text-decoration: none;">${e.phone}</a></td></tr>`:""}
                ${e.website?`<tr><td style="font-size: 13px; color: #333333; padding-bottom: 8px;">🌐 <a href="${e.website}" style="color: ${i}; text-decoration: none;">${e.website.replace(/^https?:\/\//,"")}</a></td></tr>`:""}
                ${c&&(e.linkedin_url||e.twitter_url)?`
                <tr>
                    <td style="padding-top: 5px;">
                        ${e.linkedin_url?`<a href="${e.linkedin_url}" style="margin-right: 8px; text-decoration: none; color: #0077b5;">LinkedIn</a>`:""}
                        ${e.twitter_url?`<a href="${e.twitter_url}" style="margin-right: 8px; text-decoration: none; color: #1da1f2;">Twitter</a>`:""}
                    </td>
                </tr>`:""}
                <tr>
                    <td style="padding-top: 10px;">
                        <a href="${e.public_url}" style="display: inline-block; padding: 6px 12px; background-color: ${i}; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 12px;">View Digital Card</a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`:o==="minimal"?`
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #333333;">
    <tr>
        <td>
            <span style="font-size: 16px; font-weight: bold;">${e.display_name}</span>
            ${e.title?`<br /><span style="color: #666666;">${e.title}${e.company?` at ${e.company}`:""}</span>`:""}
        </td>
    </tr>
    <tr>
        <td style="padding-top: 8px; font-size: 12px; color: #666666;">
            ${e.email?`<a href="mailto:${e.email}" style="color: #666666; text-decoration: none;">${e.email}</a>`:""}
            ${e.email&&e.phone?" | ":""}
            ${e.phone?`<a href="tel:${e.phone}" style="color: #666666; text-decoration: none;">${e.phone}</a>`:""}
        </td>
    </tr>
    <tr>
        <td style="padding-top: 5px;">
            <a href="${e.public_url}" style="color: ${i}; text-decoration: none; font-size: 12px;">View my digital business card →</a>
        </td>
    </tr>
</table>`:o==="corporate"?`
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Times New Roman', serif; font-size: 14px; color: #1a1a1a; border-top: 2px solid ${i}; padding-top: 10px;">
    <tr>
        <td>
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td style="font-size: 18px; font-weight: bold; color: #1a1a1a;">${e.display_name}</td>
                </tr>
                ${e.title?`<tr><td style="font-size: 14px; font-style: italic; color: #444444;">${e.title}</td></tr>`:""}
                ${e.company?`<tr><td style="font-size: 14px; font-weight: bold; color: ${i}; padding-top: 5px; text-transform: uppercase; letter-spacing: 1px;">${e.company}</td></tr>`:""}
            </table>
        </td>
        ${r&&e.logo?`<td style="padding-left: 20px;"><img src="${e.logo}" alt="Logo" height="50" /></td>`:""}
    </tr>
    <tr>
        <td colspan="2" style="padding-top: 10px; font-size: 12px;">
            ${e.email?`Email: <a href="mailto:${e.email}" style="color: #1a1a1a;">${e.email}</a><br />`:""}
            ${e.phone?`Phone: ${e.phone}<br />`:""}
            ${e.website?`Web: <a href="${e.website}" style="color: ${i};">${e.website.replace(/^https?:\/\//,"")}</a>`:""}
        </td>
    </tr>
</table>`:o==="creative"?`
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px;">
    <tr>
        <td style="background: linear-gradient(135deg, ${i}, ${e.color_secondary||"#6366f1"}); padding: 15px; border-radius: 8px;">
            <table cellpadding="0" cellspacing="0" border="0" style="color: #ffffff;">
                <tr>
                    ${r&&e.avatar?`<td style="padding-right: 15px;"><img src="${e.avatar}" alt="${e.display_name}" width="70" height="70" style="border-radius: 8px; border: 2px solid rgba(255,255,255,0.3);" /></td>`:""}
                    <td style="vertical-align: top;">
                        <div style="font-size: 20px; font-weight: bold; margin-bottom: 3px;">${e.display_name}</div>
                        ${e.title?`<div style="font-size: 14px; opacity: 0.9;">${e.title}</div>`:""}
                        ${e.company?`<div style="font-size: 12px; opacity: 0.8; margin-top: 5px;">${e.company}</div>`:""}
                    </td>
                </tr>
            </table>
            <table cellpadding="0" cellspacing="0" border="0" style="color: #ffffff; margin-top: 10px;">
                <tr>
                    ${e.email?`<td style="padding-right: 15px;"><a href="mailto:${e.email}" style="color: #ffffff; text-decoration: none; font-size: 12px;">📧 ${e.email}</a></td>`:""}
                    ${e.phone?`<td><a href="tel:${e.phone}" style="color: #ffffff; text-decoration: none; font-size: 12px;">📞 ${e.phone}</a></td>`:""}
                </tr>
            </table>
            <div style="margin-top: 10px;">
                <a href="${e.public_url}" style="display: inline-block; padding: 8px 16px; background-color: rgba(255,255,255,0.2); color: #ffffff; text-decoration: none; border-radius: 20px; font-size: 12px; font-weight: bold;">✨ View Digital Card</a>
            </div>
        </td>
    </tr>
</table>`:""},b=async()=>{const i=d();try{await navigator.clipboard.write([new ClipboardItem({"text/html":new Blob([i],{type:"text/html"}),"text/plain":new Blob([i],{type:"text/plain"})})]),a(!0),setTimeout(()=>a(!1),2e3)}catch{const l=document.createElement("textarea");l.value=i,document.body.appendChild(l),l.select(),document.execCommand("copy"),document.body.removeChild(l),a(!0),setTimeout(()=>a(!1),2e3)}},u=()=>{const i=d(),s=new Blob([i],{type:"text/html"}),l=URL.createObjectURL(s),p=document.createElement("a");p.href=l,p.download=`${e.display_name.replace(/\s+/g,"-").toLowerCase()}-signature.html`,p.click(),URL.revokeObjectURL(l)};return t.jsxs(v,{children:[t.jsx(y,{title:"Email Signature Generator"}),t.jsx("div",{className:"py-8",children:t.jsxs("div",{className:"mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",children:[t.jsxs("div",{className:"mb-8",children:[t.jsxs(w,{href:route("business-cards.edit",e.id),className:"inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4",children:[t.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})}),"Back to Card Editor"]}),t.jsx("h1",{className:"text-2xl font-bold text-white",children:"Email Signature Generator"}),t.jsx("p",{className:"text-gray-400 mt-1",children:"Create a professional email signature from your business card"})]}),t.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[t.jsxs("div",{className:"space-y-6",children:[t.jsxs("div",{className:"rounded-2xl bg-white/5 border border-white/10 p-6",children:[t.jsx("h2",{className:"text-lg font-semibold text-white mb-4",children:"Signature Style"}),t.jsx("div",{className:"grid grid-cols-2 gap-3",children:Object.entries($).map(([i,s])=>t.jsxs("button",{onClick:()=>x(i),className:`p-4 rounded-xl border text-left transition-all ${o===i?"border-violet-500 bg-violet-500/20":"border-white/10 bg-white/5 hover:border-white/20"}`,children:[t.jsx("div",{className:"text-white font-medium",children:s.name}),t.jsx("div",{className:"text-gray-400 text-sm",children:s.description})]},i))})]}),t.jsxs("div",{className:"rounded-2xl bg-white/5 border border-white/10 p-6",children:[t.jsx("h2",{className:"text-lg font-semibold text-white mb-4",children:"Options"}),t.jsxs("div",{className:"space-y-4",children:[t.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[t.jsx("input",{type:"checkbox",checked:r,onChange:i=>m(i.target.checked),className:"w-5 h-5 rounded bg-white/5 border-white/20 text-violet-500 focus:ring-violet-500"}),t.jsx("span",{className:"text-white",children:"Show profile photo/logo"})]}),t.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[t.jsx("input",{type:"checkbox",checked:c,onChange:i=>h(i.target.checked),className:"w-5 h-5 rounded bg-white/5 border-white/20 text-violet-500 focus:ring-violet-500"}),t.jsx("span",{className:"text-white",children:"Show social media links"})]})]})]}),t.jsxs("div",{className:"flex gap-3",children:[t.jsx("button",{onClick:b,className:"flex-1 py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2",children:f?t.jsxs(t.Fragment,{children:[t.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),"Copied!"]}):t.jsxs(t.Fragment,{children:[t.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"})}),"Copy HTML"]})}),t.jsxs("button",{onClick:u,className:"py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all flex items-center gap-2",children:[t.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"})}),"Download"]})]})]}),t.jsxs("div",{className:"space-y-6",children:[t.jsxs("div",{className:"rounded-2xl bg-white border border-gray-200 p-6",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Preview"}),t.jsx("div",{className:"bg-gray-50 rounded-xl p-6 min-h-[200px]",children:t.jsx("div",{ref:g,dangerouslySetInnerHTML:{__html:d()}})})]}),t.jsxs("div",{className:"rounded-2xl bg-white/5 border border-white/10 p-6",children:[t.jsx("h2",{className:"text-lg font-semibold text-white mb-4",children:"How to Use"}),t.jsxs("div",{className:"space-y-4 text-gray-400 text-sm",children:[t.jsxs("div",{className:"flex gap-3",children:[t.jsx("div",{className:"w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 text-xs font-bold",children:"1"}),t.jsx("p",{children:'Click "Copy HTML" to copy your signature to clipboard'})]}),t.jsxs("div",{className:"flex gap-3",children:[t.jsx("div",{className:"w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 text-xs font-bold",children:"2"}),t.jsx("p",{children:"Open your email client's signature settings"})]}),t.jsxs("div",{className:"flex gap-3",children:[t.jsx("div",{className:"w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 text-xs font-bold",children:"3"}),t.jsx("p",{children:"Paste the signature (Ctrl+V / Cmd+V)"})]}),t.jsxs("div",{className:"mt-4 p-3 bg-white/5 rounded-lg",children:[t.jsx("p",{className:"text-white text-xs font-medium mb-1",children:"Supported Email Clients:"}),t.jsx("p",{className:"text-gray-500 text-xs",children:"Gmail, Outlook, Apple Mail, Thunderbird, and most other email clients"})]})]})]})]})]})]})})]})}export{C as default};
