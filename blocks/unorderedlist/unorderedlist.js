import { generateLiHtmml } from "../listitem/listitem.js";

export default function decorate(block) {
    const ulblock = document.createElement('ul');
    
    const liBlock = generateLiHtmml(block);
    ulblock.append(liBlock);

    block.innerHTML = ""
    block.insertAdjacentElement('afterbegin', ulblock);
}
  