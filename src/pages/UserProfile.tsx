import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  IconButton,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  ProfileData,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useUploadProfilePictureMutation,
} from "../features/user/userApi";
import { useGetAllSpecializationsQuery } from "../features/specializations/specializationsApi";

const UserProfile: React.FC = () => {
  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery();
  const [uploadProfilePicture] = useUploadProfilePictureMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
    picture: "",
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await uploadProfilePicture(selectedFile);
      setSelectedFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id) return;
    try {
      handleUpload();
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
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Profil użytkownika
        </Typography>
        <Box sx={{ position: "relative", display: "inline-block", mt: 2 }}>
          <Avatar
            src={preview ?? currentUser?.picture}
            alt="Profile"
            sx={{ width: 150, height: 150 }}
          />
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <PhotoCameraIcon sx={{ color: "white" }} />
            <input
              type="file"
              // accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </IconButton>
        </Box>
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
    </Box>
  );
};

export default UserProfile;
