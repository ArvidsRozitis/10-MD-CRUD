import axios from 'axios';

interface Task {
    id: number,
    title: string,
    description: string
}

const taskCount = document.querySelector('.js-task-count')
//taskCount.textContent = axios.get<Task[]>('http://localhost:3004/tasks')

console.log(taskCount)
axios.get<Task[]>('http://localhost:3004/tasks').then(({data}) => {
    const taskCount = Object.keys(data).length;
    document.querySelector('.js-task-count').textContent = `task count ${taskCount}`;
});


// type Animal = {
//   id: number;
//   name: string;
// }

// const allAnimalsWrapper = document.querySelector('.js-all-animals');
// const allAnimalsPreEl = allAnimalsWrapper.querySelector('pre');

// axios.get<Animal[]>('http://localhost:3004/animals').then(({ data }) => {
//   allAnimalsPreEl.innerHTML = JSON.stringify(data);
// });

// const addAnimalsWrapper = document.querySelector('.js-add-animal');
// const addAnimalsButton = addAnimalsWrapper.querySelector('button');
// const addAnimalsPre = addAnimalsWrapper.querySelector('pre');

// addAnimalsButton.addEventListener('click', () => {
//   axios.post<Animal>('http://localhost:3004/animals', {
//     name: 'Elephantos',
//   }).then(({ data }) => {
//     addAnimalsPre.innerHTML = JSON.stringify(data);
//   });
// });

// const editAnimalsWrapper = document.querySelector('.js-edit-animal');
// const editAnimalsButton = editAnimalsWrapper.querySelector('button');
// const editAnimalsPre = editAnimalsWrapper.querySelector('pre');

// editAnimalsButton.addEventListener('click', () => {
//   axios.put<Animal>('http://localhost:3004/animals/3', {
//     name: 'Elephant',
//   }).then(({ data }) => {
//     editAnimalsPre.innerHTML = JSON.stringify(data);
//   });
// });

// const deleteAnimalsWrapper = document.querySelector('.js-delete-animal');
// const deleteAnimalsButton = deleteAnimalsWrapper.querySelector('button');
// const deleteAnimalsPre = deleteAnimalsWrapper.querySelector('pre');

// deleteAnimalsButton.addEventListener('click', () => {
//   axios.delete<Animal>('http://localhost:3004/animals/3').then(({ data }) => {
//     deleteAnimalsPre.innerHTML = JSON.stringify(data);
//   });
// });
