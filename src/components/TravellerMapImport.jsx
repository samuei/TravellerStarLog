import { useContext, useEffect, useState } from 'react';
import { parseT5FileIntoMapObject } from './T5Import.jsx';
import { starLogContext } from './starLogContext.js';

const milieuxDescriptions = new Map([
    ['M1105', 'The golden age of the Third Imperium was the original setting of Traveller'],
    ['IW', 'The Interstellar Wars period begins with first contact between Terra and the Ziru Sirka, the First Imperium. It is the setting of the GURPS 4th edition Traveller content'],
    ['M0', 'Milieu 0 describes the founding of the Third Imperium. It was detailed for T4, also known as Marc Miller\'s Traveller'],
    ['M990', 'The Solomani Rim War was the setting for the Traveller D20 system'],
    ['M1120', 'The Rebellion was the setting of MegaTraveller'],
    ['M1201', 'The "New Era" of Traveller: The New Era'],
    ['M1248', 'The Fourth Imperium was a setting of Traveller: The New Era'],
    ['M1900', 'The Galaxiad was a T5 setting in the distant future of the distant future'],
]);

// TODO: Handle errors, use suspense while loading
const TravellerMapImport = () => {
    const [milieux, setMilieux] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [selectedMilieu, setSelectedMilieu] = useState(null);
    const [selectedSector, setSelectedSector] = useState(null);

    const context = useContext(starLogContext);

    const getMilieux = async () => {
        // https://travellermap.com/doc/api#milieux-return-a-list-of-all-milieux
        let res = await fetch('https://travellermap.com/api/milieux');

        try {
            if (!res.ok) {
                console.error(res);
            } else {
                res = await res.json();
                setMilieux(res?.map((m) => m.Code) ?? []);
            }
        } catch (e) {
            console.error('Caught!', e);
        }
    };

    const handleChangeMilieu = async (e) => {
        setSelectedSector(null);
        setSectors([]);

        const value = e.target.value;
        setSelectedMilieu(value);
        // If data looks wonky, there is a Tag parameter that may be able to limit this to official content only
        // https://travellermap.com/doc/api#universe-return-a-list-of-all-sectors
        let res = await fetch(`https://travellermap.com/api/universe?milieu=${value}&requireData=1`);

        try {
            if (!res.ok) {
                console.error(res);
            } else {
                res = await res.json();
                const newSectors = res?.Sectors.map((s) => {
                    // This can be language-differentiated. If that becomes a problem, fix it here.
                    const name = s.Names[0]?.Text ?? s.Abbreviation;
                    return {
                        name,
                        abbreviation: s.Abbreviation,
                    };
                });

                setSectors(newSectors);
            }
        } catch (e) {
            console.error('Caught!', e);
        }
    };

    const handleChangeSector = async (e) => {
        const value = e.target.value;
        setSelectedSector(value);

        // https://travellermap.com/doc/api#metadata-retrieve-metadata-for-a-sector
        let res = await fetch(`https://travellermap.com/data/sector/tab?sector=${value}&milieu=${selectedMilieu}`);

        try {
            if (!res.ok) {
                console.error(res);
            } else {
                res = await res.text();
                const mapObj = parseT5FileIntoMapObject(res);

                context.setMapObject(mapObj);
                context.setAppMode('menu');
                // TODO: Get Allegiances
            }
        } catch (e) {
            console.error('Caught!', e);
        }
    };

    useEffect(() => {
        getMilieux();
    }, []);

    return (
        <div
            className='main-menu'
        >
            <button
                onClick={() => {
                    context.setAppMode('menu');
                }}
            >
                ← Back
            </button>
            <label>
                Milieu
                <select
                    onChange={handleChangeMilieu}
                    value={selectedMilieu || ''}
                >
                    <option disabled />
                    {
                        milieux.map((m) => {
                            const desc = milieuxDescriptions.get(m);
                            return (
                                <option
                                    key={m}
                                    value={m}
                                >
                                    {`${m}${desc ? ': ' + desc : ''}`}
                                </option>
                            );
                        })
                    }
                </select>
            </label>
            {
                sectors.length
                    ? (
                        <label>
                            Sector
                            <select
                                onChange={handleChangeSector}
                                value={selectedSector || ''}
                            >
                                <option disabled />
                                {
                                    sectors.map((sector) => {
                                        return (
                                            <option
                                                key={sector.abbreviation}
                                                value={sector.abbreviation}
                                            >
                                                {sector.name}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </label>
                    ) : null
            }
        </div>
    )
};
export default TravellerMapImport;
