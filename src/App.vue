<template>
   <div id="app">
    <the-navbar></the-navbar>
    <the-header></the-header>
    <the-content></the-content>
  </div>
</template>

<script>
import TheHeader from './components/Layouts/TheHeader.vue'
import TheContent from './components/Layouts/TheContent.vue'
import TheNavbar from './components/Layouts/TheNavbar.vue'

export default {
  name: 'App',
  components: {
    TheContent,
    TheHeader,
    TheNavbar,
   
  }
}
</script>

<style>
@import url(./assets/css/CommonCss/button.css);
@import url(./assets/css/CommonCss/combobox.css);
@import url(./assets/css/CommonCss/common.css);
@import url(./assets/css/CommonCss/dialog.css);
@import url(./assets/css/CommonCss/icon.css);
@import url(./assets/css/CommonCss/input.css);
@import url(./assets/css/CommonCss/slideshow.css);
@import url(./assets/css/CommonCss/table.css);
@import url(./assets/css/EmployeeCss/employee.css);
@import url(./assets/css/CommonCss/common.css);
@import url(./assets/css/CommonCss/loading.css);
@import url(./assets/css/CommonCss/noticfication.css);
@import url(./assets/css/CommonCss/navbar.css);
@import url(./assets/css/CommonCss/header.css);
@font-face {
  font-family: notosans-bold;
  src: url("./assets/font/notosans-bold.3ede5aff.woff2");
}
@font-face {
  font-family: notosans-italic;
  src: url("./assets/font/notosans-italic.1c1aaac9.woff2");
}
@font-face {
  font-family: notosans-regular;
  src: url("./assets/font/notosans-regular.2cb88a13.woff2");
}
@font-face {
  font-family: notosans-semibold;
  src: url("./assets/font/notosans-semibold.df3e6dc4.woff2");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.icon-svg{
 
background: url('./assets/img/Sprites.64af8f61.svg') no-repeat ;
}
li {
  list-style-type: none;
}
</style>
