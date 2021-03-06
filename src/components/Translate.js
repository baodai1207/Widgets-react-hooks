import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';
import Voice from './Voice';

const options = [
  {
    label: 'Afrikaans',
    value: 'af',
  },
  {
    label: 'Arabic',
    value: 'ar',
  },
  {
    label: 'Hindi',
    value: 'hi',
  },
  {
    label: 'Dutch',
    value: 'nl',
  },
  {
    label: 'Vietnamese',
    value: 'vi',
  },
];

const Translate = () => {
  const [language, setLanguage] = useState(options[0]);
  const [text, setText] = useState('');
  const [transcript, setTranscript] = useState('');

  // const callbackFunction = childData => {
  //   setTranscript({ transcript: childData });
  // };
  return (
    <div>
      <div className='ui form'>
        <div className='field'>
          <label>Enter Text</label>
          <input value={text} onChange={e => setText(e.target.value)} />
        </div>
      </div>
      <br />
      <Dropdown
        label='Select a Language'
        selected={language}
        onSelectedChange={setLanguage}
        options={options}
      />
      <hr />
      <h3 className='ui header'>Output</h3>
      <Convert text={text} language={language} />
      <div className='ui form'>
        <div className='field'>
          <label>Translate by voice</label>
          <Voice language={language} />
        </div>
      </div>
    </div>
  );
};

export default Translate;
