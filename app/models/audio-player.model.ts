import { Observable } from '@nativescript/core';
import { TNSPlayer } from 'nativescript-audio-player';
import { SubtitleModel } from './subtitle.model';

export class AudioPlayerModel extends Observable {
  private player: TNSPlayer;
  private subtitleModel: SubtitleModel;
  private _playbackSpeed: number = 1.0;
  private _isPlaying: boolean = false;
  private _currentTime: number = 0;
  private _subtitleRepeatCount: number = 1;
  private _subtitleDelay: number = 2;
  private _repeatMode: 'none' | 'one' | 'all' = 'none';

  constructor() {
    super();
    this.player = new TNSPlayer();
    this.subtitleModel = new SubtitleModel();
    this.initializePlayer();
  }

  private async initializePlayer() {
    try {
      await this.player.init({
        audioFile: '',
        loop: false,
        completeCallback: () => this.onPlaybackComplete(),
        errorCallback: (error) => console.error('Audio error:', error)
      });
    } catch (error) {
      console.error('Player initialization error:', error);
    }
  }

  async loadAudio(path: string, subtitlePath?: string) {
    try {
      await this.player.loadAudio({ audioFile: path });
      if (subtitlePath) {
        await this.subtitleModel.loadFromFile(subtitlePath);
      }
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  }

  async play() {
    try {
      await this.player.play();
      this._isPlaying = true;
      this.notifyPropertyChange('isPlaying', true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  async pause() {
    try {
      await this.player.pause();
      this._isPlaying = false;
      this.notifyPropertyChange('isPlaying', false);
    } catch (error) {
      console.error('Error pausing audio:', error);
    }
  }

  async setPlaybackSpeed(speed: number) {
    if (speed >= 0.5 && speed <= 1.5) {
      this._playbackSpeed = speed;
      await this.player.changePlayerSpeed(speed);
      this.notifyPropertyChange('playbackSpeed', speed);
    }
  }

  private onPlaybackComplete() {
    this._isPlaying = false;
    this.notifyPropertyChange('isPlaying', false);
    if (this._repeatMode === 'one') {
      this.play();
    }
  }

  // Getters and setters
  get isPlaying(): boolean {
    return this._isPlaying;
  }

  get playbackSpeed(): number {
    return this._playbackSpeed;
  }

  get currentTime(): number {
    return this._currentTime;
  }

  get subtitleRepeatCount(): number {
    return this._subtitleRepeatCount;
  }

  set subtitleRepeatCount(value: number) {
    this._subtitleRepeatCount = value;
    this.notifyPropertyChange('subtitleRepeatCount', value);
  }

  get subtitleDelay(): number {
    return this._subtitleDelay;
  }

  set subtitleDelay(value: number) {
    this._subtitleDelay = value;
    this.notifyPropertyChange('subtitleDelay', value);
  }

  get repeatMode(): string {
    return this._repeatMode;
  }

  setRepeatMode(mode: 'none' | 'one' | 'all') {
    this._repeatMode = mode;
    this.notifyPropertyChange('repeatMode', mode);
  }
}