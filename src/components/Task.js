import {FaCheckDouble,FaEdit, FaRegTrashAlt} from "react-icons/fa"

export const Task = ({task, index, deleteTask, getSingleTask, setComplete}) => {
    if (!task) {
        return null; // Ou affichez un message d'erreur approprié
      }
  return (
    <div className={task.completed ? "task completed" : "task"}>
        <p>
            <b>{index + 1}. </b>
            {task.name}
        </p>
    <div className="task-icons">
        <FaCheckDouble color="green"  onClick={() => setComplete(task)} />
        <FaEdit color="purple"  onClick={() => getSingleTask(task)}/>
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)}/>
    </div>
    </div>
  )
};


export default Task;
