import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriesFormComponent } from './components/categories-page/categories-form/categories-form.component';
import { PositionsFormComponent } from './components/categories-page/categories-form/positions-form/positions-form.component';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [
    CategoriesPageComponent,
    CategoriesFormComponent,
    PositionsFormComponent
  ],
  imports: [
    CategoriesRoutingModule,
    SharedModule
  ],
  exports: []
})
export class CategoriesModule { }
