var t={name:"SlideUpDown",props:{active:{type:Boolean,default:!0},duration:{type:Number,default:500}},data:function(){return{maxHeight:0,offsetHeight:0,isMounted:!1}},render:function(t){return t("div",{style:this.style,ref:"container"},this.$slots.default)},mounted:function(){var t=this;Vue.nextTick(function(){t.isMounted=!0,t.layout()})},watch:{active:function(){this.layout()}},computed:{style:function(){return{transition:"height "+this.duration+"ms",height:this.isMounted?this.maxHeight+"px":"auto"}}},methods:{layout:function(){var t=this.$refs.container;if(this.active){var e=t.getAttribute("style");t.removeAttribute("style"),this.maxHeight=t.offsetHeight,t.setAttribute("style",e);var i=this;requestAnimationFrame(function(){t.style.height=i.maxHeight+"px"}),setTimeout(function(){t.style.overflow="initial",t.style.height="auto"},this.duration),this.offsetHeight=t.offsetHeight}else{var n=this;requestAnimationFrame(function(){t.style.height=n.maxHeight+"px",requestAnimationFrame(function(){t.style.overflow="hidden",t.style.height="0px"})})}}}};module.exports=t;
//# sourceMappingURL=vue-slide-up-down.js.map
