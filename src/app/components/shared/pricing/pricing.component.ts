import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  plans = [
    {
      name: 'Basic Plan',
      price: 29.99,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      button: {
        text: 'Get Basic',
        link: '#basic',
      },
      popular: false
    },
    {
      name: 'Pro Plan',
      price: 49.99,
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
      button: {
        text: 'Get Pro',
        link: '#pro',
      },
      popular: true
    },
    // Add more plans as needed
  ];
}
