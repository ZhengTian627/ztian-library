<template>
  <div>
    <h1>Add / Update / Delete Book</h1>
    <!-- add book button -->
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>

    <!-- update book button-->
    <form @submit.prevent="updateBook">
      <div>
        <label for="isbn-update">ISBN (for update):</label>
        <input type="text" v-model="isbn" id="isbn-update" required />
      </div>
      <div>
        <label for="name-update">New Name:</label>
        <input type="text" v-model="name" id="name-update" required />
      </div>
      <button type="submit">Update Book</button>
    </form>

    <!-- delete button -->
    <button @click.prevent="deleteBook">Delete Book by ISBN</button>

    <BookList />
  </div>

  
</template>

<script>
import { ref } from 'vue';
import db from '@/Firebase/init.js';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import BookList from '@/components/BookList.vue';

export default {
  setup() {
    const isbn = ref('');
    const name = ref('');

    // add book
    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        // add 
        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value,
        });
        alert('Book added successfully');

        // clear
        isbn.value = '';
        name.value = '';

      } catch (error) {
        console.error('Error adding book:', error);
      }
    };

    // update
    const updateBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        // Check if books with this ISBN exist
        const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const bookDocRef = doc(db, 'books', querySnapshot.docs[0].id);
          await updateDoc(bookDocRef, {
            name: name.value,
          });
          alert('Book updated successfully');
        } else {
          alert('No book found with the given ISBN');
        }

        // clear
        isbn.value = '';
        name.value = '';

      } catch (error) {
        console.error('Error updating book:', error);
      }
    };

    // delete
    const deleteBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        // Find books to delete
        const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const bookDocRef = doc(db, 'books', querySnapshot.docs[0].id);
          await deleteDoc(bookDocRef);
          alert('Book deleted successfully');
        } else {
          alert('No book found with the given ISBN');
        }

        // clear
        isbn.value = '';
        name.value = '';
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    };

    return {
      isbn, name, addBook, updateBook, deleteBook
    };
  },
  components: {
    BookList
  }
};
</script>
