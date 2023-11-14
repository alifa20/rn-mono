import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import initializeApp from './init';

import { Platform } from 'react-native';
import rnAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

Platform.OS === 'web' && initializeApp();

class FirebaseAuth {
  private static instance: FirebaseAuth;
  private auth: typeof rnAuth;

  private constructor() {
    if (Platform.OS === 'web') {
      // @ts-ignore
      this.auth = firebase.auth;
    } else {
      this.auth = rnAuth;
    }
  }

  public static getInstance(): FirebaseAuth {
    if (!FirebaseAuth.instance) {
      FirebaseAuth.instance = new FirebaseAuth();
    }
    return FirebaseAuth.instance;
  }

  public async signInWithEmailAndPassword(email: string, password: string) {
    return this.auth().signInWithEmailAndPassword(email, password);
  }

  public async signOut() {
    return this.auth().signOut();
  }

  public async signInWithGoogle() {}

  public async signInWithFacebook() {}

  public async register(email: string, password: string) {
    return this.auth().createUserWithEmailAndPassword(email, password);
  }

  public async sendPasswordResetEmail(email: string) {
    return this.auth().sendPasswordResetEmail(email);
  }

  public async forgotPassword(email: string) {
    return this.auth().sendPasswordResetEmail(email);
  }

  public onAuthStateChanged(listener: FirebaseAuthTypes.AuthListenerCallback) {
    return this.auth().onAuthStateChanged(listener);
  }

  public async fetchNewToken() {
    return this.auth().currentUser?.getIdToken(true);
  }
}

export const auth = FirebaseAuth.getInstance();
