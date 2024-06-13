import { useContext } from 'react';
import { starlogContext } from './starlogContext.js';

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
        </div>
    );
};
export default T5Import;
