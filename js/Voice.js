function startVoiceInput() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice recognition not supported in this browser.");
        return;
    }

    const recognition =
        new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.start();

    recognition.onresult = function(event) {

        const text =
            event.results[0][0].transcript;

        document.getElementById("question").value =
            text;

        askMangoMitra();
    };

}