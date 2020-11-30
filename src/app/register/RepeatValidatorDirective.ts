import {Attribute, Directive, forwardRef} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validateEqual][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RepeatValidatorDirective),
      multi: true
    }
  ]
})

export class RepeatValidatorDirective implements Validator {
  constructor(
    @Attribute('validateEqual') public validateEqual: string,
    @Attribute('reverse') public reverse: string) { }
  private get isReverse() {
    if (!this.reverse) { return false; }
    return this.reverse === 'true';
  }

  validate(c: AbstractControl): { [key: string]: any } {
    const self = c.value;

    const target = c.root.get(this.validateEqual);

    if (target && self !== target.value && !this.isReverse) {
      return {
        validateEqual: true
      };
    }

    if (target && self === target.value && this.isReverse) {
      delete target.errors.validateEqual;
      if (!Object.keys(target.errors).length) { target.setErrors(null); }
    }

    if (target && self !== target.value && this.isReverse) {
      target.setErrors({
        validateEqual: true
      });

    }
    return null;
  }
}
