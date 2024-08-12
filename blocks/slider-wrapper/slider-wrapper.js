import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  ul.classList.add('slider__track');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'slider-wrapper-image';
      else div.className = 'slider-wrapper-body';
    });
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
  const sliderNavDiv = document.createElement('div');
  sliderNavDiv.classList.add('slider__buttons');
  block.append(sliderNavDiv);
  const sliderNavBtnprev = document.createElement('button');
  sliderNavBtnprev.classList.add('slider__button-prev');
  sliderNavBtnprev.innerText = "previous";
  sliderNavBtnprev.setAttribute("disabled", "");
  sliderNavDiv.append(sliderNavBtnprev);
  const sliderNavBtnnext = document.createElement('button');
  sliderNavBtnnext.classList.add('slider__button-next');
  sliderNavBtnnext.innerText = "next";
  sliderNavDiv.append(sliderNavBtnnext);

}

setTimeout(function () {
  const slider = document.querySelector(".slider-wrapper");
  const track = slider.querySelector(".slider__track");
  const prev = slider.querySelector(".slider__button-prev");
  const next = slider.querySelector(".slider__button-next");


  if (track) {
    prev.addEventListener("click", () => {
      next.removeAttribute("disabled");

      track.scrollTo({
        left: track.scrollLeft - track.firstElementChild.offsetWidth,
        behavior: "smooth"
      });
    });

    next.addEventListener("click", () => {
      prev.removeAttribute("disabled");

      track.scrollTo({
        left: track.scrollLeft + track.firstElementChild.offsetWidth,
        behavior: "smooth"
      });
    });

    track.addEventListener("scroll", () => {
      const trackScrollWidth = track.scrollWidth;
      const trackOuterWidth = track.clientWidth;

      prev.removeAttribute("disabled");
      next.removeAttribute("disabled");

      if (track.scrollLeft <= 0) {
        prev.setAttribute("disabled", "");
      }

      if (track.scrollLeft === trackScrollWidth - trackOuterWidth) {
        next.setAttribute("disabled", "");
      }
    });
  }

}, 500)
