import { ToyPreview } from "./toy-preview";

export function ToyList({ toys, onRemoveToy, onToyDetails }) {
    
    return <section className="toy-list-container">

        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <button onClick={() => onRemoveToy(toy._id)}>X</button>
                    <ToyPreview toy={toy} />
                    <button onClick={() => onToyDetails(toy._id)}>Details</button>

                </li>
            )}
        </ul>


    </section>
}