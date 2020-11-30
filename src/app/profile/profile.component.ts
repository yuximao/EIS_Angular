import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../shared/services/authService';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  isUpdate = false;
  profile: any;
  showalert = false;
  showalert2 = false;


  update() {
    this.isUpdate = true;
    this.profile = this.auth.profile;

  }

  ngOnInit(): void {

  }

  saveChange() {
    this.auth.updateProfile(this.profile)
      .subscribe(p => {
        if (p.success) {
          this.auth.profile = this.profile;
          this.isUpdate = false;
        }
      });
  }

  cancel() {
    this.isUpdate = false;
  }

  @ViewChild('files') files;
  addPhoto = (albumName) => {
    const files = this.files.nativeElement.files;
    if (!files.length) {
      this.showalert2 = true;
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
        console.log(data);
        this.profile = this.auth.profile;
        this.profile.photo = data.Location;
        this.auth.updateProfile(this.profile)
          .subscribe(res => {
            this.auth.profile = this.profile;
            this.showalert = true;
          });
      },
      (err) => {
        return alert('There was an error uploading your photo: ' + err.message);
      }
    );

  };

}
