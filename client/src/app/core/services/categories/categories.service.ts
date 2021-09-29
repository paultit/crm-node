import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/categories/interfaces/category.interface';
import { Message } from 'src/app/shared/interfaces/message/message';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category');
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`);
  }

  createCategory(name: string, image?: File): Observable<Category> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.post<Category>('/api/category', fd)
  }

  updateCategory(id: string, name: string, image?: File): Observable<Category> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.patch<Category>(`/api/category/${id}`, fd)
  }

  deleteCategory(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`)

  }
}
