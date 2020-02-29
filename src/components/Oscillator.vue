<template>
	<div>
		Oscillator: 
		<select v-model="oscillator.type"  v-on:change="changeParams('oscillator',oscillator)">
			<option :key="osc" v-for="osc in oscillators">{{osc}}</option>
		</select>
		Attack: <input type="range" min="0" max="1" step="0.01" v-model="envelope.attack" class="slider" v-on:change="changeParams('envelope',envelope)">
		Decay: <input type="range" min="0" max="1" step="0.01" v-model="envelope.decay" class="slider" v-on:change="changeParams('envelope',envelope)">
		Sustain: <input type="range" min="0" max="1" step="0.01" v-model="envelope.sustain" class="slider" v-on:change="changeParams('envelope',envelope)">
		Release: <input type="range" min="0" max="1" step="0.01" v-model="envelope.release" class="slider" v-on:change="changeParams('envelope',envelope)">

	</div>
</template>
<script>



export default {
  	ame: 'Oscillator',
  	props:{
	 	id:String
  	},
 	data() {
    	return {
			oscillators: ['sine', 'triangle', 'square'],
			oscillator:{
				type: 'sine'
			},
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
