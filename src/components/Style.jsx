import PropTypes from 'prop-types';

function Style({ applyStyle, setCapitalizationStyle }) {
    const fonts = [
        { label: "Arial", value: "Arial, sans-serif" },
        { label: "Times New Roman", value: "'Times New Roman', serif" },
        { label: "Courier New", value: "'Courier New', monospace" },
        { label: "David", value: "'David', sans-serif" },
        { label: "Rubik", value: "'Rubik', sans-serif" }
    ];

    const fontSizes = [
        { label: "20px", value: "20px" },
        { label: "30px", value: "30px" },
        { label: "40px", value: "40px" },
        { label: "50px", value: "50px" },
        { label: "60px", value: "60px" }
    ];

    const handleFontChange = (event) => {
        applyStyle({ fontFamily: event.target.value });
    };

    const handleFontSizeChange = (event) => {
        applyStyle({ fontSize: event.target.value });
    };

    return (
        <div className="style-bar">
            <button className="styleAllButton" onClick={() => applyStyle({})}><span>Style All</span></button>
            <button className="customBtn btn" onClick={() => applyStyle({ fontWeight: 'bold' })}><span>Bold</span></button>
            <button className="customBtn btn" onClick={() => applyStyle({ fontStyle: 'italic' })}><span>Italic</span></button>
            <button className="customBtn btn" onClick={() => applyStyle({ textDecoration: 'underline' })}><span>Underline</span></button>
            <input type="color" onChange={(event) => applyStyle({ color: event.target.value })} />

            <select onChange={handleFontChange}>
                <option value="">Select font</option>
                {fonts.map((font, index) => (
                    <option key={index} value={font.value}>{font.label}</option>
                ))}
            </select>

            <select onChange={handleFontSizeChange}>
                <option value="">Select font size</option>
                {fontSizes.map((size, index) => (
                    <option key={index} value={size.value}>{size.label}</option>
                ))}
            </select>

            <select onChange={(e) => setCapitalizationStyle(e.target.value)}>
                <option value="none">No Capitalization</option>
                <option value="sentence">Capitalize Sentence Start</option>
                <option value="word">Capitalize Every Word</option>
                <option value="lowercase">Lowercase Only</option>
            </select>

        </div>
    );
}

export default Style;

Style.propTypes = {
    applyStyle: PropTypes.func.isRequired,
    setCapitalizationStyle: PropTypes.func.isRequired
};