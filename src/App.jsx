import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriPage from "./pages/CategoriPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import ItemListContainerPage from "./pages/ItemListContainerPage";
import { ItemProvider } from "./context/ItemsContext";
import { db } from "./firebase/firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  let [count, setCount] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const q = query(collection(db, "products"));
      const docs = [];
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        docs.push({ ...doc.data(), id: doc.id });
      });
    };
    getProducts();
  }, []);

  useEffect(() => {
    const totalItems = cartItems.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );

    console.log(cartItems);
    setCount(totalItems);
  }, [cartItems, setCount]);

  const addToCart = () => {
    const itemIndex = cartItems.findIndex((item) => item.item === selectedItem);

    if (itemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[itemIndex].quantity = quantity;
      setCartItems(updatedCart);
    } else {
      const updatedCart = [...cartItems, { item: selectedItem, quantity }];
      setCartItems(updatedCart);
    }

    setSelectedItem("");
    setQuantity(0);
  };

  return (
    <ItemProvider>
      <Router>
        <Navbar title={"Alfredo's Store"} countCart={count} />

        <Routes>
          <Route path="/" element={<ItemListContainerPage />}></Route>
          <Route path="/CategoriPage" element={<CategoriPage />}></Route>
          <Route
            path="/ItemDetailPage/:id"
            element={
              <ItemDetailPage
                addToCart={addToCart}
                setSelectedItem={setSelectedItem}
                setQuantity={setQuantity}
              />
            }
          ></Route>
          <Route
            path="/CategoriPage/:categoryId"
            element={<CategoriPage />}
          ></Route>
          <Route
            path="/CategoriPage/:categoryId"
            element={<CategoriPage />}
          ></Route>
          <Route
            path="/CategoriPage/:categoryId"
            element={<CategoriPage />}
          ></Route>
          <Route
            path="/CategoriPage/:categoryId"
            element={<CategoriPage />}
          ></Route>
        </Routes>
      </Router>
    </ItemProvider>
  );
}

export default App;
