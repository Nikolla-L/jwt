import React,  { useState } from 'react'
import { GenerateJWT, DecodeJWT } from '../services/JWTServices'

const Login = () => {
    const [state, setState] = useState({
        Username: '',
        Password: ''
    })

    const handleChange = e => {
        setState({...state, [e.target.name]: e.tagret.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { Username, Password } = state
        const claims = { Username, Password }
        const header = {
            alg: 'HS512',
            typ: 'JWT'
        }
        GenerateJWT(header, claims, null, res => {
            if(res.status === 200) {
                setState({Response: res.data}, () => {
                    if (typeof Storage !== "undefined") {
                        localStorage.setItem("JWT", res.data);
                    }
                    DecodeJWT(state.Response, data =>
                        setState({ Data: data.data })
                    );
                })
            } else {
                setState({Response: 'Error'})
            }
        })
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Sign In</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    Please sign in to continue.
                                </h6>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter email"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <pre>
                            State Data
                            <br /><br />
                            {JSON.stringify(
                                {
                                    Username: state.Username,
                                    Password: state.Password
                                },
                                null,
                                2
                            )}
                            {state.Response && (
                                <>
                                    <br /><br />
                                    Response Data (JWT)
                                    <br /><br />
                                    {state.Response}
                                </>
                            )}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login