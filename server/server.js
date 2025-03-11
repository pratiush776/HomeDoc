const express = require("express");
const app = express();
const cors = require("cors");
const main = require("./api");

const PORT = process.env.PORT || 9000;

app.use(express.static("public"));
app.use(express.json());

var corsOptions = {
  origin: "https://homedoc-rfey.onrender.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.post("/api", async (req, res) => {
  console.log("API called");
  console.log(req.body);

  main(req.body).then((result) => {
    res.json(result);
  });
});

// app.get("/test", (req, res) => {
//   res.json("server is running...");
// });

app.listen(PORT, () => {
  console.log("Server started running on port" + PORT);
});
