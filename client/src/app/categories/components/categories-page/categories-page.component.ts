import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Category } from '../../interfaces/category.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  categories$: Observable<Category[]>;
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();
  }
}
