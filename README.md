<p align="center">
  <a href="#about-project">About Project</a> · 
  <a href="#built-with">Built with</a> · 
  <a href="#main-features">Main Features</a> · 
  <a href="#ui">UI</a> ·
  <a href="#final-thoughts">Final Thoughts</a>
  
</p>

## About project

Project similar to a To Do List, in order to organize tasks in the service environment, and can be used for personal use or for teams.

## Built with

- Javascript
- HTML & CSS
- MySQL
- Node.js

## Main features

For the database, I made a .env.example file available in the directory so that they could understand how communication is carried out with the database.
```
PORT=
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB=
```

For communication and searching for tasks in the database, the IP of the server that I was using to create the project is inserted. If you are going to carry out the project, remember to change it to your IP or to localhost if it is on your local machine. <br> <br>
The port must also be changed as entered in the .env file. 
``` javascript
const fetchTasks = async () => {
    const response = await fetch('http://192.168.1.169:3333/tasks');
    const tasks = await response.json()
    return tasks;
};
```

## UI
As it is a Task List, it is important to focus on a visual interface that is easy for the user to understand.
Taking this into consideration, I created a project so that the user only needs to type the title of the task, all other information is only necessary to select the desired option.

### Create task
The user will just type the task in the main input and click the + button to create the new task

### Edit status
To edit the service status, simply select between "Pendente", "Em andamento" and "Concluido".
<div align="center">
  <img src="/css/images/status.jpeg">
</div>

### Edit technician
To edit the technician, you just need to select from the options that we inserted in the project script
<div align="center">
  <img src="/css/images/tecnico.jpeg">
</div>

### Edit title and/or date
To edit the task title or the scheduled date you will need to click on the edit button on the right side of the task and this will open a title entry so you can type the title you want. As for the date, it will present an input of the datetime-local type, to facilitate the insertion of the date and standardize the display.
<div align="center">
  <img src="/css/images/edit.jpeg">
</div>

### Delete task
To delete the task, the user just needs to click on the trash icon on the right side of the task they want to delete.

## Final Thoughts

This was one of the projects where I had the opportunity to develop something from design to code entirely on my own.

During the development process, I faced working with JavaScript to manipulate the DOM and communicate with the MySQL database using node.js. It was a big challenge, but in the end it was rewarding and beneficial for the project. I could see the performance and agility that comes with the job.

Overall, this project was a great way to improve my skills, learn new technologies, and apply that knowledge to practical projects like this and others on <a href="https://github.com/zevictoros">my Github</a>
