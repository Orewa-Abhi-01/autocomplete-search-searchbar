import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [result, setResult] = useState([]);
  const [input, setInput] = useState("");
  const [showRes, setShowRes] = useState(false);
  const [cache, setCache] = useState({});

  const fetchResult = async () => {
    if (cache[input]) {
      console.log("Cache Returned", input);
      setResult(cache[input]);
      return;
    }
    console.log("Api Called", input);

    const res = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const data = await res.json();
    // console.log(data);
    const recipes = data?.recipes;
    setResult(recipes);
    setCache((prev) => ({ ...prev, [input]: recipes }));
  };

  useEffect(() => {
    const timer = setTimeout(fetchResult, 300);

    return () => {
      clearInterval(timer);
    };
  }, [input]);

  return (
    <div className="App">
      <h1>AutoComplete search -Search Bar</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-bar"
          onFocus={() => setShowRes(true)}
          onBlur={() => setShowRes(false)}
        />
        <div className="scroll">
          {showRes && (
            <ul className="list-container">
              {result.map((obj) => (
                <li key={obj.id} className="list-item">
                  {obj.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
