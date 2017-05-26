How to start
Mean project


For mongodb i have used mlab
nodejs is a server side language
express is a nodejs framework use to build web applications featuring routing,api req and more.
angular is mvc framework for frontend

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

add->				var mongojs=require("mongojs");
add->				var db=mongojs("mongodb://adityajain105:aditya123@ds155811.mlab.com:55811/taskmgrdb",['tasks']);

edit->				router.get('/tasks',function(req,res,next){
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
add->				router.get('/task/:id',function(req,res,next){
					db.tasks.findOne({"taskno":req.params.id},function(err,task){
					        if(err){
					            res.send(err);
					        }
					        else{
					            res.json(task);
					        }
					    })
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