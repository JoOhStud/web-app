// src/features/user/components/CollaborationTab.tsx
import { useState } from "react";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useGetServicesQuery, useCreateServiceMutation } from "../servicesApi";

const CollaborationTab = ({ isEditing = false }: { isEditing: boolean }) => {
  const { userId } = useParams();
  const currentUserId = useSelector((state: RootState) => state.currentUser.id);
  const isOwner = currentUserId === userId;

  // RTK Query do pobierania listy usług
  const {
    data: services,
    isLoading,
    isError,
  } = useGetServicesQuery(
    { user_id: userId },
    {
      skip: !userId,
      // providesTags: ["ServicesList"], // lub w inny sposób odświeżać
    }
  );

  // Tworzenie usługi
  const [createService] = useCreateServiceMutation();

  // Stan formularza do dodania usługi
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [times, setTimes] = useState("0,0"); // prosto: "30,60" i parse

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Błąd ładowania usług</div>;

  const handleCreateService = async () => {
    try {
      // times: [30, 60] np. w parse
      const timesArr = times
        .split(",")
        .map((t) => parseInt(t.trim()))
        .filter((t) => !isNaN(t));

      await createService({
        name: serviceName,
        description: serviceDescription,
        price: parseFloat(price),
        times: timesArr,
      }).unwrap();

      // Po sukcesie wyczyść formularz
      setServiceName("");
      setServiceDescription("");
      setPrice("0");
      setTimes("");
    } catch (error) {
      console.error("Błąd tworzenia usługi:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Usługi świadczone przez użytkownika</Typography>
      {services && services.length === 0 ? (
        <Typography>Brak usług do wyświetlenia</Typography>
      ) : (
        <Box>
          {services?.map((svc) => (
            <Box key={svc.id} sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}>
              <Typography variant="subtitle1">{svc.name}</Typography>
              <Typography>Cena: {svc.price} zł/h</Typography>
              <Typography>Opis: {svc.description}</Typography>
              <Typography>
                Przedziały czasowe: {svc.times.join("min, ")}min
              </Typography>
              {/* Ewentualnie przyciski Edycja/Usuń, ale tylko jeśli isOwner */}
            </Box>
          ))}
        </Box>
      )}

      {isEditing && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Dodaj nową usługę</Typography>
          <TextField
            label="Nazwa usługi"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            fullWidth
            sx={{ my: 1 }}
          />
          <TextField
            label="Opis usługi"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            fullWidth
            sx={{ my: 1 }}
          />
          <TextField
            label="Cena (PLN)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            sx={{ my: 1 }}
            type="number"
          />
          <TextField
            label="Przedziały czasowe (np. 30,60)"
            value={times}
            onChange={(e) => setTimes(e.target.value)}
            fullWidth
            sx={{ my: 1 }}
            helperText="Lista wartości oddzielonych przecinkiem"
          />
          <Button variant="contained" onClick={handleCreateService}>
            Dodaj usługę
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CollaborationTab;
