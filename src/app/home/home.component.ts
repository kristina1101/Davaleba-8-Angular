import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: any[] = [];
  public isLoading: any;

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('error', error);
      },
    });
  }

  addToCart(product: any) {
    const cartItem = {
      id: 0,
      quantity: 1,
      price: product.price,
      productId: product.id,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        nuts: product.nuts,
        image: product.image,
        vegeterian: product.vegeterian,
        spiciness: product.spiciness,
        categoryId: product.categoryId
      }
    };
  
    this.apiService.addToCart(cartItem).subscribe(() => {
      this.apiService.refreshCartCount();
      alert('პროდუქტი დაემატა კალათაში');
    });
  }

  ngOnInitt() {
    this.apiService.loader.subscribe((status) => {
      this.isLoading = status;
    });
  }
}
