import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchUserPetsQuery } from "../features/pets/petsApi";
import {
  useCreateChannelMutation,
  useFetchChannelsQuery,
} from "../features/channels/channelsApi";
import { useSearchUsersQuery } from "../features/search/searchApi";
import { useGetUserByIdQuery } from "../features/user/userApi";

export const ChannelsListPage = () => {
  const navigate = useNavigate();

  // Pobieramy aktualne współprace
  const { data: channels, isLoading, error } = useFetchChannelsQuery();

  // Mutacja tworzenia kanału
  const [createChannel] = useCreateChannelMutation();

  // Stan lokalny do formularza wyszukiwania
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Wywołanie zapytania do wyszukiwania użytkowników
  const { data: searchResults } = useSearchUsersQuery(searchEmail, {
    skip: !searchEmail, // zapytanie dopiero po wpisaniu czegokolwiek
  });

  // Gdy wybierzemy użytkownika z wyników
  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setSearchEmail(""); // czyścimy pole, żeby nie spamować
  };

  // Jeśli mamy userId, możemy pobrać jego detale i zwierzaki
  const { data: userDetails } = useGetUserByIdQuery(selectedUserId!, {
    skip: !selectedUserId,
  });
  const { data: userPets } = useFetchUserPetsQuery(selectedUserId!, {
    skip: !selectedUserId,
  });

  // Obsługa tworzenia współpracy
  const handleCreateCollaboration = async () => {
    if (!userDetails || !userPets) return;

    // Tworzymy osobny kanał dla każdego zwierzaka
    for (const pet of userPets) {
      await createChannel({
        name: pet.name,
        description: `Współpraca dla zwierzaka: ${pet.name}`,
        client_email: userDetails.email,
        behaviorist_id: "TU_ID_ZALOGOWANEGO_BEHAWIORYSTY",
      });
    }

    // Po utworzeniu odśwież listę
    // (RTK Query domyślnie zrefetchuje, jeśli klucze się zgadzają –
    //  ew. możesz użyć forceRefetch albo zainwalidować listę)
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Moje współprace</h1>

      {/* Sekcja wyszukiwania i dodawania nowej współpracy */}
      <div style={{ marginBottom: "1rem" }}>
        <h2>Dodaj nową współpracę</h2>
        <div>
          <label>Wpisz e-mail użytkownika: </label>
          <input
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="np. klient@example.com"
          />
        </div>

        {/* Lista wyników wyszukiwania */}
        {searchResults && searchResults.length > 0 && (
          <ul>
            {searchResults.map((user) => (
              <li key={user.id}>
                {user.name} ({user.description})
                <button onClick={() => handleSelectUser(user.id)}>
                  Wybierz
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Wyświetl wybranego użytkownika i jego zwierzaki */}
        {selectedUserId && userDetails && userPets && (
          <div style={{ marginTop: "1rem" }}>
            <h4>
              Wybrany użytkownik: {userDetails.firstName} {userDetails.lastName}
            </h4>
            <p>Zwierzęta:</p>
            <ul>
              {userPets.map((pet) => (
                <li key={pet.id}>
                  {pet.name} - {pet.species}
                </li>
              ))}
            </ul>
            <button onClick={handleCreateCollaboration}>
              Dodaj współpracę dla wszystkich zwierząt
            </button>
          </div>
        )}
      </div>

      {/* Sekcja listy istniejących współprac */}
      <h2>Lista istniejących współprac</h2>
      {isLoading && <p>Ładowanie danych...</p>}
      {error && <p>Wystąpił błąd!</p>}
      {channels && (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {channels.map((channel) => (
            <div
              key={channel.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/wspolprace/${channel.id}`)}
            >
              <h3>{channel.name}</h3>
              <p>ID: {channel.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
