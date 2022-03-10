import { firebase, db } from "../config/firebase"
import { addDoc, collection, deleteDoc, deleteField, doc, Firestore, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore"
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import IconImg from "../images/todoicon.webp"
import "../todo.css"
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";






const Todo = () => {




    let [inputval, setinputval] = useState("")
    let [refresh, setrefresh] = useState(false)
    let localId = localStorage.getItem("user")
    let [loginUser, setLoginUser] = useState()
    let navigate = useNavigate()


    const AddData = () => {


        let collectionRef = collection(db, "todos")
        let data = { nam: inputval }
        addDoc(collectionRef, data)


        setinputval("")
        setrefresh(true)
    }
    let todo = []
    let [todoitem, settodoitem] = useState()

    useEffect(async () => {


        if(!localId){
            navigate("/login")
        }
        let userCoollec = collection(db, "user")

        let userData = getDocs(userCoollec)
            ; (await userData).forEach((doc) => {
                if (localId === doc.data().uid) {
                    setLoginUser(doc.data())
                    console.log(doc.data());
                }

            })

            


    }, [])

    useEffect(async () => {
        await onSnapshot(collection(db, "todos"), (sanpshot) => {
            todo = []
            sanpshot.docs.forEach((doc) => {

                todo.push({ todo: doc.data(), key: doc.id })


            })


            console.log(todoitem);
            settodoitem(todo)


        })

        setrefresh(false)


    }, [refresh])


    const deleteField = async (key) => {

        let docdel = doc(db, "todos", key)
        await deleteDoc(docdel)

        setrefresh(true)




    }

    const EditItem = (key) => {
        console.log(key);
        let userItme = prompt("Enter Item")

        let UpdataObj = {
            nam: userItme
        }
        try {
            updateDoc(doc(db, "todos", key), UpdataObj)
        }
        catch (err) {
            console.log(err);

        }


    }

    const logout = () => {

        localStorage.removeItem("user")
        navigate("/login")

    }



    return (
        <>

            <div className="todoMain">


                <div className="dashbooard">
                    <div className="todoicon">
                        <img src={IconImg} width="100px" alt="" />
                        <div className="conten">
                            <h1>Lots of work to do?</h1>
                            <h5>lets make a list</h5>
                        </div>
                    </div>

                    {!loginUser ? (

                        <div className="todouserdetails">

                            <h1>Loading....</h1>
                        </div>


                    ) :
                        (

                            <div className="todouserdetails">

                                <h1>Welcome! {loginUser.frstName} </h1>

                                <p>{loginUser.Email}</p>
                                <button className="logout" onClick={logout} >Logout</button>
                            </div>

                        )
                    }


                </div>


                <div className="contaier">
                    <div className="main">

                        <input className="textinput" value={inputval} id="myinput" type="text" onChange={(e) => setinputval(e.target.value)} placeholder="Enter Text" />
                        <div className="btn">
                            <button className="btn1" onClick={AddData} >+</button>
                            <button className="btn2"  ><RiDeleteBin6Line /></button>
                        </div>
                    </div>
                </div>

                <div className="not-main" id="animation">
                    <ul id="Second-main">



                        {
                            !todoitem ?
                                (


                                    <div id="ulinput" className="animate__animated animate__fadeInDown " >
                                        <li id="li2"  >Looding.........</li>


                                    </div>


                                ) :

                                todoitem.map((e, i) => {


                                    return (


                                        <div key={i} id="ulinput" className="animate__animated animate__fadeInDown " >
                                            <li id="li2"  >{e.todo.nam}</li>

                                            <div className="btnContainer" >
                                                <button className="delbtn" onClick={() => deleteField(e.key
                                                )}  ><TiDelete /></button>
                                                <button className="editbtn" onClick={() => EditItem(e.key
                                                )} ><RiEdit2Fill /></button>

                                            </div>
                                        </div>


                                    )

                                })

                        }





                    </ul>

                </div>
            </div>
        </>
    )

}

// const TodoLi = () => {

//     let todo = []
//     let [todoitem, settodoitem] = useState([])

//     useEffect(async () => {
//         await onSnapshot(collection(db, "todos"), (sanpshot) => {
//             sanpshot.docs.forEach((doc) => {

//                 todo.push({ todo: doc.data(), key: doc.id })


//             })

//             settodoitem(todo)


//         })
//     }, [refresh])

//     return (
//         <div className="not-main" id="animation">
//             <ul id="Second-main">



//                 {

//                     todoitem.map((e, i) => {
//                         console.log(e.todo.nam);

//                         return (

//                             <div key={i} id="ulinput" className="animate__animated animate__fadeInDown " >
//                                 <li id="li2"  >{e.todo.nam}</li>

//                                 <div className="btnContainer" >
//                                     <button className="delbtn"  ><TiDelete /></button>
//                                     <button className="editbtn" ><RiEdit2Fill /></button>

//                                 </div>
//                             </div>


//                         )

//                     })

//                 }





//             </ul>

//         </div>
//     )
// }

export default Todo