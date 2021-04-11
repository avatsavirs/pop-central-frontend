import styled from '@emotion/styled';
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import {gql} from 'graphql-request';
import useDebounce from 'hooks/useDebounce';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import {useQuery} from 'react-query';
import {request} from 'utils';
import {XIcon, SearchIcon} from '@heroicons/react/solid'

function useSearchItems(searchTerm) {
  const {data: searchResults, isLoading, isIdle, isError, isSuccess} = useQuery(['search', searchTerm], async () => {
    const data = await request(gql`
        query {
          search(query: "${searchTerm}") {
            ...on Movie {
              id
              title
              releaseDate
            }
              ...on TV {
                id
                title
                releaseDate:firstAirDate
              }
              ...on Person {
                id
                title: name
                releaseDate: birthday
              }
            __typename
          }
        }`
    );
    return data.search;
  }, {
    enabled: !!searchTerm
  })
  return {searchResults, isLoading, isIdle, isError, isSuccess};
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {searchResults, isLoading, isIdle, isSuccess, isError, error} = useSearchItems(debouncedSearchTerm);
  const router = useRouter();
  const inputRef = useRef();

  function focusOnSearchBar(event) {
    if (event.keyCode === 191) {
      if (document.activeElement === inputRef.current) return;
      event.preventDefault();
      inputRef.current.focus();
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', focusOnSearchBar);
    () => document.removeEventListener('keydown', focusOnSearchBar);
  })

  function handleSelect(value) {
    setSearchTerm("");
    const id = value;
    const movie = searchResults.find(movie => movie.id === id);
    const {__typename} = movie;
    if (__typename === "Movie") {
      var url = `/movies/${id}`
    } else if (__typename === "TV") {
      var url = `/tv/${id}`
    } else if (__typename === "Person") {
      var url = `/person/${id}`
    } else {
      throw new Error(`Unhandled __typename ${__typename}`)
    }
    router.push(url);
  }

  function clear() {
    setSearchTerm("");
    inputRef.current.focus();
  }


  return (
    <div>
      <Combobox css={{display: 'flex', justifyContent: 'center'}} openOnFocus onSelect={handleSelect}>
        <div css={{width: '90%', display: 'flex', justifyContent: 'center', position: 'relative'}}>
          <StyledComboboxInput placeholder="Search" onChange={(event) => setSearchTerm(event.target.value)} aria-label="search bar" autocomplete={false} value={searchTerm} ref={inputRef} />
          {searchTerm && <button css={{position: 'absolute', right: '0', background: 'transparent', border: 'none', color: 'var(--primary-text)', cursor: 'pointer'}} onClick={clear}><XIcon css={{
            width: '4rem', height: '4rem'
          }} /></button>}
        </div>
        <SearchResultList searchResults={searchResults} isLoading={isLoading} isIdle={isIdle} isSuccess={isSuccess} isError={isError} error={error} searchTerm={searchTerm} />
      </Combobox>
    </div>
  )
}

function SearchResultList({searchResults, isLoading, isIdle, isSuccess, isError, searchTerm, error}) {
  if (isIdle || isLoading) {
    return null;
  } else if (isSuccess) {
    if (searchResults.length > 0) {
      return (
        <ComboboxPopover>
          <StyledComboboxList>
            <StyledComboboxOption css={{color: 'var(--muted-text)', fontStyle: 'italic'}} value={'movies'}>Search {searchTerm} in movies... </StyledComboboxOption>
            <StyledComboboxOption css={{color: 'var(--muted-text)', fontStyle: 'italic'}} value={'tv'}>Search {searchTerm} in tv... </StyledComboboxOption>
            <StyledComboboxOption css={{color: 'var(--muted-text)', fontStyle: 'italic'}} value={'person'} >Search {searchTerm} in people...</StyledComboboxOption>
            {searchResults.slice(0, 5).map(sr => <StyledComboboxOption key={sr.id} value={sr.id}><SearchIcon css={{width: '2rem', height: '2rem', marginRight: '1rem'}} />{sr.title}</StyledComboboxOption>)}
          </StyledComboboxList>
        </ComboboxPopover>
      )
    } else {
      return (
        <ComboboxPopover>
          <p css={{color: 'var(--primary-text)', backgroundColor: 'var(--primary-background)', padding: '1rem 1.5rem', cursor: 'default'}}> No results found ... </p>
        </ComboboxPopover>
      )
    }
  } else if (isError) {
    console.error(error);
    return null;
  } else {
    throw new Error("Impossible State")
  }
}

const StyledComboboxInput = styled(ComboboxInput)({
  width: '100%',
  background: 'transparent',
  border: 'none',
  color: 'var(--primary-text)',
  fontSize: 'var(--h4)',
  padding: '1rem 2rem',
  borderBottom: '3px solid var(--primary-text)',
  transition: 'border-color 235ms ease-out',
  ':focus': {
    borderColor: 'var(--secondary)',
    outline: 'none'
  }
})

const StyledComboboxList = styled(ComboboxList)({
  listStyle: 'none'
})

const StyledComboboxOption = styled(ComboboxOption)({
  display: 'flex',
  alignItems: 'center',
  fontSize: 'var(--h5)',
  cursor: 'pointer',
  background: 'var(--primary-background)',
  padding: '1rem 1.5rem',
  borderBottom: '1px solid gray',
  '&[aria-selected="true"], :hover': {
    background: 'var(--secondary-background)'
  }
})
