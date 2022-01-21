const { application } = require('express');
const express = require('express');
const res = require('express/lib/response');
const app =express();

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.get('/api/courses',(req, res)=>{
    res.send([1,2,3]);
});

// API/courses/1
app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params.year);
});

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));