import { create } from 'zustand';
import type { AudioTrack, Subtitle } from '../types/subtitle';

interface AudioState {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  playbackSpeed: number;
  currentTime: number;
  loop: boolean;
  repetitionCount: number;
  repetitionDelay: number;
  setTrack: (track: AudioTrack) => void;
  setPlaying: (playing: boolean) => void;
  setPlaybackSpeed: (speed: number) => void;
  setCurrentTime: (time: number) => void;
  setLoop: (loop: boolean) => void;
  setRepetitionCount: (count: number) => void;
  setRepetitionDelay: (delay: number) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  playbackSpeed: 1,
  currentTime: 0,
  loop: false,
  repetitionCount: 2,
  repetitionDelay: 1,
  setTrack: (track) => set({ currentTrack: track }),
  setPlaying: (playing) => set({ isPlaying: playing }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setLoop: (loop) => set({ loop }),
  setRepetitionCount: (count) => set({ repetitionCount: count }),
  setRepetitionDelay: (delay) => set({ repetitionDelay: delay }),
}));