import {Component, OnInit, ViewChild} from '@angular/core';
import {InsuranceService} from '../shared/services/insuranceService';
import {Claim} from '../shared/models/claim';
import {AuthService} from '../shared/services/authService';
import {ClaimImage} from '../shared/models/claimImage';
import * as AWS from 'aws-sdk';
import {Router} from '@angular/router';


@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {
  showalert = false;
  userInsuranceId = [];
  photoList = [];
  @ViewChild('files') files;
  @ViewChild('files2') files2;


  constructor(private insur: InsuranceService, private auth: AuthService, private router: Router) {
  }

  claim: Claim = new Claim();
  newImage: ClaimImage = new ClaimImage();
  showalert2 = false;


  ngOnInit(): void {
    this.claim.claimImages = [];


    this.insur.getInsurance(this.auth.uid)
      .subscribe(res => {
        res.forEach(i => {
          this.userInsuranceId.push(i.id);
        });
      });
  }


  Submit(claim) {
    console.log(this.claim.insurid);
    this.claim.uid = this.auth.user.id;
    this.photoList.forEach(p => {
      const claimImage = {
        url: p
      };
      claim.claimImages.push(claimImage);
    });
    this.insur.newClaim(claim)
      .subscribe(c => {
        if (c.success) {
          this.showalert = true;
        }
      });
  }

  goHome() {
    this.showalert = false;
    this.router.navigateByUrl('/home');

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
        this.photoList.push(data.Location);
      },
      (err) => {
        return alert('There was an error uploading your photo: ' + err.message);
      }
    );

  }
  addPhoto2 = (albumName) => {
    const files2 = this.files2.nativeElement.files;
    if (!files2.length) {
      return alert('Please choose a file to upload first.');
    }
    const file2 = files2[0];
    const fileName = file2.name;
    const albumPhotosKey = encodeURIComponent(albumName) + '//';

    const photoKey = albumPhotosKey + fileName;

    // Use S3 ManagedUpload class as it supports multipart uploads
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'eisuserphoto',
        Key: photoKey,
        Body: file2,
        ACL: 'public-read'
      }
    });

    const promise = upload.promise();

    promise.then(
      (data) => {
        this.showalert2 = true;
        this.photoList.push(data.Location);
      },
      (err) => {
        return alert('There was an error uploading your photo: ' + err.message);
      }
    );

  }
}
