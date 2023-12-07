import AddItem from "./AddItem/AddItem";
import Item from "./Item/Item";
import ShopList from "./ShopList/ShopList"
import Basket from "./Basket/Basket";
import {Routes, Route} from 'react-router-dom'
import {useState} from 'react'

const Shop = () => {
  const [categories, setCategories] = useState([]);

  return (
    <section id="shop">
      
      
      <Routes>
        <Route path="/" element={<ShopList categories={categories} setCategories={setCategories} />} />
        <Route path="/items/:item_id" element={<Item />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/items/add-item" element={<AddItem categories={categories} />} />
      </Routes>
      
    </section>
  );
};

export default Shop;
