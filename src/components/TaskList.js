import { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import axios from 'axios';
import { URL } from "../App";
import loadingImg from "../assets/loader.gif";

//http://localhost:5000/api/tasks


const TaskList = () => {
    const [task, seTask] = useState([])
    const [completedtask, completedseTask] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [taskId, setTaskId] = useState(false)
    const [formData, setFormData] = useState({
        name:"",
        completed: false
    })
    const {name} = formData

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value }
        )
    };

    const getTasks = async () => {
        setisLoading(true)
        try {
            const {data} = await axios.get(`${URL}/api/tasks`);
            seTask(data);
            setisLoading(false);
        } catch (error) {
            toast.error(error.message);
            setisLoading(false);
        }
    }

    useEffect(()=> {
        getTasks();
    }, [])

    const createTask = async (e) => {
        e.preventDefault();
        if(name === ""){
            return toast.error("Input field cannot be empty");
        }
        try {
            await axios.post(`${URL}/api/tasks`, formData);
            toast.success("Task added successfully");
            setFormData({...formData, name:""});
            getTasks();
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${URL}/api/tasks/${id}`);
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        const cTask = task.filter((task) => {
            return task.completed === true;
        })
        completedseTask(cTask);
    }, [task])

    const getSingleTask = async (task) => {
        setFormData({name: task.name, completed: false});
        setTaskId(task._id);
        setIsEditing(true);
    };

    const updateTask = async (e) => {
        e.preventDefault();
        if (name === "") {
            return toast.error("Input field cannot be empty.");
        }
        try {
            await axios.put(`${URL}/api/tasks/${taskId}`, formData);
            setFormData({...formData, name: ""});
            setIsEditing(false);
            getTasks();
        } catch (error) {
            
        }
    };

    const setComplete = async (task) => {
        const newFromData = {
            name: task.name,
            completed: true,
        }
        try {
            await axios.put(`${URL}/api/tasks/${task._id}`, newFromData);
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    };

  return (
    <div>
        <h2>Task Manager</h2>
        <TaskForm 
         name={name} 
         handleInputChange={handleInputChange} 
         createTask={createTask}
         isEditing={isEditing}
         updateTask={updateTask}
        />
        {task.length > 0 && (
            <div className="--flex-between --pb">
            <p>
                <b>Tobal Tasks:</b> {task.length}
            </p>
            <p>
                <b>Completed Tasks:</b> {completedtask.length}
            </p>
            
        </div>
        )}
        <hr />
        {
            isLoading && (
                <dev className="--flex-center">
                    <img src={loadingImg}
                    alt="Loading" />
                </dev>
            )
        }
        {
            !isLoading && task.length === 0 ? (
                <p className="--py">No task added. Please add a task.</p>
            ) : (
                <>
                {task.map((task, index) => {
                    return (
                        <Task 
                            key={task._id} 
                            task={task} 
                            index={index}  
                            deleteTask={deleteTask} 
                            getSingleTask={getSingleTask}
                            setComplete={setComplete}
                        />
                    );
                })}
                </>
            )
        }
        <Task/>
    </div>
  )
};

export default TaskList;