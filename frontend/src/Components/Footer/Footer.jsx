 // ----- Importing the LangBtn component

import LangBtn from "../LangBtn/LangBtn";


// ----- Importing the stylesheet for Footer

import "./Footer.css"; 


const Footer = () => {
  return (
    <div className="footer">
      <div className="footerTop">
        <div>
          <ul>
            <li className="footerHeading">Läs mer</li>
            <li>Bli återförsäljare</li>
            <li>Webbshop för återförsäljare</li>
            <li>Jobba hos oss</li>
            <li>Press</li>
            <li>Om oss</li>
            <li>FAQ</li>
            <li>Integritetspolicy</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="footerHeading">Handla</li>
            <li>Ansiktsvård</li>
            <li>Kroppsvård</li>
            <li>Hårvård</li>
            <li>Makeup</li>
            <li>Baby</li>
            <li>Sol</li>
            <li>Kost - och mineraltillskott</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="footerHeading">Följ oss</li>
            <li>Facebook</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="footerHeading">Kontakta oss</li>
            <li>
              COCONUT AB Lotion vägen 33 43434 Stockholm, Sverige
              info@coconut.com
            </li>
            <li>info@coconut.com</li>
            <li>+46 8 - 33 00 00</li>
          </ul>
        </div>
        <div className="footerIconDiv">
          <img src="../../../src/assets/logoFooter.png" alt="logo" />
          <p>MADE IN SWEDEN</p>
        </div>
      </div>
      <div className="footerBottom">
        <img src="../../../src/assets/payments.png" alt="payments" />
        <div className="copywrite">
          <p>2024 © SARA PELLNOR</p>
          <LangBtn />
        </div>
      </div>
    </div>
  );
};

export default Footer;
