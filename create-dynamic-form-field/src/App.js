import React, { useState } from "react";
import "./App.css";

const App = () => {
  // State variable to store the value of the input field
  const [orderField, setOrderField] = useState([ 
    { orderName: "", price: "", quantity: "", deliveryDate: ""} 
  ]);
  const [valueErrors, setValueErrors] = useState({});

  // Global variable
  let totalPrice = 0;

  // Function of handling order change
    const handleChange = (event, index) => {
        const newOrderField = [...orderField];
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
        reset();
        validate();
    }

    // Function to validate the input field
    const validate = () => {
        let errors = {};
        let isValid = true;
        orderField.forEach((order) => {
            if (order.orderName === "") {
                errors.orderName = "Order name is required";
                isValid = false;
            }
            if (order.price === "") {
                errors.price = "Price is required";
                isValid = false;
            }
            if (order.quantity === "") {
                errors.quantity = "Quantity is required";
                isValid = false;
            }
            if (order.deliveryDate === "") {
                errors.deliveryDate = "Delivery date is required";
                isValid = false;
            }
        });
        setValueErrors(errors);
        return isValid;
    };

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
            <div className="order-detail-subContainer">
              <label htmlFor="orderName"> Order Name</label>
              <input type="text" id="orderName" name="orderName" 
              value={order.orderName} 
              onChange={event => handleChange(event, index)} />
              <p className="formValueError"> {valueErrors.orderName} </p>
            </div>

            <div className="order-detail-subContainer">
              <label htmlFor="price"> Price</label>
              <input type="number" id="price" name="price" 
              value={order.price} 
              onChange={event => handleChange(event, index)}/>
              <p className="formValueError"> {valueErrors.price} </p>
            </div>

            <div className="order-detail-subContainer">
              <label htmlFor="quantity"> Quantity </label>
              <input type="number" id="quantity" name="quantity" 
              value={order.quantity} 
              onChange={event => handleChange(event, index)} />
              <p className="formValueError"> {valueErrors.quantity} </p>
            </div>

            <div className="order-detail-subContainer">
              <label htmlFor="deliveryDate"> Delivery Date</label>
              <input type="date" id="deliveryDate" name="deliveryDate" 
              value={order.deliveryDate} 
              onChange={event => handleChange(event, index)} />
             
              <p className="formValueError"> {valueErrors.deliveryDate} </p>
            </div>

            <div className="order-detail-subContainer delete-order">
              <span onClick={removingOrderField}> X </span>
            </div>
          </div>
        );
      })}

      </form>

      <div className="add-delete-totalPrice-container">
        <div className="add-delete-totalPrice-btn">
          <button onClick={addingNewOrderField} className="btn">Add New Order</button>
        </div>

        <div className="totalPrice-container">
          <label htmlFor="total">Total Price</label>
          <span className="total-price"> €{totalPrice} </span>
        </div>
      </div>

      <button onClick={submit} className="order-submit-button">Submit</button>
    </section>
  );
};

export default App;
