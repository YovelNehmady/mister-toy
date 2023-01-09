import { NavLink } from "react-router-dom"

export function AppHeader() {
    return <section className="app-header main-layout full">
        <div className="flex justify-between align-center">
            <h1>Toy Story</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About Us</NavLink>
            </nav>
        </div>
    </section>
}