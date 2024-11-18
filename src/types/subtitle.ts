export interface Subtitle {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  url: string;
  subtitles: Subtitle[];
}