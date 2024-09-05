import { useParams, useNavigate } from "react-router-dom";
import { createTodoApi, retrieveTodo } from "./api/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateTodoApi } from "./api/TodoApiService";
import moment from "moment";
export function TodoComponent()
{
    const {id} = useParams();
    const authContext = useAuth();
    const username = authContext.username;
    useEffect(()=>retrieveTodos(), [id]);
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const navigate = useNavigate();
    function retrieveTodos()
    {
        if(id != -1)
        {
            retrieveTodo(username, id)
        .then(response =>
            {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
        .catch(error=> console.log(error))
        }  
    }
    function validate(values)
    {
        let errors = {}
        if(values.description.length < 6)
        {
            errors.description ="enter atleast 5 letters";
        }
        if(!moment(values.targetDate).isValid())
        {
            errors.targetDate ="Enter a correct target date";
        }
        return errors;
    }
    function onSubmit(values)
    {
        const todo = {
            id:id, 
            username:username, 
            description:values.description, 
            targetDate:values.targetDate, 
            done:false
        }
        if( id == -1)
        {
            createTodoApi(username, todo)
            .then( response => navigate('/list-todos'))
            .catch(error => console.log(error));
        }
        else
        {
            updateTodoApi(username, id, todo)
            .then(response=>
            {
                navigate('/list-todos');
            })
            .catch(error=> console.log(error))
        }
    }
    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description, targetDate}} 
                enableReinitialize={true} onSubmit={onSubmit} validate={validate}
                validateOnChange={false} validateOnBlur={false}>
                {
                    (props)=>
                    (
                        <Form>
                            <ErrorMessage 
                            name="description"
                            component="div"
                            className="alert alert-warning"
                            />
                            <ErrorMessage 
                            name="targetDate"
                            component="div"
                            className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Description:</label>
                                <Field type="text" className="form-control" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button style={{marginTop:'10px'}}className="btn btn-success" 
                                type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>
    )
}