async function askMangoMitra() {

    const question =
        document.getElementById("question").value;

    const answerBox =
        document.getElementById("answer");

    if(!question){
        answerBox.innerHTML =
        "Please enter a question.";
        return;
    }

    answerBox.innerHTML =
    "🤖 Bihar Mango Mitra is thinking...";

    try {

        const response =
        await fetch(
            "http://127.0.0.1:8000/ask?question=" +
            encodeURIComponent(question)
        );

        const data =
        await response.json();

        answerBox.innerHTML =
        data.answer;

        speakAnswer(data.answer);

    }

    catch(error){

        answerBox.innerHTML =
        "❌ Unable to connect to AI Mango Mitra";

        console.error(error);

    }

}
