import { useEffect, useState } from "react";
import { retriveAllTodoForUsername, deleteTodoById } from "./api/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";
export default function ListTodosComponent()
{
    const date = new Date();
    const authContext = useAuth();
    const username = authContext.username;
    const targetDate = new Date(date.getFullYear()+12, date.getMonth(), date.getDay());
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState()
    useEffect(()=> refreshTodos(), [])
    const navigate = useNavigate();
    function refreshTodos()
    {
        retriveAllTodoForUsername(username)
        .then(response=> {
            setTodos(response.data)
        })
        .catch(error=> console.log(error))
    }
    function deleteTodo(id)
    {
        deleteTodoById(username, id)
        .then(
            ()=>{
                refreshTodos();
                setMessage(`Deletion of todo with ${id} is successful`);
            }      
        )
        .catch(error => {console.log(error)})
    }
    function updateTodo(id)
    {
        console.log('update clicked');
        navigate(`/todo/${id}`)
    }
    function addNewTodo()
    {
        console.log('update clicked');
        navigate(`/todo/-1`)
    }
    return(
        <div className='container'>
        <div>
            <h1>Todos List</h1>
            {message && <div className="alert alert-warning ">{message}</div>}
            <table className='table'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Is Done?</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    todos.map((item) => (
                    <tr key={item.id}>
                        <td>{item.description}</td>
                        <td>{item.done.toString()}</td>
                        <td>{item.targetDate.toString()}</td>
                        <td><button className="btn btn-danger" 
                        onClick={()=>deleteTodo(item.id)}>Delete</button></td>
                        <td><button className="btn btn-success" 
                        onClick={()=>updateTodo(item.id)}>Update</button></td>
                    </tr>
                        ))}
                    
                </tbody>
            </table>
        </div>
        <button className="btn btn-success" onClick={addNewTodo}>Add New Todo</button>
        </div>
    )
}