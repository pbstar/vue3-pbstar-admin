import{a8 as g,ae as h,b as l,e as w,o as x,G as V,L as d,a7 as S,y as r,w as I,bI as k,ag as E,a6 as b,ab as y,ac as B,aa as L}from"./index-rvzZSy2J.js";import{E as N}from"./el-button-y8f8HgP0.js";import{E as u,a as U}from"./el-message-c_khFlmu.js";import{_ as C}from"./logo-JUASVGrg.js";import{_ as M}from"./_plugin-vue_export-helper-QQhFdce-.js";const D=o=>(y("data-v-68c36545"),o=o(),B(),o),G={class:"fapage"},R={class:"login"},T=D(()=>d("img",{class:"logo",src:C,alt:""},null,-1)),j={class:"title"},q={__name:"index",setup(o){const p=g(),_=h(),m=l(L.title),n=l(!1),a=l(""),s=l("");w(()=>{});const f=()=>{if(a.value===""||s.value===""){u.error("账号或密码不能为空");return}n.value=!0,k({account:a.value,password:s.value}).then(e=>{n.value=!1,e.code==200?(u.success("登录成功"),_.changeInfo(e.data.info),E.setLocalStorage("token",e.data.token),p.push({name:e.data.routeName})):u.error(e.msg)})};return(e,t)=>{const i=U,v=N;return x(),V("div",G,[d("div",R,[T,d("h3",j,S(m.value),1),r(i,{class:"account",placeholder:"请输入账号","prefix-icon":"user",modelValue:a.value,"onUpdate:modelValue":t[0]||(t[0]=c=>a.value=c)},null,8,["modelValue"]),r(i,{class:"password",placeholder:"请输入密码","show-password":!0,type:"password","prefix-icon":"lock",modelValue:s.value,"onUpdate:modelValue":t[1]||(t[1]=c=>s.value=c)},null,8,["modelValue"]),r(v,{class:"btn",type:"primary",onClick:f,loading:n.value},{default:I(()=>[b("登 录")]),_:1},8,["loading"])])])}}},K=M(q,[["__scopeId","data-v-68c36545"]]);export{K as default};