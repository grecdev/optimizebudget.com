import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';

import { allRoutes } from '@script/globalData';

import { type RegexPatterns, RequirementType } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication-common.scss', './register.component.scss'],
})
export class RegisterComponent {
  public readonly RequirementType = RequirementType;

  public paths: Pick<typeof allRoutes, 'login'> = {
    login: allRoutes.login,
  };

  /**
   * @summary - Sanitize whatever inputs.
   *
   * @type {DomSanitizer}
   *
   * @private
   * @readonly
   */
  private readonly _domSanitizer: DomSanitizer;

  /**
   * @summary - Icon registry service.
   *
   * @type {IconRegistryService}
   *
   * @private
   * @readonly
   */
  private readonly _iconRegistryService: IconRegistryService;

  /**
   * @summary - Icons state.
   *
   * @type {Record<string, string>}
   * @public
   * @readonly
   */
  public readonly icons: Record<string, string> = {
    xMark: 'xmark',
    check: 'check',
  };

  private readonly _regexPatterns: RegexPatterns = {
    specialCharacters: /[$%&_@!]/,
    numbers: /\d/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    password: /^(?=.*[$%&_@!])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d$%&_@!]{5,15}$/,
  };

  public readonly registerForm: FormGroup = new FormGroup({
    fullName: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this._regexPatterns.password)],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(iconRegistryService: IconRegistryService, domSanitizer: DomSanitizer) {
    this._iconRegistryService = iconRegistryService;
    this._domSanitizer = domSanitizer;

    this._initIconRegistry();
  }

  public handleSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm);
    console.log(this.registerForm.invalid);
  }

  /**
   * @summary - Registry icons used in this component.
   *
   * @private
   * @returns {void}
   */
  private _initIconRegistry(): void {
    Object.values(this.icons).forEach(item => {
      this._iconRegistryService.addSvgIconConfig({
        name: item,
        url: this._domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${item}.svg`),
      });
    });
  }
}
