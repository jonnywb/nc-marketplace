import { Link } from "react-router-dom";
import "./shopCard.css";

const ShopCard = ({ item, remove }) => {
  const { item_name, img_url, description, price, item_id } = item;

  const renderButton = () => {
    if (remove) {
      return (
        <button className="remove-button" item_id={item_id} onClick={remove}>
          Remove
        </button>
      );
    }

    return (
      <Link className="card-link-a" to={`/items/${item_id}`}>
        <button>See more</button>
      </Link>
    );
  };

  return (
    <li>
      <h3 className="card-header">{item_name}</h3>
      <div className="card-img-div">
        <img src={img_url} />
      </div>
      <p className="card-desc">{description}</p>
      <p className="card-price">£{(price / 100).toFixed(2)}</p>
      {renderButton()}
    </li>
  );
};

export default ShopCard;
