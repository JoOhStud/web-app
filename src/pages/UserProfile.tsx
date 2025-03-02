import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import {
  ProfileData,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from "../features/user/userApi";
import { useGetAllSpecializationsQuery } from "../features/specializations/specializationsApi";

const UserProfile: React.FC = () => {
  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery();
  const { data: allSpecializations, isLoading: specsLoading } =
    useGetAllSpecializationsQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Lokalne stany formularza
  const [formData, setFormData] = useState<ProfileData>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    description: "",
    about_me: "",
    specializations: [],
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({ ...currentUser });
    }
  }, [currentUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      specializations: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id) return;
    try {
      await updateUser({ user_id: formData.id, data: formData }).unwrap();
      alert("Profil zaktualizowany!");
    } catch (error) {
      console.error(error);
      alert("Błąd podczas aktualizacji profilu");
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Wystąpił błąd...</div>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: "auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Profil użytkownika
      </Typography>
      <TextField
        label="Email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Imię"
        name="firstName"
        value={formData.firstName || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nazwisko"
        name="lastName"
        value={formData.lastName || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nazwa użytkownika"
        name="username"
        value={formData.username || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Opis"
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="O mnie"
        name="about_me"
        value={formData.about_me || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="specialization-label">Specjalizacje</InputLabel>
        <Select
          labelId="specialization-label"
          multiple
          label="Specjalizacje"
          name="specializations"
          value={formData.specializations || []}
          onChange={handleSelectChange}
          renderValue={(selected) => {
            // Wyświetlanie nazw specjalizacji zamiast ID
            const selectedSpecs = allSpecializations?.filter((spec) =>
              selected.includes(spec.id)
            );
            return selectedSpecs?.map((s) => s.title).join(", ") || "";
          }}
        >
          {allSpecializations?.map((spec) => (
            <MenuItem key={spec.id} value={spec.id}>
              {spec.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2}>
        <Button type="submit" variant="contained" disabled={isUpdating}>
          {isUpdating ? "Aktualizowanie..." : "Zapisz zmiany"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
