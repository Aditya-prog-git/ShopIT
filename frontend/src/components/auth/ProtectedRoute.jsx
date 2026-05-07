import React from 'react'
import { useSelector } from 'react-redux'
<<<<<<< HEAD
import { Navigate, navigate } from 'react-router-dom'
import Loader from '../layout/Loader'

const ProtectedRoute = ({ children }) => {

  const { isAuthenticated, loading } = useSelector((state) => state.auth)
=======
import { Navigate } from 'react-router-dom'
import Loader from '../layout/Loader'

const ProtectedRoute = ({ admin, children }) => {

  const { isAuthenticated, user, loading } = useSelector((state) => state.auth)
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a


  // iska logic ==> when we refresh /profile page it will first come on PrectedRoute kyunki Profile is child of ProtectedRoute. Ab api se daata fethc hoga(userApi) waha pr isAuthenticated false hai, to navigate hoke /login pe jayega(see below). Login pr jane ke baad waha pr isAuthenticated = true, so redirect to "/"(refer Login.jsx). So, to avoid this we introduced loading in slice and this logic. Refer lec 81.
  if(loading) return <Loader />

  if(!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

<<<<<<< HEAD
=======
  if(admin && user?.role !== "admin") {
    return <Navigate to="/" replace />
  }

>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
  return children
}

export default ProtectedRoute
