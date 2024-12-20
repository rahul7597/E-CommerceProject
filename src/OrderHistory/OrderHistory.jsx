import React, { useState } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders] = useState([
    {
      orderId: 'ORD12345',
      date: '2024-11-20',
      status: 'Shipped',
      totalPrice: 299.99,
      items: [
        { name: 'Laptop', quantity: 1, price: 799.99 },
        { name: 'Mouse', quantity: 1, price: 19.99 },
      ],
    },
    {
      orderId: 'ORD12346',
      date: '2024-11-19',
      status: 'Delivered',
      totalPrice: 159.49,
      items: [
        { name: 'Smartphone', quantity: 1, price: 159.49 },
      ],
    },
    {
      orderId: 'ORD12347',
      date: '2024-11-18',
      status: 'Processing',
      totalPrice: 129.99,
      items: [
        { name: 'Headphones', quantity: 1, price: 129.99 },
      ],
    },
  ]);

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      <div className="order-history-list">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-header">
              <h2>Order {order.orderId}</h2>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div className="order-details">
              <div className="order-info">
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
              </div>
              <div className="order-items">
                <h3>Items:</h3>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
