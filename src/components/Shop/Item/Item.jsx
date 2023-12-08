import { getItem, postToBasket } from "../../utils/utils";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import "./item.css";

const Item = ({ basket }) => {
  const redirect = useNavigate();
  const { item_id } = useParams();
  const [currItem, setCurrItem] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    getItem(item_id).then((item) => {
      setCurrItem(item);
    });
  }, [item_id, basket]);

  const handleAddToBasket = () => {
    const isItemInBasket = basket.some((basketItem) => basketItem.item_id === item_id);

    if (!isItemInBasket) {
      postToBasket(user.username, { item_id }).then(() => {
        redirect(`/basket`);
      });
    }
  };

  const renderBasket = () => {
    return (
      <button className="item-basket-button" onClick={handleAddToBasket}>
        Add to basket
      </button>
    );
  };

  const { item_name, img_url, description, price, category_name } = currItem;
  return (
    <section id="item">
      <h2>Item</h2>
      <div className="item-grid">
        <h3 className="item-header">{item_name}</h3>
        <div className="item-img-div">
          <img src={img_url} alt={description} />
        </div>
        <p className="item-desc">{description}</p>
        <p className="item-price">£{(price / 100).toFixed(2)}</p>
        <p className="item-category">{category_name}</p>
        {user && renderBasket()}
      </div>
    </section>
  );
};

export default Item;
