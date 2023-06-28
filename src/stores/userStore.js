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
    userData: {},
    isLoading: true
  }),

  actions: {
    updateUserData(user) {
      this.userData = {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        icon: user.photoURL
      }
    },
    async registerUser(username, email, password, icon) {
      this.isLoading = true
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, { displayName: username, photoURL: icon })
        this.updateUserData(user)
        return user
      } catch (error) {
        // TODO: Handle errors
        console.error('Error registering user:', error)
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!')
        }
      } finally {
        this.isLoading = false
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
        return 'success'
      } catch (error) {
        console.error('Error logging out the user: ', error)
      }
    },
    async getCurrentUser() {
      const user = await new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.updateUserData(user)
            } else {
              this.userData = {}
            }
            resolve(user)
          },
          (e) => reject(e)
        )
        unsubscribe()
      })
      return user
    }
  }
})
