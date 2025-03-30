async function enviarPergunta() {
    const question = document.getElementById("question-content").value;

    if (!question.trim()) {
        alert("Digite uma pergunta antes de enviar.");
        return;
    }

    document.getElementById('send-button').disabled = true;
    document.getElementById('view-questions').style.pointerEvents = 'none';

    try {
        await fetch("http://localhost:5000/questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question }),
        });

        document.getElementById("question-content").value = "";
        alert("Pergunta enviada!");

    } catch (error) {
        alert("Ocorreu um erro ao enviar a pergunta.");
    } finally {
        document.getElementById('send-button').disabled = false;
        document.getElementById('view-questions').style.pointerEvents = 'auto';
    }
}