import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterModule, LoaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'davaleba8';

  public isLoading: any;

  constructor(public apiService: ApiService) {}

  ngOnInit() {
    this.apiService.loader.subscribe((status) => {
      this.isLoading = status;
    });
  }
}
