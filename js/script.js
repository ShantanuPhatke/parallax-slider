const select = element => document.querySelector(element);

const getTranslateX = element => {
    let style = window.getComputedStyle(element);
    let matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
}

const nextSlide = imgNo => {
    let currentTranslateX = getTranslateX(select(`#img-${imgNo}`));
    select(`#img-${imgNo}`).style.transform = `translateX(calc(${currentTranslateX}px - 16.67%))`;
}

const previousSlide = imgNo => {
    let currentTranslateX = getTranslateX(select(`#img-${imgNo}`));
    select(`#img-${imgNo}`).style.transform = `translateX(calc(${currentTranslateX}px + 16.67%))`;
}

let counter = 0;

const refreshInterval = setInterval(() => {
    counter++;
    if (counter === 5) {
        select("#previous-btn").style.visibility = "visible";
        select("#next-btn").style.visibility = "hidden";
        clearInterval(refreshInterval);
    }

    nextSlide(3);
    setTimeout(() => {
        nextSlide(2);
    }, 200);
    setTimeout(() => {
        nextSlide(1);
    }, 400);
}, 3000);



select("#next-btn").addEventListener("click", () => {
    counter++;
    if (counter != 0) {
        select("#previous-btn").style.visibility = "visible";
    }
    if (counter === 5) {
        select("#next-btn").style.visibility = "hidden";
    }

    nextSlide(3);
    setTimeout(() => {
        nextSlide(2);
    }, 300);
    setTimeout(() => {
        nextSlide(1);
    }, 400);
});

select("#previous-btn").addEventListener("click", () => {
    counter--;
    if (counter != 5) {
        select("#next-btn").style.visibility = "visible";
    }
    if (counter === 0) {
        select("#previous-btn").style.visibility = "hidden";
    }

    previousSlide(3);
    setTimeout(() => {
        previousSlide(2);
    }, 300);
    setTimeout(() => {
        previousSlide(1);
    }, 400);
});

