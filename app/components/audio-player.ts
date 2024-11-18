import { Observable, Canvas } from '@nativescript/core';
import { AudioService } from '../services/audio-service';
import { SubtitleService } from '../services/subtitle-service';
import { AudioTrack } from '../models/audio-track';

export class AudioPlayerViewModel extends Observable {
    private audioService: AudioService;
    private subtitleService: SubtitleService;
    private _isPlaying = false;
    private _currentTime = 0;
    private _duration = 0;
    private _currentSubtitle = '';
    private waveformCanvas: Canvas;

    constructor() {
        super();
        this.audioService = new AudioService();
        this.subtitleService = new SubtitleService();
    }

    onLoaded(args) {
        this.waveformCanvas = args.object.getViewById('waveformCanvas');
        this.initializeWaveform();
    }

    private initializeWaveform() {
        if (this.waveformCanvas) {
            const ctx = this.waveformCanvas.getContext('2d');
            // Initialize waveform drawing
            this.drawWaveform(ctx);
        }
    }

    private drawWaveform(ctx) {
        if (!this.currentTrack?.waveformData) return;

        const width = this.waveformCanvas.width;
        const height = this.waveformCanvas.height;
        const data = this.currentTrack.waveformData;

        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 2;

        const step = Math.ceil(data.length / width);
        const amp = height / 2;

        for (let i = 0; i < width; i++) {
            const min = Math.min(...data.slice(i * step, (i + 1) * step));
            const max = Math.max(...data.slice(i * step, (i + 1) * step));
            
            ctx.moveTo(i, (1 + min) * amp);
            ctx.lineTo(i, (1 + max) * amp);
        }

        ctx.stroke();
    }

    async loadTrack(track: AudioTrack): Promise<void> {
        await this.audioService.loadAudio(track);
        if (track.subtitlePath) {
            await this.subtitleService.loadSubtitles(track.subtitlePath);
        }
        this.updateDuration();
        this.initializeWaveform();
    }

    togglePlayPause(): void {
        if (this._isPlaying) {
            this.audioService.pause();
        } else {
            this.audioService.play();
        }
        this._isPlaying = !this._isPlaying;
        this.notifyPropertyChange('isPlaying', this._isPlaying);
    }

    setPlaybackSpeed(speed: number): void {
        this.audioService.setSpeed(speed);
    }

    private updateDuration(): void {
        // Update duration from audio service
        this.notifyPropertyChange('duration', this._duration);
    }

    private updateSubtitle(): void {
        this._currentSubtitle = this.subtitleService.getSubtitleAtTime(this._currentTime);
        this.notifyPropertyChange('currentSubtitle', this._currentSubtitle);
    }

    get isPlaying(): boolean {
        return this._isPlaying;
    }

    get currentTime(): number {
        return this._currentTime;
    }

    get duration(): number {
        return this._duration;
    }

    get currentSubtitle(): string {
        return this._currentSubtitle;
    }
}