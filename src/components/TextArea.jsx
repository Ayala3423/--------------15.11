import PropTypes from 'prop-types';

function TextArea({ textToDisplay, cursorPosition }) {
    const getDirection = () => {
        if (textToDisplay.length > 0) {
            const lastChar = textToDisplay[cursorPosition - 1]?.char || '';
            return /[\u0590-\u05FF]/.test(lastChar) ? 'rtl' : 'ltr';
        }
        return 'ltr';
    };

    const direction = getDirection();

    return (
        <div className="textToDisplay" style={{ direction }}>
            {textToDisplay.slice(0, cursorPosition).map((item, index) => (
                <span key={index} style={item.style}>{item.char}</span>
            ))}
            <span className="cursor">|</span>
            {textToDisplay.slice(cursorPosition).map((item, index) => (
                <span key={cursorPosition + index} style={item.style}>{item.char}</span>
            ))}
        </div>
    );
}

export default TextArea;

TextArea.propTypes = {
    textToDisplay: PropTypes.array.isRequired,
    cursorPosition: PropTypes.number.isRequired
};