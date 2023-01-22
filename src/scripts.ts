import axios from 'axios';

interface Task {
    id: number,
    title: string,
    description: string
}


const addNewTaskButton = document.querySelector(`.js-add-new-task-button`);
const formAddTask = document.querySelector(`.js-form-add-task`);
addNewTaskButton.addEventListener('click', () => {
    formAddTask.classList.toggle('task-add--hidden')
});

const addTaskToListButton = document.querySelector('.js-button-add-task-to-list');
addTaskToListButton.addEventListener('click', ( ) => {
    const addTitle = (document.querySelector(`.js-input-add-task-title`) as HTMLInputElement).value;
    const addDescription = (document.querySelector(`.js-input-add-task-description`) as HTMLInputElement).value;

    axios.post<Task>('http://localhost:3004/tasks', {
        title : addTitle,
        description : addDescription,
    })
})



// addAnimalsButton.addEventListener('click', () => {
//   axios.post<Animal>('http://localhost:3004/animals', {
//     name: 'Elephantos',
//   }).then(({ data }) => {
//     addAnimalsPre.innerHTML = JSON.stringify(data);
//   });
// }); 






axios.get<Task[]>('http://localhost:3004/tasks').then(({data}) => {
    const taskCount = Object.keys(data).length;
    document.querySelector('.js-task-count').textContent = `active task count ${taskCount}`;
});


axios.get<Task[]>('http://localhost:3004/tasks').then(({data}) => {
    showTasks(data)
});

const showTasks = (tasks: Task[]) => {

    const taskGrid = document.querySelector('.js-tasks-grid')

    tasks.forEach((task) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('tasks');
        taskCard.classList.add('task__card');
        taskCard.classList.add(`js-task-card-id-${task.id}`);
        taskCard.innerHTML = 
        `
        <div class="task task__main-info">
                <img src="https://picsum.photos/400/400" alt="task picture" class="task task__picture">
                <div class="task task__text-wrapper">
                    <h3 class="task task__title">
                        ${task.title}
                    </h3>
                    <p class="task task__description">
                        ${task.description}
                    </p>
                </div>
                <div class="task task__buttons-wraper">
                    <div class="task task__button">
                        <button class="js-task-edit-button-id-${task.id}">
                            Edit
                        </button>
                    </div>
                    <div class="task task__button">
                        <button class="js-button-delete-id-${task.id}">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <form class="task task__form task__form--hidden js-edit-task-panel-id-${task.id}"
                <input 
                    type="file"
                    accept="image/*"
                    class="task__image-change js-input-image-id-${task.id}"
                >
                <label class="task task__title-change">
                    Task title
                    <input
                        type="text"
                        value="${task.title}"
                        placeholder="Here comes title"
                        class="task task__input-field js-input-title-id-${task.id}"
                        maxlength="20"
                        required
                    >
                </label>
                <label class="task task__description-change">
                    Task description
                    <input
                        type="text"
                        value="${task.description}"
                        placeholder="Here comes title"
                        class="task task__input-field js-input-description-id-${task.id}"
                        maxlength="100"
                        required
                    >
                </label>
                <div class="task task__button">
                    <button class="js-button-update-id-${task.id}">
                        Update
                    </button>
                </div>
            </form>
        `
        taskGrid.appendChild(taskCard);

        
        const curentCard = document.querySelector(`.js-task-card-id-${task.id}`);

        const deleteTaskButton = document.querySelector(`.js-button-delete-id-${task.id}`);
        deleteTaskButton.addEventListener('click', () => {
            axios.delete<Task>(`http://localhost:3004/tasks/${task.id}`).then(() => {
                curentCard.innerHTML = "";
            });  
        });


        const editTaskButton = document.querySelector(`.js-task-edit-button-id-${task.id}`);
        const editTaskForm = document.querySelector(`.js-edit-task-panel-id-${task.id}`)
        editTaskButton.addEventListener('click', () => {
            editTaskForm.classList.toggle('task__form--hidden');
        })
        
        const updateTaskButton = document.querySelector(`.js-button-update-id-${task.id}`);
        updateTaskButton.addEventListener('click', () => {
            axios.put<Task>(`http://localhost:3004/tasks/${task.id}`, {
                title : (document.querySelector(`.js-input-title-id-${task.id}`) as HTMLInputElement).value,  //šeit
                description : (document.querySelector(`.js-input-description-id-${task.id}`) as HTMLInputElement).value, //šeit
            }).then(() => {
                    console.log('notika'); 
                });
        });



    });        
}




/*
    {
      "id": 1,
      "title": "Task1",
      "description": "And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy."
    },
    {
        "id": 2,
        "title": "Task2",
        "description": "And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy."
      },
      {
        "id": 3,
        "title": "Task3",
        "description": "And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy."
      },
      {
        "id": 4,
        "title": "Task4",
        "description": "And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy."
      },
      {
        "id": 5,
        "title": "Task5",
        "description": "And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy. And there we have some line just to copy."
      }
      */