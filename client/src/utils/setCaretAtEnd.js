export default el => {
  el.focus();
  let range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
};
