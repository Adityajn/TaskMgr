import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Task} from '../../../task';
@Component({
    moduleId:module.id,
    selector: 'tasks',
    templateUrl:'task.component.html',
})

export class TasksComponent {
    tasks:Task[];
    title:string;
    no:number;

    constructor(private taskService:TaskService){
        this.taskService.getTasks()
            .subscribe(tasks=>{
                this.tasks=tasks;
                this.tasks.sort((t1,t2)=>{
                    if(t1.taskno>t2.taskno) return 1;
                    else if (t1.taskno==t2.taskno) return 0;
                    else return -1;
                });
            });
    }

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
}