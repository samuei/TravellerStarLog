import { useContext, useEffect, useState } from 'react';
import { starLogContext } from './starLogContext.js';
import './HexLogDisplay.css';

const HexLogDisplay = ({
    hexData = {}
}) => {
    const context = useContext(starLogContext);

    const [entries, setEntries] = useState(hexData?.logs ?? []);

    useEffect(() => {
        saveHex();
    }, [entries]);

    const insertEntry = (
        entry={}, index=0, replace=false
    ) => {
        setEntries(
            entries.toSpliced(index, replace ? 1 : 0, entry)
        );
    };

    const moveEntry = (fromIdx, toIdx) => {
        const entry = entries[fromIdx];
        let newEntries = entries.toSpliced(fromIdx, 1);
        newEntries = newEntries.toSpliced(toIdx, 0, entry);
        setEntries(newEntries);
    };

    const removeEntry = (
        index=0
    ) => {
        setEntries(
            entries.toSpliced(index, 1)
        );
    };

    const saveHex = () => {
        hexData.logs = entries;

        const newMapObject = Object.assign({}, context.mapObject);
        context.setMapObject(newMapObject);
    };

    return (
        <div className='hexLogDisplay'>
            <button
                onClick={() => {
                    insertEntry({
                        timestamp: Date.now(),
                        date: '',
                        entry: '',
                    });
                }}
            >
                Create New Log
            </button>
            <div>
                {[
                    entries.map((entry, index) => (
                        <HexLogEntry
                            entry={entry}
                            setEntry={(entry) => insertEntry(entry, index, true)}
                            deleteEntry={() => removeEntry(index)}
                            moveEntryUp={() => {
                                if (index === 0) {
                                    return () => {};
                                } else {
                                    moveEntry(index, index - 1);
                                }
                            }}
                            moveEntryDown={() => {
                                if (index === entries.length - 1) {
                                    return () => {};
                                } else {
                                    moveEntry(index, index + 1);
                                }
                            }}
                            key={entry.timestamp}
                        />
                    ))
                ]}
            </div>
        </div>
    );
};
export default HexLogDisplay;

const HexLogEntry = ({
    entry, moveEntryUp=()=>{}, moveEntryDown=()=>{}, setEntry=()=>{}, deleteEntry=()=>{},
})=> {
    const [editing, setEditing] = useState(!entry.date);
    const [dateText, setDateText] = useState(entry.date ? entry.data : '');
    const [entryText, setEntryText] = useState(entry.entry ? entry.entry : '');

    return (
        <div className='hexLogEntry'>
            <button
                className='logMoveUpBtn'
                onClick={moveEntryUp}
            >
                △
            </button>
            <button
                className='logMoveDownBtn'
                onClick={moveEntryDown}
            >
                ▽
            </button>
            {
                editing
                    ? (
                        <input
                            className='logDate'
                            type='text'
                            value={dateText}
                            placeholder='Date'
                            onChange={(e) => setDateText(e.target.value)}
                        />
                    ) : (
                        <div className='logDate'>{entry.date.length ? entry.date : ' { Redacted } '}</div>
                    )
            }
            {
                editing
                    ? (
                        <textarea
                            className='logContents'
                            value={entryText}
                            placeholder='Log Contents'
                            onChange={(e) => setEntryText(e.target.value)}
                        />
                    ) : (
                        <div className='logContents'>{entry.entry.length ? entry.entry : ' { Insufficient Clearance } '}</div>
                    )
            }
            <div className='logControls'>
                {
                    editing
                        ? (
                            <button
                                className='logBtnLeft'
                                onClick={() => {
                                    const newEntry = Object.assign({}, entry, { date: dateText, entry: entryText });
                                    setEntry(newEntry);
                                    setEditing(false);
                                }}
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                className='logBtnLeft'
                                onClick={() => setEditing(true)}
                            >
                                Edit
                            </button>
                        )
                }
                {
                    editing
                        ? (
                            <button
                                className='logBtnRight'
                                onClick={() => {
                                    setDateText(entry.date);
                                    setEntryText(entry.entry);
                                    setEditing(false);
                                }}
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                className='logBtnRight'
                                onClick={deleteEntry}
                            >
                                Delete
                            </button>
                        )
                }
            </div>
        </div>
    );
};
