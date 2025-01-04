import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        roll: ""
    })

    const loadData = async () => {
        fetch(`http://localhost:8080/read/${id}`)
        .then(res => res.json())
        .then(data => setValues(data[0]))
        .catch(err => console.log(err))
    }

    useEffect(()=> {
        loadData();
    },[])

    const handleUpdate = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(`http://localhost:8080/update/${id}`, values);
            toast.success("Student Info is Updated!")
            navigate("/")
            console.log(data);
        } catch(err){
            console.log(err);
            toast.error("Update Is not Work.")
        }
    }

    return (
        <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div
                className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div className="text-white relative px-4 py-10 bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">

                <div className="text-center pb-6">
                    <h1 className="text-3xl">Contact Us!</h1>

                    <p className="text-gray-300">
                        Fill up the form below to send us a message.
                    </p>
                </div>

                <form onSubmit={handleUpdate}>

                    <input
                        className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" value={values?.name} onChange={e => setValues({...values, name: e.target.value})} name="name" required />

                    <input
                        className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email" value={values?.email} onChange={e => setValues({...values, email: e.target.value})} name="email" required />

                    <input
                        className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number" value={values?.roll} onChange={e => setValues({...values, roll: e.target.value})} name="roll" required />

                    <div className="flex justify-center w-full">
                        <input
                            className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit" value="Send ➤" />
                    </div>

                </form>
            </div>
        </div>
    </div>
    );
};

export default Edit;