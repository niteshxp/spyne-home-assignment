import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [captionText, setCaptionText] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [captions, setCaptions] = useState([]);
  const [playing, setPlaying] = useState(false);

  const addCaption = () => {
    setCaptions([...captions, { text: captionText, time: timestamp }]);
    setCaptionText('');
    setTimestamp('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Caption App</h1>
      <div className="mb-4">
        <label className="block mb-2">Video URL:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Caption Text:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={captionText}
          onChange={(e) => setCaptionText(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Timestamp (in seconds):</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={addCaption}
      >
        Add Caption
      </button>
      <div className="mt-8">
        {videoUrl && (
          <ReactPlayer
            url={videoUrl}
            controls
            playing={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            width="100%"
            height="auto"
          />
        )}
        {captions.map((caption, index) => (
          <div
            key={index}
            className="absolute bg-black text-white p-2 rounded"
            style={{
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              display: playing && caption.time <= ReactPlayer.currentTime ? 'block' : 'none'
            }}
          >
            {caption.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
