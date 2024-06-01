import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Login } from '../authModel/Login';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  @ViewChild('main') main!: ElementRef;
  @ViewChild('toggleBtns') toggleBtns!: ElementRef[];
  public login: Login = new Login();
  loginError!: string;
  isInputFocused: boolean = false;
  currentImage: string = 'img-1';
  currentBullet: number = 1;
  textTransform: string = 'translateY(0)';
  userId!: string;
  loginForm: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.validateLoginForm();
  }

  /**
   * Function is used to validate Login Form.
   */
  validateLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  get password() {
    return this.loginForm.get('password');
  }

  get username() {
    return this.loginForm.get('username');
  }

  /**
   * Function is used to login.
   */
  userlogin() {
    this.loginForm.get('username').markAsTouched();
    this.loginForm.get('password').markAsTouched();
    if (this.password.value && this.username.value) {
      let formData = new FormData();
      formData.append("username", this.login.username);
      formData.append("password", this.login.password);
      this.authService.login(formData).subscribe((response: any) => {
        if (response.user) {
          localStorage.setItem('token', JSON.stringify(response.token))
          this.router.navigate(['home']);
          this.toastr.success('Welcome', 'Successfully Login');
        }
      }, (err) => {
        this.loginError = err.error.msg;
        setTimeout(() => {
          this.loginError = '';
        }, 3000)
      })
    }
  }

  /**
   * Functon is used to slider.
   * @param index
   */
  moveSlider(index: any): void {
    this.currentImage = `img-${index}`;
    this.currentBullet = index;
    this.textTransform = `translateY(${-2.2 * (index - 1)}rem)`;
  }

  /**
   * This function is used to add class in input field.
   * @param inputField
   */
  handleInputFieldFocus(inputField: HTMLInputElement): void {
    inputField.classList.add("active");
  }
  onInputBlur(inputField: HTMLInputElement): void {
    if (inputField.value === '') {
      inputField.classList.remove("active");
    }
  }
}
