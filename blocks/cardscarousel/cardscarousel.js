import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  block.parentElement.classList.add('glide');
  block.parentElement.classList.add('hero');
  block.classList.add('glide__track');
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
  block.append(ul);
}