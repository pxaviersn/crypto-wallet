import { useState } from 'react'
import axios from 'axios'

const SignUpPage = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
       
        const newUser = {
            name,
            email,
            password
        }

        axios.post('http://localhost:3001/auth/sign-up', newUser)
            .then(response => {
                if(response.status === 201) {
                    setName('')
                    setEmail('')
                    setPassword('')
                    alert('User created')
                }
            })
            .catch(error => console.log(error))
    }

return (

    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">

                <h2 className="fw-bold mb-2">Sign Up</h2>
                <p className="text-white-50 mb-5">Please fill in your information to create an account!</p>

                <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typeNameX">Name</label>
                    <input type="text" id="typeNameX" className="form-control form-control-lg" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                    <input type="email" id="typeEmailX" className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                    <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>Sign Up</button>

                </div>

                <div>
                    <p className="mb-0">Already have an account? <a href="/login" className="text-white-50 fw-bold">Sign In</a></p>
                </div>    
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
)
}
export default SignUpPage