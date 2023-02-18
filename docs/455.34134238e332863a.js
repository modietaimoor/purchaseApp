"use strict";(self.webpackChunkpurchaseApp=self.webpackChunkpurchaseApp||[]).push([[455],{455:(B,h,r)=>{r.r(h),r.d(h,{PortalModule:()=>s});var g=r(6895),f=r(4719),_=r(2112),v=r(6331),d=r(8752),t=r(5062);class l{constructor(o){this._manageCategoryService=o}ngOnInit(){}ngOnDestroy(){this.categoryUpdate?.unsubscribe()}}l.\u0275fac=function(o){return new(o||l)(t.Y36(v.z))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-category-products"]],inputs:{category:"category"},decls:1,vars:1,template:function(o,e){1&o&&t._uU(0),2&o&&t.Oqu(null==e.category?null:e.category.categoryName)},encapsulation:2});class u{}u.\u0275fac=function(o){return new(o||u)},u.\u0275cmp=t.Xpm({type:u,selectors:[["app-homepage"]],decls:0,vars:0,template:function(o,e){},styles:[".ad-label{padding:5px!important;cursor:pointer;border-radius:5px;margin:5px!important;font-size:14px!important}  .ad-icon{font-size:14px!important}  .ad-text{margin:5px!important;top:-1px;position:relative}  .w-search{width:30rem!important}  .shop-count{background-color:#000!important;color:#fff!important;margin:0 5px!important;display:inline-block!important;width:15px!important;height:16px!important;font-size:8px!important;border-radius:9999999px;position:relative!important;top:-3px!important;padding-top:2px!important;padding-left:5px!important}"]});var C=r(818),w=r(7217),T=r(4793);function x(n,o){}const P=function(n){return{$implicit:n}};function b(n,o){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,x,0,0,"ng-template",2),t.qZA()),2&n){const e=o.$implicit,a=t.oxw();t.xp6(1),t.Q6J("ngTemplateOutlet",a.templateRef)("ngTemplateOutletContext",t.VKq(2,P,e))}}class m{constructor(){this.width="auto",this.height="auto",this.showTitle=!0,this.closeOnMouseOut=!0,this.position="right",this.showCloseButton=!1,this.wrapperAttr={},this.visibleChange=new t.vpe}onContentReady(o){this.closeOnMouseOut&&o.component.content().addEventListener("mouseleave",e=>{o.component.hide()})}}m.\u0275fac=function(o){return new(o||m)},m.\u0275cmp=t.Xpm({type:m,selectors:[["app-popover"]],contentQueries:function(o,e,a){if(1&o&&t.Suo(a,t.Rgc,5),2&o){let i;t.iGM(i=t.CRH())&&(e.templateRef=i.first)}},inputs:{width:"width",height:"height",target:"target",title:"title",visible:"visible",showTitle:"showTitle",closeOnMouseOut:"closeOnMouseOut",position:"position",showCloseButton:"showCloseButton",wrapperAttr:"wrapperAttr"},outputs:{visibleChange:"visibleChange"},decls:2,vars:10,consts:[[3,"target","position","showTitle","title","visible","height","width","wrapperAttr","showCloseButton","visibleChange","onContentReady"],[4,"dxTemplate","dxTemplateOf"],[3,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(o,e){1&o&&(t.TgZ(0,"dx-popover",0),t.NdJ("visibleChange",function(i){return e.visible=i})("onContentReady",function(i){return e.onContentReady(i)}),t.YNc(1,b,2,4,"div",1),t.qZA()),2&o&&(t.Q6J("target",e.target)("position",e.position)("showTitle",e.showTitle)("title",e.title)("visible",e.visible)("height",e.height)("width",e.width)("wrapperAttr",e.wrapperAttr)("showCloseButton",e.showCloseButton),t.xp6(1),t.Q6J("dxTemplateOf","content"))},dependencies:[g.tP,w.p6,T.j],encapsulation:2});var y=r(2681);function Z(n,o){if(1&n&&(t.TgZ(0,"div",17)(1,"p"),t._uU(2),t.qZA()()),2&n){const e=t.oxw();t.xp6(2),t.Oqu(e.popupText)}}const A=function(){return{id:"elementId"}};class c{constructor(o){this._router=o,this.searchText="",this.popoverShow=!1,this.popupText="",this.position="bottom",this.itemsCount=99,this.popoverDetails=C.rR,this.searchToolBarItmes=[{widget:"dxTextBox",location:"center",options:{showClearButton:!0,placeholder:"Search Products.",valueChangeEvent:"keyup",onValueChanged:e=>{this.searchText=e.value?.toString()},elementAttr:{class:"w-search text-blueGray-600 bg-white rounded input-text shadow"}}},{widget:"dxButton",location:"center",options:{icon:"search",onClick:()=>this.searchProducts()}}]}ngOnInit(){}showCartDetails(){}showPopup(o){this.target="#"+o.target.id,this.popupText=this.popoverDetails.find(e=>e.id==o.target.id).text,this.popoverShow=!0}hidePopup(){this.popoverShow=!1}backToLogin(){this._router.navigate([C.xB.LoginPage])}searchProducts(){console.log(this.searchText)}}c.\u0275fac=function(o){return new(o||c)(t.Y36(d.F0))},c.\u0275cmp=t.Xpm({type:c,selectors:[["app-portal"]],decls:28,vars:10,consts:[[1,"flex","flex-wrap","overflow-y-hidden"],[1,"w-full","px-2","py-1","bg-gray-100"],[1,"w-full"],["id","discounts",1,"ad-label","bg-white","border","float-left",3,"mouseenter","mouseleave"],[1,"dx-icon-percent","ad-icon"],[1,"ad-text"],["id","multi-national",1,"ad-label","bg-white","border","float-left",3,"mouseenter","mouseleave"],[1,"dx-icon-globe","ad-icon"],["id","point-gifts",1,"ad-label","bg-white","border","float-left",3,"mouseenter","mouseleave"],[1,"dx-icon-gift","ad-icon"],[1,"ad-label","bg-white","border","float-right",3,"click"],[1,"fa","fa-sign-out","ad-icon"],[1,"dx-icon-cart","ad-icon"],[1,"shop-count"],[3,"target","showTitle","position","width","height","visible","wrapperAttr","targetChange","visibleChange"],[1,"w-full","p-4","bg-gray-100"],[3,"items","itemsChange"],[1,"bg-gray-300"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"a",3),t.NdJ("mouseenter",function(i){return e.showPopup(i)})("mouseleave",function(){return e.hidePopup()}),t._UZ(4,"i",4),t.TgZ(5,"span",5),t._uU(6,"Discounts"),t.qZA()(),t.TgZ(7,"a",6),t.NdJ("mouseenter",function(i){return e.showPopup(i)})("mouseleave",function(){return e.hidePopup()}),t._UZ(8,"i",7),t.TgZ(9,"span",5),t._uU(10,"Products from all over the world"),t.qZA()(),t.TgZ(11,"a",8),t.NdJ("mouseenter",function(i){return e.showPopup(i)})("mouseleave",function(){return e.hidePopup()}),t._UZ(12,"i",9),t.TgZ(13,"span",5),t._uU(14,"Points"),t.qZA()(),t.TgZ(15,"a",10),t.NdJ("click",function(){return e.backToLogin()}),t._UZ(16,"i",11),t.TgZ(17,"span",5),t._uU(18,"Logout"),t.qZA()(),t.TgZ(19,"a",10),t.NdJ("click",function(){return e.showCartDetails()}),t._UZ(20,"i",12),t.TgZ(21,"span",13),t._uU(22),t.qZA()()(),t.TgZ(23,"app-popover",14),t.NdJ("targetChange",function(i){return e.target=i})("visibleChange",function(i){return e.popoverShow=i}),t.YNc(24,Z,3,1,"ng-template"),t.qZA()(),t.TgZ(25,"div",15)(26,"app-toolbar",16),t.NdJ("itemsChange",function(i){return e.searchToolBarItmes=i}),t.qZA()(),t._UZ(27,"router-outlet"),t.qZA()),2&o&&(t.xp6(22),t.Oqu(e.itemsCount),t.xp6(1),t.Q6J("target",e.target)("showTitle",!1)("position",e.position)("width",250)("height",100)("visible",e.popoverShow)("wrapperAttr",t.DdM(9,A)),t.xp6(3),t.Q6J("items",e.searchToolBarItmes))},dependencies:[m,y.n,d.lC],styles:[".ad-label{padding:5px!important;cursor:pointer;border-radius:5px;margin:5px!important;font-size:14px!important}  .ad-icon{font-size:14px!important}  .ad-text{margin:5px!important;top:-1px;position:relative}  .w-search{width:30rem!important}  .shop-count{background-color:#000!important;color:#fff!important;margin:0 5px!important;display:inline-block!important;width:15px!important;height:16px!important;font-size:8px!important;border-radius:9999999px;position:relative!important;top:-3px!important;padding-top:2px!important;padding-left:5px!important}"]});const O=[{path:"",component:c,children:[{path:"homepage",component:u},{path:"products",component:l}]}];class p{}p.\u0275fac=function(o){return new(o||p)},p.\u0275mod=t.oAB({type:p}),p.\u0275inj=t.cJS({imports:[d.Bz.forChild(O),d.Bz]});class s{}s.\u0275fac=function(o){return new(o||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({providers:[v.z],imports:[g.ez,f.u5,f.UX,_.m,p]})}}]);