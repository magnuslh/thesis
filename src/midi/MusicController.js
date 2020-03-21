import Tone from 'tone'
import WebMidi from 'webmidi';
import C2Sample from '@/midi/samples/piano/C2.ogg'
import C3Sample from '@/midi/samples/piano/C3.ogg'
import C4Sample from '@/midi/samples/piano/C4.ogg'
import C5Sample from '@/midi/samples/piano/C5.ogg'


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
            
            if (err) {
                console.log("WebMidi could not be enabled.", err);
            }
            this.output = WebMidi.outputs[1];
            this.energy = 0;
            this.valence = 0; 
            this.velocity = 0.5; 
            this.sendRate = 0.1;
            this.delay = 0
            //Initiate playback 
            this.sendPause();
            this.sendValence(); 
            this.sendEnergy();
            this.sendPlay(); 
            this.startSend(); 
      
         
           
            //this.synth = new Tone.PolySynth( 10, Tone.FMSynth, this.params).toMaster();
            this.sampler = new Tone.Sampler({
                "C3": C3Sample,
                "C2": C2Sample, 
                "C4": C4Sample, 
                "C5": C5Sample,
              
            }, 
                this.setListeners()
            ).toMaster(); 
           
        
            
            
        
        })
        
        

     
    }

    setListeners(){
        console.log(this)
        console.log(this.sampler)
        this.input = WebMidi.inputs[0];//find(i => i.name == "loopMIDI");
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
        console.log("E: " + Math.round(this.energy*100)/100 + ",   V: " + Math.round(this.valence*100)/100)
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
        //this.sendValence(); 
        //console.log("Valence: " + this.valence)
        //amount should be the intended amount, but i will smooth it in this function
    
        // if(Math.abs(this.valence) <= Math.abs(amount) && Math.abs(this.valence) >= 0) {
            
        //     let dist = amount - this.valence;
        //     let inc = dist/10; 
        //     this.valence += inc;  
        //     if(this.valence > 1){
        //         this.valence = 1; 
        //     }
        //     else if(this.valence < -1){
        //         this.valence = -1;
        //     }
        //     this.sendValence(); 
        // }
    }
    setVelocity(amount){
        
        if (amount > 1){
            amount = 1; 
        }
        else if (amount < 0.1){
            amount = 0.1; 
        }
        if(this.velocity ==  amount){
            return 
        }

        this.velocity = amount; 
        //this.sendValence(); 
        //console.log("Valence: " + this.valence)
        //amount should be the intended amount, but i will smooth it in this function
    
        // if(Math.abs(this.valence) <= Math.abs(amount) && Math.abs(this.valence) >= 0) {
            
        //     let dist = amount - this.valence;
        //     let inc = dist/10; 
        //     this.valence += inc;  
        //     if(this.valence > 1){
        //         this.valence = 1; 
        //     }
        //     else if(this.valence < -1){
        //         this.valence = -1;
        //     }
        //     this.sendValence(); 
        // }
    }
 
   
}