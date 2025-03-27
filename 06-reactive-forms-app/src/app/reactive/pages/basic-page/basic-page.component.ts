import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPageComponent {

  private fb = inject(FormBuilder)

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  /*  myForm2 = new FormGroup({
     name: new FormControl(''),
     price: new FormControl(0),
     inStorage: new FormControl(0)
   }) */

  isValidField(fieldName: string): boolean | null {
    console.log(this.myForm.controls[fieldName].errors)
    console.log(this.myForm.controls[fieldName].touched)

    return (this.myForm.controls[fieldName].errors && this.myForm.controls[fieldName].touched)
  }

  getFieldError(fieldName: string): string | null {

    if (!this.myForm.controls[fieldName].errors) {
      return null
    }
    const errors = this.myForm.controls[fieldName].errors ?? {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          // biome-ignore lint/complexity/useLiteralKeys: <explanation>
          return `Debe de ser de ${errors['minlength'].requiredLength} letras`
        case 'min':
          // biome-ignore lint/complexity/useLiteralKeys: <explanation>
          return `Debe de ser mayor de ${errors['min'].min}`
      }
    }
    return null
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return;
    }
    console.log(this.myForm.value)
    this.myForm.reset({
      price: 100,
      inStorage: 50,
      name: 'Camilo'
    })
  }

}
