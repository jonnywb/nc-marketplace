import {Link} from 'react-router-dom'

const ShopCard = ({ item }) => {
  const { item_name, img_url, description, price, item_id } = item;
  return (
    <li>
      <h2>{item_name}</h2>
      <img src={img_url} />
      <p>{description}</p>
      <p>£{price}</p>
      <Link className="link" to={`/items/${item_id}`}><button>See more</button></Link>
    </li>
  );
};

export default ShopCard;
