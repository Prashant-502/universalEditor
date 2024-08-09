import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import Glide from './glide.js';

export default function decorate(block) {
  /* change to ul, li */
  // block.parentElement.classList.add('glide');
  // block.parentElement.classList.add('carouselinitializer');
  // block.classList.add('glide__track');
  // block.setAttribute("data-glide-el", "track");
  const ul = document.createElement('ul');
  ul.classList.add('glide__slides');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('glide__slide');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cardscarousel-cardcarouselslide-image';
      else div.className = 'cardscarousel-cardcarouselslide-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  const div = document.createElement('div');
  div.classList.add('glide__track')
  div.setAttribute('data-glide-el', 'track')
  div.append(ul)
  block.classList.add('glide','carousel')
  block.append(div);

  // initializer
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        var glideHero =new Glide('.carousel', {
          type: 'carousel',
          animationDuration: 2000,
          autoplay: 4500,
          focusAt: '1',
          startAt: 1,
          perView: 1,
        });
        glideHero.mount();

      }
    });
  });
  slideObserver.observe(block);
}