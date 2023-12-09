import { getItem, postToBasket } from "../../utils/utils";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { outerSection, sectionHeader } from "../../styles/Section.module.css";
import { h2, message } from "../../styles/Typography.module.css";
import styles from "./Item.module.css";

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
      <button className={styles.button} onClick={handleAddToBasket}>
        Add to basket
      </button>
    );
  };

  const { item_name, img_url, description, price, category_name } = currItem;

  if (!currItem.item_name) return <p className={message}>Invalid Item ID</p>;

  return (
    <section id="item" className={outerSection}>
      <div className={sectionHeader}>
        <h2 className={h2}>View Item</h2>
      </div>
      <div className={styles.lgGrid}>
        <h3 className={styles.head}>{item_name}</h3>
        <p className={styles.cat}>{category_name}</p>
        <div className={styles.imgDiv}>
          <img className={styles.img} src={img_url} alt={description} />
        </div>
        <div className={styles.div}>
          <p className={styles.desc}>{description}</p>
          <p className={styles.price}>£{(price / 100).toFixed(2)}</p>
          {user && renderBasket()}
          {!user && <p className={message}>Please log-in to make a purchase.</p>}
        </div>
      </div>
    </section>
  );
};

export default Item;
