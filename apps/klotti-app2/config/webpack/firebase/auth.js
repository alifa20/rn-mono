import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import initializeApp from './init';

initializeApp();

const { auth } = firebase;

// Want to do local development?
// Uncomment this and use `yarn test:emulator:start`
// auth().useEmulator('http://localhost:9099');

export default auth;
