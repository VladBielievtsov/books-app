import axios from "axios";
import React, { Dispatch, useEffect } from "react";

interface CardProps {
  cardIsOpen: boolean;
  setCardIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedWord: string;
}

export default function Card({
  cardIsOpen,
  setCardIsOpen,
  selectedWord,
}: CardProps) {
  return (
    cardIsOpen && (
      <div className="bg-zinc-500 bg-opacity-45 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="bg-white rounded-lg">
          <div className="px-6 py-4">
            <div>
              <h4 className="text-lg">{selectedWord}</h4>
              <p className="text-zinc-500">/aelis/</p>
              <div className="mt-4">
                <span className="bg-emerald-500 text-white rounded-full px-2.5 py-1.5">
                  Алиса
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-200 px-6 py-4">
            <button
              className="bg-zinc-200 hover:bg-zinc-300 rounded-full px-8 py-2"
              onClick={() => setCardIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
}
