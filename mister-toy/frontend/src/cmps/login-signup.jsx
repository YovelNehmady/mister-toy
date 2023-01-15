
import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { signup, login } from '../store/user/user.action.js'

export function LoginSignup() {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

   async function onSubmit(ev) {
        ev.preventDefault()
        try {
            const func = isSignupState ? signup : login
            await func(credentials)
            const msg = isSignupState ? 'User created' : 'User loged in'
            showSuccessMsg(msg) 
        } catch (error) {
            showErrorMsg()
        }
    }

    function onToggleSignupState() {
        setIsSignupState(!isSignupState)
    }

    const { username, password, fullname } = credentials
    return <div className="login-page">

        <form className="login-form" onSubmit={onSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={handleCredentialsChange}
                required
                autoFocus
            />

            <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleCredentialsChange}
                required
            />

            {isSignupState && <input
                type="text"
                name="fullname"
                value={fullname}
                placeholder="Full name"
                onChange={handleCredentialsChange}
                required
            />}

            <button>{isSignupState ? 'Signup' : 'Login'}</button>
        </form>

        <div className="btns">
            <a href="#" onClick={onToggleSignupState}>
                {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
            </a >
        </div>
    </div >
}