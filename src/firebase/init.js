import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC4c7581tTssvX5S57YnFvWPayo3LtZSDY",
  authDomain: "geo-ninja-86d55.firebaseapp.com",
  databaseURL: "https://geo-ninja-86d55.firebaseio.com",
  projectId: "geo-ninja-86d55",
  storageBucket: "geo-ninja-86d55.appspot.com",
  messagingSenderId: "1065588794477",
  appId: "1:1065588794477:web:4d59e038b9ed068f31cb64"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()
