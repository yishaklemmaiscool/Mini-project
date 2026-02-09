import React, { useState } from 'react';
import './App.css';

const shopItems = [
  { id: 1, name: "Neon Lamp", price: 25, img: "https://placehold.co/200x200/222/00d2ff?text=Lamp" },
  { id: 2, name: "Gaming Mouse", price: 40, img: "https://placehold.co/200x200/222/00ff88?text=Mouse" },
  { id: 3, name: "Mechanical Keyboard", price: 120, img: "https://placehold.co/200x200/222/ff4757?text=Keyboard" },
  { id: 4, name: "Headset", price: 65, img: "https://placehold.co/200x200/222/eeeeee?text=Headset" },
];

function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('home');

  const addToCart = (product) => {
    const exists = cart.find((x) => x.id === product.id);
    if (exists) {
      setCart(cart.map((x) => x.id === product.id ? { ...exists, qty: exists.qty + 1 } : x));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((x) => x.id !== id));
  };

  const changeQty = (id, amount) => {
    setCart(cart.map((item) => {
      if (item.id === id) {
        const newQty = item.qty + amount;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  };

  return (
    <div className="app-container">
      <header>
        <h1>CyberStore</h1>
        <div>
          <button className="nav-btn" onClick={() => setPage('home')}>Store</button>
          <button className="nav-btn" onClick={() => setPage('cart')}>
            Cart ({cart.length})
          </button>
        </div>
      </header>

      {page === 'home' ? (
        <div className="products-grid">
          {shopItems.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.img} alt={item.name} className="product-img" />
              <h3>{item.name}</h3>
              <p className="price">${item.price}</p>
              <button className="add-btn" onClick={() => addToCart(item)}>
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="cart-page">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty right now.</p>
          ) : (
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                  </div>
                  <div className="cart-controls">
                    <button onClick={() => changeQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}
              <div className="total-section">
                Total: <span className="price">${calculateTotal()}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;