import { useState, useEffect } from "react";

const Test = () => {

    const [toDo, setToDo] = useState([]) /// array of the todolist
    
    const submitToDo = () => {    /// function to sumbit the todolist 
        const newTask = {
            id: Math.floor(Math.random() * 1000) + 1,
            name: task,
            completed: complete
        }
        localStorage.setItem("newTask", JSON.stringify(newTask))
        setToDo([...toDo, newTask])
        setTask('')

    }

    const [task, setTask] = useState('')
    const[complete,setComplete]=useState(null)

    const deleteTask = (id) => {
        const updateTask = toDo.filter((todo) => todo.id !== id)
        setToDo(updateTask)
        localStorage.setItem("newTask",JSON.stringify(updateTask))
    }

    return ( 
        <div className="">
            {toDo.map((todo,index) => (
                <div style={{display:'flex'}} key={index}>
                    <p>{todo.id}</p>
                    <p>{todo.name}</p>
                    <p>{todo.completed}</p>
                    <button onClick={()=>deleteTask(todo.id)}>Remove</button>
                </div>
            ))}
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
            <input type="checkbox" value={complete} onChange={()=>setComplete(prev => !prev)} />
            <button onClick={submitToDo}>Submit</button>
        </div>
     );
}
 
export default Test;