import React from "react";

const CookiesPage: React.FC = () => {
  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Polityka Cookies</h1>
      <p>
        Poniższe informacje dotyczą plików „cookies” stosowanych w ramach
        Aplikacji <strong>Paw Connect</strong>, dostępnej pod adresem
        <strong> {window.location.origin}</strong>.
      </p>

      <h2>1. Czym są pliki cookies?</h2>
      <p>
        Pliki cookies to niewielkie pliki tekstowe zapisywane na urządzeniu
        końcowym Użytkownika (np. komputerze, smartfonie), umożliwiające
        rozpoznanie Użytkownika i odpowiednie dostosowanie wyświetlania
        zawartości Aplikacji.
      </p>

      <h2>2. Rodzaje wykorzystywanych plików cookies</h2>
      <ul>
        <li>
          <strong>Cookies sesyjne</strong> – przechowywane w urządzeniu
          Użytkownika do momentu wylogowania lub zamknięcia przeglądarki.
        </li>
        <li>
          <strong>Cookies stałe</strong> – przechowywane w urządzeniu
          Użytkownika przez określony czas lub do momentu ich usunięcia.
        </li>
        <li>
          <strong>Cookies podmiotów zewnętrznych</strong> – pliki cookies
          pochodzące z serwisów zewnętrznych, których funkcjonalność została
          zaimplementowana w Aplikacji.
        </li>
      </ul>

      <h2>3. Cel wykorzystania plików cookies</h2>
      <ul>
        <li>Zapewnienie prawidłowego działania Aplikacji.</li>
        <li>
          Ułatwienie korzystania z funkcjonalności Aplikacji (np. zapamiętywanie
          preferencji Użytkownika).
        </li>
        <li>
          Tworzenie statystyk i analiz umożliwiających ulepszanie Aplikacji.
        </li>
      </ul>

      <h2>4. Zarządzanie plikami cookies</h2>
      <p>
        Użytkownik może w każdej chwili dokonać zmiany ustawień dotyczących
        plików cookies, np. zablokować ich obsługę lub usunąć zapisane pliki
        cookies za pomocą ustawień przeglądarki. Ograniczenie stosowania plików
        cookies może wpłynąć na niektóre funkcjonalności dostępne w Aplikacji.
      </p>

      <h2>5. Zmiany w Polityce Cookies</h2>
      <p>
        Właściciel zastrzega sobie prawo do wprowadzania zmian w niniejszej
        Polityce Cookies. Wszelkie zmiany będą publikowane w Aplikacji i będą
        obowiązywać od momentu ich opublikowania.
      </p>

      <p>
        Data ostatniej aktualizacji: <strong>01.03.2025</strong>.
      </p>
    </div>
  );
};

export default CookiesPage;
