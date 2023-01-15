import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { logout } from "../store/user/user.action"
import { SET_USER } from "../store/user/user.reducer"
import { LoginSignup } from "./login-signup"
import { UserMsg } from "./user-msg"

export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))
    const dispatch = useDispatch()
    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }
    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }
    return <section className="app-header main-layout full">
        <div className="flex justify-between align-center">
            <h1>Toy Story</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About Us</NavLink>
            </nav>
            {user && <section className="user-info">
                <p>{user.fullname}</p>
                <button onClick={onLogout}>Logout</button>
            </section>}
            {!user && <section className="user-info">
                <LoginSignup setUser={setUser} />
            </section>}
        </div>
        <UserMsg />
    </section>
}