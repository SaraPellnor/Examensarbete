const express = require("express")
const app = express()
const mongoose = require("mongoose")


app.use(express.json())

app.get("/", (req,res) => {
    try {
        res.send("Wiiii de funka")
    } catch (error) {
        console.log("det gick inge braaaa", error);
    }
    
})

const init = async () => {
    await mongoose.connect("mongodb://localhost:27017/shop")
    app.listen(3000, () => console.log("server is up and running at localhost 3000"))
}
init()

