import { useContext } from 'react';
import { starlogContext } from './starlogContext.js';
import Papa from 'papaparse';

const T5Import = () => {
    const context = useContext(starlogContext);

    return (
        <div>
            <button
                onClick={() => {
                    context.setAppMode('menu');
                }}
            >
                {'<- Back'}
            </button>
            <label>
                Upload
                <input
                    type='file'
                    onChange={(e) => {
                        //e.target.files
                        e.target.files[0].text().then((dataFile) => {
                            const file = Papa.parse(dataFile, {
                                skipEmptyLines: 'greedy',
                                header: true,
                            });
                            console.log(file);
                            // SAM: file.data has all the shit as a gigantic array. That's how you get the file. ogogogogog
                        });
                    }}
                />
            </label>
            <label>
                Input
                <input
                    type='textarea'
                    onChange={(e) => {
                        console.log(e);
                    }}
                />
            </label>
        </div>
    );
};
export default T5Import;
