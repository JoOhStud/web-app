import { useParams } from "react-router-dom";
import { useFetchChannelQuery } from "../features/channels/channelsApi";
import { CircularProgress } from "@mui/material";
import { useGetUserByIdQuery } from "../features/user/userApi";

export const ChannelDetailsPage = () => {
  const { channelId } = useParams();
  const { data: channel, isLoading } = useFetchChannelQuery(channelId!, {
    skip: !channelId,
  });

  const clientId = channel?.client_id || null;
  const { data: clientDetails } = useGetUserByIdQuery(clientId!, {
    skip: !clientId,
  });

  if (isLoading) {
    return <CircularProgress />;
  }
  if (!channel) {
    return <p>Nie znaleziono współpracy!</p>;
  }

  const clientPic = clientDetails?.picture;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Współpraca: {channel.name}</h1>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <img
          src={clientPic}
          alt="Zdjęcie klienta"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div style={{ marginLeft: "1rem" }}>
          <p>Klient ID: {clientId}</p>
          <p>
            {clientDetails?.firstName} {clientDetails?.lastName}
          </p>
          {/* Inne podstawowe informacje o współpracy, np. opis, data utworzenia itp. */}
        </div>
      </div>

      {/* Prosty „system” tabów */}
      <div style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
        <button>Galeria</button>
        <button>Posty</button>
        <button>Kalendarz</button>
      </div>

      {/* Kontent zależny od wybranego taba – do zaimplementowania według potrzeb */}
      <div>
        <p>
          Tu możesz zaimplementować: Galerię, listę Postów i Kalendarz
          współpracy.
        </p>
      </div>
    </div>
  );
};
