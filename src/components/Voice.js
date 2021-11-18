import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export default function Voice({ language }) {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();
  const [debouncedTranscript, setDebouncedTranscript] = useState(transcript);
  const [translated, setTranslated] = useState('');

  useEffect(() => {
    if (finalTranscript !== '') {
      // console.log('Got final result:', finalTranscript);
      // setTranscript({ finalTranscript });
      console.log(finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);

  // Debounced for transcript
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTranscript(transcript); //Debounce transcript
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [transcript]);

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: debouncedTranscript, // tried to translate debouncedTranscript here
            target: language.value,
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
          },
        }
      );

      setTranslated(data.data.translations[0].translatedText);
    };

    // console.log(debouncedTranscript);
    console.log(debouncedTranscript);
    doTranslation();
  }, [language, debouncedTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser doesn't support speech recognition </div>;
  }

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    }).then(() => {});
  };

  const stopCommand = () => {
    SpeechRecognition.stopListening();
    SpeechRecognition.abortListening();
  };

  return (
    <div>
      <div>
        <div>
          <span>listening: {listening ? 'on' : 'off'}</span>
        </div>
        <div className='ui buttons'>
          <button className='ui button'>
            <i className='redo icon' onClick={resetTranscript}></i>
            Reset
          </button>
          <button className='ui button'>
            <i className='play icon' onClick={listenContinuously}></i>
            Play
          </button>
          <button className='ui icon button'>
            <i className='stop icon' onClick={stopCommand}></i>
            Stop
          </button>
          )
        </div>
      </div>

      <div className='ui compact message'>
        <div className='header'>{transcript}</div>
      </div>
      <div>
        <label>Output: </label>
        <h1 className='ui header'>{translated}</h1>
      </div>
    </div>
  );
}
