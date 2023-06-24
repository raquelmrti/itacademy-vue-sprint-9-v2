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
    async getListById(listId) {
      if (this.entries.length > 0) {
        return this.entries.find((list) => list.listId === listId)
      } else {
        this.loading = true
        try {
          const listRef = doc(db, 'entries', listId)
          const listSnap = await getDoc(listRef)
          if (!listSnap.exists()) {
            throw new Error("List doesn't exist")
          }
          if (listSnap.data().author_id !== auth.currentUser.uid) {
            throw new Error('No permission to get this list')
          }

          return listSnap.data()
        } catch (error) {
          console.error('Failed to get list: ', error)
        } finally {
          this.loading = false
        }
      }
    },
    async createList(listTitle, listDescription, date) {
      this.loading = true
      try {
        const listObject = {
          title: listTitle,
          description: listDescription,
          creationDate: date,
          lastUpdatedDate: date,
          author_id: auth.currentUser.uid,
          ownerDisplayName: auth.currentUser.displayName,
          games: []
        }
        const listRef = await addDoc(collection(db, 'entries'), listObject)
        this.entries.push({
          ...listObject,
          listId: listRef.id
        })
      } catch (error) {
        console.error('Failed to create list: ', error)
      } finally {
        this.loading = false
      }
    },
    async deleteList(listId) {
      this.loading = true
      try {
        const listRef = doc(db, 'entries', listId)
        const listSnap = await getDoc(listRef)
        if (!listSnap.exists()) {
          throw new Error("List doesn't exist")
        }
        if (listSnap.data().author_id !== auth.currentUser.uid) {
          throw new Error('No permission to delete this list')
        }

        await deleteDoc(listRef)
        this.entries = this.entries.filter((list) => list.listId !== listId)
      } catch (error) {
        console.error('Error deleting list: ', error.message)
      } finally {
        this.loading = false
      }
    },
    async updateListTitleAndDescription(listId, newTitle, newDescription, updateDate) {
      this.loading = true
      try {
        const listRef = doc(db, 'entries', listId)
        const listSnap = await getDoc(listRef)
        if (!listSnap.exists()) {
          throw new Error("List doesn't exist")
        }
        if (listSnap.data().author_id !== auth.currentUser.uid) {
          throw new Error('No permission to update this list')
        }
        await updateDoc(listRef, {
          title: newTitle,
          description: newDescription,
          lastUpdatedDate: updateDate
        })
        this.entries = this.entries.map((list) => {
          list.listId === listId
            ? { ...list, title: newTitle, description: newDescription, lastUpdatedDate: updateDate }
            : list
        })
      } catch (error) {
        console.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async updateListGames(listId, games) {
      this.loading = true
      try {
        const listRef = doc(db, 'entries', listId)
        const listSnap = await getDoc(listRef)
        if (!listSnap.exists()) {
          throw new Error("List doesn't exist")
        }
        if (listSnap.data().author_id !== auth.currentUser.uid) {
          throw new Error('No permission to update this list')
        }
        await updateDoc(listRef, {
          games: [...games]
        })
        this.entries = this.entries.map((list) => {
          list.listId === listId
            ? { ...list, title: newTitle, description: newDescription, lastUpdatedDate: updateDate }
            : list
        })
      } catch (error) {
        console.error(error.message)
      } finally {
        this.loading = false
      }
    }
  }
})
