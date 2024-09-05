import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './TodoApp.css';
import LogoutComponent from './LogoutComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import LoginComponent from './LoginComponent';
import WelcomeComponent from './WelcomeComponent';
import ErrorComponent from './ErrorComponent';
import AuthProvider, { useAuth } from '../security/AuthContext';
import { TodoComponent } from './TodoComponent';
export default function TodoApp()
{
    function AuthenticatedRoute({children})
    {
        const authContext = useAuth();
        if(authContext.isAuthenticated)
        {
            return children;
        }
        return <Navigate to='/' />

    }
    return(
        <div>
            <AuthProvider>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path='/' element={<LoginComponent />} />
                    <Route path='/login' element={<LoginComponent />} />
                    <Route path='/welcome/:username' element={
                        <AuthenticatedRoute>
                            <WelcomeComponent />
                            </AuthenticatedRoute>
                        } />
                    <Route path='/list-todos' element={
                        <AuthenticatedRoute>
                            <ListTodosComponent/>
                            </AuthenticatedRoute>
                        } />
                    <Route path='/todo/:id' element={
                        <AuthenticatedRoute>
                            <TodoComponent/>
                            </AuthenticatedRoute>
                        } />
                    <Route path='/logout' element={
                        <AuthenticatedRoute>
                        <LogoutComponent />
                        </AuthenticatedRoute>
                    } /> 
                    <Route path='*' element={<ErrorComponent />} />
                    
                </Routes>
            </BrowserRouter> 
            </AuthProvider>
                       
        </div>
    )
}



