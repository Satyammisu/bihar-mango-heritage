function speakAnswer(text){

    speechSynthesis.cancel();

    const msg =
    new SpeechSynthesisUtterance(text);

    msg.rate = 1;

    msg.pitch = 1;

    msg.volume = 1;

    speechSynthesis.speak(msg);

}

function startVoiceInput(){

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if(!SpeechRecognition){

        alert(
            "Voice recognition not supported."
        );

        return;
    }

    const recognition =
        new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.start();

    recognition.onresult =
    function(event){

        const text =
        event.results[0][0].transcript;

        document.getElementById(
            "question"
        ).value = text;

        askMangoMitra();

    };

}
