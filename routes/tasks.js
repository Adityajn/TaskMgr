var express = require('express');
var router=express.Router();
var mongojs=require("mongojs");
var db=mongojs("mongodb://adityajain105:aditya123@ds155811.mlab.com:55811/taskmgrdb",['tasks']);

//get all tasks
router.get('/tasks',function(req,res,next){
    db.tasks.find(function(err,tasks){
        if(err){
            res.send(err);
        }
        else{
            res.json(tasks);
        }
    })
});

//get single task
router.get('/task/:id',function(req,res,next){
    db.tasks.findOne({"taskno":req.params.id},function(err,task){
        if(err){
            res.send(err);
        }
        else{
            res.json(task);
        }
    })
});


module.exports = router;