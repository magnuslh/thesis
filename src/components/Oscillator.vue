<template>
	<div>
		Oscillator: 
		<select v-model="oscillatorType"  v-on:change="changeParams('oscillatorType',oscillatorType)">
			<option :key="osc" v-for="osc in oscillators">{{osc}}</option>
		</select>
		Harmonicity: <input type="range" min="0" max="1000" v-model="harmonicity" class="slider" v-on:change="changeParams('harmonicity',harmonicity/100)">
	</div>
</template>
<script>



export default {
  name: 'Oscillator',
  data() {
    return {
			harmonicity: 3,
			modulationIndex: 10,
			detune: 0,
			oscillators: ['sine', 'square'],
			oscillatorType: 'sine',
			envelope : {
				attack : 0.01 ,
				decay : 0.2 ,
				sustain : 0.6 ,
				release : 0.5
			} ,
      
    };
  },

  methods: {
		changeParams(param, value){
			this.$emit("param", param, value)
		}
  }
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.placeholder {
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
}
</style>
