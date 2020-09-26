export function plural(count, a, b, c) {
  if(count == 1) {
    return a;
  }
  if(count <= 4) {
    return b;
  }
  return c;
}
