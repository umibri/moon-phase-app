import type { NextApiRequest, NextApiResponse } from 'next'
import { AstronomicalConstants as AC, PrecisionConstants as PC } from '@lib/constants';
import { fixangle, torad, todeg, kepler } from '@lib/calculations';

type Data = {
  message: number
}

interface MoonData {
  [key: string]: number;
  phase: number,
  illuminated: number,
  age: number,
  distance: number,
  angular_diameter: number,
  sun_distance: number,
  sun_angular_diameter: number,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MoonData>
) {
  // res.status(200).json({ name: 'John Doe' })
  const input = req.body.jd;
  const output = displayPhase(input);

  res.status(200).json(output);
}


function displayPhase(jd: number): MoonData {
  const day = jd - AC.epoch;
  const N = fixangle((360 / 365.2422) * day);
  const M = fixangle(N + AC.ecliptic_longitude_epoch - AC.ecliptic_longitude_perigee);

  let Ec = kepler(M, AC.eccentricity);
  Ec = Math.sqrt((1 + AC.eccentricity) / (1 - AC.eccentricity)) * Math.tan(Ec/2.0);
  Ec = 2 * todeg(Math.atan(Ec));
  
  const lambda_sun = fixangle(Ec + AC.ecliptic_longitude_perigee);
  const F = ((1 + AC.eccentricity * Math.cos(torad(Ec))) / (1 - AC.eccentricity**2))
  const sun_dist = AC.sun_smaxis / F;
  const sun_angular_diameter = F * AC.sun_angular_size_smaxis;
  
  const moon_longitude = fixangle(13.1763966 * day + AC.moon_mean_longitude_epoch);
  const MM = fixangle(moon_longitude - 0.1114041 * day - AC.moon_mean_perigee_epoch);
  const evection = 1.2739 * Math.sin(torad(2*(moon_longitude - lambda_sun) - MM));
  const annual_eq = 0.1858 * Math.sin(torad(M));
  const A3 = 0.37 * Math.sin(torad(M));
  const MmP = MM + evection - annual_eq - A3;
  const mEc = 6.2886 * Math.sin(torad(MmP));
  const A4 = 0.214 * Math.sin(torad(2 * MmP));
  const lP = moon_longitude + evection + mEc - annual_eq + A4;
  const variation = 0.6583 * Math.sin(torad(2*(lP - lambda_sun)));
  const lPP = lP + variation;

  const moon_age = lPP - lambda_sun;
  const moon_phase = (1 - Math.cos(torad(moon_age))) / 2.0;
  const moon_dist = (AC.moon_smaxis * (1 - AC.moon_eccentricity**2)) / (1 + AC.moon_eccentricity * Math.cos(torad(MmP + mEc)))
  const moon_diam_frac = moon_dist / AC.moon_smaxis;
  const moon_angular_diameter = AC.moon_angular_size / moon_diam_frac;
  
  const res = {
    phase: fixangle(moon_age) / 360.0,
    illuminated: moon_phase,
    age: AC.synodic_month * fixangle(moon_age) / 360.0,
    distance: moon_dist,
    angular_diameter: moon_angular_diameter,
    sun_distance: sun_dist,
    sun_angular_diameter: sun_angular_diameter,
  }

  return res;
}