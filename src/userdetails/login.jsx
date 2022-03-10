import { Button, Grid, TextField } from "@mui/material"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import Loader from "./loader"



const Login = () => {


    let [Email, setEmial] = useState("")
    let [password, setPassword] = useState("") 
    let localuser = localStorage.getItem("user")

    let [loading, setLoding] = useState(false)
    let Navigate = useNavigate()

    const loginIN = () => {
        setLoding(true)

        let Details = {

            Email,
            password

        }
        signInWithEmailAndPassword(auth, Email, password)
            .then((user) => {
                console.log(user);
                setLoding(false)
                localStorage.setItem("user", user.user.uid)

                alert("Login")
                
                Navigate("/todo")

            })
            .catch((err) => {
                setLoding(false)

                alert("Error!")

            })

            setEmial("")
            setPassword("")

    }

    return (
        <>
            <div className="mainSigup">

                <div className="formContainer">

                    <h1>Login</h1>


                    <Grid m={2} item>
                        <TextField required value={Email} onChange={(e) => setEmial(e.target.value)} type="email" placeholder="Enter Email" fullWidth id="outlined-basic" label="Email" variant="outlined" />
                    </Grid>

                    <Grid m={2} item>
                        <TextField required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Passoword" fullWidth id="outlined-basic" label="Password" variant="outlined" />
                    </Grid>
                    <Grid m={3} item>

                        <Button onClick={loginIN} variant="contained" color="primary" fullWidth>{loading ? <Loader /> : `Login`}</Button>
                    </Grid>

                    <div className="havno">
                        <a href="" onClick={() => Navigate("/")}>Don't have an account? Sign Up   </a>
                    </div>



                </div>

            </div>
        </>
    )

}
export default Login