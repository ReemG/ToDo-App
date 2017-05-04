import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks = [];
  task = '';
  taskData = localStorage['taskList'];
  c=0;

  ngOnInit() {
    if (this.taskData !== undefined) {
      this.tasks = JSON.parse(this.taskData);
    }
    this.checkForNext();
  }

  addTask() {
    document.getElementById("newTask").style.display = "block";
    document.getElementById("tasksToShow").style.marginTop = "230px";
  }
  saveTask() {
    this.tasks.push({ "taskName": this.task, "status": false }); //false for incomplete
    this.task = '';
    document.getElementById("newTask").style.display = "none";
    document.getElementById("tasksToShow").style.marginTop = "200px";
    localStorage['taskList'] = JSON.stringify(this.tasks);
    this.checkForNext();
  }
  taskStatus(content) {
    for(var i=0;i<this.tasks.length;i++)
    {if(this.tasks[i].taskName == content.taskName)
      if (this.tasks[i].status == true) {
      this.tasks[i].status = false;
    }
    else {
      this.tasks[i].status = true;
    }
    }
    localStorage['taskList'] = JSON.stringify(this.tasks);
  }
  contentEdit(content, event) {
    event.target.contentEditable = event.target.contentEditable == "false" ? "true" : "false";
    for(var i=0;i<this.tasks.length;i++)
    {if(this.tasks[i].taskName == content.taskName)
      this.tasks[i].taskName = event.target.innerText;
     }
    localStorage['taskList'] = JSON.stringify(this.tasks);
  }
  deleteTask(content) {
    for(var i=0;i<this.tasks.length;i++)
    {if(this.tasks[i].taskName == content.taskName)
      {this.tasks.splice(i, 1);}
    }
    localStorage['taskList'] = JSON.stringify(this.tasks);
  }
  checkForNext(){
    if (this.tasks.length > this.c*5+5) {
      document.getElementById("next").removeAttribute('disabled');
    }
  else{document.getElementById("next").setAttribute('disabled','disalbed');}
  }
  
  prev() {
    this.c-=1;
    if(this.c==0)
    {
      document.getElementById("prev").setAttribute('disabled','disalbed');
    }
    if (this.tasks.length >  ((this.c)*5)+5)  {
      document.getElementById("next").removeAttribute('disabled');
    }    
  }

  next() {
    this.c+=1;
    document.getElementById("prev").removeAttribute('disabled');
    if(((this.c)*5)+5>=this.tasks.length)
    {document.getElementById("next").setAttribute('disabled','disalbed');}
  }
}


