import React from 'react';

export default function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <>
      <h3 className="uppercase text-gray-500 font-semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="text-red-500 text-4xl font-bold italic ">{mainHeader}</h2>
    </>
  );
}
