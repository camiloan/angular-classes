import type { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors) {
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
        case 'email':
          return 'El valor ingresado no es un correo electrónico'
        case 'pattern':
          // biome-ignore lint/complexity/useLiteralKeys: <explanation>
          if (errors['pattern'].requiredPattern === FormUtils.namePattern) {
            return 'El valor ingresado no luce como un correo electrónico'
          }
          return 'Error de patrón contra expresión regular'
        default:
          return 'Error de validación no controlado'
      }
    }
    return null
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {

    if (!form.controls[fieldName].errors) {
      return null
    }
    const errors = form.controls[fieldName].errors ?? {}

    return FormUtils.getTextError(errors)

  }


  static isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return !!formArray.controls[index].errors && formArray.controls[index].touched
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {

    if (!formArray.controls[index].errors) {
      return null
    }
    const errors = formArray.controls[index].errors ?? {}

    return FormUtils.getTextError(errors)
  }
}
