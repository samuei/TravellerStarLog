import { useContext } from 'react';
import { starLogContext } from './components/starLogContext.js';

export const JsonImport = () => {
    const context = useContext(starLogContext);

    return (
        <div className="main-menu">
            <button
                onClick={() => {
                    context.setAppMode('menu');
                }}
            >
                ← Back
            </button>
            <label>
                Upload
                <input
                    type="file"
                    onChange={(e) => {
                        e.target.files[0].text().then((dataFile) => {
                            const mapObj = JSON.parse(dataFile);
                            context.setMapObject(mapObj);
                            context.setAppMode('menu');
                        });
                    }}
                />
            </label>
        </div>
    );
};
