import { useState } from "react";
import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi";

const DropDown = ({
  toggle,
  orderby,
  sortBy,
  onOrderByChange,
  onSortByChange,
}) => {
  if (!toggle) return null;
  return (
    <div
      className="origin-top-right absolute right-0 mt-2 w-56
    rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div
          onClick={() => onSortByChange("clientName")}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
        >
          Client Name {sortBy === "clientName" && <BiCheck />}
        </div>
        <div
          onClick={() => onSortByChange("companyName")}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
        >
          Company Name {sortBy === "companyName" && <BiCheck />}
        </div>
        <div
          onClick={() => onSortByChange("aptDate")}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
        >
          Date {sortBy === "aptDate" && <BiCheck />}
        </div>
        <div
          onClick={() => onOrderByChange("asc")}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
          role="menuitem"
        >
          Asc {orderby === "asc" && <BiCheck />}
        </div>
        <div
          onClick={() => onOrderByChange("desc")}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
        >
          Desc {orderby === "desc" && <BiCheck />}
        </div>
      </div>
    </div>
  );
};

const Search = ({
  onQueryChange,
  query,
  orderby,
  sortBy,
  onOrderByChange,
  onSortByChange,
}) => {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input
          onChange={(e) => {
            onQueryChange(e.target.value);
          }}
          type="text"
          name="query"
          id="query"
          value={query}
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              type="button"
              onClick={() => {
                setToggleDropDown(!toggleDropDown);
              }}
              className="justify-center px-4 py-2 bg-yellow-400 border-2 border-yellow-400 text-sm text-black hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Sort By <BiCaretDown className="ml-2" />
            </button>
            <DropDown
              toggle={toggleDropDown}
              orderby={orderby}
              sortBy={sortBy}
              onOrderByChange={(mysort) => onOrderByChange(mysort)}
              onSortByChange={(mysort) => onSortByChange(mysort)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
