<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Todos</a>
        </div>
      </div><!-- /.container-fluid -->
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
// window.onbeforeunload = function (evt) {
//   var message = 'Are you sure you want to reload?'
//   if (typeof evt === 'undefined') {
//     evt = window.event
//   }
//   if (evt) {
//     evt.returnValue = message
//   }
//   return message
// }
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
