import ShopCard from "../ShopCard/ShopCard";
import { useState, useEffect } from "react";
import { getItems } from "../../utils/utils";
import { h2 } from "../../styles/Typography.module.css";
import { outerSection, sectionHeader } from "../../styles/Section.module.css";
import { pageNumList } from "./shopList.module.css";
import { pageNum as numCss, pageNumActive } from "../../styles/Link.module.css";
import { filterBar, list } from "../../styles/FlexList.module.css";
import { primary } from "../../styles/Button.module.css";
import { useNavigate } from "react-router-dom";

const ShopList = ({ categories, setCategories }) => {
  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [pageNums, setPageNums] = useState([1]);
  const [queries, setQueries] = useState({
    p: 1,
    limit: 9,
    order: "asc",
  });

  const redirect = useNavigate();

  const sortByOptions = {
    item_name: "Item Name",
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
    setActivePage(+p);

    setQueries((currQueries) => {
      return { ...currQueries, p };
    });
  };

  return (
    <section className={outerSection}>
      <div className={sectionHeader}>
        <h2 className={h2}>Shop</h2>
        <div className={filterBar}>
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
          <button
            className={primary}
            onClick={() => {
              redirect("/items/add-item");
            }}
          >
            Add a new item
          </button>
        </div>
      </div>

      <ul className={list}>
        {items.map((item) => (
          <ShopCard key={item.item_id} item={item} />
        ))}
      </ul>
      <div className={pageNumList}>
        <nav>
          {pageNums.map((pageNum, i) => {
            return (
              <a
                className={i + 1 === activePage ? pageNumActive : numCss}
                index={i + 1}
                key={i}
                onClick={handlePageClick}
              >
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
