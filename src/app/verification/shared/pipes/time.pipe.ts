import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  private formatTime(time: number): string {
    const timeStr = `${time}`;
    return timeStr.length > 1 ? timeStr : `0${timeStr}`;
  }

  transform(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.abs(minutes * 60 - time);
    return `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }
}
