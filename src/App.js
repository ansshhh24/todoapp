import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Todos from './components/Todos';
import dayjs from 'dayjs';

function App() {
    // Retrieve tasks from local storage or use default tasks if none are found
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const defaultTasks = [
        {
            _id: 1,
            title: 'task first one',
            status: false,
            deadline: dayjs('2020-09-18T11:23:25').toDate(), // Convert to Date object
        },
        {
            _id: 2,
            title: 'make this project',
            status: true,
            deadline: dayjs('2012-11-18T10:12:04').toDate(), // Convert to Date object
        },
        {
            _id: 3,
            title: 'something',
            status: false,
            deadline: dayjs('2023-11-18T17:10:32').toDate(), // Convert to Date object
        },
    ];
    const initialTasks = storedTasks || defaultTasks;

    const [listTasks, setListTasks] = useState(initialTasks);
    const [showListTasks, setShowListTasks] = useState([]);
    const [modeSort, setModeSort] = useState('All');

    // Update local storage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(listTasks));
    }, [listTasks]);

    const handleSubmit = (task) => {
        setListTasks([
            ...listTasks,
            {
                ...task,
            }
        ]);
    }

    const handleDelete = (_id) => {
        setListTasks(
            listTasks.filter( t => t._id !==  _id)
        )
    }

    const handleCheck = (task) => {
        setListTasks(
            listTasks.map( t => {
                if (t._id === task._id) {
                    let checkedTask = {
                        ...task,
                        status: !task.status,
                    }
                    return checkedTask;
                } else {
                    return t;
                }
            })
        );
    }

    const handleEdit = (task) => {
        setListTasks(
            listTasks.map( t => {
                if ( t._id === task._id) {
                    return task;
                } else {
                    return t;
                }
            })
        )
    }

    const handleSortList = (mode) => {
        setModeSort(mode);
    }

    useEffect(() => {
        if( modeSort === 'All') {
            setShowListTasks(
                listTasks
            )
        } else if ( modeSort === 'Incomplete') {
            let sortedListTasks = listTasks.filter( t =>  !t.status  );
            setShowListTasks(
                sortedListTasks
            )
        } else {
            let sortedListTasks = listTasks.filter( t => t.status  );
            setShowListTasks(
                sortedListTasks
            )
        }
    },[listTasks, modeSort])

    return (
        <div className="flex flex-col items-center w-full h-full bg-white my-10 gap-6">
            <h1 className="text-4xl font-bold uppercase text-gray-600">ToDo List</h1>
            <Header 
                handleSubmit={handleSubmit}
                sortHandler={handleSortList}
             />
            <Todos 
                tasks={showListTasks}
                checkHandler={handleCheck}
                deleteHandler={handleDelete}
                editeHandler={handleEdit}  />
        </div>
    );
}

export default App;
