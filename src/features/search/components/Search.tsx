import { useEffect, useRef, useState } from "react";
import { Box, InputAdornment, List, ListItemButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchHit } from "../../../types/types";
import { SearchField } from "./Search.styles";
import { useNavigate } from "react-router";
import { useSearchUsersQuery } from "../searchApi";

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const searchWrapperRef = useRef<HTMLDivElement | null>(null);

  const { data: searchResults = [] } = useSearchUsersQuery(debouncedTerm, {
    skip: !debouncedTerm,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSearchResultsVisible(value.length > 1);
  };

  const handleResultClick = (userId: string) => {
    setSearchResultsVisible(false);
    setSearchTerm("");
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setSearchResultsVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchWrapperRef]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <Box sx={{ position: "relative" }} ref={searchWrapperRef}>
      <SearchField
        variant="outlined"
        placeholder="Szukaj..."
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {searchResultsVisible && searchResults.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "40px",
            left: "1rem",
            width: "100%",
            background: "white",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "4px",
            zIndex: 9999,
          }}
        >
          <List>
            {searchResults.map((result: SearchHit) => (
              <ListItemButton
                key={result.id}
                onClick={() => handleResultClick(result.id)}
                style={{ color: "black" }}
              >
                {result.name}
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Search;
