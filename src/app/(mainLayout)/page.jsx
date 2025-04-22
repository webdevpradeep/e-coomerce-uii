"use client";

import React from "react";
import Card from "../../components/Card";

const HomePage = () => {
  const cardsData = [
    {
      title: "Learning React Compoments",
      desc: "This is desc props",
      date: "10 Oct 2025",
      thumbnail:
        "https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/264b8d01c10d16f962e7a9f2a4a3702f?_a=AQAEuj9",
    },
    {
      title: "Learning React Functional Compoments",
      desc: "This is desc props",
      date: "11 Oct 2025",
      thumbnail:
        "https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/264b8d01c10d16f962e7a9f2a4a3702f?_a=AQAEuj9",
    },
  ];

  function printTable() {
    for (let i = 1; i <= 10; i++) {
      console.log(i * 2);
    }
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {cardsData.map((el, index) => (
        <Card
          key={index}
          thumbnail={el.thumbnail}
          date={el.date}
          title={el.title}
          desc={el.desc}
          onPrintTable={printTable}
        />
      ))}

      <Card
        title="Learning React Compoments"
        desc="Learning React Compoments"
        date="12 sept 2020"
        thumbnail="https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/264b8d01c10d16f962e7a9f2a4a3702f?_a=AQAEuj9"
      >
        <div>I am children</div>
      </Card>
    </div>
  );
};

export default HomePage;
