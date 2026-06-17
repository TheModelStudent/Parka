"use client";

import { useState } from "react";

export function AddToBagButton() {
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setAdded(true)}
      className="btn-solid w-full sm:flex-1"
    >
      {added ? "Added to Bag" : "Add to Bag"}
    </button>
  );
}
