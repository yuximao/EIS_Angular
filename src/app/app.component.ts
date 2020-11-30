import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/authService';
import {InsuranceService} from './shared/services/insuranceService';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EISFront';
  constructor(private auth: AuthService, private insur: InsuranceService) {
  }
  ngOnInit(): void {
    const albumBucketName = 'eisuserphoto';
    const bucketRegion = 'us-east-1';
    const IdentityPoolId = 'us-east-1:ea8f5ce7-8342-488d-8dae-c30a1e84d57a';

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId
      })
    });

    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: albumBucketName }
    });





    this.auth.getUser()
      .subscribe(u => {
        if (u.success) {
          this.auth.user = u.user;
          this.auth.uid = u.user.id;
          this.auth.role = u.user.role.id;
          if (this.auth.role == 1) {
            this.insur.getInsurance(this.auth.uid)
              .subscribe(i => {
                this.insur.insurance = i;
              });
            this.auth.getProfile(this.auth.uid)
              .subscribe(p => {
                this.auth.profile = p;
              });
          }
        }
      });
  }
}
