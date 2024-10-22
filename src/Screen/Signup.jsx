import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [field, setField] = useState('');
    const [speciality, setSpeciality] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState();
    const [qualifications,setQualifications]=useState()
    const [error, setError] = useState('');
    const[work,setWork]=useState()
    const[languages,setLanguages]=useState()
    const[phone,setPhone]=useState()
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of hospitals from the backend
        const getHospitals= async()=>{
            await fetch('http://localhost:8000/getHospitals')
            .then(res=>res.json())
            .then(data=>setHospitals(data))
            .catch(err=>console.log("internal Error Occured",err))
          }
        getHospitals()
        const getSpecialities= async()=>{
            await fetch('http://localhost:8000/getSpecialities')
            .then(res=>res.json())
            .then(data=>setSpeciality(data))
            .catch(err=>console.log("internal Error Occured",err))
          }
        getSpecialities();
    }, []);

    

    const userdata={ name:name, 
        email:email, 
        phone:phone, 
        password:password
       
    }


    const submitSignup = async (e) => {
        e.preventDefault()

           

        
    
      
       
    };

    return (
        <>
        <div className='fixed bg-neutral-200  top-0 left-0 w-full'></div>
            <div className=' w-full px-4 py-4 z-50'>
                <div className='max-w-[450px] my-10  mx-auto bg-gray-900 text-white rounded-lg'>
                    <div className='max-w-[320px] mx-auto py-8'>
                        <h1 className='text-3xl font-bold flex justify-center my-1'>Sign Up</h1>
                        {error && <p className='bg-red-900 text-white p-3 rounded'>{(error.message).slice(9)}</p>}
                        <form className='w-full flex flex-col py-4' onSubmit={submitSignup}>
                            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
                            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Confirm password' value={cpassword} onChange={(e) => setCPassword(e.target.value)} type='password' />
                            <input className='bg-gray-600 py-2 my-2 px-2' placeholder='Enter Phone' onChange={(e) => setPhone(e.target.value)} />               
                            <button className='bg-blue-500 hover:bg-blue-600 transition-all duration-500  py-4 my-4 text-lg rounded'>Sign up</button>
                            <div className='flex justify-between'>
                                <p className='flex items-center'>
                                    <input type='checkbox' className='mr-2' />
                                    <p className='text-sm'>Remember me</p>
                                </p>
                                <p className='text-sm'>Need Help?</p>
                            </div>
                            <p className='text-md my-10 mx-8'><span className='text-gray-600 mx-2'>Already have an account?</span><Link to='/login'>Log in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;