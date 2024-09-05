import {Link, useParams} from 'react-router-dom';
import { useState } from 'react';
import { retrieveHelloWorldBean, helloWorldPathVariable } from './api/HelloWorldApiService';
export default function WelcomeComponent()
{
    const {username} = useParams();
    const [message, setMessage] = useState(null);
    function callHelloWorldRestAPI()
    {
        helloWorldPathVariable('vinodh')
        .then((response)=>{
            console.log(response);
            setMessage(response.data.message);
        })
        .catch((error)=>{console.log(error)})
        .finally(()=> console.log('cleanup'));

    }
    return(<div style={{textAlign:'center'}}>
       <h1> Welcome {username}</h1>
        <Link to='/list-todos'>Click Here</Link> to manage your todos.
        <div>
            <div className='text-info'>
                {message}
            </div>
        </div>
    </div>)
}