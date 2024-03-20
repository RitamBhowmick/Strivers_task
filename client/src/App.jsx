import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormPage from "./components/FormPage.jsx";
import TablePage from "./components/TablePage.jsx";
import axios from "axios";

function App() {
  const [snippets, setSnippets] = useState([]);
  axios.defaults.withCredentials = true;

  return (
    <div>
      <BrowserRouter>
    <Routes>
      <Route element={<FormPage/>} path='/'></Route>
      <Route element={<TablePage />} value={snippets} path='/snippets'/>
    </Routes>
   </BrowserRouter>
    </div>
  )
}

export default App
