import { useState, useEffect, useRef } from 'react';

import { debounce } from 'lodash';

import './SearchForm.css';

const SearchForm = ({ urlHandler, mainUrl, pageCount, setIsSerching }) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedUrlHandler = useRef(null);

    if (!debouncedUrlHandler.current) {
        debouncedUrlHandler.current = debounce((value) => {
            if (value === '') {
                urlHandler(mainUrl);
                setIsSerching(false);
                return;
            }
            urlHandler(`https://api.themoviedb.org/3/search/movie?query=${value}`);
            // console.log(value);
            // console.log(value === '');
        }, 1000);
    }

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setIsSerching(true);
        setInputValue(newValue);
        debouncedUrlHandler.current(newValue);
    };

    useEffect(() => {
        return () => {
            if (debouncedUrlHandler.current) {
                debouncedUrlHandler.current.cancel(); // Отменяем все отложенные вызовы
            }
        };
    }, []);

    return (
        <form>
            <input
                value={inputValue}
                className="search-input"
                onChange={handleInputChange}
                type="text"
                id="searchInput"
                placeholder="Type to search..."
            />
        </form>
    );
};

export default SearchForm;
