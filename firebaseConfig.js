import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyBjmliBS82plk2emiPVX6eAs9rBv7gLQzM',
  authDomain: 'tinyjournal-ita-sprint-9.firebaseapp.com',
  projectId: 'tinyjournal-ita-sprint-9',
  storageBucket: 'tinyjournal-ita-sprint-9.appspot.com',
  messagingSenderId: '708551693225',
  appId: '1:708551693225:web:cd9141f11d00fac630eab8'
}

initializeApp(firebaseConfig)
const auth = getAuth()
const listDb = getFirestore()

export { auth, listDb }
