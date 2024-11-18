import React, { useState } from 'react';
import { useAudioStore } from '../store/useAudioStore';
import type { Subtitle } from '../types/subtitle';
import { Clock, Type, Settings } from 'lucide-react';

export default function SubtitleEditor() {
  const { currentTrack, currentTime } = useAudioStore();
  const [selectedSubtitle, setSelectedSubtitle] = useState<Subtitle | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('#FFFFFF');

  const addSubtitle = () => {
    if (!currentTrack) return;
    
    const newSubtitle: Subtitle = {
      id: Date.now().toString(),
      startTime: currentTime,
      endTime: currentTime + 5,
      text: '',
    };

    // Update subtitles array in the current track
    const updatedSubtitles = [...currentTrack.subtitles, newSubtitle];
    useAudioStore.setState({
      currentTrack: { ...currentTrack, subtitles: updatedSubtitles },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Subtitle Editor</h2>
        <div className="flex gap-4">
          <button
            onClick={addSubtitle}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Add at Current Time
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Type className="w-4 h-4 inline mr-1" />
              Font Size
            </label>
            <input
              type="range"
              min="12"
              max="32"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Settings className="w-4 h-4 inline mr-1" />
              Font Color
            </label>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="h-8 w-full"
            />
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Text
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTrack?.subtitles.map((subtitle) => (
                <tr key={subtitle.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subtitle.startTime.toFixed(2)}s - {subtitle.endTime.toFixed(2)}s
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={subtitle.text}
                      onChange={(e) => {
                        if (!currentTrack) return;
                        const updatedSubtitles = currentTrack.subtitles.map((s) =>
                          s.id === subtitle.id ? { ...s, text: e.target.value } : s
                        );
                        useAudioStore.setState({
                          currentTrack: { ...currentTrack, subtitles: updatedSubtitles },
                        });
                      }}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedSubtitle(subtitle)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}