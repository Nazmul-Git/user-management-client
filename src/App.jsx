
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [users, setUser]=useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUser(data))
  },[])
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    const form = e.target;
    const name= form.name.value;
    const email=form.email.value;
    const pass=form.password.value;
    console.log(name,email,pass);

    const user={name,email,pass};
    console.log(user);

    fetch('http://localhost:5000/users',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      const newUser=[...users,data];
      setUser(newUser);
      form.reset();
    })
  }

  return (
    <>
     <h1>User Management System</h1>
     {
      users.length
     }
     <form onSubmit={handleSubmit}>
       <input type="text" name='name' placeholder='name' />
       <br />
       <input type="email" name='email' placeholder='email' />
       <br />
       <input type="password" name='password'  placeholder='password'/>
       <br />
       <input type="submit" value="Submit" />
     </form>

     {
      users.map(u=><p key={u.id}> Username : {u.name} email : {u.email}</p>)
     }
    </>
  )
}

export default App
