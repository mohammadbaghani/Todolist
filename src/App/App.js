import React, {useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import TodoList from '../Todolist/TodoList';
import './App.css';
import { useLocation } from "react-router-dom";
export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <div >
        <Routes>           
          <Route path='/' element={<TodoList />} />         
        </Routes>
      
      </div>
    </>
  )
}
