import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/categories/interfaces/category.interface';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { MaterialService } from 'src/app/core/services/material/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  isNew = true;
  form: FormGroup;
  image: File;
  imagePreview = '';
  category: Category;
  @ViewChild('input') inputRef: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
    this.form.disable();
    this.route.params
    .pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          this.isNew = false;
          return this.categoriesService.getCategoryById(params['id'])
        }
        return of(null);
      })
    )
    .subscribe(
      (category) => {
        if(category) {
          this.form.patchValue({
            name: category.name
          });
          this.imagePreview = category.imageSrc;
          this.category = category;
          MaterialService.updateTextInputs();
        }
        this.form.enable();
    },
      (error) => {
        MaterialService.toast(error.error.message);
      }
    )
  }
  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  deleteCategory() {
    const decision = window.confirm(`Are you sure you want to delete the category ${this.category.name}`);
    if (decision) {
      this.categoriesService.deleteCategory(this.category._id)
      .subscribe(
        (response) => {
          MaterialService.toast(response.message);
        },
        (error) => {
          MaterialService.toast(error.error.message)
        },
        () => {
          this.router.navigate(['/categories'])
        }
      )
    }
  }

  onSubmit() {
    let obs$;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.categoriesService.createCategory(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.updateCategory(this.category._id, this.form.value.name, this.image);
    }
    obs$.subscribe(
      (category) => {
        this.category = category;
        MaterialService.toast('Changes saved');
        this.form.enable();
      },
      (error) => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    )
  }
}
