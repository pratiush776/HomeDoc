const express = require("express");
const app = express();
const cors=require("cors");
const main = require("./api")

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define allowed origins as an array without trailing slashes
// const allowedOrigins = ["https://homedoc-rfey.onrender.com", "http://localhost:5173"];

// // CORS configuration
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"], // Add other headers if needed
//   credentials: true, // If you need to send cookies or auth headers
// };
var corsOptions = {
  origin: "https://homedoc-rfey.onrender.com",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// Apply CORS middleware **before** defining routes
// app.use(cors(corsOptions));

app.use(cors(corsOptions));

// Handle preflight requests for all routes
// app.options("*", cors(corsOptions));

app.post("/api", async (req, res) => {
    console.log("API called");
    console.log(req.body);
    
    main(req.body).then(result=>{
        console.log(result);
        res.json(result)
    })

  });

app.get("/test",(req,res)=>{
    res.json("server is running...")
})

app.listen(PORT, ()=> {
    console.log("Server started running on port"+PORT)
});
