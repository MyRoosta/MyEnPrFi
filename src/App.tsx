import React from 'react';
import AudioPlayer from './components/AudioPlayer';
import SubtitleEditor from './components/SubtitleEditor';
import AudioLibrary from './components/AudioLibrary';
import { Headphones } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Headphones className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                English Learning Platform
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <AudioPlayer />
            <SubtitleEditor />
          </div>
          <div>
            <AudioLibrary />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;