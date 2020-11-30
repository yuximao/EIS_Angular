import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/authService';
import {Profile} from '../shared/models/profile';
import {Car} from '../shared/models/car';
import {InsuranceService} from '../shared/services/insuranceService';
import {Ticket} from '../shared/models/ticket';
import {Insurance} from '../shared/models/insurance';
import {Router} from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as AWS from 'aws-sdk';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, public auth: AuthService, private insur: InsuranceService, private router: Router) {
  }
  isLinear = true;
  hasProfile = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  hasInsur = false;
  agreement = false;
  insurid: number = null;
  iscard = false;
  price: any;
  @ViewChild('files') files;

  // tslint:disable-next-line:variable-name
  start_day: Date;
  // tslint:disable-next-line:variable-name
  end_date: Date;

  userInsuranceId = [];
  profile: Profile = new Profile();
  car: Car = new Car();
  tickets: Ticket[] = [];
  insurance: Insurance = new Insurance();

  profileSuccess = false;
  insuranceSuccess = false;
  ticketSuccess = false;

  PaySwitch1 = true;
  PaySwitch2 = false;
  PaySwitch3 = false;
  saveLateralert = false;
  saveAlert = false;
  insurWrong = false;
  updateImg = false;

  ngOnInit(): void {
    if (this.auth.profile !== null) {
      this.hasProfile = true;
      this.profile = {...this.auth.profile};
    }
    this.firstFormGroup = this._formBuilder.group({
      age: [null, Validators.required],
      driving_age: [null, Validators.required],
      address: [null, Validators.required],
      degree: [null, Validators.required],
      selphone: [null, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      insur_id: [null,],
      start_date: [null,],
      end_date: [null,],
      vin: [null, Validators.required],
      make: [null, Validators.required],
      model: [null, Validators.required],
      year: [null, Validators.required],
      color: [null, Validators.required],
      miles: [null, Validators.required],
    });
    this.price = Math.round(Math.random() * (1500 - 500)) + 500;

    this.insur.getInsurance(this.auth.uid)
      .subscribe(res => {
        this.insur.insurance = res;
        res.forEach(i => {
          this.userInsuranceId.push(i.id);
        });
      });

  }

  pay1() {
    this.PaySwitch1 = true;
    this.PaySwitch2 = false;
    this.PaySwitch3 = false;
  }

  pay2() {
    this.PaySwitch1 = false;
    this.PaySwitch2 = true;
    this.PaySwitch3 = false;
  }

  pay3() {
    this.PaySwitch1 = false;
    this.PaySwitch2 = false;
    this.PaySwitch3 = true;
  }


  getChecked(e) {
    console.log(this.insurid);

    if (e.target.checked) {
      this.hasInsur = true;
      this.start_day = null;
      this.end_date = null;
    } else {
      this.hasInsur = false;
      this.insurid = null;
    }
  }

  addTicket() {
    // this.thirdFormGroup = this._formBuilder.group({
    //   ticket: ['', Validators.required],
    //   ticketdate: ['', Validators.required]
    // });
    this.tickets.push(new Ticket());
  }

  getPrice() {

  }
  addPhoto = (albumName) => {
    const files = this.files.nativeElement.files;
    if (!files.length) {
      return alert('Please choose a file to upload first.');
    }
    const file = files[0];
    const fileName = file.name;
    const albumPhotosKey = encodeURIComponent(albumName) + '//';

    const photoKey = albumPhotosKey + fileName;

    // Use S3 ManagedUpload class as it supports multipart uploads
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'eisuserphoto',
        Key: photoKey,
        Body: file,
        ACL: 'public-read'
      }
    });

    const promise = upload.promise();

    promise.then(
      (data) => {
        this.updateImg = true;
        this.car.carphoto = data.Location;
      },
      (err) => {
        return alert('There was an error uploading your photo: ' + err.message);
      }
    );

  }


  Submit(): boolean {
    if (this.insurid !== null) {
      this.insurance = this.insur.insurance.find(i => i.id == this.insurid);
      if (this.insurance == undefined) {
        this.insurid = null;
        this.insurWrong = true;
        this.router.navigateByUrl('/home');
        return false;
      }
    }


    if (this.hasProfile) {
      this.auth.updateProfile(this.profile)
        .subscribe(p => {
            if (p.success) {
              this.profileSuccess = true;
              this.auth.getProfile(this.auth.uid)
                .subscribe( res => {
                  this.auth.profile = res;
                });
              console.log(this.profileSuccess);
            }
          }
        );
    } else {
      this.profile.uid = this.auth.uid;
      this.auth.addProfile(this.profile)
        .subscribe(p => {
            if (p.success) {
              this.auth.getProfile(this.auth.uid)
                .subscribe( res => {
                  this.auth.profile = res;
                });
              this.profileSuccess = true;
              console.log(this.profileSuccess);
            }
          }
        );
    }

    if (this.insurid === null) {
      this.insurance.start_date = this.start_day;
      this.insurance.end_date = this.end_date;
      this.insurance.uid = this.auth.uid;
      this.insurance.cars = [];
      this.insurance.price = this.price;
      this.car.uid = this.auth.uid;
      this.insurance.cars.push(this.car);
      this.insur.addInsurance(this.insurance)
        .subscribe(p => {
          if (p.success) {
            this.insuranceSuccess = true;
            this.insur.getInsurance(this.auth.uid)
              .subscribe(res => {
                this.insur.insurance = res;
                const insuranceContainer =
                  res.find(i => i.cars[0].vin == this.car.vin);
                this.insurid = insuranceContainer.id;
              });

            console.log(this.insuranceSuccess);
          }
        });
    } else {
      this.car.uid = this.auth.uid;
      this.insurance.cars.push(this.car);
      this.insurance.price += this.price;
      console.log(this.insurance);
      this.insur.updateInsurance(this.insurance)
        .subscribe(p => {
          if (p.success) {
            this.insur.getInsurance(this.auth.uid)
              .subscribe(res => {
                this.insur.insurance = res;
              });
            this.insuranceSuccess = true;
            console.log(this.insuranceSuccess);
          }
        });
    }
    this.tickets.forEach(t => {
      t.uid = this.auth.uid;
      this.insur.addHistory(t)
        .subscribe(p => {
          this.ticketSuccess = true;
          console.log(this.ticketSuccess);
        });
    });
    this.insur.getInsurance(this.auth.uid)
      .subscribe(res => {
        this.insur.insurance = res;
      });
    // add an ask alert
    this.saveAlert = true;
    return true;
  }

  save(): boolean {
    if (this.insurid !== null) {
      this.insurance = this.insur.insurance.find(i => i.id == this.insurid);
      if (this.insurance == undefined) {
        this.insurid = null;
        this.insurWrong = true;
        this.router.navigateByUrl('/home');
        return false;
      }
    }


    if (this.hasProfile) {
      this.auth.updateProfile(this.profile)
        .subscribe(p => {
            if (p.success) {
              this.auth.getProfile(this.auth.uid)
                .subscribe( res => {
                  this.auth.profile = res;
                });
              this.profileSuccess = true;
              console.log(this.profileSuccess);
            }
          }
        );
    } else {
      this.profile.uid = this.auth.uid;
      this.auth.addProfile(this.profile)
        .subscribe(p => {
            if (p.success) {
              this.auth.getProfile(this.auth.uid)
                .subscribe( res => {
                  this.auth.profile = res;
                });
              this.profileSuccess = true;
              console.log(this.profileSuccess);
            }
          }
        );
    }

    if (this.insurid === null) {
      this.insurance.start_date = this.start_day;
      this.insurance.end_date = this.end_date;
      this.insurance.uid = this.auth.uid;
      this.insurance.cars = [];
      this.insurance.price = -(this.price);
      this.car.uid = this.auth.uid;
      this.insurance.cars.push(this.car);
      this.insur.addInsurance(this.insurance)
        .subscribe(p => {
          if (p.success) {
            this.insuranceSuccess = true;

            this.insur.getInsurance(this.auth.uid)
              .subscribe(res => {
                this.insur.insurance = res;
                const insuranceContainer =
                  res.find(i => i.cars[0].vin == this.car.vin);
                this.insurid = insuranceContainer.id;
                this.saveLateralert = true;
              });
            console.log(this.insuranceSuccess);
          }
        });
    } else {
      this.car.uid = this.auth.uid;
      this.insurance.cars.push(this.car);
      this.insurance.price = -(this.insurance.price + this.price);
      console.log(this.insurance);
      this.insur.updateInsurance(this.insurance)
        .subscribe(p => {
          if (p.success) {
            this.insur.getInsurance(this.auth.uid)
              .subscribe(res => {
                this.insur.insurance = res;
              });
            this.insuranceSuccess = true;
            console.log(this.insuranceSuccess);
            this.saveLateralert = true;
          }
        });
    }
    this.tickets.forEach(t => {
      t.uid = this.auth.uid;
      this.insur.addHistory(t)
        .subscribe(p => {
          this.ticketSuccess = true;
          console.log(this.ticketSuccess);
        });
    });

    this.insur.getInsurance(this.auth.uid)
      .subscribe(res => {
        this.insur.insurance = res;
      });

    return true;
  }

  saveGo() {
    this.saveLateralert = false;
    this.router.navigateByUrl('/home');
  }

  payGo() {
    this.saveAlert = false;
    const documentDefinition = {
      content:
        'The Economical Insurance System\n' +
        'Your Receipt:\n' +
        '\n' +
        `Hello ${this.auth.user.username}, Thank you for your payment!
        Here is your information:\n` +
        `User ID: ${this.auth.uid}
        Your Insurance ID: ${this.insurid}\n` +
        `Insurance start Date: ${this.insurance.start_date}\n` +
        `Insurance End Date: ${this.insurance.end_date}
        The ${this.car.year} - ${this.car.make} - ${this.car.model}
        Cars Vin Number: ${this.car.vin}
        Total Payment: ${this.price}\n` +
        '\n' +
        'For the future questions, please connect us at:\n' +
        '8166948761'
    };
    pdfMake.createPdf(documentDefinition).download();

    this.router.navigateByUrl('/home');

  }

  insurWongGo() {
    this.insurWrong = false;
    this.router.navigateByUrl('/home');

  }
}
