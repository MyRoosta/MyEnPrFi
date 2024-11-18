export interface SubtitleEntry {
  startTime: number;
  endTime: number;
  text: string;
}

export class SubtitleModel {
  private _entries: SubtitleEntry[] = [];
  private _currentIndex: number = 0;
  private _fontSize: number = 16;
  private _fontFamily: string = 'System';
  private _timeOffset: number = 0;

  loadSubtitles(srtContent: string): void {
    // Basic SRT parser
    const blocks = srtContent.split('\n\n');
    this._entries = blocks.map(block => {
      const lines = block.trim().split('\n');
      const times = lines[1].split(' --> ');
      return {
        startTime: this.timeToSeconds(times[0]),
        endTime: this.timeToSeconds(times[1]),
        text: lines.slice(2).join('\n')
      };
    });
  }

  getCurrentSubtitle(currentTime: number): string {
    const adjustedTime = currentTime + this._timeOffset;
    const entry = this._entries.find(
      e => adjustedTime >= e.startTime && adjustedTime <= e.endTime
    );
    return entry ? entry.text : '';
  }

  private timeToSeconds(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(':');
    const [secs, ms] = seconds.split(',');
    return (
      parseInt(hours) * 3600 +
      parseInt(minutes) * 60 +
      parseInt(secs) +
      parseInt(ms) / 1000
    );
  }

  setTimeOffset(offset: number): void {
    this._timeOffset = offset;
  }

  setFontSize(size: number): void {
    this._fontSize = size;
  }

  setFontFamily(family: string): void {
    this._fontFamily = family;
  }

  get fontSize(): number {
    return this._fontSize;
  }

  get fontFamily(): string {
    return this._fontFamily;
  }
}