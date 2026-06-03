async function changeLanguage(lang) {

    try {

        const response = await fetch(`lang/${lang}.json`);

        const data = await response.json();

        localStorage.setItem(
            "selectedLanguage",
            lang
        );

        if (document.getElementById("main_title"))
            document.getElementById("main_title").innerText =
                data.site_title;

        if (document.getElementById("welcome"))
            document.getElementById("welcome").innerText =
                data.welcome;

        if (document.getElementById("explore"))
            document.getElementById("explore").innerText =
                data.explore;

        if (document.getElementById("ai_title"))
            document.getElementById("ai_title").innerText =
                data.ai_title;

        if (document.getElementById("askBtn"))
            document.getElementById("askBtn").innerText =
                data.ask_button;

    } catch (err) {

        console.log(err);

    }
}

window.onload = function () {

    let lang =
        localStorage.getItem("selectedLanguage")
        || "en";

    changeLanguage(lang);

};