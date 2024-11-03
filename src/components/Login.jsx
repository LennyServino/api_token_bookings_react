import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css'

//importando icons
import { FaSignInAlt, FaKey, FaLock, FaEnvelope  } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";

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
        
        console.log(response);

        if(sessionStorage.getItem('token_bookings')) {
            navigate('/alojamientos')
        }
    }

    return (
        <div className={styles.login_overlay}>
            <div className={styles.login_content}>
                <h1><FaSignInAlt /> Iniciar Sesion</h1>
                <p><IoInformationCircle /> Ingresa tus credenciales para acceder al sistema</p>
                <form action="" onSubmit={handleSubmit(loginForm)}>
                    <div className={styles.input_box}>
                        <label htmlFor="">Correo</label>
                        <div className={styles.input_container}>
                            <FaEnvelope className={styles.input_icon} />
                            <input type="email" {...register('email')} placeholder='correo@ejemplo.com' />
                        </div>
                    </div>
                    <div className={styles.input_box}>
                        <div className={styles.password_box}>
                            <label htmlFor="">Contraseña</label>
                            <span><FaKey /> ¿Olvidaste tu contraseña?</span>
                        </div>
                        <div className={styles.input_container}>
                            <FaLock className={styles.input_icon} />
                            <input type="password" {...register('password')} placeholder='••••••••' />
                        </div>
                    </div>
                    <div className={styles.btn_box}>
                        <button type="submit"><FaSignInAlt /> Iniciar Sesion</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
