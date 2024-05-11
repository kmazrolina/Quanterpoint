import React, { useState, useEffect } from 'react';
import { Switch, FormGroup, FormControlLabel, Stack, Container } from '@mui/material';
import './App.css';

import sound1 from "./audio/1.wav";
import sound2 from "./audio/2.wav";
import sound3 from "./audio/3.wav";
import sound4 from "./audio/4.wav";
import sound5 from "./audio/5.wav";
import sound6 from "./audio/6.wav";
import sound7 from "./audio/7.wav";
import sound8 from "./audio/8.wav";
import sound9 from "./audio/9.wav";
import sound10 from "./audio/10.wav";
import sound11 from "./audio/11.wav";
import sound12 from "./audio/12.wav";

import sound1_raw from "./audio/1_raw.wav";
import sound2_raw from "./audio/2_raw.wav";
import sound3_raw from "./audio/3_raw.wav";
import sound4_raw from "./audio/4_raw.wav";
import sound5_raw from "./audio/5_raw.wav";
import sound6_raw from "./audio/6_raw.wav";
import sound7_raw from "./audio/7_raw.wav";
import sound8_raw from "./audio/8_raw.wav";
import sound9_raw from "./audio/9_raw.wav";
import sound10_raw from "./audio/10_raw.wav";
import sound11_raw from "./audio/11_raw.wav";
import sound12_raw from "./audio/12_raw.wav";


function App() {
  const [isPlay, setIsPlay] = useState(false);
  const [isSaxSound, setisSaxSound] = useState(true);
  const [stopRequested, setStopRequested] = useState(false); // New state to indicate if stop is requested





  const handlePlay = async () => {
    setIsPlay(true);
    setStopRequested(false); // Reset stop requested flag at the beginning of play
    const allSounds = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sound10, sound11, sound12];
    const allRawSounds = [sound1_raw, sound2_raw, sound3_raw, sound4_raw, sound5_raw, sound6_raw, sound7_raw, sound8_raw, sound9_raw, sound10_raw, sound11_raw, sound12_raw];

    for (let col = 1; col <= 8; col++) {
      const audioContext = new AudioContext();
      const sounds = [];
      for (let row = 1; row <= 12; row++) {
        const button = document.querySelector(`.grid-item-row${row}.grid-item-col${col}`);
        if (button.classList.contains('active')) {
          if (!isSaxSound) {
            sounds.push(allRawSounds[row - 1]);
          } else {
            sounds.push(allSounds[row - 1]);
          }
        }
      }
      if (sounds.length > 0 && !stopRequested) { // Check if stop is not requested
        sounds.forEach((source) => {
          new Audio(source).play();
        });
        await new Promise((resolve) => stopRequested || setTimeout(resolve, 2400)); // Adjust time based on audio length or other factors

      }
      audioContext.close();
      if (stopRequested) break; // Exit loop if stop is requested
    }
    setIsPlay(false);
  };

  const handleStop = () => {
    setIsPlay(false);
    setStopRequested(true); // Set stop requested flag
    document.querySelectorAll('audio').forEach(el => el.pause());
  };

  const handleButtonClick = (event) => {
    const button = event.target;
    button.classList.toggle('active');
    button.classList.toggle('inactive');
  };

  const gridItems = [];
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 8; j++) {
      gridItems.push(
        <div
          key={`${i}-${j}`}
          className={`grid-item-row${i} grid-item-col${j} inactive`}
          onClick={handleButtonClick}
        >
          {/* Add any content you want within each grid item here */}
          {/* Optionally, display audio file name or play audio here */}
        </div>
      );
    }
  }

  const handleSoundChange = () => {
    setisSaxSound(!isSaxSound);
  }

  return (
    <div id="root">

      <Container sx={{ width: "min-content" }}>
        <div>

          <div className='up' >
            <div>
              <div className="quansition" >Quansition</div>
              <div className="developed-by-パン粉-チーズ-panko-chizu_">developed-by-パン粉-チーズ-panko-chizu</div>
            </div>
          </div>
          <div className="modes">
            {isPlay ?
              <div className="button_play playing"><b>playing...</b></div>
              :
              <div className="button_play" onClick={handlePlay}><b>play ►</b></div>
            }
          </div>

          <div className="grid-container">
            {gridItems}
          </div>
        </div>
        <audio></audio>
        <FormGroup className='instrument-switch'>
          <FormControlLabel control={
            <Switch defaultChecked
              onChange={handleSoundChange} />}
            label={isSaxSound ? "Saxophone" : "Spacedrum"}
            sx={{ color: "black" }} />
        </FormGroup>
      </Container>
    </div>
  );
}

export default App;
