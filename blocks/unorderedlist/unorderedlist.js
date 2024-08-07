import { generateLiHtml } from "../listitem/listitem.js";

export function decorate(block) {
    const ulblock = document.createElement('ul');
    
    const liBlock = generateLiHtml(block);
    ulblock.append(liBlock);

    block.innerHTML = ""
    block.insertAdjacentElement('afterbegin', ulblock);
}
  