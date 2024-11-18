export interface AudioTrack {
    id: string;
    title: string;
    filePath: string;
    subtitlePath?: string;
    duration: number;
    waveformData?: number[];
}

export interface Playlist {
    id: string;
    name: string;
    tracks: AudioTrack[];
    learningSettings: LearningSettings;
}

export interface LearningSettings {
    repetitions: number;
    delayBetweenRepetitions: number;
    playbackSpeed: number;
}