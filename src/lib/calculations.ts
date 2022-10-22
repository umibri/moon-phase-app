export const fixangle = (num: number) => num - 360.0 * Math.floor(num / 360.0);
export const torad = (num: number) => num * Math.PI / 180.0;
export const todeg = (num: number) => num * 180.0 / Math.PI;
export const kepler = (num: number, ecc: number) => {
  const epsilon = 1e-6;
  let e = torad(num);
  const eInitial = e;

  while (true) {
    const delta = e - ecc * Math.sin(e) - eInitial;
    e -= delta / (1.0 - ecc * Math.cos(e));

    if (Math.abs(delta) <= epsilon) {
      break;
    }
  }

  return e;
}