import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FormPage(){
    const [username, setUsername] = useState('');
    const [language, setLanguage] = useState('C++');
    const [stdin, setStdin] = useState('');
    const [sourceCode, setSourceCode] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (ev) => {
      ev.preventDefault();
      try {
        await axios.post('https://strivers-task-api.vercel.app/submit', {
          username,
          language,
          stdin,
          sourceCode
        }, )
        .then((e) => { alert(e.data) })
        .catch(() => { console.log("can not register"); })
         navigate('/snippets')
      } catch (error) {
        console.error('Error submitting snippet:', error);
      }
    };

    return (
      <div className="container bg-blue-200 mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 ml-96 px-56">Code Snippet Submission</h1>
        <div className="flex bg-blue-50 h-screen container mx-auto px-4 py-8">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            </div>
        <div className="mb-4">
        <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">Preferred Code Language</label>
        <select
          id="language"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
        </select>
        </div>
        <div className="mb-4">
        <label htmlFor="stdin" className="block text-gray-700 text-sm font-bold mb-2">Standard Input (stdin)</label>
          <textarea
            id="stdin"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Enter standard input"
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            required>
          </textarea>
        </div>
        <div className="mb-4">
        <label htmlFor="sourceCode" className="block text-gray-700 text-sm font-bold mb-2">Source Code</label>
        <textarea
          id="sourceCode"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          placeholder="Enter your source code"
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
          required
        ></textarea>
        </div>
        <button
        type="submit"
        className="w-full bg-indigo-500 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
        Submit
        </button>
      </form>
      </div>
    </div>
    );
}
