import React, { useState, useEffect } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export default function Voice() {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript !== '') {
      console.log('Got final result:', finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);

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

      <div>
        <span>{transcript}</span>
      </div>
    </div>
  );
}
