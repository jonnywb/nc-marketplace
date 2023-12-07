import ShopCard from "../ShopCard/ShopCard";
import { useState, useEffect } from "react";
import { getItems } from "../../utils/utils";
import { Link } from "react-router-dom";

const ShopList = ({ categories, setCategories }) => {
  const [items, setItems] = useState([]);
  const [queries, setQueries] = useState(undefined);

  useEffect(() => {
    getItems(queries).then((data) => {
      setItems(data);
    });
  }, [queries]);

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
    <>
      <h2>Shop</h2>
      <Link className="link" to="/items/add-item">
        Add a new item
      </Link>
      <select onChange={handleChange}>
        <option key="All">All</option>
        {categories.map((category) => (
          <option key={category.category_name}>{category.category_name}</option>
        ))}
      </select>
      <ul className="item-list">
        {items.map((item) => (
          <ShopCard key={item.item_id} item={item} />
        ))}
      </ul>
    </>
  );
};

export default ShopList;
