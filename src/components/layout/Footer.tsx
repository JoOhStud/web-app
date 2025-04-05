import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.footer`
  /* przykładowe style – dostosuj według potrzeb */
  padding: 16px;
  text-align: center;
  margin-top: auto; /* dzięki temu stopka będzie na dole */
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div>
        <Link to="/regulamin">Regulamin</Link> |{" "}
        <Link to="/polityka-prywatnosci">Polityka Prywatności</Link> |{" "}
        <Link to="/cookies">Informacje o Cookies</Link>
      </div>
      <small>© 2025 Paw Connect. Wszystkie prawa zastrzeżone.</small>
    </FooterContainer>
  );
};

export default Footer;
