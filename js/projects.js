// ===== SITE SETTINGS: fill these in when you have them =====
window.SITE = {
  email: "",     // e.g. "you@example.com"  (the contact form needs this)
  phone: "",     // e.g. "+8801XXXXXXXXX"
  whatsapp: ""   // digits only with country code, e.g. "8801XXXXXXXXX"
};

// ===== PROJECTS =====
// Text can be a plain string or { en: "...", bn: "..." }.
// Leave demo / repo / drive as "" until you have real links; the button then shows as "not added yet".
//
// Real web project example (copy, paste, edit):
// { id:"my-site", category:"web", title:"My Site", desc:"One-line summary.",
//   tags:["HTML","CSS","JavaScript"], image:"assets/images/projects/my-site.jpg",
//   demo:"https://...", repo:"https://github.com/rayhanhossain-pro/...",
//   details:{ overview:"", problem:"", role:"", features:["",""], challenges:"", solutions:"", lessons:"", improvements:"" } }
const TBD = { en: "To be added.", bn: "পরে যোগ করা হবে।" };
const webDetails = { overview:TBD, problem:TBD, role:TBD, features:[TBD], challenges:TBD, solutions:TBD, lessons:TBD, improvements:TBD };

window.PROJECTS = [
  { id:"web-project-1", placeholder:true, category:"web", title:{en:"Web project 1",bn:"ওয়েব প্রজেক্ট ১"}, desc:TBD, tags:[], image:"assets/images/projects/web-1.jpg", demo:"", repo:"", details:webDetails },
  { id:"web-project-2", placeholder:true, category:"web", title:{en:"Web project 2",bn:"ওয়েব প্রজেক্ট ২"}, desc:TBD, tags:[], image:"assets/images/projects/web-2.jpg", demo:"", repo:"", details:webDetails },
  { id:"web-project-3", placeholder:true, category:"web", title:{en:"Web project 3",bn:"ওয়েব প্রজেক্ট ৩"}, desc:TBD, tags:[], image:"assets/images/projects/web-3.jpg", demo:"", repo:"", details:webDetails },
  // Marketing / AI content: use drive for a Google Drive folder or verified case-study link. Never include client secrets.
  { id:"mkt-1", placeholder:true, category:"marketing", title:{en:"Marketing project 1",bn:"মার্কেটিং প্রজেক্ট ১"}, desc:TBD, tags:[], image:"assets/images/projects/mkt-1.jpg", drive:"" },
  { id:"mkt-2", placeholder:true, category:"marketing", title:{en:"AI content project 1",bn:"এআই কনটেন্ট প্রজেক্ট ১"}, desc:TBD, tags:[], image:"assets/images/projects/mkt-2.jpg", drive:"" }
];
