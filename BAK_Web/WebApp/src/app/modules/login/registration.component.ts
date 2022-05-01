import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NotificationsService } from "../../services/notifications.service";
import { AuthenticationService } from "../../services/auth.service";
import { ResponseHelper } from "../../helpers/response-helpers";


@Component({
  selector: 'registration-component',
  templateUrl: 'registration.component.html',
  styleUrls: ['../../app.component.css']

})

export class RegistrationComponent  {
  registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  }, { validator: confirmedValidator('password', 'repeatPassword') });
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private responseHelper: ResponseHelper,
    private notificationsService: NotificationsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.f['username'].value, this.f['password'].value, this.f['email'].value)
      .pipe(first())
      .subscribe(
        data => {
          this.notificationsService.showSuccess("Sėkmingai prisiregistravote. Dabar galite prisijungti.", "");
          this.router.navigate(['/login']);
          this.loading = false;
        },
        data => {
          console.log('error: ' + JSON.stringify(data.error));
          this.notificationsService.showError(this.responseHelper.getRegistrationErrorMessages(data.error.errorMessages), "");
          this.loading = false;
        });
  }
}

export function confirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
