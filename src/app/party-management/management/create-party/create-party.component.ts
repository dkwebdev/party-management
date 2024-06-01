import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { customEmailValidator } from 'src/app/shared/Validations/customEmailValidation';
import { PartyManagementService } from 'src/app/shared/services/partyManagementService/party-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.css']
})
export class CreatePartyComponent {
  partyForm: any;
  imageError: any;
  errorMsg: any;
  partyId: any;

  constructor(
    private fb: FormBuilder,
    private partySerivce: PartyManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      this.partyId = params['id'];
      if (this.partyId) {
        this.getPartyDataById();
      }
    });
  }

  ngOnInit(): void {
    this.validatePartyForm();
  }

  /**
   * Get party data by id.
   */
  getPartyDataById(): void {
    this.partySerivce.getPartyDataById(this.partyId).subscribe((res: any) => {
      const bank = res.bank_id;
      const address = res.address;
      this.partyForm.patchValue(res);
      if (address.length > 0) {
        for (let i = 0; i < address.length; i++) {
          const addressDetailGroup = this.address.at(i) as FormGroup;
          if (addressDetailGroup) {
            addressDetailGroup.patchValue(address[i]);
          }
          if (address.length - 1 > i) {
            this.add_AddressGroup();
          }
        }
      }
      if (bank.length > 0) {
        for (let i = 0; i < bank.length; i++) {
          const bankDetailGroup = this.bankGroup.at(i) as FormGroup;
          if (bankDetailGroup) {
            bankDetailGroup.patchValue(bank[i]);
          }
          if (bank.length - 1 > i) {
            this.addBankGroup();
          }
        }
      }
      this.partyForm.get('image').setValue(null)
    })
  }

  /**
   * Function is used to validate form.
   */
  validatePartyForm(): void {
    this.partyForm = this.fb.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      mobile_no: ['', Validators.required],
      telephone_no: [''],
      whatsapp_no: [''],
      email: ['', [Validators.required, customEmailValidator()]],
      remark: [''],
      login_access: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      anniversary_date: ['', Validators.required],
      gstin: ['', Validators.required],
      pan_no: ['', Validators.required],
      apply_tds: ['', Validators.required],
      credit_limit: ['', Validators.required],
      address: this.fb.array([this.createAddressGroup()]),
      bank: this.fb.array([this.bankDetailGroup()]),
      image: ['', Validators.required]
    })
  }

  /**
   * Address group.
   * @returns 
   */
  createAddressGroup(): FormGroup {
    return this.fb.group({
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  /**
   * Bank group.
   * @returns 
   */
  bankDetailGroup(): FormGroup {
    return this.fb.group({
      bank_ifsc_code: ['', Validators.required],
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_no: ['', Validators.required],
      account_holder_name: ['', Validators.required]
    })
  }

  get f() {
    return this.partyForm.controls;
  }

  get address() {
    return this.partyForm.get('address') as FormArray;
  }

  get bankGroup() {
    return this.partyForm.get('bank') as FormArray;
  }

  /**
   * add group in address.
   */
  add_AddressGroup(): void {
    this.address.push(this.createAddressGroup());
  }

  /**
   *  remove group in address.
   * @param index 
   */
  remove_AddresGroup(index: any): void {
    this.address.removeAt(index);
  }

  /**
   * add group in bank.
   */
  addBankGroup(): void {
    this.bankGroup.push(this.bankDetailGroup());
  }

  /**
   * remove group in bank.
   * @param index
   */
  removeBankGroup(index: any): void {
    this.bankGroup.removeAt(index);
  }

  /**
   * Used to file upload.
   * @param event 
   */
  imagesFileUploader(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageError = null;
      this.partyForm.patchValue({ image: file });
    }
  }

  /**
   * Function is used to Create update.
   */
  createUpdate(): void {
    if (this.partyForm.valid) {
      let formData = new FormData();
      formData.append('name', this.partyForm.get('name').value);
      formData.append('company_name', this.partyForm.get('company_name').value);
      formData.append('mobile_no', this.partyForm.get('mobile_no').value);
      formData.append('telephone_no', this.partyForm.get('telephone_no').value);
      formData.append('whatsapp_no', this.partyForm.get('whatsapp_no').value);
      formData.append('email', this.partyForm.get('email').value);
      formData.append('remark', this.partyForm.get('remark').value);
      formData.append('login_access', this.partyForm.get('login_access').value);
      formData.append('date_of_birth', this.partyForm.get('date_of_birth').value);
      formData.append('anniversary_date', this.partyForm.get('anniversary_date').value);
      formData.append('gstin', this.partyForm.get('gstin').value);
      formData.append('pan_no', this.partyForm.get('pan_no').value);
      formData.append('apply_tds', this.partyForm.get('apply_tds').value);
      formData.append('credit_limit', this.partyForm.get('credit_limit').value);
      formData.append('address', JSON.stringify(this.address.value));
      formData.append('bank', JSON.stringify(this.bankGroup.value));
      formData.append('image', this.partyForm.get('image').value);
      if (!this.partyId) {
        this.partySerivce.createParty(formData).subscribe((res: any) => {
          if (res.success) {
            this.router.navigate(['/home/partyManagement/partyList']);
            this.toastr.success('', res.msg);
          } else {
            this.toastr.error('', res.msg);
          }
        }, (error) => {
          if (error.status === 401) {
            if (error.error.detail) {
              this.toastr.error('', error.error.detail);
            } else {
              this.toastr.error('', "Something Went Wrong");
            }
          } else {
            this.toastr.error('', error.error.msg);
          }
        })
      } else {
        this.partySerivce.updatePartyDataById(this.partyId, formData).subscribe((res: any) => {
          if (res.success) {
            this.router.navigate(['/home/partyManagement/partyList']);
            this.toastr.success('', res.msg);
          } else {
            this.toastr.error('', res.msg);
          }
        }, (error) => {
          console.log(error)
          if (error.error.msg) {
            this.toastr.error('', error.error.msg);
          } else {
            this.toastr.error('', 'UnKnown Error');
          }
        })
      }
    } else {
      console.log('Form not valid');
      this.markFormGroupTouched(this.partyForm);
    }
  }

  /**
   * Function is used to show validation.
   */
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
