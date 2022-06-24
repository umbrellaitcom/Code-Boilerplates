<template>
  <div id="app">
    <SignInComponent />
    <SignUpComponent />
    <HeaderComponent />
    <RouterView />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import SignInComponent from "./components/SignInComponent";
import SignUpComponent from "./components/SignUpComponent";

export default {
  name: 'app',
  components: {
    SignInComponent,
    SignUpComponent,
    FooterComponent,
    HeaderComponent,
  }
}
</script>

<style>
  @import "~materialize-css/dist/css/materialize.css";
  .btn {
    background-color: #0050FF;
  }
  .btn:hover {
    background-color: #0034A6;
  }
  .btn:active, .btn:focus {
    background-color: #002880;
  }
</style>
