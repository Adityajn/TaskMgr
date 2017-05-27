"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var task_service_1 = require("../../services/task.service");
var TasksComponent = (function () {
    function TasksComponent(taskService) {
        var _this = this;
        this.taskService = taskService;
        this.taskService.getTasks()
            .subscribe(function (tasks) {
            _this.tasks = tasks;
            _this.tasks.sort(function (t1, t2) {
                if (t1.taskno > t2.taskno)
                    return 1;
                else if (t1.taskno == t2.taskno)
                    return 0;
                else
                    return -1;
            });
        });
    }
    TasksComponent.prototype.addTask = function (no, title) {
        var _this = this;
        var newTask = {
            taskno: no,
            title: title,
            isDone: false
        };
        console.log("taskcreated: " + JSON.stringify(newTask));
        this.taskService.addTask(newTask)
            .subscribe(function (task) {
            _this.tasks.push(task);
            _this.title = "";
            _this.no = 0;
        });
    };
    TasksComponent.prototype.deleteTask = function (no) {
        var _this = this;
        this.taskService.deleteTask(no).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < _this.tasks.length; i++) {
                    if (no == _this.tasks[i].taskno) {
                        _this.tasks.splice(i, 1);
                    }
                }
            }
        });
    };
    TasksComponent.prototype.updateTask = function (curtask) {
        var _this = this;
        this.taskService.updateTask(curtask).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < _this.tasks.length; i++) {
                    if (curtask.taskno == _this.tasks[i].taskno) {
                        _this.tasks[i].isDone = !_this.tasks[i].isDone;
                    }
                }
            }
        });
    };
    return TasksComponent;
}());
TasksComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks',
        templateUrl: 'task.component.html',
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map