import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";





const Navbar = () => {

    const [defaultTheme, setDefaultTheme] = useState(localStorage.getItem("theme") ?? "light");

    console.log(defaultTheme)

    const { user, logOut } = useContext(AuthContext);
    // const [photo, setPhoto] = useState(null);
    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    const handleTheme = e => {
        if (e.target.checked) setDefaultTheme('dark');
        else setDefaultTheme('light')
    }


    useEffect(() => {


        localStorage.setItem('theme', defaultTheme)
        const localTheme = localStorage.getItem('theme')


        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [defaultTheme]);

    // console.log(theme)

    const handleLogout = () => {
        console.log('please logout');
        logOut()
            .then(() => {
                console.log('sign out successfully');
            })
            .catch(error => {
                console.log(error)
            })
    }

    // console.log(toggle)

    const navlinks = <>
        <NavLink className={({ isActive }) =>
            isActive ? "  font-medium border-b-2 border-primary-color text-primary-color p-2" : " font-medium  p-2 rounded-lg hover:text-primary-color"
        } to='/'>Home</NavLink>

        {
            user &&
            <>

                {/* <NavLink className={({ isActive }) =>
                    isActive ? "  font-medium border-b-2 border-primary-color text-primary-color p-2" : " font-medium  p-2 rounded-lg hover:text-primary-color"
                } to='/addSpot'>Add Spot</NavLink> */}
                {/* <NavLink className={({ isActive }) =>
                    isActive ? "  font-medium border-b-2 border-primary-color text-primary-color p-2" : "font-medium  p-2 rounded-lg hover:text-primary-color"
                } to='/updateProfile'>Update Profile</NavLink> */}

            </>
        }
        <NavLink className={({ isActive }) =>
            isActive ? "  font-medium border-b-2 border-primary-color text-primary-color p-2" : " font-medium  p-2 rounded-lg hover:text-primary-color"
        } to='/my-query'>My Queries</NavLink>
        <NavLink className={({ isActive }) =>
            isActive ? "  font-medium border-b-2 border-primary-color text-primary-color p-2" : "font-medium  p-2 rounded-lg hover:text-primary-color"
        } to={`/queries`}>Queries</NavLink>
        <NavLink className={({ isActive }) =>
            isActive ? "  font-medium border-b-2 border-primary-color text-primary-color p-2" : " font-medium  p-2 rounded-lg hover:text-primary-color"
        } to='/myRecommendations'>My Recommendations</NavLink>
        {/* <NavLink className={({ isActive }) =>
            isActive ? "  font-medium border-b-2 border-primary-color text-primary-color p-2" : "font-medium  p-2 rounded-lg hover:text-primary-color"
        } to={`/blogs/${1}`}>Blogs</NavLink> */}
        <NavLink className={({ isActive }) =>
            isActive ? "  font-medium border-b-2 border-primary-color text-primary-color p-2" : "font-medium  p-2 rounded-lg hover:text-primary-color"
        } to='/recommendations-for-me'>Recommendations For Me</NavLink>
        {/* <NavLink className={({ isActive }) =>
            isActive ? "  font-medium border-b-2 border-primary-color text-primary-color p-2" : "font-medium  p-2 rounded-lg hover:text-primary-color"
        } to='/aboutUs'>About Us</NavLink> */}
    </>

    return (
        <div className="fixed w-full z-50 top-0">


            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul onClick={scrollToTop} tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navlinks}
                        </ul>
                    </div>
                    <Link onClick={scrollToTop} to={'/'} className="  w-[50px] h-[50px] "><img className="w-full h-full" src={'https://i.ibb.co/2sgZcDH/altPluse.png'} alt="" /></Link>
                    <Link onClick={scrollToTop} to={'/'} className=" font-bold text-lg md:text-xl lg:text-2xl flex gap-0 ">Alt<span className="text-primary-color">Pulse</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul onClick={scrollToTop} className="menu menu-horizontal px-1 flex gap-5">
                        {navlinks}
                    </ul>
                </div>

                <div className="navbar-end space-x-3 ">
                    {
                        user ?
                            <>
                                <div className="dropdown dropdown-end tooltip tooltip-bottom tooltip-success tooltip-" data-tip={user?.displayName}>
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-9 rounded-full">
                                            <img alt="Not found" src={user.photoURL} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <Link to='/userProfile' className="justify-between">
                                                Profile

                                            </Link>
                                        </li>
                                        <li><Link>{user?.displayName}</Link></li>

                                    </ul>
                                </div>

                                <div onClick={scrollToTop} className='border  rounded-full hover:border-primary-color'>
                                    <button onClick={handleLogout} className="btn rounded-full hover:text-primary-color hover:bg-white hover:border-primary-color bg-primary-color text-white font-medium  border-none px-5">LogOut</button>
                                </div>
                            </>
                            :
                            <>
                                <div onClick={scrollToTop} className='border  rounded-full hover:border-primary-color'>
                                    <Link to='/login' className="btn hover:text-primary-color hover:bg-white hover:border-primary-color  bg-primary-color text-white rounded-full  font-medium  border-none px-4">LogIn</Link>
                                    {/* <Link to='/login' className="btn hover:text-primary-color hover:bg-white hover:border-primary-color bg-primary-color text-white rounded-full  font-medium  border-none px-4">LogIn</Link> */}


                                </div>
                                <div onClick={scrollToTop} className='border  rounded-full hover:border-primary-color'>
                                    <Link to='/register' className="btn hover:text-primary-color hover:bg-white hover:border-primary-color rounded-full bg-primary-color text-white font-medium  border-none px-5">Register</Link>
                                </div>
                            </>
                    }
                    <div >
                        <label className="cursor-pointer grid place-items-center">
                            <input onChange={handleTheme} checked={defaultTheme == 'light' ? false : true} type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label>
                    </div>

                </div>



            </div>

        </div>
    );
};

export default Navbar;