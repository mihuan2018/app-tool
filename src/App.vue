<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import './assets/css/reset.css';
export default {
    name: "App",
    components: {
    },
    data(){
        return {

        }
    },
    created() {

    }
};
</script>

<style>
#app {
    /*font-family: "Avenir", Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*!*text-align: center;*!*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
    display: flex;
    height: 100%;

}

</style>
