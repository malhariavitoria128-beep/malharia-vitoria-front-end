import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp, FirebaseApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCUPpOp2mm8JbvDc4aBPBs6knpJGPWeyl0",
  authDomain: "malharia-vitoria.firebaseapp.com",
  projectId: "malharia-vitoria",
  storageBucket: "malharia-vitoria.firebasestorage.app",
  messagingSenderId: "334552254049",
  appId: "1:334552254049:web:3ed0564afeca5b0b5a0c20"
};

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class FirebaseModule { }
