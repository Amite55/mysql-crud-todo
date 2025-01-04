import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const roll = form.roll.value;
        const email = form.email.value;
        const newStudent = { name, roll, email }
        // console.log(newStudent);

        try {
            const { data } = await axios.post('http://localhost:8080/newUser', newStudent);
            navigate("/")
            toast.success('New Student Added successfully')
            console.log(data);
        } catch (err) {
            console.log(err);
            toast.error('Something is Wrong!')
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

                    <form onSubmit={handleSubmit}>

                        <input
                            className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Name" name="name" required />

                        <input
                            className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email" placeholder="Email" name="email" required />

                        <input
                            className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number" placeholder="Enter Your Roll" name="roll" required />

                        <div className="flex justify-between">
                            <input
                                className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit" value="Send ➤" />
                            <input
                                className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="reset" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudent;