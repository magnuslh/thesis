<template>
  <div id="app">
    <Game msg="Welcome to Your Vue.js App"/>
    <Synth/>
  </div>
</template>

<script>
import Game from './components/Game.vue';
import Synth from './components/Synth.vue'

export default {
  name: 'App',
  components: {
    Game,
    Synth
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
