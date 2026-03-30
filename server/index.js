const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");

// built-in body parser (KHÔNG dùng body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test api
app.get("/hello", (req, res) => {
  console.log("🔥 /hello called");
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// apis
app.use("/api/admin", require("./api/admin.js"));
app.use("/api/customer", require("./api/customer.js"));

app.use(
  "/admin",
  express.static(path.resolve(__dirname, "../client-admin/build")),
);
app.get("admin/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client-admin/build", "index.html"));
});
app.use(
  "/",
  express.static(path.resolve(__dirname, "../client-customer/build")),
);
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../client-customer/build", "index.html"),
  );
});
