import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToyPreview } from "./toy-preview";

export function ToyList({ toys, onRemoveToy }) {
    const { user } = useSelector(state => state.userModule)

    return <section className="toy-list-container">

        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    {user?.isAdmin && <button onClick={() => onRemoveToy(toy._id)}>X</button>}
                    <ToyPreview toy={toy} />

                    <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
                    {user?.isAdmin && <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>}


                </li>
            )}
        </ul>


    </section>
}