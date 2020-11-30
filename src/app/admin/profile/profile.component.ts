import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../shared/services/authService';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  constructor(private auth: AuthService, private ar: ActivatedRoute, private router: Router) {
  }

  id: any;
  @ViewChild('files') files;
  showalert = false;

  profile = {
    id: null,
    uid: null,
    age: null,
    address: null,
    driving_age: null,
    degree: null,
    photo: null,
    selphone: null,

  };

  ngOnInit(): void {
    if (this.auth.role != 2) {
      this.router.navigateByUrl('home');
    }
    this.ar.paramMap
      .pipe(switchMap(params => {
        this.id = +params.get('id');
        return this.auth.getProfile(this.id);
      }))
      .subscribe(p => {
        this.profile = p;
      });
  }

  Change() {
    this.auth.updateProfile(this.profile)
      .subscribe(res => {
        if (res.success) {
          this.router.navigate(['/admin']).catch();
        }
      });
  }

  Create() {
    this.profile.uid = this.id;
    this.auth.addProfile(this.profile)
      .subscribe(res => {
        if (res.success) {
          this.router.navigate(['/admin']).catch();
        }
      });
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
        this.showalert = true;
        this.profile.photo = data.Location;
      },
      (err) => {
        return alert('There was an error uploading your photo: ' + err.message);
      }
    );

  };

}
