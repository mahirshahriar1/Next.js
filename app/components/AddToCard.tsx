"use client";
import React from "react";

const AddToCard = () => {
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => console.log("Added to cart")}
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCard;
