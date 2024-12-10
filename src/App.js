import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header/Header';
import Todo from './Pages/Todo/Todo';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';


function App() {


    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/todo" element={<Todo />} />
            </Routes>

        </div>
    );
}

export default App;
