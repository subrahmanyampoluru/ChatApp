export function compare(a, b) {
  const objA = a.name.toUpperCase();
  const objB = b.name.toUpperCase();

  let comparison = 0;
  if (objA > objB) {
    comparison = 1;
  } else if (objA < objB) {
    comparison = -1;
  }
  return comparison;
}