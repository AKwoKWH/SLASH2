import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  // userInfo;
  currentUserInfo;
  userInfoForm = {};

  constructor(
    public navCtrl: NavController,
    public afDB: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      this.currentUserInfo = this.afDB.collection('users').doc(user.uid).valueChanges()
    }) 
  }

  GetUserProfile(){  
    this.afAuth.authState.subscribe(user => {
      // this.userInfo = this.afDB.collection('users').valueChanges()
      this.currentUserInfo = this.afDB.collection('users').doc(user.uid).valueChanges()
    })
  }

  logForm() {
    this.afAuth.authState.subscribe(user => {
      if (user!=null){
        const userData = this.userInfoForm
        this.afDB.collection("users").doc(user.uid).update(userData)
        console.log('Profile updated: ', userData)
      }else{
        console.log('Not Signed in')
      }

    })    
  }


}
