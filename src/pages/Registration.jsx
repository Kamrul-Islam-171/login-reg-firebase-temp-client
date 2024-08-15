

import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { FaEyeSlash } from "react-icons/fa";


import { useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";



const Registration = () => {
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();


    const { user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        logOut,
        updateUserProfile, } = useContext(AuthContext);
    // console.log(CreateUser)



    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
        // mode: "onChange"
    })

    const onSubmit = (data) => {
        const name = data.name;
        const email = data.email;
        const photoUrl = data.photoUrl;
        const password = data.password;

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                updateUserProfile(name, photoUrl)
                    .then(() => {
                        // await axios.put(`${import.meta.env.API_URL}/user`, {name, email, photoUrl});



                        //logout
                        logOut()
                            .then(() => {
                                console.log('logout')
                            })
                            .catch(error => console.log(error))
                        toast.success('User Registration successful')
                        navigate('/login')

                    })
                    .catch(error => {
                        console.log(error)
                        toast.error('Somethig went wrong. Please try again')
                    })

            })
            .catch(error => {
                console.log(error)
                toast.error('Somethig went wrong. Please try again')
            })
    }

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {

                toast.success('Successfully logged in')


                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: result?.user?.email }, { withCredentials: true })
                    .then(data => {
                        console.log(data.data)
                        navigate(location?.state ? location.state : '/');
                    })

                navigate(location?.state ? location.state : '/');
            })
            .catch(error => console.log(error))
    }
    return (
        <>
            <div className=" h-[100px]">
                {/* <img className="h-full w-full" src={'https://i.ibb.co/FhphGXG/360-F-303123713-D396-PWXk-VS4p-LX9uc-Yws-Ra8-X3yby-MJFP.jpg'} alt="" /> */}
            </div>
            <div>
                <Helmet>
                    <title>Register</title>
                </Helmet>


                <div className="flex justify-center items-center mt-12 mb-24">
                    <div data-aos='fade-right' data-aos-duration='1000' className="w-full max-w-md p-8 space-y-3 rounded-xl border-primary-color border text-gray-700">
                        <h1 className="text-2xl font-bold text-center text-primary-color">Register Now</h1>
                        <form noValidate="" className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="username" className="block text-gray-700">Your Name</label>
                                <input type="text" {...register('name', { required: true })} placeholder="Name" className="border border-primary-color w-full px-4 py-3 rounded-md border-gray-700  focus:border-violet-400" />
                                {errors?.name?.types?.required && <p className="text-red-500">This field is required</p>}
                            </div>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="email" className="block text-gray-700">Your Email</label>
                                <input type="email" {...register("email", { required: true })} placeholder="Email" className="border border-primary-color w-full px-4 py-3 rounded-md border-gray-700  focus:border-violet-400" />
                                {errors?.email?.types?.required && <p className="text-red-500">This field is required</p>}

                            </div>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="photoUrl" className="block text-gray-700">Your Photo URL</label>
                                <input type="text" {...register("photoUrl", { required: true })} placeholder="URL" className="border border-primary-color w-full px-4 py-3 rounded-md border-gray-700  focus:border-violet-400" />
                                {errors?.photoUrl?.types?.required && <p className="text-red-500">This field is required</p>}

                            </div>
                            <div className="relative ">
                                <div className="space-y-1 text-sm " >
                                    <label htmlFor="password" className="block text-gray-700">Password</label>
                                    <div className="">
                                        <input type={showPass ? 'text' : 'password'} {...register("password", { required: { value: true, message: "This field is required" }, pattern: { value: /^(?=.*[A-Z])(?=.*[a-z])/, message: "At least one Uppercase and lowercase" }, minLength: { value: 6, message: "At least 6 character" } })} placeholder="Password" className="border border-primary-color w-full px-4 py-3 rounded-md border-gray-700  focus:border-violet-400" />
                                        <p className=" cursor-pointer absolute right-3 top-10 text-lg" onClick={() => setShowPass(!showPass)}><FaEyeSlash /></p>
                                    </div>
                                    {/* {errors?.password?.types?.required && <p className="text-red-500">This field is required</p>} */}
                                    {/* {errors?.password?.types?.pattern && <p className="text-red-500">Must have at least one Uppercase</p>} */}
                                    {errors?.password && <p className="text-red-500">{errors.password.message}</p>}
                                </div>
                                {/* <p className=" cursor-pointer absolute right-2 bottom-10" onClick={() => setShowPass(!showPass)}><FaEyeSlash /></p> */}
                            </div>
                            <button className="block w-full p-3 text-center rounded-sm  bg-primary-color text-gray-100 hover:bg-secondary-color">Register</button>
                        </form>

                        <div className="flex items-center pt-4 space-x-1">
                            <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                            <p className="px-3 text-sm text-gray-700">Registration with social accounts</p>
                            <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleGoogleLogin} aria-label="Log in with Google" className="p-3 rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                            </button>

                            
                        </div>


                        <p onClick={scrollToTop} className="text-xs text-center sm:px-6 text-black">Already have an account?
                            <Link to={'/login'} className="underline text-sm text-primary-color"> Login Now</Link>
                        </p>
                    </div>
                </div>


            </div>
        </>
    );
};

export default Registration;


