import { ChangeDetectionStrategy, Component, inject, input, signal, type OnInit } from '@angular/core';
import type { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from "../../../../products/components/product-carousel/product-carousel.component";
import { FormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabelComponent } from "../../../../shared/components/form-error-label/form-error-label.component";
import { ProductsService } from '@products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  product = input.required<Product>();
  router = inject(Router);
  productsService = inject(ProductsService);
  wasSaved = signal(false)

  fb = inject(FormBuilder);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(1)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ],
  })
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    // this.productForm.reset(this.product() as any)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.productForm.reset(this.product() as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });

  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];
    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }
    this.productForm.patchValue({ sizes: currentSizes });
  }

  async onSubmit() {
    console.log('onSubmit');
    console.log(this.productForm.value);
    console.log('isValid', this.productForm.valid);
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    console.log(this.productForm.errors)
    if (!isValid) {
      return;
    }
    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase().split(',').map(tag => tag.trim()) ?? [],
    }

    if (this.product().id === 'new') {

      const product = await firstValueFrom(this.productsService.createProduct(productLike))
      this.router.navigate(['/admin/products', product.id]);

    } else {
      await firstValueFrom(this.productsService.updateProduct(this.product().id, productLike))
    }
    this.wasSaved.set(true)
    setTimeout(() => {
      this.wasSaved.set(false)
    }, 3000)

  }
}
