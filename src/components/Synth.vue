<template>
	<div>
		Synth: 
        <button @click="testSynth" > 
            test
        </button>
        Harmonocity: <input type="range" min="0" max="10" step="0.1" v-model="params.harmonicity" class="slider" v-on:change="changeParam('harmonicity', params.harmonicity)"/>
        ModulationIndex: <input type="range" min="0" max="100" step="1" v-model="params.modulationIndex" class="slider" v-on:change="changeParam('modulationIndex', params.modulationIndex)"/>
        Detune: <input type="range" min="0" max="2" step="0.1" v-model="params.detune" class="slider" v-on:change="changeParam('detune', params.detune)"/>
        Oscillator: <Oscillator  @param="changeMainOscillator"/>
        Modulation Oscillator: <Oscillator @param="changeModulationOscillator"/>
	</div>
</template>
<script>


import Tone from "tone";
import Oscillator from './Oscillator'
import WebMidi from 'webmidi'

export default {
  name: 'Synth',
  components:{
      Oscillator
  },
  props:{
      MidiStream: Object
  },
 
  data() {
    return {
        params:{
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
        WebMidi.enable( (err) => {
            
            
      
            if (err) {
                console.log("WebMidi could not be enabled.", err);
            }

            const synth = new Tone.PolySynth( 8, Tone.FMSynth, this.params).toMaster();
            this.synth = synth;
        

            console.log(WebMidi.inputs)
            const input = WebMidi.inputs[0];//find(i => i.name == "loopMIDI");
            input.addListener('noteon', "all", (e) => {
                console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
                synth.triggerAttack(e.note.name + e.note.octave)
                }
            );
            input.addListener('noteoff', "all", (e) => {
                console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + ").");
                synth.triggerRelease(e.note.name + e.note.octave)
            }
            );


        })

       
       
       
   },

  methods: {
		stopSynth(){
            this.synth.triggerRelease();
        },
        testSynth(){
            this.synth.triggerAttackRelease("C4", "8n");
        },
        changeParam(param, value){
            console.log("received synth param change " + param + " " + value)
           
            this.synth.set(param, value)
            
        },
        changeMainOscillator(param, value){
            console.log("received synth param change " + param + " " + value)
             if(param == "oscillatorType"){
                this.synth.set('oscillator', value)
            }
            else{
                this.synth.set('envelope', value)
            }

        },
        changeModulationOscillator(param, value){
            console.log("received synth param change " + param + " " + value)
            if(param == "oscillatorType"){
                this.synth.set('modulation', value)
            }
            else{
                this.synth.set('modulationEnvelope', value)
            }

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
