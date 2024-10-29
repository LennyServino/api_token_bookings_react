import React from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    //metodo para validar el usuario
    const loginForm = async (data) => {
        //console.log(data);

        const response = await login(data);
        //validando la respuesta del login
        if(response?.token) {
            //si esta autorizado guardamos el token en el sessionStorage
            sessionStorage.setItem('token_bookings', response.token)
        }
        
        //validar que si existe el token
        if(sessionStorage.getItem('token_bookings')) {
            navigate('/reserva')
        }

        console.log(response);
        
    }

    return (
        <div>
            <h1>Iniciar Sesion</h1>
            <form action="" onSubmit={handleSubmit(loginForm)}>
                <div>
                    <label htmlFor="">Correo</label>
                    <input type="email" {...register('email')}/>
                </div>
                <div>
                    <label htmlFor="">Contraseña</label>
                    <input type="password" {...register('password')} />
                </div>
                <div>
                    <button type="submit">Iniciar Sesion</button>
                </div>
            </form>
        </div>
    )
}
