import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/service/payment.service';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { DatePipe } from '@angular/common'

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  payments: Payment[] = [];
  errmsg: string = '';
  suc_info: string = '';
  datenow: Date = new Date();
  ids: number = 0;
  names: string = '';
  toast: boolean = false;

  reset() {
    this.errmsg = ''
    this.suc_info = ''
  }

  form = {
    state: 'Add',
    inputData: new FormGroup({
      paymentDetailId: new FormControl(0, [Validators.required]),
      cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      expirationDate: new FormControl('', [Validators.required],),
      securityCode: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&_])(?=[^A-Z]*[A-Z]).{4}$/)]),
    }),
  }

  get paymentDetailId() { return this.form.inputData.get('paymentDetailId') }
  get cardOwnerName() { return this.form.inputData.get('cardOwnerName') }
  get cardNumber() { return this.form.inputData.get('cardNumber') }
  get expirationDate() { return this.form.inputData.get('expirationDate') }
  get securityCode() { return this.form.inputData.get('securityCode') }

  editPayment(row: Payment) {
    this.form.state = 'Edit'

    this.paymentDetailId?.setValue(row.paymentDetailId)
    this.cardOwnerName?.setValue(row.cardOwnerName)
    this.cardNumber?.setValue(row.cardNumber)
    this.expirationDate?.setValue(this.datepipe.transform(row.expirationDate, 'yyyy-MM'))
    this.securityCode?.setValue(row.securityCode)
  }

  constructor(public paymentService: PaymentService, public router: Router, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getPayment()
  }

  getPayment() {
    this.paymentService
      .getPayment().subscribe((res) => {
        this.payments = res.payment;
        for (let i = 0; i < this.payments.length; i++) {
          const paymentdate: Date = new Date(res.payment[i].expirationDate)
          res.payment[i].expirationDate = paymentdate
          console.log(paymentdate)
        }
      },
        err => {
          console.log(this.errmsg = err);
        })
  
  }

  addPayment() {
    this.form.state = 'Add'
    this.form.inputData.reset()
  }

  addNewPayment() {
    const paymentData = this.form.inputData.value
    delete paymentData.paymentDetailId
    paymentData.cardNumber = paymentData.cardNumber.toString()
    paymentData.expirationDate = this.datepipe.transform(paymentData.expirationDate, 'yyyy-MM-ddTh:mm:ss');

    this.paymentService
      .addNewPayment(paymentData)
      .subscribe((res) => {
        this.suc_info = res.success;
        console.log(this.suc_info)
        this.getPayment()
        this.form.inputData.reset()
      }, err => {
        this.errmsg = err['$.expirationDate']
        console.log(this.errmsg = err['$.expirationDate']);
      })
      this.toast = true;
      setTimeout(() => {this.toast = false}, 5000);
  }

  updatePayment() {
    const paymentData = this.form.inputData.value
    console.log(paymentData.paymentDetailId)
    paymentData.cardNumber = paymentData.cardNumber.toString()
    paymentData.expirationDate = this.datepipe.transform(paymentData.expirationDate, 'yyyy-MM-ddTh:mm:ss');

    this.paymentService
      .updatePayment(paymentData)
      .subscribe((res) => {
        this.suc_info = res.success;
        console.log(this.suc_info)
        this.getPayment();
        this.form.inputData.reset()
      }, err => {
        this.errmsg = err['$.expirationDate']
        console.log(this.errmsg = err['$.expirationDate']);
      })
    this.toast = true;
    setTimeout(() => { this.toast = false }, 5000);
  }

  onSubmit() {
    switch (this.form.state) {
      case 'Add':
        return this.addNewPayment()
      case 'Edit':
        return this.updatePayment()
      default:
        throw 'Error: invalid form state.'
    }
  }

  condel(ids: number, names: string) {
    this.ids = ids;
    this.names = names;
  }

  deletePayment(id: number) {
    this.paymentService
      .deletePayment(id)
      .subscribe((res) => {
        this.suc_info = res.success;
        console.log(this.suc_info)
        this.getPayment()
      },
        err => {
          console.log(this.errmsg = err['$.expirationDate']);
        })
    
  }

  confirmDelete(id: number) {
    this.deletePayment(id)
    this.toast = true;
    setTimeout(() => { this.toast = false }, 5000);
  }

}
