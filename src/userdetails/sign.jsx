import { async } from "@firebase/util"
import { Button, Grid, TextField } from "@mui/material"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../config/firebase"
import Loader from "./loader"
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection } from "firebase/firestore"


const SignIN = () => {

    let [frstName, setfrstName] = useState("")
    let [Email, setEmial] = useState("")
    let [number, setnumber] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    const SigninUP =  () => {
        setLoading(true)


        let Details = {
            frstName,
            Email,
            number,
            password

        }
        createUserWithEmailAndPassword(auth, Email, password)

            .then( async (user) => {
                let collectionRef = await collection(db, "user")
                let data = { ...Details, uid: user.user.uid }
                addDoc(collectionRef, data)
                console.log(data);
                setLoading(false)
                console.log(user.user.uid);

                alert(" successfully  sign up ")

                navigate("/login")


            })
            .catch((err) => {
                alert("Error!!")
                setLoading(false)

                console.log(err);

            })

        setEmial("")
        setfrstName("")
        setPassword("")
        setnumber("")



    }

    return (
        <>
            <div className="mainSigup">

                <div className="formContainer">

                    <h1>Sign UP</h1>
                    <Grid m={2} item>
                        <TextField value={frstName} required onChange={(e) => setfrstName(e.target.value)} type="text" placeholder="Enter First Name" fullWidth id="outlined-basic" label="First Name" variant="outlined" />
                    </Grid>

                    <Grid m={2} item>
                        <TextField required value={Email} onChange={(e) => setEmial(e.target.value)} type="email" placeholder="Enter Email" fullWidth id="outlined-basic" label="Email" variant="outlined" />
                    </Grid>
                    <Grid m={2} item>
                        <TextField required value={number} onChange={(e) => setnumber(e.target.value)} type="number" placeholder="Enter Number" fullWidth id="outlined-basic" label="Number" variant="outlined" />
                    </Grid>
                    <Grid m={2} item>
                        <TextField required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Passoword" fullWidth id="outlined-basic" label="Password" variant="outlined" />
                    </Grid>
                    <Grid m={3} item>

                        <Button onClick={SigninUP} variant="contained" color="primary" fullWidth>{loading ? <Loader /> : `Signup`}</Button>

                        <ToastContainer />
                    </Grid>


                    <div className="havno">
                        <a href="" onClick={() => navigate("/login")}>Have an account? Log in   </a>

                    </div>



                </div>

            </div>
        </>
    )

}
export default SignIN