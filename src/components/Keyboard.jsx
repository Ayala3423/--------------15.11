import { useState } from 'react';
import '../App.css';
import PropTypes from 'prop-types';

function Keyboard({ textToDisplay, setTextToDisplay, cursorPosition, setCursorPosition, charStyle }) {
    const keysObject = {
        sharedKeys: [
            ['Esc', 'Undo', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Del'],
            ['Tab', 'Enter', 'Caps', 'Symbol', 'Up', 'Emj', 'Clear', 'Space', 'Left', 'Down', 'Right', 'Lang']
        ],

        hebrew: [
            '/', "'", 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ', '[', ']',
            'ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף', ',', "\\",
            'ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '.'
        ],

        upperCaseEnglish: [
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', ']', '[',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", '\\',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.'
        ],

        lowerCaseEnglish: [
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ']', '[',
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\',
            'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'
        ],

        emojis: [
            '😊', '😍', '😂', '🥰', '🙌',
            '🥳', '😎', '😢', '😡', '🤔',
            '🥺', '😴', '🤩', '🤯', '😇',
            '🤪', '😈', '🤖', '🦄', '💩',
            '👻', '🎃', '🎉', '🍕', '🍔',
            '🍎', '🍩', '🚗', '🚌', '✈️',
            '🚀', '🐱', '🐶', '🌟'
        ],

        symbols: [
            '.', ',', ';', ':', '!', '?',
            "'", '"', '`', '~', '@', '#',
            '$', '%', '^', '&', '*', '(',
            ')', '-', '_', '+', '=', '[',
            ']', '{', '}', '<', '>', '/',
            '\\', '|', '©', '®', '™'
        ]
    }

    const [currentType, setCurrentType] = useState(keysObject.hebrew);
    const [currentTypeName, setCurrentTypeName] = useState("hebrew");
    const [history, setHistory] = useState([]);
    const [prevCurrentTypeName, setPrevCurrentTypeName] = useState(null);

    const changeKeyboard = (typeToChange) => {
        setCurrentType(keysObject[typeToChange])
        setCurrentTypeName(typeToChange)
    }

    const handleFunctions = {
        Caps: () => {
            if (currentTypeName !== 'upperCaseEnglish') {
                setPrevCurrentTypeName(currentTypeName);
                changeKeyboard('upperCaseEnglish');
            } else {
                changeKeyboard(prevCurrentTypeName || 'lowerCaseEnglish');
            }
        },

        Del: () => {
            addToHistory();
            setTextToDisplay(prevText => {
                const newText = [...prevText];
                newText.pop();
                return newText;
            });
        },

        Lang: () => {
            if (currentTypeName !== 'upperCaseEnglish') {
                const newType = currentTypeName === 'hebrew' ? 'lowerCaseEnglish' : 'hebrew';
                changeKeyboard(newType);
            }
        },

        Emj: () => {
            changeKeyboard('emojis');
        },

        Enter: () => {
            addToHistory();
            setTextToDisplay(prevText => [...prevText.slice(0, cursorPosition), { char: '\n', style: {} }, ...prevText.slice(cursorPosition)]);
            setCursorPosition(cursorPosition + 1);
        },

        Space: () => {
            addToHistory();
            setTextToDisplay(prevText => [...prevText.slice(0, cursorPosition), { char: ' ', style: {} }, ...prevText.slice(cursorPosition)]);
            setCursorPosition(cursorPosition + 1);
        },

        Tab: () => {
            addToHistory();
            setTextToDisplay(prevText => [...prevText.slice(0, cursorPosition), { char: '    ', style: {} }, ...prevText.slice(cursorPosition)]);
            setCursorPosition(cursorPosition + 4);
        },

        Undo: () => {
            undoAction();
        },

        Symbol: () => {
            changeKeyboard('symbols');
        },

        Left: () => {
            if (cursorPosition > 0) setCursorPosition(cursorPosition - 1);
        },

        Right: () => {
            if (cursorPosition < textToDisplay.length) setCursorPosition(cursorPosition + 1);
        },

        Clear: () => {
            setTextToDisplay([]);
        }
    };

    const handleKey = (sign) => {
        addToHistory();
        setTextToDisplay(prevText => [
            ...prevText.slice(0, cursorPosition),
            { char: sign, style: charStyle },
            ...prevText.slice(cursorPosition)
        ]);
        setCursorPosition(cursorPosition + 1);
    };

    const addToHistory = () => {
        setHistory((prevHistory) => [...prevHistory, textToDisplay]);
    };

    const undoAction = () => {
        if (history.length > 0) {
            const lastState = history[history.length - 1];
            setTextToDisplay(lastState);
            setHistory(history.slice(0, -1));
        }
    };

    const getKeyClass = (key) => {
        switch (key) {
            case 'Space':
                return 'space';
            case 'Enter':
            case 'Caps':
            case 'Tab':
            case 'Del':
            case 'Undo':
                return 'special';
            default:
                return '';
        }
    };

    return (
        <>
            <div className="keyboard">
                {keysObject.sharedKeys[0].map((key, index) => (
                    <button key={index} className={`key ${getKeyClass(key)}`} onClick={!isNaN(key) || key == '=' || key == '-' ? () => handleKey(key) : handleFunctions[key]}>
                        {key === 'Space' ? ' ' : key}
                    </button>
                ))}
                {currentType.map((key, index) => (
                    //למה עברית כאן?
                    <button key={index + keysObject.sharedKeys.length} className="key hebrew" onClick={() => handleKey(key)}>
                        {key}
                    </button>
                ))}
                {keysObject.sharedKeys[1].map((key, index) => (
                    <button key={index} className={`key ${getKeyClass(key)}`} onClick={handleFunctions[key]}>
                        {key === 'Space' ? ' ' : key}
                    </button>
                ))}
            </div>
        </>
    );
}

export default Keyboard;

Keyboard.propTypes = {
    textToDisplay: PropTypes.array.isRequired,
    setTextToDisplay: PropTypes.func.isRequired,
    cursorPosition: PropTypes.number.isRequired,
    setCursorPosition: PropTypes.func.isRequired,
    charStyle: PropTypes.object.isRequired
};