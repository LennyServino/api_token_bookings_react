import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';

//importando icons
import { FaSignInAlt, FaKey, FaLock, FaEnvelope, FaQuestionCircle  } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";

const schema = yup.object().shape({
    email: yup.string().required("El correo es obligatorio").email("Correo Invalido, ejemplo: usuario@dominio.com"),
    password: yup.string().required("Campo Obligatorio").min(8, "La contraseña debe contener al menos 8 caracteres")
})

export default function Login() {
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = React.useState(false)

    //metodo para validar el usuario
    const loginForm = async (data) => {
        //console.log(data);
        setIsLoading(true)

        const response = await login(data);

        try {
            //validando la respuesta del login
            if(response?.token) {
                //si esta autorizado guardamos el token en el sessionStorage
                sessionStorage.setItem('token_bookings', response.token)
                sessionStorage.setItem('user_email_bookings', response.user)
                localStorage.setItem('user_email_bookings', response.user)
            } else {
                throw new Error("Usuario o contraseña incorrectos")
            }
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Usuario o contraseña incorrectos"
            });
            console.log("este es un error");
            
        } finally {
            setIsLoading(false)
        }
        
        console.log(response);

        if(sessionStorage.getItem('token_bookings')) {
            setIsLoading(false)
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
                            <input type="email" {...register('email', {required: true})} placeholder='correo@ejemplo.com' />
                        </div>
                        <p className={styles.error_message}>
                            {errors.email && errors.email.message}
                        </p>
                    </div>
                    <div className={styles.input_box}>
                        <div className={styles.password_box}>
                            <label htmlFor="">Contraseña</label>
                            <span><FaKey /> ¿Olvidaste tu contraseña?</span>
                        </div>
                        <div className={styles.input_container}>
                            <FaLock className={styles.input_icon} />
                            <input type="password" {...register('password', {required: true})} placeholder='••••••••' />
                        </div>
                        <p className={`${styles.error_message}`}>
                            {errors.password && errors.password.message}
                        </p>
                    </div>
                    <div className={styles.checkbox_container}>
                        <input type="checkbox" id='holdSession' />
                        <label htmlFor="holdSession">Mantener la sesión iniciada</label>
                    </div>
                    <div className={styles.btn_box}>
                        <button type="submit">
                            {
                                isLoading ? <span className={styles.spinner}></span> : 
                                <span>
                                    <FaSignInAlt /> Iniciar Sesion
                                </span>
                            }
                        </button>
                    </div>
                </form>
                <div className={styles.help_box}>
                    <p>
                        <FaQuestionCircle /> ¿Necesitas ayuda?
                    </p>
                    <span>Contacta soporte</span>
                </div>
            </div>
        </div>
    )
}
