import React from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useGetUserByIdQuery } from "../userApi";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

const AboutTab: React.FC = () => {
  const { userId } = useParams();
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserByIdQuery(userId || "");
  const currentUserId = useSelector((state: RootState) => state.currentUser.id);

  if (isLoading) return <CircularProgress />;
  if (isError || !userData)
    return <div>Błąd pobierania danych użytkownika</div>;

  return (
    <Box>
      <Typography variant="h6">O mnie</Typography>
      <Typography>Imię: {userData.firstName}</Typography>
      <Typography>Nazwisko: {userData.lastName}</Typography>
      <Typography>Opis: {userData.description}</Typography>
      <Typography>Informacje: {userData.about_me}</Typography>

      {/* Można dodać cokolwiek jeszcze chcesz wyświetlać,
          np. userData.location, userData.specializations, itp. */}
    </Box>
  );
};

export default AboutTab;
