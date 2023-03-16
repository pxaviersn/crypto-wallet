import { Navigate } from "react-router-dom"

const IsLogged = props => {
    const token = localStorage.getItem('token')
    
    console.log('token', token)

    if(!token) {
        return <Navigate to="/login"/>
    }

    return props.children
}

export default IsLogged