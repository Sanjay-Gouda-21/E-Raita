import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./css/payment.css";
import payment from "./css/payment.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
const BillPDF = ({
  productName,
  purchaseQuantity,
  productPrice,
  paymentAmount,
  paymentMethod,
  paymentDate,
  productId,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>e-Raita Payment Receipt</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Product Name</Text>
              <Text style={styles.tableData}>{productName}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Product ID</Text>
              <Text style={styles.tableData}>{productId}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Purchase Quantity</Text>
              <Text style={styles.tableData}>{purchaseQuantity}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Price Per/Kg</Text>
              <Text style={styles.tableData}>{productPrice}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Payment Amount</Text>
              <Text style={styles.tableData}>{paymentAmount}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Payment Method</Text>
              <Text style={styles.tableData}>{paymentMethod}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Payment Date</Text>
              <Text style={styles.tableData}>{paymentDate}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    width: "40%",
    backgroundColor: "#ccc",
    padding: 5,
  },
  tableData: {
    width: "60%",
    padding: 5,
  },
});

export default function Payment() {
  const { purchaseId } = useParams();
  const downloadLinkRef = useRef(null);

  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [productId, setProductId] = useState("");
  const [purchaseQuantity, setPurchaseQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchaseResponse = await fetch(
          `http://localhost:3003/purchase/${purchaseId}`
        );
        if (!purchaseResponse.ok) {
          throw new Error(
            `Failed to fetch purchase data. Status: ${purchaseResponse.status}`
          );
        }
        const purchaseData = await purchaseResponse.json();
        setPurchaseQuantity(purchaseData.quantity);
        setProductId(purchaseData.product_id);

        const productResponse = await fetch(
          `http://localhost:3003/products/${purchaseData.product_id}`
        );
        if (!productResponse.ok) {
          throw new Error(
            `Failed to fetch product data. Status: ${productResponse.status}`
          );
        }
        const productData = await productResponse.json();
        setProductPrice(productData.p_price);
        setProductName(productData.p_name);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [purchaseId]);

  useEffect(() => {
    setPaymentAmount(purchaseQuantity * productPrice);
  }, [purchaseQuantity, productPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      purchase_id: purchaseId,
      product_id: productId,
      payment_date: paymentDate,
      payment_amount: paymentAmount,
      payment_method: paymentMethod,
    };

    try {
      const response = await fetch("http://localhost:3003/insertpayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create payment. Status: ${response.status}`);
      }

      console.log("Payment created successfully");

      setPaymentSuccess(true);
      if (downloadLinkRef.current) {
        downloadLinkRef.current.linkToData();
      }
    } catch (error) {
      console.error("Error creating payment:", error.message);
    }
  };

  const paymentMethods = [
    "Credit Card",
    "Debit Card",
    "PayPal",
    "Cash",
    "Bank Transfer",
  ];

  return (
    <div className="container-payment">
      <div className="payment-container">
        {paymentSuccess ? (
          <div className="success-message1">
            <h3> Payment successful! </h3> <br />
            <PDFDownloadLink
              document={
                <BillPDF
                  productName={productName}
                  purchaseQuantity={purchaseQuantity}
                  productPrice={productPrice}
                  paymentAmount={paymentAmount}
                  paymentMethod={paymentMethod}
                  paymentDate={paymentDate}
                  productId={productId}
                />
              }
              fileName="receipt.pdf"
              ref={downloadLinkRef}
              className="pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download Receipt"
              }
            </PDFDownloadLink>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="product-form">
              <label>
                Product Name:
                <input type="text" value={productName} disabled />
              </label>
              <label>
                Purchase Quantity:
                <input type="text" value={purchaseQuantity} disabled />
              </label>
              <label>
                Price Per/Kg:
                <input type="text" value={productPrice} disabled />
              </label>
              <label>
                Payment Amount:
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  disabled
                />
              </label>
              <label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Payment Method
                  </option>
                  {paymentMethods.map((method, index) => (
                    <option key={index} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Payment Date:
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />
              </label>

              <button type="submit">Make Payment</button>
            </form>
            <div className="paymentimage">
              <img className="payment-image" src={payment} alt="payment" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
