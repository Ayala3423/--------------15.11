import './App.css'
import { useState } from 'react';
import Keyboard from "./components/Keyboard"
import Style from './components/Style'
import TextArea from './components/TextArea'

function App() {
  const [textToDisplay, setTextToDisplay] = useState([{ char: '', style: {} }]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [charStyle, setCharStyle] = useState({ color: '#e1e1e1' });
  const [capitalizationStyle, setCapitalizationStyle] = useState('none');
  const [selectedText, setSelectedText] = useState('');

  const applyStyle = (style) => {
    let styleToApply = { [Object.keys(style)[0]]: Object.values(style)[0] };
    const fullText = textToDisplay.map(item => item.char).join('');

    if (!selectedText && Object.keys(style).length === 0) {
      setSelectedText(fullText);
    }
    else {
      const selection = window.getSelection();
      setSelectedText(selection.toString());
      if (!selectedText) {
        setCharStyle(prevStyle => ({ ...prevStyle, ...styleToApply }));
        return;
      }
      const startOffset = Math.min(selection.anchorOffset, selection.focusOffset);
      const startIndex = fullText.indexOf(selectedText, startOffset);
      const endIndex = startIndex + selectedText.length;
      setTextToDisplay(prevText =>
        prevText.map((item, index) => {
          if (index >= startIndex && index <= endIndex) {
            if(item.style[Object.keys(style)[0]] === Object.values(style)[0]){
              styleToApply = {[Object.keys(style)[0]] : charStyle[[Object.keys(style)[0]]]}
              return {
                ...item,
                style: {
                  ...item.style,
                  ...styleToApply
                }
              };
            }
            return {
              ...item,
              style: {
                ...item.style,
                ...styleToApply
              }
            };
          }
          return item;
        })
      );
    }
  };

  const handleCapitalization = (text) => {
    switch (capitalizationStyle) {
      case 'sentence':
        return text.replace(/\b\w/g, c => c.toUpperCase());
      case 'word':
        return text.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
      case 'lowercase':
        return text.toLowerCase();
      default:
        return text;
    }
  };

  const handleTextChange = (text) => {
    const newText = handleCapitalization(text);
    const updatedText = newText.split('').map(char => ({
      char,
      style: charStyle
    }));
    setTextToDisplay(updatedText);
  };

  const handleCapitalizationChange = (style) => {
    setCapitalizationStyle(style);

    const newText = textToDisplay.map(item => item.char).join('');
    const updatedText = handleCapitalization(newText).split('').map(char => ({
      char,
      style: charStyle
    }));

    setTextToDisplay(updatedText);
  };


  return (
    <>
      <Style
        applyStyle={applyStyle}
        setCapitalizationStyle={handleCapitalizationChange}
        handleTextChange={handleTextChange}
      />
      <TextArea
        textToDisplay={textToDisplay || ''}
        setTextToDisplay={handleTextChange}
        cursorPosition={cursorPosition}
      />
      <Keyboard
        textToDisplay={textToDisplay || ''}
        setTextToDisplay={setTextToDisplay}
        charStyle={charStyle}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
      />
    </>
  );
}

export default App;