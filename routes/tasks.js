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
//save task
router.post('/task',function(req,res,next){
   var task=req.body;
   if(!task.title || (task.isDone+'')){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
   }else{
       db.task.save(task,function(err,task){
           if(err){
               res.send(err);
           }
           else{
               res.json(task);
           }
       });
   }
});

//delete single task
router.delete('/task/:id',function(req,res,next){
    db.tasks.remove({"taskno":req.params.id},function(err,task){
        if(err){
            res.send(err);
        }
        else{
            res.json(task);
        }
    })
});

//delete single task
router.put('/task/:id',function(req,res,next){
    var task=req.body;
    var updTask={};

    if(task.isDone){
        updTask.isDone=task.isDone;
    }

    if(task.title){
        updTask.title=task.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
    else {
        db.tasks.update({"taskno": req.params.id},updTask,{}, function (err, task){
            if (err) {
                res.send(err);
            }
            else {
                res.json(task);
            }
        })
    }
});

module.exports = router;