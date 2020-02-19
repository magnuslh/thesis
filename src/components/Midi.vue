<template>
  <button  @click="handleClick">
      start
    </button>
</template>
<script>



import { Synth } from "tone";

import WebMidi from 'webmidi'

export default {
  name: 'Midi',
  data() {
    return {
      ready: true
      
    };
  },
  mounted() {

    // const midi = await import(/* webpackChunkName: "game" */ '@/midi/midi');
    // this.downloaded = true;
    
    // console.log(midi)
    WebMidi.enable(function (err) {
      
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      }

      const synth = new Synth({
        "oscillator" : {
          "type" : "amtriangle",
          "harmonicity" : 0.5,
          "modulationType" : "sine"
        },
        "envelope" : {
          "attackCurve" : "exponential",
          "attack" : 0.05,
          "decay" : 0.2,
          "sustain" : 0.2,
          "release" : 1.5,
        }
      }).toMaster();

      console.log(WebMidi.inputs)
      const input = WebMidi.inputs[0];

      input.addListener('noteon', "all", (e) => {
          console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
          synth.triggerAttackRelease(e.note.name + e.note.octave, "8n");
        }
      );
    })


  },
  methods: {
    handleClick() {
      this.synth.triggerAttackRelease("C4", "8n");
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
