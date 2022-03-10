
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./todo/todo";
import Login from "./userdetails/login";
import SignIN from "./userdetails/sign";


function App() {







  
  return (

    <>
      
      {/* <Todo/> */}
      {/* <SignIN/> */}
      {/* <Login/> */}

      <BrowserRouter>

      <Routes>

      <Route path="/" element={<SignIN/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/todo" element={<Todo/>} />
      </Routes>
      </BrowserRouter>




    </>

  );
}

export default App;
