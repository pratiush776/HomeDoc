const express = require("express");
const app = express();
const cors=require("cors");
const corsOptions ={
    origin: ["http://localhost:5173"]
};
const main = require("./api")

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(corsOptions));


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

app.listen(8080, ()=> {
    console.log("Server started running on port 8080...")
});
