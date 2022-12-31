import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    //console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title> Deal Memo GPT-3 Writer </title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1> AI powered due diligence memos for angel invesments in 60 seconds or less</h1>
          </div>
          <div className="header-subtitle">
            <h2>Enter the name of the startup you are considering investing in and we'll give you a memo, fast!</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
          placeholder="Startp name (e.g. AirBnB)" 
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a 
              className={isGenerating ? 'generate-button loading' : 'generate-button'} 
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
      
    </div>
  );
};

export default Home;
