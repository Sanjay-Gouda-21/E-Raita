const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "Sanjaygouda21@",
  database: "ams",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// ------------------SIGN IN CHECK----------------------

app.post("/signin", (req, res) => {
  const { email, password, userType } = req.body;
  let tableName = "";
  let emailColumn = "";
  let passColumn = "";
  let nameColumn = "";
  let contactColumn = "";
  let addressColumn = "";
  let wageColumn = "";
  let userid = "";

  switch (userType) {
    case "farmer":
      tableName = "farmers";
      userid = "farmer_id";
      emailColumn = "f_email";
      passColumn = "f_pass";
      nameColumn = "f_name";
      contactColumn = "f_contact";
      addressColumn = "f_address";
      break;
    case "customer":
      tableName = "customers";
      userid = "cust_id";
      emailColumn = "c_email";
      passColumn = "c_pass";
      nameColumn = "c_name";
      contactColumn = "c_contact";
      addressColumn = "c_address";
      break;
    case "labour":
      tableName = "labourers";
      userid = "labour_id";
      emailColumn = "l_email";
      passColumn = "l_pass";
      nameColumn = "l_name";
      contactColumn = "l_contact";
      addressColumn = "l_address";
      wageColumn = "l_wage";
      break;
    case "admin":
      tableName = "admin";
      emailColumn = "admin_email";
      passColumn = "admin_pass";
      break;
    default:
      return res.status(400).json({ error: "Invalid user type" });
  }

  db.query(
    `SELECT * FROM ${tableName} WHERE ${emailColumn} = ?`,
    [email],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: "User not found" });
      }
      const user = results[0];

      if (user[passColumn] !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const userDetails = {
        id: user[userid],
        name: user[nameColumn],
        email: user[emailColumn],
        contact: user[contactColumn],
        address: user[addressColumn],
        userType,
        wage: user[wageColumn],
      };
      return res.status(200).json({
        message: "Login successful",
        user: userDetails,
      });
    }
  );
});

// ------------------SIGN UP----------------------

app.post("/signup", (req, res) => {
  const { name, contact, address, userType, email, password, wage } = req.body;

  let tableName = "";
  let nameColumn = "";
  let contactColumn = "";
  let addressColumn = "";
  let emailColumn = "";
  let passColumn = "";
  let additionalColumns = "";
  let additionalValues = "";

  switch (userType) {
    case "farmer":
      tableName = "farmers";
      nameColumn = "f_name";
      contactColumn = "f_contact";
      addressColumn = "f_address";
      emailColumn = "f_email";
      passColumn = "f_pass";
      break;
    case "customer":
      tableName = "customers";
      nameColumn = "c_name";
      contactColumn = "c_contact";
      addressColumn = "c_address";
      emailColumn = "c_email";
      passColumn = "c_pass";
      break;
    case "labour":
      tableName = "labourers";
      nameColumn = "l_name";
      contactColumn = "l_contact";
      addressColumn = "l_address";
      emailColumn = "l_email";
      passColumn = "l_pass";
      additionalColumns = ", l_wage";
      additionalValues = ", ?";
      break;
    default:
      res.status(400).json({ error: "Invalid user type" });
      return;
  }

  const query = `INSERT INTO ${tableName} (${nameColumn}, ${contactColumn}, ${addressColumn}, ${passColumn}, ${emailColumn}${additionalColumns}) VALUES (?, ?,  ?, ?, ?${additionalValues})`;
  const values = [name, contact, address, password, email];
  if (userType === "labour") {
    values.push(wage);
  }

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.status(201).json({ message: "Registration successful" });
  });
});

// ----------------- GOVERNMENT SCHEME FETCH --------------
app.get("/api/schemes", (req, res) => {
  db.query(
    "SELECT Scheme_id, Scheme_desc, CONCAT(DATE_FORMAT(CAST(start_date AS DATE), '%d-%m-%Y'), ' to ', DATE_FORMAT(CAST(end_date AS DATE), '%d-%m-%Y') ) AS formatted_date_range, Scheme_title ,image_url , apply_link FROM governmentschemes;",
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      try {
        const jsonData = JSON.stringify(results);
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(jsonData);
      } catch (jsonError) {
        console.error("Error transforming data to JSON:", jsonError);
        res.status(500).json({ error: "Error processing data" });
      }
    }
  );
});

// ------------------LABOURS PAGE NAVBAR   && SEARCH QUERRY ----------------------

app.get("/labourers", (req, res) => {
  const { search } = req.query;

  // SQL query to fetch laborers with optional search
  let query = "SELECT * FROM labourers";
  const queryParams = [];

  if (search) {
    query += " WHERE l_name LIKE ?";
    queryParams.push(`%${search}%`);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Error fetching data from database" });
    } else {
      res.json(results);
    }
  });
});

// ------------------ADMIN PAGE FARMER DETAILS----------------------
app.get("/farmerdetails", (req, res) => {
  db.query("SELECT * FROM farmers;", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      const jsonData = JSON.stringify(results);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(jsonData);
    } catch (jsonError) {
      console.error("Error transforming data to JSON:", jsonError);
      res.status(500).json({ error: "Error processing data" });
    }
  });
});

app.get("/farmerdetails/:farmerId", (req, res) => {
  const farmerId = req.params.farmerId;

  db.query(
    "SELECT * FROM farmers WHERE farmer_id = ?",
    [farmerId],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      try {
        if (results.length === 0) {
          return res.status(404).json({ error: "Farmer not found" });
        }

        const jsonData = JSON.stringify(results[0]);
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(jsonData);
      } catch (jsonError) {
        console.error("Error transforming data to JSON:", jsonError);
        res.status(500).json({ error: "Error processing data" });
      }
    }
  );
});

app.delete("/farmerdetails/:farmer_id", (req, res) => {
  const farmerIdToDelete = req.params.farmer_id;

  db.query(
    "DELETE FROM farmers WHERE farmer_id = ?",
    [farmerIdToDelete],
    (error, results) => {
      if (error) {
        console.error("Error executing DELETE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Farmer not found" });
      }

      res.status(200).json({ message: "Farmer deleted successfully" });
    }
  );
});

app.put("/updateFarmer/:farmer_id", (req, res) => {
  const farmerIdToUpdate = req.params.farmer_id;
  const updatedFarmerData = req.body;

  db.query(
    "UPDATE farmers SET ? WHERE farmer_id = ?",
    [updatedFarmerData, farmerIdToUpdate],
    (error, results) => {
      if (error) {
        console.error("Error executing UPDATE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Farmer not found" });
      }
      res.status(200).json({ message: "Farmer updated successfully" });
    }
  );
});

// <<<<<------------------ADMIN PAGE CUSTOMER DETAILS---------------------->>>>>>

app.get("/customerdetails", (req, res) => {
  db.query("SELECT * FROM customers;", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      const jsonData = JSON.stringify(results);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(jsonData);
    } catch (jsonError) {
      console.error("Error transforming data to JSON:", jsonError);
      res.status(500).json({ error: "Error processing data" });
    }
  });
});

app.delete("/customerdetails/:cust_id", (req, res) => {
  const CustIdToDelete = req.params.cust_id;
  db.query(
    "DELETE FROM customers WHERE cust_id = ?",
    [CustIdToDelete],
    (error, results) => {
      if (error) {
        console.error("Error executing DELETE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }

      res.status(200).json({ message: "Customer deleted successfully" });
    }
  );
});

app.get("/customerdetails/:customerId", (req, res) => {
  const customerId = req.params.customerId;

  db.query(
    "SELECT * FROM customers WHERE cust_id = ?",
    [customerId],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      try {
        if (results.length === 0) {
          return res.status(404).json({ error: "Customer not found" });
        }

        const jsonData = JSON.stringify(results[0]);
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(jsonData);
      } catch (jsonError) {
        console.error("Error transforming data to JSON:", jsonError);
        res.status(500).json({ error: "Error processing data" });
      }
    }
  );
});

app.put("/updateCustomer/:cust_id", (req, res) => {
  const CustomerIdToUpdate = req.params.cust_id;
  const updatedCustomerData = req.body;

  db.query(
    "UPDATE customers SET ? WHERE cust_id = ?",
    [updatedCustomerData, CustomerIdToUpdate],
    (error, results) => {
      if (error) {
        console.error("Error executing UPDATE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.status(200).json({ message: "Customer updated successfully" });
    }
  );
});

// <<<<<------------------ADMIN PAGE LABOUR DETAILS---------------------->>>>>>

app.get("/labourdetails", (req, res) => {
  db.query("SELECT * FROM labourers;", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      const jsonData = JSON.stringify(results);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(jsonData);
    } catch (jsonError) {
      console.error("Error transforming data to JSON:", jsonError);
      res.status(500).json({ error: "Error processing data" });
    }
  });
});

app.delete("/labourdetails/:labour_id", (req, res) => {
  const labourIdToDelete = req.params.labour_id;

  db.query(
    "DELETE FROM labourers WHERE labour_id = ?",
    [labourIdToDelete],
    (error, results) => {
      if (error) {
        console.error("Error executing DELETE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Labour not found" });
      }
      res.status(200).json({ message: "Labour deleted successfully" });
    }
  );
});

app.get("/labourdetails/:labourId", (req, res) => {
  const labourId = req.params.labourId;

  db.query(
    "SELECT * FROM labourers WHERE labour_id = ?",
    [labourId],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      try {
        if (results.length === 0) {
          return res.status(404).json({ error: "Customer not found" });
        }

        const jsonData = JSON.stringify(results[0]);
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(jsonData);
      } catch (jsonError) {
        console.error("Error transforming data to JSON:", jsonError);
        res.status(500).json({ error: "Error processing data" });
      }
    }
  );
});

app.put("/updateLabour/:labourId", (req, res) => {
  const labourIdToUpdate = req.params.labourId;
  const updatedLabourData = req.body;

  db.query(
    "UPDATE labourers SET ? WHERE labour_id = ?",
    [updatedLabourData, labourIdToUpdate],
    (error, results) => {
      if (error) {
        console.error("Error executing UPDATE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Labour not found" });
      }

      res.status(200).json({ message: "Labour updated successfully" });
    }
  );
});

app.post("/api/insertscheme", (req, res) => {
  const schemeData = req.body;

  db.query(
    "INSERT INTO governmentschemes SET ?",
    schemeData,
    (error, results) => {
      if (error) {
        console.error("Error inserting scheme:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      const insertedSchemeId = results.insertId;
      res.status(200).json({
        message: "Scheme inserted successfully",
        insertedId: insertedSchemeId,
      });
    }
  );
});

app.delete("/governmentschemes/:Scheme_id", (req, res) => {
  const schemeIdToDelete = req.params.Scheme_id;

  db.query(
    "DELETE FROM governmentschemes WHERE Scheme_id = ?",
    [schemeIdToDelete],
    (error, results) => {
      if (error) {
        console.error("Error executing DELETE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Scheme not found" });
      }

      res.status(200).json({ message: "Scheme deleted successfully" });
    }
  );
});

app.get("/govtscheme/:schemeId", (req, res) => {
  const schemeId = req.params.schemeId;

  db.query(
    "SELECT * FROM governmentschemes WHERE Scheme_id = ?",
    [schemeId],
    (error, results) => {
      if (error) {
        console.error("Error executing GET query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Scheme not found" });
      }

      res.status(200).json(results[0]);
    }
  );
});

app.put("/updatescheme/:schemeId", (req, res) => {
  const schemeIdToUpdate = req.params.schemeId;
  const updatedSchemeData = req.body;

  db.query(
    "UPDATE governmentschemes SET ? WHERE Scheme_id = ?",
    [updatedSchemeData, schemeIdToUpdate],
    (error, results) => {
      if (error) {
        console.error("Error executing UPDATE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Scheme not found" });
      }

      res.status(200).json({ message: "Scheme updated successfully" });
    }
  );
});

app.post("/hire", (req, res) => {
  const { labourerId, hireDate, daysOfWork, totalWage, farmerId } = req.body;

  const sql = `
    INSERT INTO hire (labour_id, hire_date, days_worked, total_wage,farmer_id)
    VALUES (?, ?, ?, ?,?)
  `;

  db.query(
    sql,
    [labourerId, hireDate, daysOfWork, totalWage, farmerId],
    (err, result) => {
      if (err) {
        console.error("Error inserting hire record:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "Hire record created successfully" });
      }
    }
  );
});

app.get("/labourers/:labourerId", (req, res) => {
  const { labourerId } = req.params;

  const sql = "SELECT * FROM labourers WHERE labour_id = ?";
  db.query(sql, [labourerId], (err, results) => {
    if (err) {
      console.error("Error fetching laborer's wage:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Laborer not found" });
    } else {
      const laborer = results[0];
      res.json({ laborer });
    }
  });
});

//--------------Product And Search --------
app.get("/products", (req, res) => {
  const { search } = req.query;

  let query = "SELECT * FROM products";
  const queryParams = [];

  if (search) {
    query += " WHERE p_name LIKE ?";
    queryParams.push(`%${search}%`);
  }

  db.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      const jsonData = JSON.stringify(results);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(jsonData);
    } catch (jsonError) {
      console.error("Error transforming data to JSON:", jsonError);
      res.status(500).json({ error: "Error processing data" });
    }
  });
});

app.get("/hire/:hireId", (req, res) => {
  const hireId = req.params.hireId;

  db.query(
    "SELECT * FROM hire WHERE hire_id = ?",
    [hireId],
    (error, results) => {
      if (error) {
        console.error("Error fetching hire details:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Check if any hire entry with the given hireId was found
      if (results.length === 0) {
        return res.status(404).json({ error: "Hire entry not found" });
      }

      // Send the hire details as JSON response
      res.status(200).json(results[0]); // Assuming you want to send the first matching result
    }
  );
});

app.get("/api/hire", (req, res) => {
  const { sort } = req.query;
  let orderBy = "";

  switch (sort) {
    case "date":
      orderBy = "ORDER BY hire_date";
      break;
    case "wage":
      orderBy = "ORDER BY total_wage";
      break;
    case "daysWorked":
      orderBy = "ORDER BY days_worked";
      break;
    default:
      orderBy = "";
  }

  const sql = `
    SELECT hire_id, labour_id, DATE_FORMAT(hire_date, '%d-%m-%Y') AS formatted_hire_date, days_worked, total_wage, farmer_id 
    FROM hire
    ${orderBy};`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      const jsonData = JSON.stringify(results);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(jsonData);
    } catch (jsonError) {
      console.error("Error transforming data to JSON:", jsonError);
      res.status(500).json({ error: "Error processing data" });
    }
  });
});

app.delete("/hire/:hire_id", (req, res) => {
  const hireIdToDelete = req.params.hire_id;

  db.query(
    "DELETE FROM hire WHERE hire_id = ?",
    [hireIdToDelete],
    (error, results) => {
      if (error) {
        console.error("Error executing DELETE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Hire entry not found" });
      }
      res.status(200).json({ message: "Hire entry deleted successfully" });
    }
  );
});

app.put("/updatehire/:hireId", (req, res) => {
  const hireIdToUpdate = req.params.hireId;
  const updatedHireData = req.body;

  db.query(
    "UPDATE hire SET ? WHERE hire_id = ?",
    [updatedHireData, hireIdToUpdate],
    (error, results) => {
      if (error) {
        console.error("Error executing UPDATE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        console.error("No hire entry was updated.");
        return res.status(404).json({ error: "Hire entry not found" });
      }

      console.log("Hire entry updated successfully.");
      res.status(200).json({ message: "Hire entry updated successfully" });
    }
  );
});

app.post("/purchase", (req, res) => {
  const { cust_id, productId, purchase_date, quantity } = req.body;

  const sql = `
    INSERT INTO purchase (cust_id, product_id, purchase_date, quantity)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [cust_id, productId, purchase_date, quantity],
    (err, result) => {
      if (err) {
        console.error("Error inserting purchase record:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Purchase record inserted successfully");

        const purchaseId = result.insertId;

        res.status(201).json({ purchase_id: purchaseId });
      }
    }
  );
});

app.post("/insertpayment", (req, res) => {
  const {
    purchase_id,
    product_id,
    payment_date,
    payment_amount,
    payment_method,
  } = req.body;

  const sql = `
    INSERT INTO payment (purchase_id, product_id, payment_date, payment_amount, payment_method)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [purchase_id, product_id, payment_date, payment_amount, payment_method],
    (err, result) => {
      if (err) {
        console.error("Error inserting payment record:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Payment record inserted successfully");
        res
          .status(201)
          .json({ message: "Payment record created successfully" });
      }
    }
  );
});

app.put("/updateproduct/:productId", (req, res) => {
  const productToUpdate = req.params.productId;
  const updatedproductData = req.body;

  db.query(
    "UPDATE products SET ? WHERE product_id = ?",
    [updatedproductData, productToUpdate],
    (error, results) => {
      if (error) {
        console.error("Error executing UPDATE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Scheme not found" });
      }

      res.status(200).json({ message: "Scheme updated successfully" });
    }
  );
});
app.delete("/products/:product_id", (req, res) => {
  const productIdToDelete = req.params.product_id;

  db.query(
    "DELETE FROM products WHERE product_id = ?",
    [productIdToDelete],
    (error, results) => {
      if (error) {
        console.error("Error executing DELETE query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    }
  );
});

app.post("/api/insertproduct", (req, res) => {
  const productData = req.body;

  db.query("INSERT INTO products SET ?", productData, (error, results) => {
    if (error) {
      console.error("Error inserting product:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    const insertedproductId = results.insertId;
    res.status(200).json({
      message: "Scheme inserted successfully",
      insertedId: insertedproductId,
    });
  });
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;

  db.query(
    "SELECT * FROM products WHERE product_id = ?",
    [productId],
    (error, results) => {
      if (error) {
        console.error("Error fetching product details:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(results[0]);
    }
  );
});

app.get("/purchase/:purchaseId", (req, res) => {
  const purchaseId = req.params.purchaseId;

  db.query(
    "SELECT * FROM purchase WHERE purchase_id = ?",
    [purchaseId],
    (error, results) => {
      if (error) {
        console.error("Error fetching purchase details:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Purchase not found" });
      }

      res.status(200).json(results[0]);
    }
  );
});

app.get("/total-wages", (req, res) => {
  db.query(
    "SELECT l.l_name AS LabourerName, SUM(h.total_wage) AS TotalWagesPaid FROM labourers l JOIN hire h ON l.labour_id = h.labour_id GROUP BY l.l_name;",
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).json({ wagesData: results });
    }
  );
});

app.get("/top-products", (req, res) => {
  const query = `
    SELECT p.p_name AS ProductName, COUNT(*) AS PurchaseCount
    FROM products p
    JOIN purchase pu ON p.product_id = pu.product_id
    GROUP BY p.product_id
    ORDER BY PurchaseCount DESC
    LIMIT 5;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({ topProductsData: results });
  });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
