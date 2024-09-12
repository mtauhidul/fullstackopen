import axios from "axios";
import React, { useEffect, useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  const getInfo = async () => {
    if (!name) return;

    const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/name";

    try {
      const response = await axios.get(`${baseURL}/${name}`);
      setCountry(response.data);
      setError(null);
    } catch (err) {
      setError("Country not found");
      setCountry(null);
    }
  };

  useEffect(() => {
    getInfo();
  }, [name]);

  return {
    data: country
      ? {
          name: country.name?.common || "Unknown",
          capital: country.capital?.[0] || "Unknown",
          population: country.population || "Unknown",
          flag: country.flags?.png || "",
        }
      : null,
    error,
    found: !!country && !error,
  };
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  console.log(country);

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
