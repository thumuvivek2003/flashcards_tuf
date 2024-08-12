import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import FlashcardList from './components/FlashcardList';
import Dashboard from './components/Dashboard';
import './App.css';
function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Routes>
                    <Route path="/" element={<FlashcardList />} />
                    <Route path="/admin" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
