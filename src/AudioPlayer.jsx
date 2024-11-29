import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [duration, setDuration] = useState(0); 

  // Play/pause the audio
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  
  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.target;
    const newTime = (e.nativeEvent.offsetX / progressBar.offsetWidth) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        controls
      />
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <div className="progress-bar" onClick={handleProgressClick}>
          <div
            className="progress"
            style={{ width: `${(progress / duration) * 100}%` }}
          />
        </div>
        <span className="time">
          {Math.floor(progress)} / {Math.floor(duration)} sec
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
