<template>
  <div id="app" v-cloak>
   <transition :name="transitionName">       
        <router-view class="child-view"/>
   </transition> 
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  created: function() {
    this.setFontSize();
  },
  methods: {
     setFontSize () {
        // document.documentElement.style.fontSize = document.documentElement.clientWidth*(window.devicePixelRatio||1) / 7.5 + 'px';
        var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;  
        var _html = document.getElementsByTagName('html')[0];  
        view_width>640?_html.style.fontSize=640/16 +'px':_html.style.fontSize =view_width/16+'px';
     }
  },
  watch: { 
    '$route' (to, from) { 
        if(to.path == '/'){ 
            this.transitionName = 'slide-right'; 
        }else{ 
            this.transitionName = 'slide-left'; 
        } 
    }
  }  
}
</script>

<style>
html,body{
   margin: 0;
   padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.mint-header{
  background-color: #e54847;
}
.child-view { 
 transition: all .8s cubic-bezier(.55,0,.1,1); 
} 
.slide-left-enter, .slide-right-leave-active { 
 opacity: 0; 
 -webkit-transform: translate(50px, 0); 
 transform: translate(50px, 0); 
} 
.slide-left-leave-active, .slide-right-enter { 
 opacity: 0; 
 -webkit-transform: translate(-50px, 0); 
 transform: translate(-50px, 0); 
} 
ul,ol{
  list-style: none;
}

/* 
html5doctor.com Reset Stylesheet
v1.4.1 
2010-03-01
Author: Richard Clark - http://richclarkdesign.com
*/

html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}

body {
    line-height:1;
}

:focus {
	outline: 1;
}

article,aside,canvas,details,figcaption,figure,
footer,header,hgroup,menu,nav,section,summary { 
    display:block;
}

nav ul {
    list-style:none;
}

blockquote, q {
    quotes:none;
}

blockquote:before, blockquote:after,
q:before, q:after {
    content:'';
    content:none;
}

a {
    margin:0;
    padding:0;
    border:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
    text-decoration:none;   
}

ins {
    background-color:#ff9;
    color:#000;
    text-decoration:none;
}

mark {
    background-color:#ff9;
    color:#000; 
    font-style:italic;
    font-weight:bold;
}

del {
    text-decoration: line-through;
}

abbr[title], dfn[title] {
    border-bottom:1px dotted #000;
    cursor:help;
}

table {
    border-collapse:collapse;
    border-spacing:0;
}

hr {
    display:block;
    height:1px;
    border:0;   
    border-top:1px solid #cccccc;
    margin:1em 0;
    padding:0;
}

input, select {
    vertical-align:middle;
}
</style>
