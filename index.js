const Joi = require('joi');
const { application } = require('express');
const express = require('express');
const res = require('express/lib/response');
const app =express();

app.use(express.json());

const courses =[
    {id:1, name: "course1"},
    {id:2, name: "course2"},
    {id:3, name: "course3"}
];

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.get('/api/courses',(req, res)=>{
    res.send(courses);
});

app.post('/api/courses',(req,res) =>{
    const {error} = validateCourse(req.body);

    if(error){
        //400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course)
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

app.put('/api/courses/:id', (req,res) =>{
    
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with the given ID was not found.");
    };

    const {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name=req.body.name;
    res.send(course);


})

app.delete('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with the given ID was not found.");
    };
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);

});

function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).required()
    };

    return result = Joi.validate(course, schema)
}


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));