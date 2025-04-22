import React from "react";
import Card from "../../../components/Card";

const ShopPage = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(8)].map((_, index) => (
        <Card key={index} title="Hello I am Title" />
      ))}
    </div>
  );
};

export default ShopPage;
