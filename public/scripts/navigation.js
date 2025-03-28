function smoothScroll(targetId) {
    var targetPosition;

    if (targetId === '#main-cover') {
        targetPosition = 0;
    } else {
        var target = document.querySelector(targetId);
        targetPosition = target.offsetTop;
    }

    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var duration = 800;
    var start = null;

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) { 
            start = timestamp 
        };

        var progress = timestamp - start;
        var percent = Math.min(progress / duration, 1);

        window.scrollTo(0, startPosition + distance * percent);

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    });
}

function changeTitle(section) {
    if (!section) {
        document.title = "Velozes & Furiosos";
    } else {
        document.title = "Velozes & Furiosos | " + section;
    }
}

function enviarPergunta() {
    let question = document.getElementById("question-content").value.trim();
    let message = document.getElementById("message");

    if (!question) {
        console.log("Por favor, digite uma pergunta.");
        // message.innerText = "Por favor, digite uma pergunta.";
        return;
    }

    console.log("Pergunta enviada:", question);
    // message.style.color = "green";
    // message.innerText = "Pergunta enviada com sucesso!";

    document.getElementById("question-content").value = "";
}