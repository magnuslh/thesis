
import WebMidi from 'webmidi';

export default class EmotionController {
    constructor(){
        this.output = WebMidi.outputs[1];
     
    }


    sendSad(){
        console.log("Sent sad")
        this.output.playNote("C3");
    }
    sendHappy(){
        console.log("Sent happy")
        this.output.playNote("D3");
    }
}