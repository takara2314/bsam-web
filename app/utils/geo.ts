import { degToRad } from './math';

// Long radius of the earth [m]
const GRS80_A = 6378137.000;
// First eccentricity of the earth [m] (e^2)
const GRS80_E2 = 0.00669438002301188;

// calcDistance calculates the distance between two points on the earth.
export const calcDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const my = degToRad((lat1 + lat2) / 2);
  const dy = degToRad(lat1 - lat2);
  const dx = degToRad(lng1 - lng2);

  // Calculate prime vertical circle radius
  const w = Math.sqrt(1 - GRS80_E2 * Math.pow(Math.sin(my), 2));

  // Calculate meridian curvature radius
  const m = GRS80_A * (1 - GRS80_E2) / Math.pow(w, 3);

  // Calculate the distance using Hybeny's Distance Formula
  const dym = dy * m;
  const dxnCos = dx * Math.cos(my) * GRS80_A / w;
  const distance = Math.sqrt(Math.pow(dym, 2) + Math.pow(dxnCos, 2));

  return distance;
};
