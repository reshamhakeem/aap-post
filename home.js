import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

import {
  getDatabase,
  onChildAdded,
  ref,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const database = getDatabase();
const auth = getAuth();

const userId = auth;
const userArr = [];

const usersRef = ref(database, "users/");
onChildAdded(usersRef, (snapshot)=>{
    const data = snapshot.val();
    userArr.push(data);
    console.log(userArr);
});
