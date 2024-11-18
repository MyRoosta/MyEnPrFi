export interface Song {
  id: string;
  title: string;
  path: string;
  subtitlePath?: string;
  duration?: number;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

export class PlaylistModel {
  private _playlists: Playlist[] = [];
  private _currentPlaylist: Playlist | null = null;
  private _currentSongIndex: number = -1;
  private _shuffle: boolean = false;
  private _repeatMode: 'none' | 'one' | 'all' = 'none';

  createPlaylist(name: string): Playlist {
    const playlist: Playlist = {
      id: Date.now().toString(),
      name,
      songs: []
    };
    this._playlists.push(playlist);
    return playlist;
  }

  addSongToPlaylist(playlistId: string, song: Song): void {
    const playlist = this._playlists.find(p => p.id === playlistId);
    if (playlist) {
      playlist.songs.push(song);
    }
  }

  removeSongFromPlaylist(playlistId: string, songId: string): void {
    const playlist = this._playlists.find(p => p.id === playlistId);
    if (playlist) {
      playlist.songs = playlist.songs.filter(s => s.id !== songId);
    }
  }

  setCurrentPlaylist(playlistId: string): void {
    this._currentPlaylist = this._playlists.find(p => p.id === playlistId) || null;
    this._currentSongIndex = this._currentPlaylist ? 0 : -1;
  }

  getCurrentSong(): Song | null {
    if (!this._currentPlaylist || this._currentSongIndex === -1) {
      return null;
    }
    return this._currentPlaylist.songs[this._currentSongIndex];
  }

  nextSong(): Song | null {
    if (!this._currentPlaylist) return null;
    
    if (this._shuffle) {
      this._currentSongIndex = Math.floor(Math.random() * this._currentPlaylist.songs.length);
    } else {
      this._currentSongIndex = (this._currentSongIndex + 1) % this._currentPlaylist.songs.length;
    }
    
    return this.getCurrentSong();
  }

  previousSong(): Song | null {
    if (!this._currentPlaylist) return null;
    
    if (this._shuffle) {
      this._currentSongIndex = Math.floor(Math.random() * this._currentPlaylist.songs.length);
    } else {
      this._currentSongIndex = this._currentSongIndex === 0 
        ? this._currentPlaylist.songs.length - 1 
        : this._currentSongIndex - 1;
    }
    
    return this.getCurrentSong();
  }

  toggleShuffle(): void {
    this._shuffle = !this._shuffle;
  }

  setRepeatMode(mode: 'none' | 'one' | 'all'): void {
    this._repeatMode = mode;
  }
}