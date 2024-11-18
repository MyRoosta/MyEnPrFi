import { Observable } from '@nativescript/core';
import { AudioTrack, Playlist } from '../models/audio-track';
import { AudioService } from '../services/audio-service';
import { PlaylistService } from '../services/playlist-service';

export class MainViewModel extends Observable {
    private audioService: AudioService;
    private playlistService: PlaylistService;
    private _audioTracks: AudioTrack[] = [];
    private _playlists: Playlist[] = [];
    private _playbackSpeed = 1.0;
    private _subtitleDelay = 0;
    private _repetitions = 1;
    private _repetitionDelay = 2;

    constructor() {
        super();
        this.audioService = new AudioService();
        this.playlistService = new PlaylistService();
        this.loadPlaylists();
    }

    private loadPlaylists(): void {
        this._playlists = this.playlistService.getPlaylists();
        this.notifyPropertyChange('playlists', this._playlists);
    }

    onTrackSelect(args: any): void {
        const track = this._audioTracks[args.index];
        this.audioService.loadAudio(track);
    }

    onPlaylistSelect(args: any): void {
        const playlist = this._playlists[args.index];
        // Handle playlist selection
    }

    get audioTracks(): AudioTrack[] {
        return this._audioTracks;
    }

    get playlists(): Playlist[] {
        return this._playlists;
    }

    get playbackSpeed(): number {
        return this._playbackSpeed;
    }

    set playbackSpeed(value: number) {
        if (this._playbackSpeed !== value) {
            this._playbackSpeed = value;
            this.notifyPropertyChange('playbackSpeed', value);
            this.audioService.setSpeed(value);
        }
    }

    get subtitleDelay(): number {
        return this._subtitleDelay;
    }

    set subtitleDelay(value: number) {
        if (this._subtitleDelay !== value) {
            this._subtitleDelay = value;
            this.notifyPropertyChange('subtitleDelay', value);
        }
    }

    get repetitions(): number {
        return this._repetitions;
    }

    set repetitions(value: number) {
        if (this._repetitions !== value) {
            this._repetitions = value;
            this.notifyPropertyChange('repetitions', value);
        }
    }

    get repetitionDelay(): number {
        return this._repetitionDelay;
    }

    set repetitionDelay(value: number) {
        if (this._repetitionDelay !== value) {
            this._repetitionDelay = value;
            this.notifyPropertyChange('repetitionDelay', value);
        }
    }
}