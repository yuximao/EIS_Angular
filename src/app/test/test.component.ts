import {Component, OnInit, ViewChild} from '@angular/core';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],

})
export class TestComponent {

  photourl: any;
  @ViewChild('files') files;
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
        alert('Successfully uploaded photo.');
        console.log(data);
        this.photourl = data.Location;
      },
      (err) => {
        return alert('There was an error uploading your photo: ' + err.message);
      }
    );

  }


}
