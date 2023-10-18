const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 2000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1/ToDoListDB2", {useNewUrlParser:true} );


const tasksSchema = {

    name: String
};

const Task = mongoose.model("Task", tasksSchema);
const Task2 = mongoose.model("workTask", tasksSchema);

const task4 = new Task2({
    name: "do workout"
});

const task5 = new Task2({
    name: "go to the cinema"
}); 

const task6 = new Task2({
    name: "play an instrument"
});

const task1 = new Task( {

    name: "Buy new socks"

});

const task2 = new Task({

    name: "Watch a film"
});

const task3 = new Task({

    name: "repair a broken thing"
});

const defaultTasks = [task1, task2, task3];
const defaultTasks2 = [task4, task5, task6];
// Task.insertMany(defaultTasks)
//     .then(function() {

//         console.log("Successfully saved default items to DB");
//     })
//     .catch(function(err){

//         console.log(err);
//     });


//await Task.find({});


// const task2 = ["repair a broken thing", "Do workout","Watch a movie", "make a to do list"];
// const  task = ["buy socks", "practise with nodejs", "Watch a movie", "make a to do list"];
app.get("/",  (req, res) => {
    //  const today = new Date();
  
    //  const options = { weekday: 'long', month: 'long', day: 'numeric' };
     //const formattedDate = "Today";

   

    Task.find().then(function(tasks){
        
        if(tasks.length === 0){
             Task.insertMany(defaultTasks)
            .then(function() {

         console.log("Successfully saved default items to DB");
        })
        .catch(function(err){
            console.log(err);
        });
        res.redirect("/");
        } else {
             res.render("index.ejs", { task: tasks, complete: complete, formattedDate: "Today" });
        }


        
    })
    .catch(function(err){
        console.log(err);
    });

     //const foundItems = await Task.findById({});
    // if(!(await Task.exists())){
        
    // }


   
});



app.post("/addtask", (req,res) => {

    // var newTask = req.body.newtask;
    // task.push(newTask);
    // res.redirect("/");

    const taskName= req.body.newtask;

    const task = new Task({
        name: taskName
    });

    task.save();
    res.redirect("/");


});

 var complete = ["finished jquery"];

app.post("/removetask", function(req,res){

   const checkedItemId =  (req.body.checkbox);

    Task.findByIdAndRemove({_id:String(checkedItemId)})
    .then(() => {
        console.log("Successfully deleted checked item from the database");
        res.redirect("/");
    })
    .catch(err => {
        console.log(err);
    });



});

app.post("/removetask2", function(req,res){

    const checkedItemId =  (req.body.check);
    console.log(checkedItemId);
     Task2.findByIdAndRemove({_id:String(checkedItemId)})
     .then(() => {
        
         console.log("Successfully deleted checked item from the database");
         res.redirect("/work");
     })
     .catch(err => {
         console.log(err);
     });
 
 
 
 });

app.get("/today", (req,res) => {

    res.redirect("/");
});

app.get("/work" , (req,res) => {

     // const isWorkPage = true;
    
     Task2.find().then(function(tasks2){
        today = "Work List";
        if(tasks2.length === 0){
             Task2.insertMany(defaultTasks2)
            .then(function() {

         console.log("Successfully saved default items to DB");
        })
        .catch(function(err){
            console.log(err);
        });
        res.redirect("/work");
        } else {
            res.render("index.ejs", {isWorkPage:true, task2: tasks2, formattedDate: "Work List"});
        }


        
    })
    .catch(function(err){
        console.log(err);
    });

    
});

app.post("/addtask2", (req,res) => {
    
    // var newTask2 = req.body.newtask2;

    // task2.push(newTask2);

    // res.redirect("/work");

    const taskName2= req.body.newtask2;

    const task2 = new Task2({
        name: taskName2
    });

    task2.save();
    res.redirect("/work");

});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});