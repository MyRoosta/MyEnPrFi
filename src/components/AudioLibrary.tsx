import React from 'react';
import { useAudioStore } from '../store/useAudioStore';
import { Music, Upload } from 'lucide-react';

const DEMO_TRACKS = [
  {
    id: '1',
    title: 'English Conversation 1',
    url: 'https://example.com/audio1.mp3',
    subtitles: [],
  },
  {
    id: '2',
    title: 'Business English',
    url: 'https://example.com/audio2.mp3',
    subtitles: [],
  },
];

export default function AudioLibrary() {
  const { currentTrack, setTrack } = useAudioStore();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newTrack = {
        id: Date.now().toString(),
        title: file.name,
        url,
        subtitles: [],
      };
      setTrack(newTrack);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Audio Library</h2>
        <label className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Audio
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid gap-4">
        {DEMO_TRACKS.map((track) => (
          <button
            key={track.id}
            onClick={() => setTrack(track)}
            className={`flex items-center p-4 rounded-lg border ${
              currentTrack?.id === track.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Music className="w-6 h-6 text-indigo-600 mr-3" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">{track.title}</h3>
              <p className="text-sm text-gray-500">
                {track.subtitles.length} subtitles
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}