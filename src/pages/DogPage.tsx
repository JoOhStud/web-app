import { useState } from "react"; // dostosuj ścieżkę importu
import { useCreatePetMutation } from "../features/pets/petsApi";
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";

const FormContainer = styled(Box)`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled(Typography)`
  text-align: center;
  font-weight: 600;
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  margin-top: 15px;
  width: 100%;
`;

const ErrorMessage = styled(Typography)`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

export const DogPage = () => {
  const [createPet, { isLoading, isError, error }] = useCreatePetMutation();

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    date_of_birth: "",
    weight: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createPet({
        ...formData,
        weight: parseFloat(formData.weight) || undefined,
      });
      alert("Dodano nowego zwierzaka!");
      setFormData({
        name: "",
        species: "",
        breed: "",
        gender: "",
        date_of_birth: "",
        weight: "",
        description: "",
      });
    } catch (err) {
      console.error("Błąd podczas dodawania zwierzaka:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <FormTitle variant="h5">Dodaj nowego zwierzaka</FormTitle>

        <TextField
          label="Imię"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Gatunek"
          name="species"
          value={formData.species}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Rasa"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Płeć"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Data urodzenia"
          name="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Waga (kg)"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Opis"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          margin="normal"
        />

        {isError && (
          <ErrorMessage variant="body2">
            Błąd:{" "}
            {(error as any)?.data?.detail || "Nie udało się dodać zwierzaka."}
          </ErrorMessage>
        )}

        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Dodaj zwierzaka"}
        </StyledButton>
      </FormContainer>
    </form>
  );
};

export default DogPage;
