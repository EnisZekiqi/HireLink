import { useState } from "react";



const Tabs = ({ }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError]=useState('')
    
    const submitForm = () => {
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            setError('Please fill up the forms')
        }
       else if (password.length <=6) {
            setError('the password needs to have at least 6 characters')
        } else {
            console.log("userform:",name,email,password)
        }
    }

    return (
        <div>
            <div style={{display:"flex",flexDirection:"column"}}>
                <label htmlFor="">Name</label>
               <input type="text" value={name}  onChange={(e)=>setName(e.target.value)}/>
                <label htmlFor="">Email</label>

                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="">Password</label>

                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button style={{ cursor: error.length > 0 ? 'not-allowed' : 'pointer' }} onClick={submitForm}>Submit</button>
                <p>{error}</p>
            </div>
        </div>
    );
};

export default Tabs;