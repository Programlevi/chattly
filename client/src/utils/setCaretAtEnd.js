export default (node) => {
  node.focus();
  let textNode;
  if (node.lastChild.nodeName === 'BR') {
    textNode = node.lastChild.previousSibling;
  }
  let range = document.createRange();
  range.selectNodeContents(textNode);
  range.collapse(false);
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
};
