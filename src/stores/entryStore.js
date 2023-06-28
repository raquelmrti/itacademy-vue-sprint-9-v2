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
    isLoading: false,
    error: ''
  }),
  getters: {
    sortedEntries: (state) => state.entries.sort((a, b) => b.date_created - a.date_created)
  },
  actions: {
    async getEntries(userId) {
      try {
        this.isLoading = true
        const q = query(collection(db, 'entries'), where('author_id', '==', userId))
        const querySnapshot = await getDocs(q)
        this.entries = querySnapshot.docs.map((doc) => ({ entry_id: doc.id, ...doc.data() }))
      } catch (error) {
        console.error('Failed to get entries: ', error)
      } finally {
        this.isLoading = false
      }
    },

    async getEntryById(entryId) {
      try {
        this.isLoading = true
        if (this.entries.length > 0) {
          return this.entries.find((entry) => entry.entry_id === entryId)
        } else {
          const entrySnap = await this.validateEntry(entryId)
          return entrySnap.data()
        }
      } catch (error) {
        this.error = error
      } finally {
        this.isLoading = false
      }
    },

    async createEntry(entryHeadline, entryBody, date, parsedDate) {
      try {
        this.isLoading = true
        const headline = entryHeadline || 'Untitled Entry'
        const entry = {
          headline,
          body: entryBody,
          author_id: auth.currentUser.uid,
          author_username: auth.currentUser.displayName,
          date_created: date,
          date_created_parsed: parsedDate,
          date_modified: date,
          date_modified_parsed: parsedDate
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

    async deleteEntry(entryId) {
      try {
        this.isLoading = true
        const entryRef = doc(db, 'entries', entryId)
        await this.validateEntry(entryId)
        await deleteDoc(entryRef)
        this.entries = this.entries.filter((entry) => entry.entry_id !== entryId)
      } catch (error) {
        console.error('Error deleting entry: ', error.message)
      } finally {
        this.isLoading = false
      }
    },

    async validateEntry(entryId) {
      const entryRef = doc(db, 'entries', entryId)
      const entrySnap = await getDoc(entryRef)
      if (!entrySnap.exists()) {
        throw new Error("Entry doesn't exist.")
      }
      if (entrySnap.data().author_id !== auth.currentUser.uid) {
        throw new Error('Permission denied.')
      }
      return entrySnap
    },

    async updateEntry(entryId, newHeadline, newBody, updateDate, updateParsedDate) {
      try {
        this.isLoading = true
        const entryRef = doc(db, 'entries', entryId)
        await this.validateEntry(entryId)
        const updatedEntry = {
          headline: newHeadline,
          body: newBody,
          date_modified: updateDate,
          date_modified_parsed: updateParsedDate
        }
        await updateDoc(entryRef, updatedEntry)
        this.entries = this.entries.map((entry) => {
          if (entry.entry_id === entryId) {
            return {
              ...entry,
              ...updatedEntry
            }
          } else {
            return entry
          }
        })
      } catch (error) {
        console.error('Error updating entry: ', error.message)
      } finally {
        this.isLoading = false
      }
    }
  }
})
