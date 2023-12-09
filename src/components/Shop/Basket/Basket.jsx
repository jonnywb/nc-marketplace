import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { deleteFromBasket, getBasketItems } from "../../utils/utils";
import ShopCard from "../ShopCard/ShopCard";
// import "./basket.css";

const Basket = ({ basket, setBasket }) => {
  const { user } = useContext(UserContext);

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

  if (basket.length) {
    return (
      <section id="basket">
        <div className="section-header">
          <h2>Basket</h2>
          <p id="total">
            Total: £
            {(
              basket.reduce((acc, curr) => {
                return (acc += curr.price);
              }, 0) / 100
            ).toFixed(2)}
          </p>
        </div>
        <ul className="item-list">
          {basket.map((item) => {
            const { item_id } = item;
            return <ShopCard key={item_id} item={item} remove={handleRemove} />;
          })}
        </ul>
      </section>
    );
  } else {
    return (
      <section id="basket">
        <div className="section-header">
          <h2>Basket</h2>
        </div>
        <ul className="item-list">
          <p>Basket is empty...</p>
        </ul>
      </section>
    );
  }
};

export default Basket;
