
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
  import { getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"
  
  const firebaseConfig = {
   
    apiKey: "AIzaSyACktSnrGbSaIbvhPSE2vt634jjss5dNwc",
   
    authDomain: "iphone-c4211.firebaseapp.com",
   
    projectId: "iphone-c4211",
   
    storageBucket: "iphone-c4211.appspot.com",
   
    messagingSenderId: "203657432244",
   
    appId: "1:203657432244:web:17d709fe8d151ca0715be1"
  
  };

  
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  export const getProducts = async () => {

    const querySnapshot = await getDocs(collection(db, "products"));

    const products = []
  
    querySnapshot.forEach((doc) => {
    products.push(doc);
  });
  
  return products;

  }

  

 