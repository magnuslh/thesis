<template>
  <div id="app">
    <Game msg="Welcome to Your Vue.js App"/>
    <Midi/>
  </div>
</template>

<script>
import Game from './components/Game.vue';
import Midi from './components/Midi.vue'

export default {
  name: 'App',
  components: {
    Game,
    Midi
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
