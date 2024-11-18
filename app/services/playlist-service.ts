import { ApplicationSettings } from '@nativescript/core';
import { Playlist } from '../models/audio-track';

export class PlaylistService {
    private readonly PLAYLISTS_KEY = 'saved_playlists';

    savePlaylists(playlists: Playlist[]): void {
        ApplicationSettings.setString(
            this.PLAYLISTS_KEY,
            JSON.stringify(playlists)
        );
    }

    getPlaylists(): Playlist[] {
        const playlistsJson = ApplicationSettings.getString(this.PLAYLISTS_KEY);
        return playlistsJson ? JSON.parse(playlistsJson) : [];
    }

    addPlaylist(playlist: Playlist): void {
        const playlists = this.getPlaylists();
        playlists.push(playlist);
        this.savePlaylists(playlists);
    }

    updatePlaylist(updatedPlaylist: Playlist): void {
        const playlists = this.getPlaylists();
        const index = playlists.findIndex(p => p.id === updatedPlaylist.id);
        if (index !== -1) {
            playlists[index] = updatedPlaylist;
            this.savePlaylists(playlists);
        }
    }

    deletePlaylist(playlistId: string): void {
        const playlists = this.getPlaylists();
        const filteredPlaylists = playlists.filter(p => p.id !== playlistId);
        this.savePlaylists(filteredPlaylists);
    }
}