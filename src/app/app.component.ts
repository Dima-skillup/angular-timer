import { timer } from "rxjs";
import { Subject } from "rxjs";
import {takeUntil} from 'rxjs/operators';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  destroy = new Subject<number>();
  timer = 0;
  isStopped = false;
  rxjsTimer = timer(0, 1000);

  start(): void {
    if (this.isStopped) { this.resetSubject(); }
    this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe(val => this.timer = val);
    this.isStopped = true;
  }

  stop(): void {
    this.resetSubject();
    this.isStopped = false;
  }

  resetSubject(): void {
    this.destroy.next();
    this.destroy.complete();
    this.destroy = new Subject<number>();
  }
}

