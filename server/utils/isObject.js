module.exports = variable => {
  if (typeof variable === 'object' && variable !== null) {
    return true;
  }
  return false;
};
