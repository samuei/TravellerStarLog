import { useEffect, useState } from 'react';
import { parseT5FileIntoMapObject } from './T5Import.jsx';

const TravellerMapImport = (props) => {
    const [response, setResponse] = useState(null);

    const BtnFn = async () => {
        let res = await fetch('https://travellermap.com/data/sector/subsector/tab?sector=Spinward%20Marches&subsector=Regina');

        try {
            if (!res.ok) {
                console.error(res);
            } else {
                res = await res.text();
                console.log(res);
                console.log(parseT5FileIntoMapObject(res));
                setResponse(true);
            }
        } catch (e) {
            console.error('Caught!', e);
        }
    };

    return (
        <div>
            <button onClick={BtnFn} > DO THING </button>
            <span style={{ color: 'white' }}>
                {
                    response
                        ? 'Got something!'
                        : 'No response'
                }
            </span>
        </div>
    )
};
export default TravellerMapImport;
