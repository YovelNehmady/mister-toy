export function ToyPreview({ toy }) {
    return <article className="toy-preview">
        <h4>{toy.name}</h4>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
        <small>{`price:${toy.price}$`}</small>
    </article>
}