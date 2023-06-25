import { defineStore } from 'pinia'
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore/lite'
import { auth, db } from '../../firebaseConfig'

export const useEntryStore = defineStore('entryStore', {
  state: () => ({
    entries: [],
    isLoading: true
  }),
  actions: {
    async getEntries(userId) {
      this.isLoading = true
      try {
        const q = query(collection(db, 'entries'), where('author_id', '==', userId))
        const querySnapshot = await getDocs(q)
        this.entries = querySnapshot.docs.map((doc) => ({ entry_id: doc.id, ...doc.data() }))
      } catch (error) {
        console.error('Failed to get entries: ', error)
      } finally {
        this.isLoading = false
      }
    },
    async getEntryById(entry_id) {
      if (this.entries.length > 0) {
        return this.entries.find((entry) => entry.entry_id === entry_id)
      } else {
        this.isLoading = true
        try {
          const entryRef = doc(db, 'entries', entry_id)
          const listSnap = await getDoc(entryRef)
          if (!listSnap.exists()) {
            throw new Error("List doesn't exist")
          }
          if (listSnap.data().author_id !== auth.currentUser.uid) {
            throw new Error('No permission to get this entry')
          }

          return listSnap.data()
        } catch (error) {
          console.error('Failed to get entry: ', error)
        } finally {
          this.isLoading = false
        }
      }
    },
    async createEntry(entryHeadline, entryBody, date) {
      this.isLoading = true
      try {
        const entry = {
          headline: entryHeadline,
          body: entryBody,
          author_id: auth.currentUser.uid,
          date_created: date,
          date_modified: date
        }
        const entryRef = await addDoc(collection(db, 'entries'), entry)
        this.entries.push({
          ...entry,
          entry_id: entryRef.id
        })
      } catch (error) {
        console.error('Failed to create entry: ', error)
      } finally {
        this.isLoading = false
      }
    },
    async deleteList(entry_id) {
      this.isLoading = true
      try {
        const entryRef = doc(db, 'entries', entry_id)
        const listSnap = await getDoc(entryRef)
        if (!listSnap.exists()) {
          throw new Error("List doesn't exist")
        }
        if (listSnap.data().author_id !== auth.currentUser.uid) {
          throw new Error('No permission to delete this entry')
        }

        await deleteDoc(entryRef)
        this.entries = this.entries.filter((entry) => entry.entry_id !== entry_id)
      } catch (error) {
        console.error('Error deleting entry: ', error.message)
      } finally {
        this.isLoading = false
      }
    },
    async updateListTitleAndDescription(entry_id, newTitle, newDescription, updateDate) {
      this.isLoading = true
      try {
        const entryRef = doc(db, 'entries', entry_id)
        const listSnap = await getDoc(entryRef)
        if (!listSnap.exists()) {
          throw new Error("List doesn't exist")
        }
        if (listSnap.data().author_id !== auth.currentUser.uid) {
          throw new Error('No permission to update this entry')
        }
        await updateDoc(entryRef, {
          title: newTitle,
          description: newDescription,
          lastUpdatedDate: updateDate
        })
        this.entries = this.entries.map((entry) => {
          entry.entry_id === entry_id
            ? {
                ...entry,
                title: newTitle,
                description: newDescription,
                lastUpdatedDate: updateDate
              }
            : entry
        })
      } catch (error) {
        console.error(error.message)
      } finally {
        this.isLoading = false
      }
    },

    async updateListGames(entry_id, games) {
      this.isLoading = true
      try {
        const entryRef = doc(db, 'entries', entry_id)
        const listSnap = await getDoc(entryRef)
        if (!listSnap.exists()) {
          throw new Error("List doesn't exist")
        }
        if (listSnap.data().author_id !== auth.currentUser.uid) {
          throw new Error('No permission to update this entry')
        }
        await updateDoc(entryRef, {
          games: [...games]
        })
        this.entries = this.entries.map((entry) => {
          entry.entry_id === entry_id
            ? {
                ...entry,
                title: newTitle,
                description: newDescription,
                lastUpdatedDate: updateDate
              }
            : entry
        })
      } catch (error) {
        console.error(error.message)
      } finally {
        this.isLoading = false
      }
    }
  }
})
