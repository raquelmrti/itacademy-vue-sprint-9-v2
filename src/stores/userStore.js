import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../../firebaseConfig'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userData: null,
    isLoading: true
  }),

  actions: {
    updateUserData(user) {
      this.userData = {
        uid: user.uid,
        username: user.displayName,
        email: user.email
      }
    },
    async registerUser(username, email, password) {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, { displayName: username })
        this.updateUserData(user)
        return user
      } catch (error) {
        // TODO: Handle errors
        console.error('Error registering user:', error)
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!')
        }
      }
    },
    async signInUser(email, password) {
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.updateUserData(user)
        return user
      } catch (error) {
        console.error('Error signing user in: ', error)
      }
    },
    async logoutUser() {
      try {
        await signOut(auth)
        this.userData = null
      } catch (error) {
        console.error('Error logging out the user: ', error)
      }
    },
    async getCurrentUser() {
      try {
        const user = await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
              if (user) {
                this.updateUserData(user)
              }
              resolve(user)
            },
            (e) => reject(e)
          )
          unsubscribe()
        })
        return user
      } catch (error) {
        console.error(error)
      }
    }
  }
})
