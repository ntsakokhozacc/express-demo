const { application } = require('express');
const express = require('express');
const res = require('express/lib/response');
const app =express();

app.use(express.json());

const courses =[
    {id:1, name: "couse1"},
    {id:2, name: "couse2"},
    {id:3, name: "couse3"}
];
app.get('/',(req,res)=>{
    res.send('hello world');
});

app.get('/api/courses',(req, res)=>{
    res.send(courses);
});

app.post('/api/courses',(req,res) =>{
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    course.push(course)
    res.send(course);
})

// API/courses/1
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with the given ID was not found.");
    }
    res.send(course)

});


//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));