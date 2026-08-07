import { Component, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('engagement');

  @ViewChild('wreathTrigger') wreathTrigger!: ElementRef<HTMLDivElement>;

  private observer: IntersectionObserver | null = null;
  // private animated = false;

  private peacockColors = ["#ee9b00", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6"];

  ngAfterViewInit(): void {
    this.initScrollObserver();
  }

  private initScrollObserver(): void {
    const options: IntersectionObserverInit = {
      root: null,
      threshold: 0.4
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerPartyPoppers();
          // this.animated = true;

          // this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    if (this.wreathTrigger?.nativeElement) {
      this.observer.observe(this.wreathTrigger.nativeElement);
    }
  }

  private triggerPartyPoppers(): void {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: this.peacockColors
    });

    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: this.peacockColors
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
