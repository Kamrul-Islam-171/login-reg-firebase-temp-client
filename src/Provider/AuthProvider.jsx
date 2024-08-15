import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'

import axios from 'axios'
// import app from '../firebase/firebase.config'

import app from '../../firebase.config'
import useAxiosPublic from '../Hooks/useAxiosPublic'
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();



  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = async () => {
    setLoading(true)
    // await axios.get(`${import.meta.env.API_URL}/logout`, {
    //   withCredentials: true,
    // })
    return signOut(auth)
  }



  // const saveUser = async(user) => {
  //   const currentUser = {
  //     email : user?.email,
  //     role : 'guest',
  //     status : 'Verified'
  //   }
  //   const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/user`, currentUser);
  //   return data;
  // }

  const saveUser = async (user) => {
    const currentUser = {
      email: user?.email,
      name:user?.displayName,
      image:user?.photoURL,
    }
    console.log(currentUser)
    // const { data } = await axios.put(`http://localhost:5000/user`, currentUser);
    // const { data } = await axios.put(`${import.meta.env.API_URL}/user`, currentUser);
    const { data } = await axiosPublic.put('/user', currentUser);
    return data;
  }


  // const saveUser = async(user) => {

  //   const {data} = await axios.put(`http://localhost:5000/user`, user);
  //   return data;
  // }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }
  //Get token from server
//   const getToken = async email => {
//     const { data } = await axios.post(
//       `${import.meta.env.API_URL}/jwt`,
//       { email },
//       { withCredentials: true }
//     )
//     return data
//   }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      // setLoading(false)
      console.log(currentUser)
      if (currentUser) {
        // getToken(currentUser.email)
        const userEmail = currentUser?.email || user?.email;
        const loggedEmail = { email: userEmail }
        saveUser(currentUser);
        axiosPublic.post('/jwt', loggedEmail, {withCredentials:true})
        .then( res => {
          if(res.data.token) {
            localStorage.setItem('access-token', res.data.token);
            setLoading(false)
          }
        })

      }
      else {
        setLoading(false)
        localStorage.removeItem('access-token')
      }
      // setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,

  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.array,
}

export default AuthProvider