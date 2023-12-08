import ShopCard from "../ShopCard/ShopCard";
import { useState, useEffect } from "react";
import { getItems } from "../../utils/utils";
import { Link } from "react-router-dom";
import "./shoplist.css";

const ShopList = ({ categories, setCategories }) => {
  const [items, setItems] = useState([]);
  const [pageNums, setPageNums] = useState([1]);
  const [queries, setQueries] = useState({
    p: 1,
    limit: 9,
    order: "asc",
  });

  const sortByOptions = {
    item_name: "Item Name",
    item_id: "Item ID",
    price: "Price",
    category_name: "Category Name",
  };

  useEffect(() => {
    getItems(queries).then((data) => {
      setItems(data);
    });

    getItems({ category_name: queries.category_name }).then((items) => {
      setPageNums([1]);
      for (let i = 2; i <= Math.ceil(items.length / 9); i++) {
        setPageNums((currPageNums) => {
          return [...currPageNums, i];
        });
      }
    });
  }, [queries]);

  const handleCategoryChange = (event) => {
    const category_name = event.target.value;

    if (category_name !== "All") {
      setQueries((currQueries) => {
        return { ...currQueries, category_name };
      });
    } else {
      setQueries((currQueries) => {
        delete currQueries["category_name"];
        return { ...currQueries };
      });
    }
  };

  const handleSortChange = (event) => {
    const sort_by = event.target.value;

    setQueries((currQueries) => {
      return { ...currQueries, sort_by };
    });
  };

  const handleOrderChange = (event) => {
    const order = event.target.value;

    setQueries((currQueries) => {
      return { ...currQueries, order };
    });
  };

  const handlePageClick = (event) => {
    const p = event.target.getAttribute("index");
    setQueries((currQueries) => {
      return { ...currQueries, p };
    });
  };

  return (
    <section id="shop-list">
      <div className="section-header">
        <h2>Shop</h2>
        <div className="list-filters">
          <Link className="link" to="/items/add-item">
            Add a new item
          </Link>
          <label>
            Filter by Category
            <select onChange={handleCategoryChange}>
              <option key="All">All</option>
              {categories.map((category) => (
                <option value={category.category_name} key={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sort by
            <select onChange={handleSortChange}>
              {Object.entries(sortByOptions).map((value, i) => (
                <option value={value[0]} key={value[0]}>
                  {value[1]}
                </option>
              ))}
            </select>
          </label>

          <label>
            Order
            <select onChange={handleOrderChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
      </div>

      <ul className="item-list">
        {items.map((item) => (
          <ShopCard key={item.item_id} item={item} />
        ))}
      </ul>
      <div id="page-nums">
        <nav>
          {pageNums.map((pageNum, i) => {
            return (
              <a index={i + 1} key={i} onClick={handlePageClick}>
                {pageNum}
              </a>
            );
          })}
        </nav>
      </div>
    </section>
  );
};

export default ShopList;
