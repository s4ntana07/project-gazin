import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { Link } from "react-router-dom";

export default function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
       return <Navigate to='/login'/>
    }
    
    const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
        .then(({}) => {
           setUser(null)
           setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })
      }, [])

    return(
        <div id="defaultLayout">
         <div className="content">
            <header>
                <div>
                    <h3>
                    Project
                    </h3>
                </div>
                <div>
                    Olá, {user.name}
                    
                    <a href="#" onClick={onLogout} className="btn-logout"> Logout</a>
                    <Link className="link-users" to={'/users'}>Users</Link>
                    <Link className="link-home" to={'/home'}>Home</Link>
                    <Link className="link-home" to={'/addproduct'}>Adicionar Produto</Link>
                    <Link className="link-home" to={'/products'}>Listar Produtos</Link>
                </div>
            </header>
            <main>
            <Outlet />
            </main>
            </div>
        </div>
    )
}