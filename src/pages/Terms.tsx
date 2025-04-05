import React from "react";

const TermsPage: React.FC = () => {
  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Regulamin Aplikacji</h1>
      <p>
        Niniejszy Regulamin określa zasady korzystania z aplikacji
        <strong> Paw Connect</strong>, dostępnej pod adresem
        <strong> {window.location.origin} </strong>.
      </p>

      <h2>1. Definicje</h2>
      <ul>
        <li>
          <strong>Aplikacja</strong> – serwis internetowy dostępny pod adresem
          {window.location.origin}, umożliwiający komunikację behawiorystów oraz
          właścicieli psów i publikowanie treści o tej tematyce.
        </li>
        <li>
          <strong>Użytkownik</strong> – każda osoba korzystająca z Aplikacji.
        </li>
      </ul>

      <h2>2. Postanowienia ogólne</h2>
      <ol>
        <li>
          Korzystanie z Aplikacji jest równoznaczne z akceptacją niniejszego
          Regulaminu.
        </li>
        <li>
          Regulamin określa prawa i obowiązki Użytkowników, a także prawa,
          obowiązki i zakres odpowiedzialności Właściciela.
        </li>
        <li>
          Warunkiem korzystania z Aplikacji jest zapoznanie się i zaakceptowanie
          Regulaminu.
        </li>
      </ol>

      <h2>3. Zasady korzystania z Aplikacji</h2>
      <ol>
        <li>
          Użytkownicy mogą korzystać z Aplikacji w sposób zgodny z jej
          przeznaczeniem oraz przepisami prawa.
        </li>
        <li>
          Zabronione jest dostarczanie treści o charakterze bezprawnym,
          wulgarnym, obraźliwym lub naruszającym prawa osób trzecich.
        </li>
        <li>
          Właściciel zastrzega sobie prawo do zablokowania konta Użytkownika, w
          przypadku naruszenia Regulaminu lub przepisów prawa.
        </li>
      </ol>

      <h2>4. Odpowiedzialność</h2>
      <ol>
        <li>
          Właściciel nie ponosi odpowiedzialności za przerwy w działaniu
          Aplikacji spowodowane przyczynami technicznymi.
        </li>
        <li>
          Właściciel nie ponosi odpowiedzialności za skutki wykorzystania przez
          Użytkowników informacji zamieszczonych w Aplikacji.
        </li>
        <li>
          Użytkownik ponosi wyłączną odpowiedzialność za swoje działania
          związane z korzystaniem z Aplikacji.
        </li>
      </ol>

      <h2>5. Reklamacje</h2>
      <ol>
        <li>
          Reklamacje dotyczące funkcjonowania Aplikacji można zgłaszać za
          pośrednictwem poczty e-mail na adres: paw-connect.gmail.com.
        </li>
        <li>
          Reklamacje zostaną rozpatrzone w terminie 14 dni od daty zgłoszenia.
        </li>
      </ol>

      <h2>6. Postanowienia końcowe</h2>
      <ol>
        <li>
          Właściciel zastrzega sobie prawo do zmiany Regulaminu w każdym czasie.
        </li>
        <li>
          Zmiany Regulaminu będą publikowane w Aplikacji i wchodzą w życie z
          dniem ich publikacji.
        </li>
        <li>
          W sprawach nieuregulowanych w Regulaminie stosuje się przepisy
          obowiązującego prawa polskiego.
        </li>
      </ol>

      <p>
        Data ostatniej aktualizacji regulaminu: <strong>01.03.2025</strong>.
      </p>
    </div>
  );
};

export default TermsPage;
