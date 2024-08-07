export default function generateLiHtmml(block){
  var blockChildren = block.querySelector('div');
  const props = Array.from(blockChildren.children, (row) => row);
  const [image, text] = props;

  const liblock = document.createElement('li');
  liblock.innerHTML = image.innerHTML;
  liblock.innerHTML += text.innerHTML;

  return liblock;

}