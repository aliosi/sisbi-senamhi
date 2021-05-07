import {AbstractControl} from '@angular/forms';

export class myValidators {
  static is_number(control: AbstractControl) {
    const value = control.value;
    // console.log('aqui value' + value);
    if (value.isNumberObject(value)) {
      console.log('entra aqui');
      return null;
    }

    console.log('entra aqui2');
    return {number_valid: true};

  }

  isCaracter() {

  }
}
