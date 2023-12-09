import { useState, useEffect } from "react";

import { getOrders } from "../../utils/utils";

import { orders, ordersH3 } from "./Orders.module.css";

const Orders = ({ user }) => {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    getOrders(user.username).then((items) => {
      setUserOrders(items);
    });
  }, [user.username]);

  return (
    <>
      <h3 className={ordersH3}>Orders</h3>
      <table className={orders}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order) => {
            return (
              <tr key={order.item_id}>
                <td>{order.item_name}</td>
                <td>£{(order.price / 100).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
