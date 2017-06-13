<template>
    <div id="app" class="container-fluid">
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded" role="navigation">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <img class="navbar-brand" src="~@/assets/favicon.jpg" style="width:50px; padding:0px; margin-right:5px">
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="nav navbar-nav mr-auto">
                    <li class="nav-item"> <a href="#" class="nav-link">Home</a> </li>
                    <li class="nav-item"> <a href="#" class="nav-link">Team List</a></li>
                    <li class="nav-item"> <a href="#" class="nav-link">Matches</a></li>
                </ul>
                <ul class="nav navbar-nav">
                    <li class="nav-item"> <a href="#" class="nav-link">Log In</a> </li>
                </ul>
            </div>
        </nav>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style scoped>
    @import '~bootstrap/dist/css/bootstrap.css';
</style>