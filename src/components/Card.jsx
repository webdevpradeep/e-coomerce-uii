import React from "react";

const Card = (props) => {
  return (
    <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
      {props.children && <div>{props.children}</div>}
      <img alt="" src={props.thumbnail} className="h-56 w-full object-cover" />

      <div className="bg-white p-4 sm:p-6">
        <time datetime="2022-10-10" className="block text-xs text-gray-500">
          {" "}
          {props.date}{" "}
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-lg text-gray-900">{props.title}</h3>
        </a>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {props.desc}
        </p>
      </div>
      <button onClick={props.onPrintTable}>Click to Print Table</button>
    </article>
  );
};

export default Card;
