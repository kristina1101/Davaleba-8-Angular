import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartProducts = this.cartCount.asObservable();

  constructor(public apiService: ApiService) {}

  addToCart(product: any) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.updateCartCount();
  }

  updateQuantity(productId: number, change: number) {
    const item = this.cartItems.find((item) => item.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
    }
    this.updateCartCount();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.updateCartCount();
  }

  clearCart() {
    this.cartItems = [];
    this.updateCartCount();
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotalAmount() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  private updateCartCount() {
    const totalQuantity = this.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    this.cartCount.next(totalQuantity);
  }

  public loader: BehaviorSubject<boolean> = new BehaviorSubject(false);

  startLoading() {
    this.loader.next(true);
  }

  stopLoading() {
    this.loader.next(false);
  }
}
