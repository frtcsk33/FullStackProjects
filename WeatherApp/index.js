import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();

const port = 3000;

const myApiKey="0afd1aebcba91892990f8b61a2359dd1";
const API_URL="http://api.weatherstack.com/current";


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", (req,res) => {
    res.render("index.ejs");

});

    
app.post("/", (req, res) => {
    const cityName = req.body.id;
    var today = new Date();
    today = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })


    axios.get(`${API_URL}?access_key=${myApiKey}&query=${cityName}`)
        .then(response => {
            const result = (response.data);
            console.log(result);
                res.render("index.ejs", { data: result, day:today});
            
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("An error occured");
        });
    });
   


app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});