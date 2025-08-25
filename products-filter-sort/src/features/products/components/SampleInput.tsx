import { useCallback, useMemo, useState } from "react";
import { debounce } from "../../../utils/debounce";
import useDebounce from "../../../hooks/useDebounce";

const SampeInput = () => {
  const [query, setQuery] = useState<string>("");

  const [output, setOutput] = useState([]);

  const makeApiCall = useCallback(async (query: string) => {
    const res = await fetch("https://dummyjson.com/recipes/search?q=" + query);
    const data = await res.json();
    console.log(data);
    setOutput(data.recipes);
  }, []);

  const debouncedMakeApiCall = useDebounce(makeApiCall, 500);

  // const debouncedMakeApiCall = useMemo(() => {
  //   return debounce(makeApiCall, 500);
  // }, [makeApiCall]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedMakeApiCall(e.target.value);
  };

  return (
    <>
      <input type="text" value={query} onChange={handleQueryChange} />
      {output.map((out) => (
        <p key={out["id"]}>{out["name"]}</p>
      ))}
    </>
  );
};

export default SampeInput;
