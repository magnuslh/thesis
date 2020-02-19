

console.log(synth)
navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {

    console.log(midiAccess);

    let inputs = midiAccess.inputs;
    let outputs = midiAccess.outputs;

    console.log(outputs)
    for (var input of inputs.values()){
        input.onmidimessage = getMIDIMessage;
    }

}

function getMIDIMessage(midiMessage) {
    console.log(midiMessage);
    
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}