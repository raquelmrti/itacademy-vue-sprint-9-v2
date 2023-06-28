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
    isLoading: false,
    error: ''
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
        this.error = ''
        return user
      } catch (error) {
        this.error = error
      } finally {
        this.isLoading = false
      }
    },
    async signInUser(email, password) {
      this.isLoading = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.updateUserData(user)
        this.error = ''
        return user
      } catch (error) {
        console.log(error.code)
        this.error = error
      } finally {
        this.isLoading = false
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
