import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, SkipBack, SkipForward, Repeat } from 'lucide-react';
import { useAudioStore } from '../store/useAudioStore';

export default function AudioPlayer() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const { currentTrack, isPlaying, playbackSpeed, loop, setPlaying, setCurrentTime } = useAudioStore();

  useEffect(() => {
    if (waveformRef.current && currentTrack) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F46E5',
        progressColor: '#818CF8',
        cursorColor: '#4F46E5',
        barWidth: 2,
        barGap: 1,
        responsive: true,
        height: 100,
      });

      wavesurfer.current.load(currentTrack.url);
      
      wavesurfer.current.on('timeupdate', (time) => {
        setCurrentTime(time);
      });

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [currentTrack]);

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (wavesurfer.current) {
      wavesurfer.current.setPlaybackRate(speed);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div ref={waveformRef} className="w-full mb-4" />
      
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => wavesurfer.current?.skip(-5)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <SkipBack className="w-6 h-6 text-indigo-600" />
        </button>

        <button
          onClick={togglePlayPause}
          className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </button>

        <button
          onClick={() => wavesurfer.current?.skip(5)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <SkipForward className="w-6 h-6 text-indigo-600" />
        </button>

        <button
          onClick={() => useAudioStore.setState({ loop: !loop })}
          className={`p-2 rounded-full ${
            loop ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Repeat className="w-6 h-6" />
        </button>

        <select
          value={playbackSpeed}
          onChange={(e) => handleSpeedChange(Number(e.target.value))}
          className="ml-4 px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
        </select>
      </div>
    </div>
  );
}