export const AstronomicalConstants = {
  epoch: 2444238.5,
  ecliptic_longitude_epoch: 278.833540,
  ecliptic_longitude_perigee: 282.596403,
  eccentricity: 0.016718,
  sun_smaxis: 1.49585e8,
  sun_angular_size_smaxis: 0.533128,
  moon_mean_longitude_epoch: 64.975464,
  moon_mean_perigee_epoch: 349.383063,
  node_mean_longitude_epoch: 151.950429,
  moon_inclination: 5.145396,
  moon_eccentricity: 0.054900,
  moon_angular_size: 0.5181,
  moon_smaxis: 384401.0,
  moon_parallax: 0.9507,
  synodic_month: 29.53058868,
  lunations_base: 2423436.0,
  earth_radius: 6378.16,
} as const;

export const PrecisionConstants = {
  PRECISION: 0.05,
  NEW: 0 / 4.0,
  FIRST: 1 / 4.0,
  FULL: 2 / 4.0,
  LAST: 3 / 4.0,
  NEXTNEW: 4 / 4.0,
} as const;

const MoonPhases = [
  {
    phaseText: 'New Moon',
    illuminated: PrecisionConstants.NEW + PrecisionConstants.PRECISION,
  },
  {
    phaseText: 'Waxing Crescent',
    illuminated: PrecisionConstants.FIRST - PrecisionConstants.PRECISION,
  },
  {
    phaseText: 'First Quarter',
    illuminated: PrecisionConstants.FIRST + PrecisionConstants.PRECISION,
  },
  {
    phaseText: 'Waxing Gibbous',
    illuminated: PrecisionConstants.FULL - PrecisionConstants.PRECISION,
  },
  {
    phaseText: 'Full Moon',
    illuminated: PrecisionConstants.FULL + PrecisionConstants.PRECISION,
  },
  {
    phaseText: 'Waning Gibbous',
    illuminated: PrecisionConstants.LAST - PrecisionConstants.PRECISION,
  },
  {
    phaseText: 'Last Quarter',
    illuminated: PrecisionConstants.LAST + PrecisionConstants.PRECISION,
  },
  {
    phaseText: 'Waning Crescent',
    illuminated: PrecisionConstants.NEXTNEW - PrecisionConstants.PRECISION,
  },
  {
    phaseText: 'New Moon',
    illuminated: PrecisionConstants.NEXTNEW + PrecisionConstants.PRECISION,
  }
] as const;