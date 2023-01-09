import { Link } from "react-router-dom";
import { ToyPreview } from "./toy-preview";

export function ToyList({ toys, onRemoveToy }) {
    
    return <section className="toy-list-container">

        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <button onClick={() => onRemoveToy(toy._id)}>X</button>
                    <ToyPreview toy={toy} />
                    
                    <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
                    <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>


                </li>
            )}
        </ul>


    </section>
}