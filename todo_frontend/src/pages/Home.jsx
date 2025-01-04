import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
    const [studentData, setStudentData] = useState([]);

    const loadData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/loadStudent`);
            setStudentData(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    // delete ==============================
    const handleDelete = async (id) => {
        try{
            const {data} = await axios.delete(`http://localhost:8080/delete/${id}`);
            console.log(data);
            location.reload();
        } catch(err){
            console.log(err);
            toast.error("Delete Not working ")
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto pt-10">
            <div className="breadcrumbs h-[70px] text-sm bg-gray-800 backdrop-blur-lg  py-5 sticky top-0 shadow-bottom-shadow z-40 border border-gray-600 hover:bg-slate-700">
                <ul className="px-5 w-full mx-auto text-center">
                    <Link to={"/addStudent"}>
                        <li className="text-lg font-bold text-cyan-600 flex items-center justify-center gap-2 hover:text-cyan-400"><FaPlusSquare /> Add New Student</li>
                    </Link>
                </ul>

            </div>
            <div className=" w-full mx-auto text-center my-5 mb-10">
                <h3 className="text-2xl font-bold mb-3" >
                    University Student Info All
                </h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sunt temporibus impedit tenetur cum similique?</p>
            </div>

            <div className=" overflow-x-auto my-5">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-lg">
                    <thead className="bg-gradient-to-r from-cyan-600 to-purple-500 text-white">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                Roll
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-center"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white  divide-y divide-gray-200 space-y-10">

                        {
                            studentData?.map(( student, index) => (
                                <tr key={index}
                                    className=" hover:shadow-xl hover:scale-95 hover:bg-cyan-50 transform transition-all duration-300"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {student?.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {student?.roll}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {student?.email}
                                    </td>
                                    <td className="px-6 py-4  whitespace-nowrap text-sm font-medium text-center border">
                                        <button className="text-cyan-400 hover:text-cyan-600 font-bold pr-6">
                                            <Link to={`/edit/${student?.id}`}>Edit</Link>
                                        </button>
                                        <button className="text-cyan-400 hover:text-cyan-600 font-bold pr-6">

                                            <Link to={`/studentDetails/${student?.id}`}>Details</Link>
                                        </button>
                                        <button 
                                        onClick={()=> handleDelete(student.id)}
                                        className="text-red-600 hover:text-red-800 font-bold ">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;