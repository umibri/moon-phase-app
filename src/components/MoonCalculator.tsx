import React, { useState } from "react";
import { MoonPhases as MP, EmptyMoonData as EMD} from '@lib/constants';
import { getJD, getDate } from '@lib/utils'
import { MoonData } from '@lib/types'

export default function MoonCalculator() {
  const startDate = getDate();
  const [displayDate, setDisplayDate] = useState(startDate);
  const [inputDate, setInputDate] = useState('');
  const [moonPhaseText, setMoonPhaseText] = useState('');
  const [moonData, setMoonData] = useState<MoonData>(EMD);

  async function handlePhaseChange(event?: React.MouseEvent<HTMLButtonElement>, date?: Date) {
    event?.preventDefault();

    const jdVal = typeof date === 'undefined' ? getJD(displayDate) : getJD(date);
    const data = { jd: jdVal };
    const endpoint = '/api/calculatePhase';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const res = await fetch(endpoint, options);
    const result = await res.json();

    setTimeout(() => setMoonData(result), 300);
    setTimeout(() => setMoonPhaseText(convertPhaseString(result.phase)), 300);
  }


  function handleInputPhaseChange() {
    if (inputDate === '') { 
      clearMoonData();
      setMoonPhaseText('ERROR: EMPTY INPUT DATE');
      return; 
    }

    const newDate = new Date(inputDate + 'T20:00Z');
    setDisplayDate(newDate);
    handlePhaseChange();
  }

  function convertPhaseString(res: number) {
    let returnStr = '';
    let prev = MP[0].illuminated;

    for (const { phaseText, illuminated } of MP) {
      returnStr = phaseText;

      if (res > prev && res < illuminated) {
        break;
      
      } else {
        prev = illuminated;
      }
    }

    return returnStr;
  }

  function clearMoonData() {
    setDisplayDate(startDate);
    setMoonPhaseText('');
    setMoonData(EMD);
  }


  return (
    <div className="desktop:w-1/2 w-[90%] h-1/4 my-16">
      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
        <div>
          <p>{startDate.toDateString()}</p>

          <div className="text-center my-4">
            <button className="py-2 px-4 bg-slate-500 text-sm" onClick={(e) => handlePhaseChange(e, startDate)}>{`Today's Phase`}</button>
          </div>
        </div>


        <div className="flex flex-col">
          <input className="mb-4" type="date" onChange={(event) => setInputDate(event.target.value)}/>
          <button className="py-2 px-4 bg-slate-500 text-sm" onClick={handleInputPhaseChange}>Calculate Phase</button>
        </div>
      </div>


      <div>
        { 
          moonPhaseText !== 'ERROR: EMPTY INPUT DATE' && <p className="text-center mb-2">{displayDate.toDateString()}</p>
        }

        <div className="bg-slate-400 text-center">{moonPhaseText}</div>
          {
            Object.keys(moonData).map((item, index) => {
              return(
                <div key={index}>
                  <div>{item}: {moonData[item]}</div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}