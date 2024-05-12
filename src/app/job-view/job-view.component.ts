import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { Product } from '../models/products';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'job-view',
  standalone: true,
  imports: [CardModule,DataViewModule,ButtonModule,TagModule,FormsModule,CommonModule],
  templateUrl: './job-view.component.html',
  styleUrl: './job-view.component.scss'
})
export class JobViewComponent implements OnInit { 

  
  ngOnInit(): void {
    this.products = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Driver',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Mango Bakers',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1001',
        code: 'g234rh0g4',
        name: 'Wooden Sunglasses',
        description: 'Product Description',
        image: 'wooden-sunglasses.jpg',
        price: 80,
        category: 'Accessories',
        quantity: 18,
        inventoryStatus: 'LOWSTOCK',
        rating: 4
      },
      {
        id: '1002',
        code: 'j345gh0g5',
        name: 'Organic Cotton T-Shirt',
        description: 'Product Description',
        image: 'organic-cotton-tshirt.jpg',
        price: 35,
        category: 'Clothing',
        quantity: 10,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 3
      }
      // Add more dummy products as needed
    ];
    
  }

  products?: Product[];


  getSeverity(product: Product): string {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return ''; // Return an empty string for default case
    }
}


}
