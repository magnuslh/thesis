<template>
	<div>
		<Synth v-if="midiIn" :MidiStream="midiIn"/>
		
    
	</div>
</template>
<script>



import { FMSynth } from "tone";
// import Oscillator from './Oscillator'
import Synth from './Synth'



export default {
	name: 'Midi',
	components: {
		Synth,
	},
  data() {
    return {
		midiIn: null,
		ready: true,
		synth: null,
		synthParams: {
			harmonicity : 3,
			modulationIndex : 10,
			detune : 0,
			oscillator : {
				type : 'sine'
			} ,
			envelope : {
				attack : 0.01 ,
				decay : 0.2 ,
				sustain : 0.6 ,
				release : 0.5
			} ,
			modulation : {
				type : "sine"
			} ,
			modulationEnvelope : {
				attack : 0.1 ,
				decay : 0 ,
				sustain : 0.1 ,
				release : 0.1
			}
      }
    };
  },
  mounted() {

    // const midi = await import(/* webpackChunkName: "game" */ '@/midi/midi');
    // this.downloaded = true;
    
    // console.log(midi)
   

  },
  methods: {
    handleClick() {
      this.synth.triggerAttackRelease("C4", "8n");
		},
	changeSynthParams(param, value){
		console.log("received synth param change " + param + " " + value)
		this.synth.set(param, value)
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
