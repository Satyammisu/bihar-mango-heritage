let currentSlide = 0;

function autoSlide() {

    const cards =
        document.querySelectorAll(".card");

    cards.forEach(card => {
        card.style.display = "none";
    });

    currentSlide++;

    if(currentSlide > cards.length){
        currentSlide = 1;
    }

    cards[currentSlide - 1]
        .style.display = "block";

    setTimeout(
        autoSlide,
        3000
    );
}

window.onload = () => {

    autoSlide();

};