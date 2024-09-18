<template>
  <h1>Create an Account</h1>
  <p>
    <input type="text" placeholder="Email" v-model="email" />
  </p>
  <p>
    <input type="password" placeholder="Password" v-model="password" />
  </p>
  <p>
    <button @click="register">Save to Firebase</button>
  </p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const db = getFirestore(); 

const register = async () => {
  try {
    // register
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    
    // Determine if the mailbox is admin@admin.com
    const role = email.value === "admin@admin.com" ? "Admin" : "User";

    // Save the user's role information to the Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email.value,
      role: role,
    });

    console.log("Firebase Register Successful with role:", role);

    // Jump to login page
    router.push("/FireLogin");
  } catch (error) {
    console.log(error.code);
  }
};
</script>
