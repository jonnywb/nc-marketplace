
import ShopList from "./ShopList/ShopList"
import Basket from "./Basket/Basket";
import {Routes, Route} from 'react-router-dom'

const Shop = () => {



  return (
    <section id="shop">
      <h2>Shop</h2>
      <Routes>
        <Route path="/" element={<ShopList />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
      
    </section>
  );
};

export default Shop;
