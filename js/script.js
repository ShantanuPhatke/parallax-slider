const select = (element) => document.querySelector(element)

const getTranslateX = (element) => {
  let style = window.getComputedStyle(element)
  let matrix = new WebKitCSSMatrix(style.transform)
  return matrix.m41
}

const nextSlide = (imgNo) => {
  let currentTranslateX = getTranslateX(select(`#img-${imgNo}`))
  select(
    `#img-${imgNo}`
  ).style.transform = `translateX(calc(${currentTranslateX}px - 16.67%))`
}

const previousSlide = (imgNo) => {
  let currentTranslateX = getTranslateX(select(`#img-${imgNo}`))
  select(
    `#img-${imgNo}`
  ).style.transform = `translateX(calc(${currentTranslateX}px + 16.67%))`
}

const disableClick = () =>
  (select("#parallax_slider").style.pointerEvents = "none")

const enableClick = () =>
  (select("#parallax_slider").style.pointerEvents = "auto")

const removeScrollListener = () =>
  document.removeEventListener("scroll", initAnimation)

let counter = 0

const initAnimation = () => {
  console.log("initAnimation")
  if (counter == 0 && isInViewport()) {
    console.log("inViewPort")
    const refreshInterval = setInterval(() => {
      if (isInViewport()) {
        counter++
        if (counter === 5) {
          select("#previous-btn").style.visibility = "visible"
          select("#next-btn").style.visibility = "hidden"
          clearInterval(refreshInterval)
        }
        nextSlide(3)
        setTimeout(() => {
          nextSlide(2)
        }, 200)
        setTimeout(() => {
          nextSlide(1)
        }, 400)
      }
    }, 2500)

    removeScrollListener()
  }
}

const isInViewport = () => {
  const parallax_slider = select("#parallax_slider")
  const rect = parallax_slider.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

document.addEventListener("DOMContentLoaded", initAnimation)

select("#next-btn").addEventListener("click", () => {
  disableClick() // Disables clicks on the slider as the animation starts

  counter++
  if (counter != 0) {
    select("#previous-btn").style.visibility = "visible"
  }
  if (counter === 5) {
    select("#next-btn").style.visibility = "hidden"
  }

  nextSlide(3)
  setTimeout(() => {
    nextSlide(2)
  }, 300)
  setTimeout(() => {
    nextSlide(1)
  }, 400)

  // Enables clicks on the slider after animation is completed
  setTimeout(() => {
    enableClick()
  }, 1400)
})

select("#previous-btn").addEventListener("click", () => {
  disableClick() // Disables clicks on the slider as the animation starts

  counter--
  if (counter != 5) {
    select("#next-btn").style.visibility = "visible"
  }
  if (counter === 0) {
    select("#previous-btn").style.visibility = "hidden"
  }

  previousSlide(3)
  setTimeout(() => {
    previousSlide(2)
  }, 300)
  setTimeout(() => {
    previousSlide(1)
  }, 400)

  // Enables clicks on the slider after animation is completed
  setTimeout(() => {
    enableClick()
  }, 1400)
})
