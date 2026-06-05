import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {

      const user = JSON.parse(localStorage.getItem("userInfo"));

      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );

        setOrders(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4">

            <p>Total: ₹{order.totalPrice}</p>

            <p>Status: {order.status}</p>

            <div>
              {order.products.map((p, i) => (
                <p key={i}>
                  Product ID: {p.product} | Qty: {p.quantity}
                </p>
              ))}
            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Orders;