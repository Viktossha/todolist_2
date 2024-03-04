import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

export type TaskType = {
    id: string
    taskTitle: string
    isDone: boolean
}
function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), taskTitle: "html", isDone: true},
        {id: v1(), taskTitle: "css", isDone: true},
        {id: v1(), taskTitle: "js", isDone: false},
        {id: v1(), taskTitle: "react", isDone: false},
    ])

    const removeTask = (taskId: string) => {
        const nextState: Array<TaskType> = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }

    const addTask = (taskTitle: string) => {
        const newTask: TaskType = {id: v1(), taskTitle, isDone: false}
        setTasks([...tasks, newTask])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const nextState: Array<TaskType> =  tasks.map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks(nextState)
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    // const tasksForTodoList: Array<TaskType> = filter === 'active'
    //     ? tasks.filter(t => !t.isDone)
    //     : filter === "completed"
    //         ? tasks.filter(t => t.isDone)
    //         : tasks

    const getFilteredTasks = (allTasks: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return  allTasks.filter(t => !t.isDone)
            case "completed":
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks
        }
    }

    const tasksForTodoList: Array<TaskType> = getFilteredTasks(tasks, filter)
    const tasksForHideMode: Array<TaskType> = getFilteredTasks(tasks, "active")

    return (
        <div className="App">
            <TodoList title="What to learn" tasks={tasksForTodoList} tasksForHideMode={tasksForHideMode} removeTask={removeTask} changeTodoListFilter={changeTodoListFilter} addTask={addTask} changeTaskStatus={changeTaskStatus} filter={filter}/>
        </div>
    );
}

export default App;
