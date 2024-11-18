import { Observable } from '@nativescript/core';
import { AudioPlayerModel } from '../models/audio-player.model';
import { PlaylistModel, Song } from '../models/playlist.model';
import { SubtitleModel } from '../models/subtitle.model';

export class PlayerViewModel extends Observable {
  private audioPlayer: AudioPlayerModel;
  private playlistModel: PlaylistModel;
  private subtitleModel: SubtitleModel;

  constructor() {
    super();

    this.audioPlayer = new AudioPlayerModel();
    this.playlistModel = new PlaylistModel();
    this.subtitleModel = new SubtitleModel();

    // Initialize properties
    this.set('isPlaying', false);
    this.set('currentSubtitle', '');
    this.set('playbackSpeed', 1.0);
    this.set('subtitleRepeatCount', 1);
    this.set('subtitleDelay', 2);
    this.set('currentPlaylist', []);
  }

  async onPlayPause() {
    if (this.get('isPlaying')) {
      await this.audioPlayer.pause();
    } else {
      await this.audioPlayer.play();
    }
    this.set('isPlaying', this.audioPlayer.isPlaying);
  }

  async onNextTrack() {
    const nextSong = this.playlistModel.nextSong();
    if (nextSong) {
      await this.loadSong(nextSong);
    }
  }

  async onPreviousTrack() {
    const prevSong = this.playlistModel.previousSong();
    if (prevSong) {
      await this.loadSong(prevSong);
    }
  }

  private async loadSong(song: Song) {
    await this.audioPlayer.loadAudio(song.path);
    if (song.subtitlePath) {
      // Load subtitles if available
      // Implementation needed for reading subtitle file
    }
    if (this.get('isPlaying')) {
      await this.audioPlayer.play();
    }
  }

  get subtitleStyle(): string {
    return `font-size: ${this.subtitleModel.fontSize}; font-family: ${this.subtitleModel.fontFamily};`;
  }
}