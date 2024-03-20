import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TablePage() {
  const [infoFromDb, setinfoFromDb] = useState([]);
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("https://strivers-task-api.vercel.app/snippets")
    .then((e)=>{
            setinfoFromDb(e.data)
        })
     .catch((e)=>{
            console.log("error from TableData Page!!");
        })
        setReload(1)
        
    },[reload])

    const logout =  async () => {
      await axios.post('https://strivers-task-api.vercel.app/logout');
      navigate('/');
    }

    return (
        <div className='bg-red-50 h-screen'>
        <div className='flex items-center justify-center underline font-serif mx-auto gap-7'>
          <h2 className="text-2xl font-bold mt-8">
          Submitted Entries
          </h2><div className='items-center justify-center mt-8'>
          <button onClick={logout} className='border border-red-700 bg-red-500 text-white py-1 px-4 rounded-2xl hover:bg-transparent hover:text-red-700 font-semibold'>Logout</button>
          </div>
        </div>
            <table className="w-full mt-8">
      <thead>
        <tr className='bg-red-200 underline'>
          <th className="px-4 py-2">Username</th>
          <th className="px-4 py-2">Code Language</th>
          <th className="px-4 py-2">Stdin</th>
          <th className="px-4 py-2">Source Code</th>
          <th className="px-4 py-2">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {infoFromDb.map((item, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{item.username}</td>
            <td className="border px-4 py-2">{item.language}</td>
            <td className="border px-4 py-2">{item.stdin}</td>
            <td className="border px-4 py-2">{item.sourceCode.slice(0, 100)}{item.sourceCode.length > 100 ? '...' : ''}</td>
            <td className="border px-4 py-2">{item.timestamp}</td>
          </tr>
        ))}
      </tbody>
      
    </table>
        </div>
    );
}
