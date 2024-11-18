import { File, Folder, knownFolders } from '@nativescript/core';
import { TNSPlayer } from 'nativescript-audio';
import { AudioTrack } from '../models/audio-track';

export class AudioService {
    private player: TNSPlayer;
    private currentTrack: AudioTrack | null = null;

    constructor() {
        this.player = new TNSPlayer();
    }

    async loadAudio(track: AudioTrack): Promise<void> {
        try {
            await this.player.init({
                audioFile: track.filePath,
                loop: false,
                completeCallback: () => console.log('Audio finished playing'),
                errorCallback: (error) => console.error('Audio error:', error)
            });
            this.currentTrack = track;
        } catch (error) {
            console.error('Error loading audio:', error);
        }
    }

    async play(): Promise<void> {
        try {
            await this.player.play();
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    async pause(): Promise<void> {
        try {
            await this.player.pause();
        } catch (error) {
            console.error('Error pausing audio:', error);
        }
    }

    async seekTo(time: number): Promise<void> {
        try {
            await this.player.seekTo(time);
        } catch (error) {
            console.error('Error seeking audio:', error);
        }
    }

    setSpeed(speed: number): void {
        this.player.changePlayerSpeed(speed);
    }

    dispose(): void {
        this.player.dispose();
    }
}