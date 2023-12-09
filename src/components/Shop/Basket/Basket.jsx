import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { deleteFromBasket, getBasketItems, postToOrders } from "../../utils/utils";
import ShopCard from "../ShopCard/ShopCard";
import { total } from "./Basket.module.css";
import { outerSection, sectionHeader, sectionFooter } from "../../styles/Section.module.css";
import { checkout } from "../../styles/Button.module.css";
import { list } from "../../styles/FlexList.module.css";
import { useNavigate } from "react-router-dom";
import { h2, message } from "../../styles/Typography.module.css";

const Basket = ({ basket, setBasket }) => {
  const { user } = useContext(UserContext);
  const redirect = useNavigate();

  useEffect(() => {
    if (user) {
      getBasketItems(user.username).then((items) => {
        setBasket(items);
      });
    }
  }, [user, setBasket]);

  const handleRemove = (event) => {
    const id = event.target.getAttribute("item_id");
    deleteFromBasket(user.username, id)
      .then(() => {
        return getBasketItems(user.username);
      })
      .then((items) => {
        setBasket(items);
      });
  };

  const handleCheckout = (event) => {
    basket.map((item) => {
      postToOrders(user.username, item.item_id)
        .then(() => {
          return deleteFromBasket(user.username, item.item_id);
        })
        .then(() => {
          return getBasketItems(user.username);
        })
        .then((items) => {
          setBasket(items);
          redirect("/account");
        });
    });
  };

  if (basket.length) {
    return (
      <section className={outerSection}>
        <div className={sectionHeader}>
          <h2 className={h2}>Basket</h2>
        </div>
        <ul className={list}>
          {basket.map((item) => {
            const { item_id } = item;
            return <ShopCard key={item_id} item={item} remove={handleRemove} />;
          })}
        </ul>
        <div className={sectionFooter}>
          <p className={total}>
            Total: £
            {(
              basket.reduce((acc, curr) => {
                return (acc += curr.price);
              }, 0) / 100
            ).toFixed(2)}
          </p>
          <button className={checkout} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </section>
    );
  } else {
    return (
      <section className={outerSection}>
        <div className={sectionHeader}>
          <h2 className={h2}>Basket</h2>
        </div>
        <ul className="item-list">
          <p className={message}>Basket is empty...</p>
        </ul>
      </section>
    );
  }
};

export default Basket;
