import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesPageComponent } from '../categories/components/categories-page/categories-page.component';
import { CategoriesFormComponent } from '../categories/components/categories-page/categories-form/categories-form.component';

const categoriesRoutes: Routes = [
  { path: 'categories', component: CategoriesPageComponent },
  { path: 'categories/new', component: CategoriesFormComponent },
  { path: 'categories/:id', component: CategoriesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(categoriesRoutes,
    )],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
