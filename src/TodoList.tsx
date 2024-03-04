import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taksId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}
export const TodoList: React.FC<TodoListPropsType> = (
    {
        title,
        tasks,
        removeTask,
        changeTodoListFilter,
        addTask,
        changeTaskStatus,
        filter
    }) => {
    //const title = props.title
    //const {title} = props деструктр.присваивание

    const [taskTitle, setTaskTitle] = useState("")

    const addNewTaskTitleHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
    }

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTaskTitleHandler()

    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeTodoListFilter(filter)
    }

    const tasksItems: JSX.Element = tasks.length !== 0
        ?
        <ul>
            {tasks.map(t => {
                const removeTaskHandler = () => removeTask(t.id)
                const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {changeTaskStatus(t.id, e.currentTarget.checked)}

                return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                    <span className={t.isDone ? 'task-done' : 'task'}>{t.taskTitle}</span>
                    <Button btnTitle="x" onClickHandler={removeTaskHandler}/>
                </li>
            })}
        </ul>
        : <span>Давай, до свидания!</span>

    return (
        <div className="todolist"> {/*React.createElement()*/}
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={setTaskTitleHandler} onKeyDown={addTaskOnKeyDownHandler}/>
                <Button btnTitle="+" isDisabled={!taskTitle} onClickHandler={addNewTaskTitleHandler}/>
                {taskTitle.length > 15 && <div style={{color: 'red'}}> Не больше 15 символов</div>}
            </div>
            {tasksItems}
            <div className={'btns-filter-block'}>
                <Button classes={filter === 'all' ? 'btn-filter-active' : ''} btnTitle="All" onClickHandler={changeFilterHandlerCreator('all')}/>
                <Button classes={filter === 'active' ? 'btn-filter-active' : ''} btnTitle="Active" onClickHandler={changeFilterHandlerCreator('active')}/>
                <Button classes={filter === 'completed' ? 'btn-filter-active' : ''} btnTitle="Completed" onClickHandler={changeFilterHandlerCreator('completed')}/>
            </div>
        </div>
    );
};