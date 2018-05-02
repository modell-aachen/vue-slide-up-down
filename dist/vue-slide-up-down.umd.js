!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.VueSlideUpDown=e()}(this,function(){return{name:"SlideUpDown",props:{active:{type:Boolean,default:!0},duration:{type:Number,default:500}},data:function(){return{maxHeight:0,overflow:"inherit",offsetHeight:0,isMounted:!1}},render:function(t){return t("div",{style:this.style,ref:"container"},this.$slots.default)},created:function(){this.observer=new MutationObserver(this.layout)},mounted:function(){var t=this;this.observer.observe(this.$el,{subtree:!0,childList:!0}),window.addEventListener("resize",this.layout),Vue.nextTick(function(){t.isMounted=!0,t.layout()})},destroyed:function(){this.observer.disconnect(),delete this.observer,window.removeEventListener("resize",this.layout)},watch:{active:function(){this.layout()}},computed:{style:function(){return{overflow:this.overflow,"transition-property":"height",height:this.isMounted?this.maxHeight+"px":"auto","transition-duration":this.duration+"ms"}}},methods:{layout:function(){var t=this.$refs.container;if(this.active){this.overflow="inherit";var e=t.getAttribute("style");t.removeAttribute("style"),this.maxHeight=t.offsetHeight,t.setAttribute("style",e),this.offsetHeight=t.offsetHeight}else this.overflow="hidden",this.maxHeight=0}}}});
//# sourceMappingURL=vue-slide-up-down.umd.js.map
