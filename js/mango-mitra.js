async function askMangoMitra() {

    const question =
        document.getElementById("question").value;

    const answerDiv =
        document.getElementById("answer");
        speechSynthesis.speak(
    new SpeechSynthesisUtterance(answer)
);

    answerDiv.innerHTML = "Thinking...";

    try {

        const response =
            await fetch(
                "http://127.0.0.1:8000/ask?question="
                + encodeURIComponent(question)
            );

        const data =
            await response.json();

        answerDiv.innerHTML =
            data.answer;

    }

    catch(error){

        console.log(error);

        answerDiv.innerHTML =
            "AI Mango Mitra unavailable.";

    }

}