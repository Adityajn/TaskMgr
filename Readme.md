<h1>TaskMgr is a TaskManager build on meanstack</h1>
<h2>Here I have explicitly created files for angular 2 can use Angular-cli also once understand how it works.</h2>
For mongodb i have used mlab<br>
nodejs is a server side language<br>
express is a nodejs framework use to build web applications featuring routing,api req and more.<br>
angular 2 is mvc framework for frontend<br>

Take this as quickstart or steps are also given

How to start
Mean project

Create a project folder say TaskMgr

-----------------------------------------------------
go into folder enter command -> 
1. npm init
This will create a file package.json file..containg configuration we just selected

-----------------------------------------------------
now,
enter command -> 
2. npm install express body-parser ejs mongojs --save
express - a nodejs framework
body-parser - to parse form data and add to database
ejs - a template system
mongojs - interact with mongodb

--save will save all package in config file (package.json)


-----------------------------------------------------
3. now, create server.js file in route folder as
				var express = require('express');
				var path = require('path');		//for path related stuff..already present
				var bodyParser = require('body-parser');

				var index=require('./routes/index');
				var tasks=require('./routes/tasks');

				var port =3000;
				var app=express();	//initialize app

				//view engine
				app.set('views',path.join(__dirname,'views'));
				app.set('view engine','ejs');
				app.engine('html',require('ejs').renderFile);

				//set Static folder
				app.use(express.static(path.join(__dirname,'client'))); //for angular 2 related stuff

				//body parser
				app.use(bodyParser.json());
				app.use(bodyParser.urlencoded({extended: false}));

				app.use('/',index);
				app.use('/api',tasks);

				app.listen(port,function(){
					console.log("Server Started on port "+port);
				});



-----------------------------------------------------
4. create routes folder
inside route folder create index.js(update later) as
				var express = require('express');
				var router=express.Router();

				router.get('/',function(req,res,next){
				    res.render('index.html');
				});

				module.exports = router;

and tasks.js (update later) as
				var express = require('express');
				var router=express.Router();

				router.get('/tasks',function(req,res,next){
				    res.send('Tasks page');
				});

				module.exports = router;


-----------------------------------------------------
5. create views folder
inside views create index.html
				<!DOCTYPE html>
				<html>
				    <head>
				        <title>My tasks List</title>
				    </head>
				    <body>
				        <h1>Hello World!!!</h1>
				    </body>
				</html>

----------------------------------------------------
6. test app
nodejs server.js

to Avoid starting server again and again install nodemon globally -> npm install -g nodemon
it will monitor your code and update whenever required

try localhost:3000 and localhost:3000/api
-----------------------------------------------------
7. Create mongo database
	create mlab account if dont have one

	create a database
	create a collection
	add some documents, i have done like this

		{
			"taskno":"2",
			"title":"express",
			"isDone":"false"
		}
	add database user
	note the link..or copy that	
--------------------------------------------------------

8. edit tasks.js as

					var mongojs=require("mongojs");
					var db=mongojs("mongodb://adityajain105:aditya123@ds155811.mlab.com:55811/taskmgrdb",['tasks']);

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
					   console.log("task to add- "+task);
					   if(!task.title || !(task.isDone+'')){
					        res.status(400);
					        res.json({
					            "error":"Bad Data"
					        });
					   }else{
					       db.tasks.save(task,function(err,task){
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
					    db.tasks.remove({"taskno":parseInt(req.params.id)},function(err,task){
					        if(err){
					            res.send(err);
					        }
					        else{
					            res.json(task);
					        }
					    })
					});

					//update single task
					router.put('/task/:id',function(req,res,next){
					    var task=req.body;
					    var updTask={}
					    updTask.isDone=!task.isDone;
					    updTask.taskno=task.taskno;
					    updTask.title=task.title;
					    if(!updTask.title){
					        res.status(400);
					        res.json({
					            "error":"Bad Data"
					        });
					    }
					    else {
					        db.tasks.update({"taskno": parseInt(req.params.id)},updTask,{multi: false}, function (err, data){
					            if (err) {
					                res.send(err);
					            }
					            else {
					                res.json(data);
					            }
					        })
					    }
					});					
----------------------------------------------------------

9. create client folder //for angular

inside client folder add 4 files from project, these are configuration files for angular
package.json, typings.json, tsconfig.json and systemjs.config.js

and then enter command from client folder
-> npm install

----------------------------------------------------------

10. create app directory in client directory
inside app directory create app.module.ts as-

					import { NgModule }      from '@angular/core';
					import { BrowserModule } from '@angular/platform-browser';

					import {AppComponent} from './app.component';
					@NgModule({
					    imports:      [ BrowserModule ],
					    declarations : [AppComponent],
    					bootstrap:[AppComponent]
					})
					export class AppModule { }

and app.component.ts
					import { Component } from '@angular/core';
					@Component({
					    selector: 'my-app',
					    template: '<h1>My first angular app</h1>',
					})

					export class AppComponent { }

and main.ts
					import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
					import { AppModule } from './app.module';

					const platform = platformBrowserDynamic();
					platform.bootstrapModule(AppModule);

and replace index.html with this code
					<html>
					<head>
					    <title>MyTaskList</title>
					    <meta charset="UTF-8">
					    <meta name="viewport" content="width=device-width, initial-scale=1">
					    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
					    <link rel="stylesheet" href="styles.css">
					    <!-- 1. Load libraries -->
					    <!-- Polyfill(s) for older browsers -->
					    <script src="node_modules/core-js/client/shim.min.js"></script>
					    <script src="node_modules/zone.js/dist/zone.js"></script>
					    <script src="node_modules/reflect-metadata/Reflect.js"></script>
					    <script src="node_modules/systemjs/dist/system.src.js"></script>
					    <!-- 2. Configure SystemJS -->
					    <script src="systemjs.config.js"></script>
					    <script>
					        System.import('app').catch(function(err){ console.error(err); });
					    </script>
					</head>
					<!-- 3. Display the application -->
					<body>
					<my-app>Loading...</my-app>
					</body>
					</html>

and finally run command in client directory-> npm start
this will convert all typescripts in javascripts

Test application-> node server.js
---------------------------------------------------------------


11. install bower globally for installing packages

npm install -g bower

create .bowerrc file in root folder as
{
    "directory":"client/bower_components"
}

type command-> bower install bootstrap --save
---------------------------------------------------------------

12. 
create component directory in app
create tasks in component directory

inside tasks create tasks.component.ts as
						
					import { Component } from '@angular/core';

					@Component({
					    moduleId:module.id,
					    selector: 'tasks',
					    templateUrl:'tasks.component.html',
					})

					export class TasksComponent { }


and tasks.component.html as for now
					<h1>Tasks</h1>

edit app.component.ts
					 template: '<tasks></tasks>',

edit app.module.ts

				 import {TasksComponent} from './component/tasks/tasks.component';
  				declarations : [AppComponent,TasksComponent],

in client folder run npm start;

-------------------------------------------------------------------

13.

lets edit app.component.ts as
				@Component({
				    moduleId:module.id,
				    selector: 'my-app',
				    templateUrl: 'app.component.html',
				})


create app.component.html as
				<div class="container">
				    <h1>My task manager</h1>
				    <hr>
				    <tasks></tasks>
				</div>


edit tasks.component.html as
				<form class="well">
				    <div class="fore-group">
				        <input type="text" class="form-control" placeholder="Add Tasks">
				    </div>
					</form>
				<div class="task-list">
				    <div class="col-md-1">
				        <input type="checkbox">
				    </div>
				    <div class="col-md-4">
				        Some task
				    </div>
				    <div class="col-md-6">
				        <input type="button" value="Delete" class="btn btn-danger">
				    </div>
				</div>

Our UI is ready lets create service to interact with ui
---------------------------------------------------
14.

create service directory in app
create task.service.ts in service dir as
				import {Injectable} from '@angular/core'; //inject service as dependency
				import {Http,Headers} from '@angular/http';
				import 'rxjs/add/operator/map'	//for observables

				@Injectable()
				export class TaskService{
				    constructor(private http:Http){	//inject http
				        console.log("Service started");
				    }
				}



edit app.component.ts as
				import {TaskService} from './services/task.service'
				providers:[TaskService]	



edit app.module.ts
				import {HttpModule} from '@angular/http';
				imports:      [ BrowserModule,HttpModule ]




edit taskComponet as 
				import {TaskService} from "../../services/task.service";
				export class TasksComponent {
				    constructor(private taskSerice:TaskService){

				    }
				}


test the app-
in client-> npm start
in root-> node server.js
in browser console see -> service started
----------------------------------------------

15.
add function getTasks() to task.service.ts as
				getTasks(){
				    return this.http.get("http://localhost:3000/api/tasks")
				            .map(res=>res.json());
				}

add function call to task.component.ts as
				constructor(private taskService:TaskService){
			        this.taskService.getTasks()
			            .subscribe(tasks=>{
			                console.log(tasks);
			            });
			    }

Test the app
-----------------------------------------------
16. 
create task.ts in client directory as
				export class Task{
				    taskno: number;
				    title: string;
				    isDone: boolean;
				}

edit task.component.ts as
				import {Task} from '../../../task';
				export class TasksComponent {
				    tasks:Task[];
				    constructor(private taskService:TaskService){
				        this.taskService.getTasks()
				            .subscribe(tasks=>{
				                this.tasks=tasks;
				            });
				    }
				}

Tesk the app
-------------------------------------------
16.
edit tasks.component.html as
			<form class="well" >
			    <div class="form-group">
			        <input type="number" [(ngModel)]="no" name="no" class="form-control" placeholder="Task no">
			    </div>
			    <div class="form-group">
			          <input type="text" [(ngModel)]="title" name="title" class="form-control" placeholder="Task title">
			    </div>
			    <input type="button" (click)="addTask(no,title)" value="Add">
			</form>

edit tasks.component.ts as
in class

	 			title:string;
				no:number;

				addTask(no,title){
			        var newTask={
			            taskno:no,
			            title:title,
			            isDone:false
			        }
			        console.log("taskcreated: "+JSON.stringify(newTask));
			        this.taskService.addTask(newTask)
			            .subscribe(task=>{
			                this.tasks.push(task);
			                this.title="";
			                this.no=0;
			            })

			    }			

edit app.module.ts as
				import {FormsModule} from '@angular/forms';
	 			imports:BrowserModule,HttpModule,FormsModule],


add addTask to task.service.ts as
				addTask(newTask){
				        var headers=new Headers();
				        headers.append("Content-Type","application/json");
				        return this.http.post('http://localhost:3000/api/task',JSON.stringify(newTask),{headers:headers})
				            .map(res=>res.json());
				    }



test app
--------------------------------------------------------------

17. 

delete and update task
task.service.ts->

		
			    deleteTask(no){
			        return this.http.delete('http://localhost:3000/api/task/'+no).map(res=>res.json());
			    }

			    updateTask(updtask){
			        var headers = new Headers();
			        headers.append('Content-Type', 'application/json');
			        return this.http.put('http://localhost:3000/api/task/'+updtask.taskno,JSON.stringify(updtask),{headers:headers})
			            .map(res=>res.json());
			    }


tasks.component.ts->
				  deleteTask(no){
				        this.taskService.deleteTask(no).subscribe(data => {
				                if(data.n == 1) {
				                    for (var i = 0; i < this.tasks.length; i++) {
				                        if (no == this.tasks[i].taskno) {
				                            this.tasks.splice(i, 1);
				                        }
				                    }
				                }
				            })
				    }

				    updateTask(curtask){
				        this.taskService.updateTask(curtask).subscribe(data=>{
				            if(data.n==1){
				                for (var i = 0; i < this.tasks.length; i++) {
				                    if (curtask.taskno == this.tasks[i].taskno) {
				                        this.tasks[i].isDone=!this.tasks[i].isDone;
				                    }
				                }
				            }
				        })
				    }


task.component.html->
				
				 <div *ngFor="let task of tasks">
			        <div class="col-md-1">
			            <input type="checkbox" (click)="updateTask(task)" [checked]="task.isDone">
			        </div>
			        <div class="col-md-2">
			            {{task.taskno}}
			        </div>
			        <div class="col-md-5">
			            {{task.title}}
			        </div>
			        <div class="col-md-4">
			            <input type="button" (click)="deleteTask(task.taskno)" value="Delete" class="btn btn-danger">
			        </div>
			        <br><br>
			    </div>


-----------------------------------------------------
18. Task Manager is complete