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
    }
    else {
        document.title = "Velozes & Furiosos | " + section;
    }
}