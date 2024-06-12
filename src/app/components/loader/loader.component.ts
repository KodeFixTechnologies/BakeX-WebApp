import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loader',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div *ngIf="loading" class="loader-overlay">
  <div class="loader">
  <div class="panWrapper">
    <div class="pan">
      <div class="food"></div>
      <div class="panBase"></div>
      <div class="panHandle"></div>
    </div>
    <div class="panShadow"></div>
  </div>
</div>

  </div>
`,
  styleUrl: './loader.component.scss'
})



export class LoaderComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  private subscription: Subscription | undefined;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.subscription = this.loaderService.loaderState$.subscribe((state: boolean) => {
      this.loading = state;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}