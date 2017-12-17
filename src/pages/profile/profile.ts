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
  userInfoFormArray = {
    education: {},
    expertArea: {}
  }; 

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
        
        const formatEducation = {
          HKU: this.userInfoFormArray.education.indexOf("HKU")>-1,
          CUHK: this.userInfoFormArray.education.indexOf("CUHK")>-1,
          HKUST: this.userInfoFormArray.education.indexOf("HKUST")>-1,
          HKIED: this.userInfoFormArray.education.indexOf("HKIED")>-1,
          Oversea: this.userInfoFormArray.education.indexOf("Oversea")>-1,
          Others: this.userInfoFormArray.education.indexOf("Others")>-1
        }  

        const formatExpertArea = {
          Chinese: this.userInfoFormArray.expertArea.indexOf("Chinese")>-1,
          English: this.userInfoFormArray.expertArea.indexOf("English")>-1,
          Mathematics: this.userInfoFormArray.expertArea.indexOf("Mathematics")>-1,
          Physics: this.userInfoFormArray.expertArea.indexOf("Physics")>-1,
          Chemistry: this.userInfoFormArray.expertArea.indexOf("Chemistry")>-1,
          Biology: this.userInfoFormArray.expertArea.indexOf("Biology")>-1,
          GeneralEducation: this.userInfoFormArray.expertArea.indexOf("General Education")>-1,
          AllSubjects: this.userInfoFormArray.expertArea.indexOf("All Subjects")>-1,
        }  

        const formatExpLevel = {
          Primany: true,
          SecondaryJunior: false,
          SecondarySenior: true,
        }  

        const userDataFormat = {
          education: formatEducation,
          expertArea: formatExpertArea,
          expertLevel: formatExpLevel,
        }

        const userData = this.userInfoForm
        this.afDB.collection("users").doc(user.uid).update(userData)
        this.afDB.collection("users").doc(user.uid).update(userDataFormat)
        console.log('Profile updated: ', userData, userDataFormat)
      }else{
        console.log('Not Signed in')
      }

    })    
  }


}
