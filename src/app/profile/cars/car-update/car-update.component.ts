import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../shared/services/authService';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Location} from '@angular/common';
import {InsuranceService} from '../../../shared/services/insuranceService';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.scss']
})
export class CarUpdateComponent implements OnInit {
  @ViewChild('files') files;
  car: any;
  id: number;
  showalert = false;
  showalert2 = false;

  constructor(private auth: AuthService, private ar: ActivatedRoute, private location: Location,
              private router: Router, private insur: InsuranceService) { }
  ngOnInit(): void {
    this.ar.paramMap
      .pipe(switchMap(params => {
        this.id = +params.get('id');
        return this.auth.getCar(this.id);
      }))
      .subscribe(c => {
        this.car = c;
      });
  }

  UpdateCar(f) {
    this.auth.updateCar(f)
      .subscribe(res => {
        if (res.success) {
            this.showalert = true;
            this.insur.getInsurance(this.auth.uid)
              .subscribe(ress => {
                this.insur.insurance = ress;
              });
        }
      });
  }

  goHome() {
    this.showalert = false;
    this.router.navigate(['/listInsur']).catch();
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
        this.showalert2 = true;
        this.car.carphoto = data.Location;
      },
      (err) => {
        return alert('There was an error uploading your photo: ' + err.message);
      }
    );

  }
}
