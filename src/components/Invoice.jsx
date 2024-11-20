import React, { useEffect, useState, useRef } from "react";
import "./css/invoice.css";
import { generateInvoice } from "./javascript/generateInvoice";
import Calendar from "./Calendar";
import { format } from "date-fns";

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
  const [fileUploaded, setfileUploaded] = useState(false);
  const [formData, setformData] = useState({
    InvoiceNumber: "",
    PurchaseOrder: "",
    Logo: "",
    LogoName: "",
    CompanyDetails: "",
    BillTo: "",
    Currency: "",
    InvoiceDate: format(new Date(), "yyyy-MM-dd"),
    DueDate: format(new Date(), "yyyy-MM-dd"),
    items: [{ key: 0, description: "", unitCost: 0, quantity: 0, amount: 0 }],
  });

  const globalKey = useRef(0);

  useEffect(() => {
    console.log(formData);
    console.log(formData.items);
  });

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleDateChangeEvent = (name, date) => {
    setformData({
      ...formData,
      [name]: format(date, "yyyy-MM-dd"),
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setformData({ ...formData, Logo: reader.result, LogoName: file.name });
      };
      reader.readAsDataURL(file);
    }
    setfileUploaded(true);
  };

  const handlePositionChange = (key) => {
    if (key === 0) {
      return;
    }
    const upditems = formData.items;
    const position = upditems.findIndex((item) => item.key === key);
    const prevKey = upditems[position - 1].key;
    console.log(prevKey);
    upditems[position - 1].key = key;
    upditems[position].key = prevKey;
    const sortedItems = upditems.sort((a, b) => a.key - b.key);
    setformData({ ...formData, items: sortedItems });
  };

  const addNewItem = () => {
    globalKey.current += 1;
    const items = formData.items;
    const updatedItems = [
      ...items,
      {
        key: globalKey.current,
        description: "",
        unitCost: 0,
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
    if (nname === "unitCost") {
      if (isNaN(value)) {
        return;
      }
    }
    if (nname === "quantity") {
      if (isNaN(value)) {
        return;
      }
    }

    const itemss = formData.items;
    const selectedItem = itemss.find((item) => item.key === itemkey);
    selectedItem[nname] = value;
    if (selectedItem.unitCost && selectedItem.quantity) {
      selectedItem["amount"] = selectedItem.unitCost * selectedItem.quantity;
    }
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
              {fileUploaded ? (
                <div className="upload-successful">
                  <svg
                    width="24"
                    height="24"
                    fill="green"
                    focusable="false"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 22.286c5.68 0 10.286-4.605 10.286-10.286C22.286 6.32 17.68 1.714 12 1.714 6.32 1.714 1.714 6.32 1.714 12c0 5.68 4.605 10.286 10.286 10.286Zm-1.32-5.397 7.712-7.711-1.212-1.213-7.109 7.109-3.465-3.466-1.212 1.212 4.068 4.069a.861.861 0 0 0 1.219 0Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <div style={{ marginLeft: "12px" }}>
                    <p id="upload-file">{formData.LogoName}</p>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                      File Uploaded
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p id="upload-file">Upload file</p>
                  <p style={{ fontSize: "14px" }}>
                    JPG, JPEG, PNG, less than 5MB
                  </p>
                </>
              )}
            </label>
            <input onChange={handleFileChange} type="file" id="logo" hidden />
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
            <Calendar
              selected={formData.InvoiceDate}
              onChangefunc={handleDateChangeEvent}
              name="InvoiceDate"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="dueDate">Due Date</label>
            <Calendar
              selected={formData.DueDate}
              onChangefunc={handleDateChangeEvent}
              name="DueDate"
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
                disabled={true}
              ></input>
            </div>

            <div className="formGroup buttons">
              <button onClick={() => handlePositionChange(item.key)}>
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
          <button
            onClick={() => {
              generateInvoice(formData);
            }}
            className="create-invoice"
          >
            Create the Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
