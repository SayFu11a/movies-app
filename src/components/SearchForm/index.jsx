import './SearchForm.css';
import { useMemo, useEffect } from 'react';
import debounce from 'lodash/debounce';

const SearchForm = ({ urlHandler, setIsSerching, searchQuery, setSearchQuery }) => {
    // Создаем дебаунс-функцию один раз с помощью useMemo
    const debouncedUrlHandler = useMemo(
        () =>
            debounce((value) => {
                if (value === '') {
                    urlHandler(
                        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
                    );
                    setIsSerching(false);
                    return;
                }
                urlHandler(`https://api.themoviedb.org/3/search/movie?query=${value}`);
            }, 1000),
        [urlHandler, setIsSerching]
    );

    // useEffect(() => {
    //     return () => {
    //         debouncedUrlHandler.cancel();
    //     };
    // }, [debouncedUrlHandler]);

    // Обработчик изменения ввода
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setSearchQuery(newValue);
        setIsSerching(true);
        debouncedUrlHandler(newValue); // Просто вызываем функцию без cancel()
    };

    return (
        <form>
            <input
                value={searchQuery}
                className="search-input"
                onChange={handleInputChange}
                type="text"
                id="searchInput"
                placeholder="Type to search..."
                autoFocus
            />
        </form>
    );
};

export default SearchForm;
