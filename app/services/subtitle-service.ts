import { File, Folder } from '@nativescript/core';

export interface Subtitle {
    startTime: number;
    endTime: number;
    text: string;
}

export class SubtitleService {
    private subtitles: Subtitle[] = [];

    async loadSubtitles(filePath: string): Promise<void> {
        try {
            const file = File.fromPath(filePath);
            const content = await file.readText();
            this.subtitles = this.parseSRT(content);
        } catch (error) {
            console.error('Error loading subtitles:', error);
        }
    }

    private parseSRT(content: string): Subtitle[] {
        const subtitles: Subtitle[] = [];
        const blocks = content.trim().split('\n\n');

        blocks.forEach(block => {
            const lines = block.split('\n');
            if (lines.length >= 3) {
                const times = lines[1].split(' --> ');
                subtitles.push({
                    startTime: this.timeToSeconds(times[0]),
                    endTime: this.timeToSeconds(times[1]),
                    text: lines.slice(2).join('\n')
                });
            }
        });

        return subtitles;
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

    getSubtitleAtTime(time: number): string {
        const subtitle = this.subtitles.find(
            sub => time >= sub.startTime && time <= sub.endTime
        );
        return subtitle ? subtitle.text : '';
    }
}