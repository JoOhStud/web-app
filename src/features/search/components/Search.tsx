import { useEffect, useRef, useState } from "react";
import {
  Box,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchField } from "./Search.styles";
import { useNavigate } from "react-router";
import { useSearchPostsQuery, useSearchUsersQuery } from "../searchApi";
import { Post } from "../../blog/blogApi";

const MAX_RESULTS = 10;

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const searchWrapperRef = useRef<HTMLDivElement | null>(null);

  const { data: usersData = [] } = useSearchUsersQuery(debouncedTerm, {
    skip: !debouncedTerm,
  });
  const { data: postsData = [] } = useSearchPostsQuery(debouncedTerm, {
    skip: !debouncedTerm,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSearchResultsVisible(value.length > 1);
  };

  // Kliknięcie w wynik: rozróżniamy usera / posta
  const handleUserClick = (userId: string) => {
    setSearchTerm("");
    setSearchResultsVisible(false);
    navigate(`/user/${userId}`);
  };

  const handlePostClick = (post: Post) => {
    setSearchTerm("");
    setSearchResultsVisible(false);
    navigate(`/user/${post.author_id}/blog/${post.id}`);
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
      {searchResultsVisible &&
        (usersData.length > 0 || postsData.length > 0) && (
          <Box
            sx={{
              position: "absolute",
              top: "40px",
              left: 0,
              width: "100%",
              background: "white",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              borderRadius: "4px",
              zIndex: 9999,
              p: 1,
            }}
          >
            {/* Lista użytkowników */}
            {usersData.length > 0 && (
              <>
                <Typography
                  variant="subtitle2"
                  sx={{ ml: 1, mt: 1, color: "black" }}
                >
                  Użytkownicy
                </Typography>
                <List>
                  {usersData.map((user) => (
                    <ListItem key={user.id} disablePadding>
                      <ListItemButton
                        onClick={() => handleUserClick(user.id)}
                        sx={{ color: "black" }}
                      >
                        {user.name}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {/* Lista postów */}
            {postsData.length > 0 && (
              <>
                <Typography
                  variant="subtitle2"
                  sx={{ ml: 1, mt: 1, color: "black" }}
                >
                  Posty
                </Typography>
                <List>
                  {postsData.map((post) => (
                    <ListItem key={post.id} disablePadding>
                      <ListItemButton
                        onClick={() => handlePostClick(post)}
                        sx={{ color: "black" }}
                      >
                        {post.title}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Box>
        )}
    </Box>
  );
};

export default Search;
