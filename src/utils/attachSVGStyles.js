import svgStyles from '../assets/svgStyles.js';

const attachSVGStyles = () => {
    const defs = document.querySelector('defs');
    if (!defs) {
        return;
    }

    svgStyles.forEach((style) => {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        el.id = style.id;
        
        appendAllegianceGradientStops(style.stops, el);
        defs.appendChild(el);
    });
};
export default attachSVGStyles;

const appendAllegianceGradientStops = (stopsArr, parentEl) => {
    appendStop(stopsArr[0], '65%', parentEl);
    appendStop(stopsArr[1], '100%', parentEl);
};

const appendStop = (color, offset, parentEl) => {
    const stopEl = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stopEl.setAttribute('offset', offset);
    stopEl.setAttribute('stop-color', color);
    parentEl.appendChild(stopEl);
};
