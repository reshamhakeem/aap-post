import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
const database = getDatabase();
const auth = getAuth();

const handleSignup = () => {
  const email = document.getElementById("email-signup").value;
  const password = document.getElementById("password-signup").value;

  if (email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredential", userCredential);

        const usersRef = ref(database, `users/ ${userCredential.user.uid}/`);
        set(usersRef, {
          email: email,
          createdAt: new Date().getTime(),
        })
          .then((value) => {
            window.location.href = "../dist/home.html";
          })
          .catch((error) => {
            console.log("database error", error);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  }
};

const handleLogin = () => {
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;

  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
};

onAuthStateChanged(auth, (user) => {
  const logoutBtn = document.getElementById("logout");
  if (user) {
    logoutBtn.style.display = "flex";

    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      signOut(auth);
      window.location.href = "./Index.html";
    });
  } else {
    logoutBtn.style.display = "none";
    console.log("User not logged in");
  }
});

const button = document.getElementById("signup-btn");
if (button) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    handleSignup();
  });
}

const loginButton = document.getElementById("login-btn");
if (loginButton) {
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin();
  });
}
