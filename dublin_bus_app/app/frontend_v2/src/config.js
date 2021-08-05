import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBUubTNjY772TYe-SMwYfOut7oUMZS53mc",
    authDomain: "bda-2021.firebaseapp.com",
    projectId: "bda-2021",
    storageBucket: "bda-2021.appspot.com",
    messagingSenderId: "930954973669",
    appId: "1:930954973669:web:f2da910008a701469a1f0c",
});

// const firebaseConfig = firebase.initializeApp({
//     apiKey: "AIzaSyBFgz-5vjRi5ZhCNkp49x7Wv4QPHFzNqQU",
//     authDomain: "test-12b94.firebaseapp.com",
//     projectId: "test-12b94",
//     storageBucket: "test-12b94.appspot.com",
//     messagingSenderId: "882093026330",
//     appId: "1:882093026330:web:99aab1bc9638c0f0b8b5a3",
//     measurementId: "G-33GBFPBYQG"
//   });

  export default firebaseConfig;