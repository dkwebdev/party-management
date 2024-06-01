export class Party {
    name!: string;
    company_name!: string;
    mobile_no!: string;
    telephone_no!: string;
    whatsapp_no!: string;
    email!: string;
    remark!: string;
    login_access!: boolean;
    date_of_birth!: any;
    anniversary_date!: any;
    gstin!: string;
    pan_no!: string;
    apply_tds!: boolean;
    credit_limit!: number;
    address: Array<AddressDetail> = new Array<AddressDetail>();
    bank: Array<BankDetail> = new Array<BankDetail>();
    image!: any;
}

export class AddressDetail {
    address_line_1!: string;
    address_line_2!: string;
    country!: string;
    state!: string;
    city!: string;
    pincode!: string;
}

export class BankDetail {
    bank_ifsc_code!: string;
    bank_name!: string;
    branch_name!: string;
    account_no!: string;
    account_holder_name!: string;
}