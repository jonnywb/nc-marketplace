import AddItem from "./AddItem/AddItem";
import Item from "./Item/Item";
import ShopList from "./ShopList/ShopList";
import Basket from "./Basket/Basket";
// import "./shop.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getCategories } from "../utils/utils";
import { UserContext } from "../../contexts/UserContext";
import { getUserByUsername } from "../utils/utils";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [basket, setBasket] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      getUserByUsername(loggedInUser).then((user) => {
        setUser(user);
      });
    }
  }, []);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ShopList categories={categories} setCategories={setCategories} />} />
      <Route path="/items/:item_id" element={<Item basket={basket} />} />
      <Route path="/basket" element={<Basket basket={basket} setBasket={setBasket} />} />
      <Route path="/items/add-item" element={<AddItem categories={categories} />} />
    </Routes>
  );
};

export default Shop;
