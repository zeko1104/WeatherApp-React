import React from "react";

export default function Search({ search, setSearch, handleSearch }) {
  return (
    // search-engine
    <div className="w-full flex justify-around items-center mb-[30px] mt-[10px]">
      {/* city search */}
      <input
        type="text"
        className="w-[70%] h-[45px] border 
        border-solid rounded-lg p-4 
        text-base outline-none bg-white text-[#555555]"
        placeholder="Enter City Name"
        name=""
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {/* search btn */}
      <button
        className="border-none rounded-lg bg-black text-white 
        text-xl outline-none p-[12px 15px] h-10 w-36"
        onClick={handleSearch}
      >
        Search 
      </button>
    </div>
  );
}
