function startExperience(){

    const audio =
    document.getElementById(
        "birdsAudio"
    );

    audio.play();

    const msg =
    new SpeechSynthesisUtterance(
        "Welcome to Bihar Mango Heritage. Explore the rich mango traditions of Bihar."
    );

    speechSynthesis.speak(msg);

}