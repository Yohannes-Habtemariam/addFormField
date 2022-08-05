import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [orderField, setOrderField] = useState([
    { orderName: "", price: "", quantity: "", deliveryDate: "" }
  ]);
  let totalPrice = 0;
  
  // Function to calculate for a single order
  const singleOrderPrice = (singleOrder) => {
    let price =singleOrder.price *singleOrder.quantity;
    return price;
  }

  // Function of handling order change
    const handleChange = (event, index) => {
        let newOrderField = [...orderField];
        newOrderField[index][event.target.name] = event.target.value;
        setOrderField(newOrderField);
    };

    // Function of handling adding new order
    const addingNewOrderField = () => {
       let newObjectOrderField = { 
            orderName: "", 
            price: "", 
            quantity: "", 
            deliveryDate: "" 
        };
        setOrderField([...orderField, newObjectOrderField]);
    }

    // Function of handling removing order
    const removingOrderField = (index) => {
        let newOrderField = [...orderField];
        newOrderField.splice(index, 1);
        setOrderField(newOrderField);
    };

    // Function of handling submitting form
    const submit = (event) => {
        event.preventDefault();
        console.log(orderField);
        reset()
    }

    // Reset all fields
    const reset = () => {
        setOrderField([{ orderName: "", price: "", quantity: "", deliveryDate: "" }]);
    }

  return (
    <section className="order-section-container">
      <h3> Order Details</h3>

      <form>

      {orderField.map((order, index) => {
        totalPrice += order.price * order.quantity;
        
        return (
          <div key={index} className="order-detail-container">
            <div>
              <label htmlFor="orderName"> Order Name</label>
              <input type="text" id="orderName" name="orderName" 
              value={order.orderName} 
              onChange={event => handleChange(event, index)} />
            </div>

            <div>
              <label htmlFor="price"> Price</label>
              <input type="number" id="price" name="price" 
              value={order.price} 
              onChange={event => handleChange(event, index)}/>
            </div>

            <div>
              <label htmlFor="quantity"> Quantity </label>
              <input type="number" id="quantity" name="quantity" 
              value={order.quantity} 
              onChange={event => handleChange(event, index)} />
            </div>

            <div>
              <label htmlFor="deliveryDate"> Delivery Date</label>
              <input type="text" id="deliveryDate" name="deliveryDate" 
              value={order.deliveryDate} 
              onChange={event => handleChange(event, index)} />
            </div>

            <div className="delete-order">
              <span onClick={removingOrderField}> X </span>
            </div>
          </div>
        );
      })}

      </form>

      <div className="add-delete-totalPrice-container">
        <div className="add-delete-totalPrice-btn">
          <button onClick={addingNewOrderField} className="btn">Add New Order</button>
          <button  className="btn">Delete Order</button>
        </div>

        <div className="totalPrice-container">
          <label htmlFor="total">Total Price</label>
          <span> {totalPrice} </span>
        </div>
      </div>

      <button onClick={submit} className="order-submit-button">Submit</button>
    </section>
  );
};

export default App;
