import ShopCard from "./ShopCard/ShopCard";
import { useState, useEffect } from "react";
import { getCategories, getItems } from "../utils/utils";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [queries, setQueries] = useState(undefined);

  useEffect(() => {
    getItems(queries).then((data) => {
      setItems(data);
    });
  }, [queries]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleChange = (event) => {
    const categoryIndex = event.target.options.selectedIndex;
    const newCategory = event.target.options[categoryIndex].innerText;

    if (newCategory !== "All") {
      setQueries({ category_name: newCategory });
    } else {
      setQueries(undefined);
    }
  };

  return (
    <section id="shop">
      <h2>Shop</h2>
      <select onChange={handleChange}>
        <option key="All">All</option>
        {categories.map((category) => (
          <option key={category.category_name}>{category.category_name}</option>
        ))}
      </select>
      <ul>
        {items.map((item) => (
          <ShopCard key={item.item_id} item={item} />
        ))}
      </ul>
    </section>
  );
};

export default Shop;
