import AddItem from "./AddItem/AddItem";
import Item from "./Item/Item";
import ShopList from "./ShopList/ShopList";
import Basket from "./Basket/Basket";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../utils/utils";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [basket, setBasket] = useState([])

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <section id="shop">
      <Routes>
        <Route path="/" element={<ShopList categories={categories} setCategories={setCategories} />} />
        <Route path="/items/:item_id" element={<Item setBasket={setBasket} />} />
        <Route path="/basket" element={<Basket basket={basket} setBasket={setBasket} />} />
        <Route path="/items/add-item" element={<AddItem categories={categories} />} />
      </Routes>
    </section>
  );
};

export default Shop;