<template>
	<div>
		Main Oscillator:
		<Oscillator id="oscMain" @param="changeSynthParams" :params="synthParams"/>
		Modulator: 
		<Oscillator id="oscMod" @param="changeSynthParams" :params="synthParams"/>
		<button  @click="handleClick">
      test
    </button>
	</div>
</template>
<script>



import { FMSynth } from "tone";
import Oscillator from './Oscillator'

import WebMidi from 'webmidi'

export default {
	name: 'Midi',
	components: {
		Oscillator,
	},
  data() {
    return {
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
    WebMidi.enable( (err) => {
      
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      }

      const synth = new FMSynth(this.synthParams).toMaster();

			this.synth = synth;

      console.log(WebMidi.inputs)
      const input = WebMidi.inputs.find(i => i.name == "loopMIDI");
			if(input){
				console.log("Connected to input: " + input.name)
				input.addListener('noteon', "all", (e) => {
          console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
          synth.triggerAttack(e.note.name + e.note.octave);
				});
				input.addListener('noteoff', "all", (e) => {
          console.log("NoteOff" + e.note);
          synth.triggerRelease();
				});
			}else{
				console.log("No input found. Remember to start the loopMIDI bus")
			}
  
    })


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
