import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


const API_URL= "https://api.openweathermap.org/data/2.5/forecast";
const apiKey= "8c234dae57041257380c90953d848b90";
let temp="";
let description="";
app.get("/", (req, res) => {
  res.render("index.ejs", {
    temp: "🌡️",
    desc: "☠︎"
  });
});

app.post("/get", async (req,res) => {
  const query=req.body.cityName; 
    try{
        const response = await axios.get(API_URL+`?q=${query}`+`&appid=${apiKey}`+`&units=metric`);
        temp =response.data.list[0].main.temp;
        description = response.data.list[0].weather[0].description;
        res.render("index.ejs", { 
          temp: JSON.stringify(temp),
          desc : JSON.stringify(description)
        });

      } catch (error) {
        res.render("/", { content: JSON.stringify(error.response.data) });
      }       
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});