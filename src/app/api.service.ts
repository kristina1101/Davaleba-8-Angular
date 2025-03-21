
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private baseUrl = 'https://restaurant.stepprojects.ge/api';
  private cartCount = new BehaviorSubject<number>(0);
  cartProducts = this.cartCount.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Products/GetAll`);
  }
  
  getCartItems(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Baskets/GetAll`).pipe(
      tap((items) => {
        const totalQuantity = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
        this.cartCount.next(totalQuantity);
      })
    );
  }
  
  refreshCartCount() {
    this.getCartItems().subscribe();
  }
  
  addToCart(cartItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Baskets/AddToBasket`, cartItem).pipe(
      tap(() => {
        this.cartCount.next(this.cartCount.value + cartItem.quantity);
      })
    );
  }
  
  updateCartItem(productId: number, quantity: number, price: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Baskets/UpdateBasket`, { productId, quantity, price });
  }
  
  removeFromCart(itemId: number): Observable<any> {
    if (!itemId) {
      console.error("API: Invalid item ID received:", itemId);
      return new Observable();
    }
  
    return this.http.delete<any>(`${this.baseUrl}/Baskets/DeleteProduct/${itemId}`).pipe(
      tap(() => {
        this.refreshCartCount();
      })
    );
  }

  getTotalAmount(cartItems: any[]): number {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateCartCount(count: number): void {
    this.cartCount.next(count);
  }

  public loader: BehaviorSubject<boolean> = new BehaviorSubject(false);

  startLoading() {
    this.loader.next(true);
  }

  stopLoading() {
    setTimeout(() => {
      this.loader.next(false);
    }, 1000);
  }
}