import { useState } from "react";
import { AstronomicalConstants as AC, PrecisionConstants as PC } from '@lib/constants';
import { fixangle, torad, todeg, kepler } from '@lib/calculations';
import { getJD, getDate } from '@lib/api'

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

interface MoonPhase {
  [key: string]: string | number;
  phaseText: string;
  illuminated: number;
}

export default function Moon() {
  const [displayDate, setDisplayDate] = useState(getJD);
  const [moonPhaseText, setMoonPhaseText] = useState('');
  const [textRes, setTextRes] = useState<MoonData>({
    phase: 0,
    illuminated: 0,
    age: 0,
    distance: 0,
    angular_diameter: 0,
    sun_distance: 0,
    sun_angular_diameter: 0,
  });

  const moonPhases: MoonPhase[] = [
    {
      phaseText: 'New Moon',
      illuminated: PC.NEW + PC.PRECISION,
    },
    {
      phaseText: 'Waxing Crescent',
      illuminated: PC.FIRST - PC.PRECISION,
    },
    {
      phaseText: 'First Quarter',
      illuminated: PC.FIRST + PC.PRECISION,
    },
    {
      phaseText: 'Waxing Gibbous',
      illuminated: PC.FULL - PC.PRECISION,
    },
    {
      phaseText: 'Full Moon',
      illuminated: PC.FULL + PC.PRECISION,
    },
    {
      phaseText: 'Waning Gibbous',
      illuminated: PC.LAST - PC.PRECISION,
    },
    {
      phaseText: 'Last Quarter',
      illuminated: PC.LAST + PC.PRECISION,
    },
    {
      phaseText: 'Waning Crescent',
      illuminated: PC.NEXTNEW - PC.PRECISION,
    },
    {
      phaseText: 'New Moon',
      illuminated: PC.NEXTNEW + PC.PRECISION,
    }
  ];



  function displayPhase(jd: number) {
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
  
    const res : MoonData = {
      phase: fixangle(moon_age) / 360.0,
      illuminated: moon_phase,
      age: AC.synodic_month * fixangle(moon_age) / 360.0,
      distance: moon_dist,
      angular_diameter: moon_angular_diameter,
      sun_distance: sun_dist,
      sun_angular_diameter: sun_angular_diameter,
    }
  
    setMoonPhaseText(printString(res.phase));
    setTextRes(res);
  }

  const [startDate, setStartDate] = useState('');

  function handleClicks() {
    if (startDate === '') { return; }

    const newDate = new Date(startDate + 'T00:00Z');
    displayPhase(getJD(newDate));
  }

  function printString(res: number) {
    let returnStr = '';
    let prev = moonPhases[0].illuminated;

    for (const { phaseText, illuminated } of moonPhases) {
      if (res > prev && res < illuminated) {
        returnStr = phaseText;
        break;
      
      } else {
        prev = illuminated;
      }
    }

    return returnStr;
  }


  return (
    <div className="w-1/2 h-1/2">
      <div>
        <div className="text-center">Todays Date: {getDate()}</div>

        <div className="text-center my-4">
        <button className="py-2 px-4 bg-slate-500" onClick={() => displayPhase(displayDate)}>Phase</button>
        </div>

        <div>
          <input type="date" onChange={(event) => setStartDate(event.target.value)}/>
          <button onClick={() => handleClicks}>Click me with date</button>
        </div>
        

        <div className="bg-slate-400 text-center">{moonPhaseText}</div>
        {
          Object.keys(textRes).map((item, index) => {
            return(
              <div key={index}>
                <div>{item}: {textRes[item]}</div>
              </div>
            )
          })
        }
      </div>

      
    </div>
  )
}