import { Link } from "react-router-dom";
import DB from "../db.json";

export default function Home() {
  return (
    <div>
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="py-10">
          <h1 className="text-3xl font-bold">For you</h1>
        </div>
        <div className="grid grid-cols-4">
          {DB.books.results.map((book) => (
            <Link to={"/book/" + book.slug} key={book.id}>
              <img
                src={book.image}
                alt={book.title}
                className="rounded-2xl aspect-[9/13] object-cover"
              />
              <h4 className="text-xl">{book.title}</h4>
              <p className="mt-1 text-zinc-400">{book.author}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
