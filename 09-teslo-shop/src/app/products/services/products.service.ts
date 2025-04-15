import { inject, Injectable } from '@angular/core';
import type { Product, ProductResponse } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { delay, forkJoin, map, type Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import type { User } from '@auth/interfaces/auth-response.interface';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  description: '',
  price: 0,
  stock: 0,
  slug: '',
  sizes: [],
  tags: [],
  gender: 'kid',
  images: [],
  user: {} as User
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private productsCache = new Map<string, ProductResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;
    if (this.productsCache.has(key)) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return of(this.productsCache.get(key)!);
    }
    return this.http.get<ProductResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    }).pipe(tap(resp => this.productsCache.set(key, resp)));
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {

    const key = `${idSlug}`;
    if (this.productCache.has(key)) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return of(this.productCache.get(key)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
      delay(2000),
      tap(resp => this.productCache.set(key, resp)));
  }


  getProductById(id: string): Observable<Product> {
    if (id === 'new') {
      return of(emptyProduct);
    }

    const key = `${id}`;
    if (this.productCache.has(key)) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return of(this.productCache.get(key)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
      delay(2000),
      tap(product => this.productCache.set(key, product)));
  }

  updateProduct(id: string, productLike: Partial<Product>, imageFileList?: FileList): Observable<Product> {

    const currentImages = productLike.images ?? [];

    return this.uploadImages(imageFileList).pipe(map(imageNames => ({
      ...productLike, images: [...currentImages, ...imageNames]
    })), switchMap(
      (updatedProduct => this.http.patch<Product>(`${baseUrl}/products/${id}`, updatedProduct)),
    ), tap((product) => this.updateProductCache(product))
    )

  }

  createProduct(productLike: Partial<Product>, imageFileList?: FileList): Observable<Product> {
    return this.uploadImages(imageFileList).pipe(map(imageNames => ({
      ...productLike, images: imageNames
    })), switchMap(
      newProduct => this.http.post<Product>(`${baseUrl}/products`, newProduct)
    ), tap((product) => this.updateProductCache(product)))

  }

  updateProductCache(product: Product) {

    const productId = product.id;
    this.productCache.set(productId, product);
    // biome-ignore lint/complexity/noForEach: <explanation>
    this.productsCache.forEach(
      (productResponse) => {
        productResponse.products = productResponse.products.map(
          (currentProduct) =>
            currentProduct.id === productId ? product : currentProduct
        )
      }
    )
  }



  uploadImages(images?: FileList): Observable<string[]> {
    if (!images) return of([]);
    const uploadObservables = Array.from(images).map(file => this.uploadImage(file));

    return forkJoin(uploadObservables).pipe(tap((imageNames) => console.log(imageNames)))

  }

  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http.post<{ fileName: string }>(`${baseUrl}/files/product`, formData).pipe(
      map(resp => resp.fileName)
    )
  }

}
