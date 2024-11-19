import React, { useEffect, useState, useRef } from "react";
import "./css/invoice.css";

const currencys = [
  "USD",
  "JMD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "INR",
  "BRL",
  "ZAR",
];

export default function Invoice() {
  const [formData, setformData] = useState({
    InvoiceNumber: "",
    PurchaseOrder: "",
    Logo: "",
    CompanyDetails: "",
    BillTo: "",
    Currency: "",
    InvoiceDate: "",
    DueDate: "",
    items: [{ key: 0, description: "", unitCost: "", quantity: 0, amount: 0 }],
  });

  const globalKey = useRef(0);

  useEffect(() => {
    console.log(formData.items);
  });

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    console.log(formData);
  };

  const addNewItem = () => {
    globalKey.current += 1;
    const items = formData.items;
    const updatedItems = [
      ...items,
      {
        key: globalKey.current,
        description: "",
        unitCost: "",
        quantity: 0,
        amount: 0,
      },
    ];
    setformData({ ...formData, items: updatedItems });
  };

  const removeItem = (key) => {
    const items = formData.items;
    const updatedItems = items.filter((item) => item.key !== key);
    setformData({ ...formData, items: updatedItems });
  };

  const handleChangeItem = (itemkey, value, nname) => {
    const itemss = formData.items;
    const selectedItem = itemss.find((item) => item.key === itemkey);
    selectedItem[nname] = value;
    setformData({ ...formData, items: itemss });
    console.log(itemss);
  };

  return (
    <div className="invoiceSection">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="invoice"
      >
        <div className="row3x1">
          <div className="formGroup">
            <label htmlFor="invoiceNumber">Invoice Number</label>
            <input
              name="InvoiceNumber"
              value={formData.InvoiceNumber}
              id="invoiceNumber"
              onChange={handleChangeEvent}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="purchaseOrder">Purchase order</label>
            <input
              type="text"
              id="purchaseOrder"
              name="PurchaseOrder"
              value={formData.PurchaseOrder}
              onChange={handleChangeEvent}
            />
          </div>

          <div class="formGroup">
            <label for="real-file">Logo</label>
            <label class="file" for="logo">
              <p id="upload-file">Upload file</p>
              <p style={{ fontSize: "14px" }}>JPG, JPEG, PNG, less than 5MB</p>
            </label>
            <input type="file" id="logo" hidden />
          </div>
        </div>
        <div className="row2x1">
          <div className="formGroup">
            <label htmlFor="companyDetails">Your Company Details</label>

            <textarea
              name="CompanyDetails"
              value={formData.CompanyDetails}
              id="companyDetails"
              onChange={handleChangeEvent}
              style={{ height: "75%" }}
            ></textarea>
          </div>

          <div className="formGroup">
            <label htmlFor="billTo">Bill To</label>
            <textarea
              name="BillTo"
              value={formData.BillTo}
              id="billTo"
              onChange={handleChangeEvent}
              style={{ height: "75%" }}
            ></textarea>
          </div>
        </div>
        <div className="rrow3x1">
          <div className="formGroup">
            <label for="currency">Currency</label>
            <select
              name="Currency"
              value={formData.Currency}
              onChange={handleChangeEvent}
              id="currency"
            >
              {currencys.map((curency, key) => (
                <option key={key} value={curency}>
                  {curency}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="invoiceDate">Invoice Date</label>
            <input
              type="text"
              id="invoiceDate"
              name="InvoiceDate"
              value={formData.InvoiceDate}
              onChange={handleChangeEvent}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="text"
              id="dueDate"
              name="DueDate"
              value={formData.DueDate}
              onChange={handleChangeEvent}
            />
          </div>
        </div>

        {formData.items.map((item) => (
          <div key={item.key} className="finalrow">
            <div className="formGroup">
              <label htmlFor="itemDescription">Item description</label>
              <input
                onChange={(e) =>
                  handleChangeItem(item.key, e.target.value, "description")
                }
                type="text"
                value={item.description}
                id="itemDescription"
              ></input>
            </div>

            <div className="formGroup">
              <label htmlFor="unitCost">Unit Cost</label>
              <input
                onChange={(e) =>
                  handleChangeItem(item.key, e.target.value, "unitCost")
                }
                value={item.unitCost}
                type="text"
                id="unitCost"
              ></input>
            </div>

            <div className="formGroup">
              <label htmlFor="quantity">Quantity</label>
              <input
                onChange={(e) =>
                  handleChangeItem(item.key, e.target.value, "quantity")
                }
                value={item.quantity}
                type="text"
                id="quantity"
              ></input>
            </div>

            <div className="formGroup">
              <label htmlFor="amount">Amount</label>
              <input
                onChange={(e) =>
                  handleChangeItem(item.key, e.target.value, "amount")
                }
                value={item.amount}
                type="text"
                id="amount"
              ></input>
            </div>

            <div className="formGroup buttons">
              <button>
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.343 10.543 12.77 1.972a.829.829 0 0 0-1.2 0L3 10.543l1.2 1.2 7.114-7.114v17.657h1.715V4.63l7.114 7.114 1.2-1.2Z"></path>
                </svg>
              </button>
              <button onClick={() => removeItem(item.key)}>
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path d="m19.629 5.915-1.2-1.2-6.257 6.257-6.258-6.257-1.2 1.2 6.258 6.257-6.258 6.257 1.2 1.2 6.258-6.257 6.257 6.257 1.2-1.2-6.258-6.257 6.258-6.257Z"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className="add-item">
          <button onClick={addNewItem}>
            <svg
              width="24"
              height="24"
              fill="currentColor"
              focusable="false"
              viewBox="0 0 24 24"
            >
              <path d="M22.286 11.143h-9.429V1.715h-1.714v9.428H1.714v1.715h9.429v9.428h1.714v-9.428h9.429v-1.715Z"></path>
            </svg>
          </button>
          <p>Add item</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="create-invoice">Create the Invoice</button>
        </div>
      </form>
    </div>
  );
}
