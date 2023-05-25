function validUri(uri) {
  if (typeof uri == undefined || uri.length == 0) return false;
  return true;
}

export { validUri };