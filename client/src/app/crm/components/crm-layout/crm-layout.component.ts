import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MaterialService } from 'src/app/core/services/material/material.service';

@Component({
  selector: 'app-crm-layout',
  templateUrl: './crm-layout.component.html',
  styleUrls: ['./crm-layout.component.css']
})
export class CrmLayoutComponent implements AfterViewInit {
  links = [
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Aanalytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Add order'},
    {url: '/categories', name: 'Categories'},
  ]
  @ViewChild('floating') floatingRef: ElementRef;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef);
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
