export default (str) => {
  return str.replace(/<br\s*\/?>/gm, '\n');
};
