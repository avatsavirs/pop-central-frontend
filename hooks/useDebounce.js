import {useEffect, useState} from 'react';

export default function useDebounce(state, delay) {
  const [debouncedSate, setDebouncedState] = useState(state);
  useEffect(() => {
    const sid = setTimeout(() => setDebouncedState(state), delay);
    return () => clearTimeout(sid);
  }, [state]);
  return debouncedSate;
}
