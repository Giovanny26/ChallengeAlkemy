import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import LoginService from "../../Service/loginService";
import Swal from 'sweetalert2'
import "./login.css"
const eye = <FontAwesomeIcon icon={faEye} />;

export default function Login(){
    const [token, setToken] =useState();
    const [email, setEmail] = useState('');
    const [isDisabled, setIsDisabled] = useState (false);
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
       
    };
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    const navigate = useNavigate();
    const loginService = new LoginService();
    const payload = {
        email: email,
        password: password,
    };
    const postAPI = () => {
        loginService.login(payload).then((response) => {
            if((response.status === 200) || (response.status === 201)){
                    setToken(response.data.token);                
                    window.localStorage.setItem('user-token' , token);  
                    Swal.close();
                    navigate("/")
            } else {  
                Swal.fire({
                    icon: 'error',
                    title: 'Lamentablemente no ha podido iniciar sesión',
                    text: 'Por favor intente más tarde',
                  })
                }
               })
    };
    useEffect(()=>{ 
        if (token != null){
            window.localStorage.setItem( 'user-token', JSON.stringify({ token : token }) )
        }
    }, [token]); 
    const validar = (e) => {
        e.preventDefault();
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese un usuario y/o contraseña validos',
                text: 'Por favor vuelva a intentarlo',
            });
        }else if(email !== "challenge@alkemy.org" && password !== "react"){
            Swal.fire({
                icon: 'error',
                title: 'Comprueba que el correo y la contraseña sean correctos.',
                text: 'Por favor vuelva a intentarlo',
            });
        }else{
            postAPI();
            setIsDisabled(true);
            Toast.fire({
                icon: 'info',
                title: 'Cargando...'
            })
        };
};
    return (
    <div className="container">
        <div className="sectionForm">
            <form className="loginForm">
                <div className="email">
                    <label className="tittleEmail">Correo Electronico</label>
                    <input 
                        type = "email" 
                        className="emailInput" 
                        name="email" value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required>
                    </input>
                </div>
                <div className="password">
                    <label className="tittlePassword">Contraseña</label>
                    <div className="passwordWraper">
                        <input
                            type={passwordShown ? "text" : "password"}
                            className="passwordInput"
                            name="password"
                            id="pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            >
                        </input>
                        <i className="icon" 
                        onClick={togglePasswordVisiblity} 
                        style={ passwordShown ? {color:"#FFA600"}: {color:"#000000" }}>{eye}
                        </i>
                    </div>
                </div>
                <div className="buttonForm">
                    <button type="submit" className="btnLogin" onClick={validar} disabled={isDisabled}><p>Ingresar</p></button>
                </div>
            </form>    
        </div>
    </div>
        
    );
}