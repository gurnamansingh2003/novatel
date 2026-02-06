import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* ABOUT */}
        <div className="footer-column">
          <h3 className="footer-heading">ABOUT NOVATEL SERVICES</h3>
          <div className="footer-underline"></div>
          <p className="footer-text">
            Novatel is a partnership company dealing in sale and
            service of Telecom, Power, Networking and Office Automation
            equipment. It is an ISO 9001:2008 company.
          </p>
        </div>

        {/* PARTNERS */}
        <div className="footer-column">
          <h3 className="footer-heading">OUR KEY PARTNERS</h3>
          <div className="footer-underline"></div>

          <ul className="footer-list">
            <li>Syntel</li>
            <li>NEC</li>
            <li>Lucent</li>
            <li>People Link</li>
          </ul>
        </div>

        {/* ADDRESS */}
        <div className="footer-column">
          <h3 className="footer-heading">ADDRESS</h3>
          <div className="footer-underline"></div>

          <p className="footer-text">
            <strong>NOVATEL SERVICES</strong><br />
            1st floor, Sco 2461-62,<br />
            Sector 22C<br />
            Chandigarh – 160022
          </p>

          <div className="footer-contact">
            <p className="footer-contact-item">
              <span className="footer-icon">📞</span>
              <span>
                <a href="tel:+919417207294" className="footer-link">09417207294</a>
                {", "}
                <a href="tel:+919417033842" className="footer-link">9417033842</a>
              </span>
            </p>
            <p className="footer-contact-item">
              <span className="footer-icon">✉️</span>
              <a href="mailto:novatelservices@gmail.com" className="footer-link">
                novatelservices@gmail.com
              </a>
            </p>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2024 Novatel Services. All rights reserved.</p>
      </div>
    </footer>
  );
}