<template>
  <h1>Sign in</h1>
  <p>
    <input type="text" placeholder="Email" v-model="email" />
  </p>
  <p>
    <input type="password" placeholder="Password" v-model="password" />
  </p>
  <p>
    <button @click="signin">Sign in via Firebase</button>
  </p>
  <div v-if="currentUser">
    <p>Logged in as: {{ currentUser.email }}</p>
    <p>User Role: {{ role }}</p>
    <button @click="logout">Log out</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const email = ref("");
const password = ref("");
const role = ref("");
const currentUser = ref(null); // 保存当前用户
const router = useRouter();
const auth = getAuth();
const db = getFirestore();

const signin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    currentUser.value = user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      role.value = userDoc.data().role;
      console.log("User role:", role.value);

      //router.push("/");
    } else {
      console.log("No such user data found!");
    }
  } catch (error) {
    console.log(error.code);
  }
};


const logout = async () => {
  try {
    await signOut(auth);
    currentUser.value = null; 
    role.value = ""; 
    router.push("/Logout"); 
    console.log("Current User:",currentUser.value);
  } catch (error) {
    console.log("Error logging out:", error);
  }
};
</script>