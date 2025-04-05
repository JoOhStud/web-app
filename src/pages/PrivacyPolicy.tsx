import React from "react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Polityka Prywatności</h1>
      <p>
        Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony
        danych osobowych Użytkowników w związku z korzystaniem z Aplikacji
        <strong> Paw Connect</strong>, dostępnej pod adresem
        <strong> {window.location.origin}</strong>.
      </p>

      <h2>1. Administrator danych osobowych</h2>
      <p>
        Administratorem danych osobowych jest <strong>Paw Connect</strong>, z
        siedzibą w<strong> Łódź, ul. Psiej Łapki 15 </strong>, e-mail:
        <strong> paw-connect@gmail.com </strong>.
      </p>

      <h2>2. Zakres i cel przetwarzania danych</h2>
      <ul>
        <li>
          Dane osobowe Użytkowników przetwarzane są w celu zapewnienia
          prawidłowego działania Aplikacji (np. rejestracja konta, logowanie,
          obsługa zapytań).
        </li>
        <li>
          Mogą być także przetwarzane w celach marketingowych, o ile Użytkownik
          wyrazi na to zgodę.
        </li>
      </ul>

      <h2>3. Podstawa prawna przetwarzania</h2>
      <p>
        Dane osobowe przetwarzane są na podstawie zgody Użytkownika oraz w
        przypadkach, w których przepisy prawa uprawniają do przetwarzania danych
        w celu realizacji umowy lub wypełnienia obowiązku prawnego ciążącego na
        Administratorze.
      </p>

      <h2>4. Prawa Użytkownika</h2>
      <ul>
        <li>
          Użytkownik ma prawo dostępu do swoich danych oraz prawo żądania ich
          sprostowania, usunięcia lub ograniczenia przetwarzania.
        </li>
        <li>
          Użytkownik ma prawo do przenoszenia danych, wniesienia sprzeciwu oraz
          cofnięcia zgody w dowolnym momencie, bez wpływu na zgodność z prawem
          przetwarzania, którego dokonano na podstawie zgody przed jej
          cofnięciem.
        </li>
        <li>
          W celu realizacji powyższych uprawnień należy skontaktować się z
          Administratorem pod adresem e-mail: paw-connect@gmail.com.
        </li>
      </ul>

      <h2>5. Okres przechowywania danych</h2>
      <p>
        Dane osobowe będą przechowywane przez okres niezbędny do realizacji
        celów wskazanych w niniejszej Polityce Prywatności, bądź do momentu
        wycofania zgody przez Użytkownika.
      </p>

      <h2>6. Odbiorcy danych</h2>
      <p>
        Dane osobowe mogą być przekazywane podmiotom współpracującym z
        Administratorem w zakresie niezbędnym do świadczenia usług, np.
        dostawcom usług IT, firmom hostingowym, podmiotom obsługującym płatności
        online itp.
      </p>

      <h2>7. Środki bezpieczeństwa</h2>
      <p>
        Administrator stosuje odpowiednie środki techniczne i organizacyjne,
        mające na celu zabezpieczenie przetwarzanych danych osobowych
        Użytkowników przed dostępem osób nieuprawnionych.
      </p>

      <h2>8. Postanowienia końcowe</h2>
      <p>
        Administrator zastrzega sobie prawo do zmiany Polityki Prywatności. O
        wszelkich istotnych zmianach Użytkownicy zostaną poinformowani poprzez
        komunikat w Aplikacji.
      </p>

      <p>
        Data ostatniej aktualizacji: <strong>01.03.2025</strong>.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
