const ShopCard = ({ item }) => {
  const { item_name, img_url, description, price } = item;
  return (
    <li>
      <h2>{item_name}</h2>
      <img src={img_url} />
      <p>{description}</p>
      <p>£{price}</p>
    </li>
  );
};

export default ShopCard;
