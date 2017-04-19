<template>
  <div id="app">


    <nav class="navbar navbar-default" role="navigation">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
              data-target="#navbar" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            <!--<img class="navbar-brand" src="{% static 'BaseScouting/img/174_Favicon.jpg' %}" style="width:50px; padding:0px; margin-right:5px" /> -->
            </div>
            <div class="collapse navbar-collapse" id="navbar">
              <ul class="nav navbar-nav">
                <li> <a href="">Home</a> </li>
                <li> <a href="">Team List</a></li>
                <li> <a href="">Matches</a></li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li> <a href="">Log In</a> </li>
              </ul>
            </div>
          </div>
        </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
    /* @import 'bootstrap/dist/css/bootstrap.css'; */
</style>
