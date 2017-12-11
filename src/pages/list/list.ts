import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFirestoreDocument } from 'angularfire2/firestore';
// import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

// export interface Item {}


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  userList;
  userListFilter;
  searchUserForm = {};


  constructor(
    public navCtrl: NavController,
    public afDB: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {} 
  
  GetUserList(){  
      this.userList = this.afDB.collection('users').valueChanges()
      console.log(this.afDB.collection('users').valueChanges())

      this.userListFilter = this.afDB.collection('users', ref => {        
        return ref.where('gender', '==', this.searchUserForm.gender);
        // return ref.orderBy('gender').startAt(this.searchUserForm.gender).endAt(this.searchUserForm.gender);
      }).valueChanges();
  }

  UploadTestData(){
    var pushkey = this.afDB.createId();
    var RandPhoneNumber  = 90000000 + Math.round(Math.random()*10000000)
    var TestName = "USER #" + Math.round(Math.random()*100)
    var UserAvaliablity = {
      MonAM: Math.random() >= 0.5,
      MonNN: Math.random() >= 0.5,
      MonPM: Math.random() >= 0.5,
      TueAM: Math.random() >= 0.5,
      TueNN: Math.random() >= 0.5,
      TuePM: Math.random() >= 0.5,
      WedAM: Math.random() >= 0.5,
      WedNN: Math.random() >= 0.5,
      WedPM: Math.random() >= 0.5,
      ThuAM: Math.random() >= 0.5,
      ThuNN: Math.random() >= 0.5,
      ThuPM: Math.random() >= 0.5,
      FriAM: Math.random() >= 0.5,
      FriNN: Math.random() >= 0.5,
      FriPM: Math.random() >= 0.5,
      SatAM: Math.random() >= 0.5,
      SatNN: Math.random() >= 0.5,
      SatPM: Math.random() >= 0.5,
      SunAM: Math.random() >= 0.5,
      SunNN: Math.random() >= 0.5,
      SunPM: Math.random() >= 0.5,
    }    
    if (RandPhoneNumber % 2 == 1) {var RandGender = 'Male'}
    else {var RandGender = 'Female'}

    const userData = {
        phonenumber: RandPhoneNumber,
        userID: pushkey,
        selfDescription: "This is a auto-gen test user " + RandPhoneNumber,
        userName: TestName,
        gender: RandGender,
        avaliablity: UserAvaliablity
    }
    console.log(userData)
    this.afDB.collection("users").doc(pushkey).set(userData)
      
  }


}