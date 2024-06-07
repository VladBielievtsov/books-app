import React, { useEffect, useState } from "react";
import DB from "../db.json";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock4, Drama, MoveLeft, WholeWord } from "lucide-react";
import Card from "../components/Card";
import axios from "axios";

interface IBook {
  id: string;
  title: string;
  slug: string;
  image: string;
  author: string;
  genres: string[];
  issued: number;
  reading: string;
  words: number;
  description: string;
  content: string;
}

export default function Book() {
  const { title } = useParams();
  const [book, setBook] = useState<IBook | null>();
  const [content, setContent] = useState<JSX.Element[]>([]);
  const [cardIsOpen, setCardIsOpen] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("ua");

  const getTranslate = async (word: string) => {
    const res = await axios({
      method: "post",
      url: "http://localhost:3000",
      data: {
        text: word,
        target_lang: targetLang,
      },
    });

    console.log(res.data.translatedText);
  };

  useEffect(() => {
    const getBook = DB.books.results.find((b) => b.slug === title);
    setBook(getBook || null);

    if (getBook) {
      const words = getBook.content.split(/(\s+)/);
      const wrappedWords = words.map((word, index) => {
        return (
          <span
            key={index}
            title={word}
            onClick={() => {
              setCardIsOpen(true);
              setSelectedWord(
                word.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, "")
              );
              getTranslate(
                word.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, "")
              );
            }}
            className="cursor-pointer hover:bg-zinc-200"
          >
            {word}
          </span>
        );
      });

      setContent(wrappedWords);
    }
  }, [title]);

  return (
    <div>
      <div className="max-w-[768px] mx-auto px-4">
        <div className="py-10">
          <div>
            <Link to="/" className="text-zinc-400 w-5">
              <MoveLeft />
            </Link>
          </div>
          <div className="flex justify-center pt-10">
            <img
              src={book?.image}
              alt={book?.title}
              className="max-w-[320px] rounded-2xl aspect-[9/13] object-cover"
            />
          </div>
          <div className="text-center py-10">
            <h1 className="text-3xl font-medium">{book?.title}</h1>
            <p className="text-green-600">
              <span className="text-zinc-400">by</span> {book?.author}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-y-4 gap-x-10 bg-zinc-100 px-6 py-4 rounded">
              <div className="flex items-start gap-2">
                <div className="text-indigo-600">
                  <Drama />
                </div>
                <div>
                  <p>Genres</p>
                  <p className="text-zinc-400">{book?.genres.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-indigo-600">
                  <Calendar />
                </div>
                <div>
                  <p>Issued</p>
                  <p className="text-zinc-400">{book?.issued}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-indigo-600">
                  <Clock4 />
                </div>
                <div>
                  <p>Reading Time</p>
                  <p className="text-zinc-400">{book?.reading}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-indigo-600">
                  <WholeWord />
                </div>
                <div>
                  <p>Words</p>
                  <p className="text-zinc-400">{book?.words}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-10">
            <h2 className="text-xl mb-4">Description</h2>
            <p className="text-zinc-500">{book?.description}</p>
          </div>
          <hr />
          <div className="pt-10">
            <p>{content}</p>
          </div>
        </div>
      </div>
      <Card
        cardIsOpen={cardIsOpen}
        setCardIsOpen={setCardIsOpen}
        selectedWord={selectedWord}
      />
    </div>
  );
}
