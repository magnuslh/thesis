import Tone from 'tone'
import WebMidi from 'webmidi';





import A2Sample from '@/midi/samples/piano/A2.wav'
import B2Sample from '@/midi/samples/piano/B2.wav'
import C2Sample from '@/midi/samples/piano/C2.wav'
import D2Sample from '@/midi/samples/piano/D2.wav'
import E2Sample from '@/midi/samples/piano/E2.wav'
import F2Sample from '@/midi/samples/piano/F2.wav'
import G2Sample from '@/midi/samples/piano/G2.wav'


import A3Sample from '@/midi/samples/piano/A3.wav'
import B3Sample from '@/midi/samples/piano/B3.wav'
import C3Sample from '@/midi/samples/piano/C3.wav'
import D3Sample from '@/midi/samples/piano/D3.wav'
import E3Sample from '@/midi/samples/piano/E3.wav'
import F3Sample from '@/midi/samples/piano/F3.wav'
import G3Sample from '@/midi/samples/piano/G3.wav'

import A4Sample from '@/midi/samples/piano/A4.wav'
import B4Sample from '@/midi/samples/piano/B4.wav'
import C4Sample from '@/midi/samples/piano/C4.wav'
import D4Sample from '@/midi/samples/piano/D4.wav'
import E4Sample from '@/midi/samples/piano/E4.wav'
import F4Sample from '@/midi/samples/piano/F4.wav'
import G4Sample from '@/midi/samples/piano/G4.wav'


import C5Sample from '@/midi/samples/piano/C5.wav'


export default class EmotionController {
    constructor(){
        this.params = {
            harmonicity : 0,
            modulationIndex : 0,
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
        
        WebMidi.enable( (err) => {
            console.log(WebMidi.outputs)
            if (err) {
                console.log("WebMidi could not be enabled.", err);
            }
            this.output = WebMidi.outputs[0]; //mac 0
            this.energy = 0;
            this.valence = 0; 
            this.velocity = 0.5; 
            this.sendRate = 0.1;
            this.delay = 0;
            //Initiate playback 
            this.sendPause();
            this.sendValence(); 
            this.sendEnergy();
            this.sendPlay(); 
            this.startSend(); 
      
         
					
						//this.synth = new Tone.PolySynth( 10, Tone.FMSynth, this.params).toMaster();
						let limiter = new Tone.Limiter(-6).toMaster();
						let reverb = new Tone.Reverb(1).toMaster();
						reverb.generate();
						let filter = new Tone.Filter(200, 'highpass').toMaster();
						
						
						this.sampler = new Tone.Sampler({
								"A2": A2Sample,
								"B2": B2Sample,
								"C2": C2Sample, 
								"D2": D2Sample,
								"E2": E2Sample,
								"F2": F2Sample,
								"G2": G2Sample,
								
								"A3": A3Sample,
								"B3": B3Sample,
								"C3": C3Sample,
								"D3": D3Sample,
								"E3": E3Sample,
								"F3": F3Sample,
								"G3": G3Sample,

									
								"A4": A4Sample,
								"B4": B4Sample,
								"C4": C4Sample,
								"D4": D4Sample,
								"E4": E4Sample,
								"F4": F4Sample,
								"G4": G4Sample,
					
                "C5": C5Sample,
              
            }, 
                this.setListeners()
            ).chain( filter, reverb, limiter, Tone.Master)
						
						
					
        
            
            
        
        })
        
        

     
		}
		
	

    setListeners(){
		

				this.input = WebMidi.inputs[1];//find(i => i.name == "loopMIDI"); //mac 1
				console.log(WebMidi.inputs)
				
        this.input.addListener('noteon', "all", (e) => {
				
            
            //this.nextNote = e; 
            //console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
            this.sampler.triggerAttack(e.note.name + e.note.octave, "+" + this.delay, e.velocity*this.velocity)
            
        });
        this.input.addListener('noteoff', "all", (e) => {
            //console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + ").");
            this.sampler.triggerRelease(e.note.name + e.note.octave, "+" + this.delay)
        });
        

    }
    convertToVelocity(amount){
        //send in a number between -1 and 1 and get the corresponding velocity for pure data. 
        return (amount + 1) /2; //should send a number between 0 and 1
    }

    sendNotes(){
        console.log("E: " + Math.round(this.energy*100)/100 + ",   V: " + Math.round(this.valence*100)/100 + ",   Vel: " + Math.round(this.velocity*100)/100)
        this.output.playNote("C3", "1", {velocity: this.convertToVelocity(this.energy)});
        this.output.playNote("D3", "2", {velocity: this.convertToVelocity(this.valence)});
    }

    startSend(){
        
        setInterval(()=> {
            this.sendNotes()
        }, 100); 
    }
   
    
    sendEnergy(){
        this.output.playNote("C3", "1", {velocity: this.convertToVelocity(this.energy)});
    }

    sendValence(){
        this.output.playNote("D3", "2", {velocity: this.convertToVelocity(this.valence)});
    }

    sendPlay(){
        this.output.playNote("C3", "10");
    }
    sendPause(){
        this.output.playNote("C3", "11");
    }
   
 
    setEnergy(amount){
       
        if (amount > 1){
            amount = 1; 
        }
        else if (amount < -1){
            amount = -1; 
        }
        if(this.energy == amount){
            return
        }
        
        this.energy = amount;
     
        //this.sendEnergy(); 
        //console.log("Energy: " + this.energy)
        //amount should be between 0 and 1
        // if(Math.abs(this.energy) <= Math.abs(amount) && Math.abs(this.energy) >= 0) {
        //     console.log(this.energy)
        //     let dist = amount - this.energy;
        //     let inc = dist/10; 
        //     this.energy += inc; 
        //     if(this.energy > 1){
        //         this.energy = 1; 
        //     }
        //     else if(this.energy < -1){
        //         this.energy = -1;
        //     }
        //     this.sendEnergy(); 
        // }
        
    }
    setValence(amount){
        
        if (amount > 1){
            amount = 1; 
        }
        else if (amount < -1){
            amount = -1; 
        }
        if(this.valence ==  amount){
            return 
        }

        this.valence = amount; 
       
    }
    setVelocity(amount){
        
        if (amount > 0.8){
            amount = 0.8; 
        }
        else if (amount < 0.1){
            amount = 0.1; 
        }
        if(this.velocity ==  amount){
            return 
        }

        this.velocity = amount; 
       
    }
 
   
}