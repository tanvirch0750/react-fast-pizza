import { useState, FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
