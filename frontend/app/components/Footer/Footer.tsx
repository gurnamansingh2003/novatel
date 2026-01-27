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

          <div className="footer-subscribe">
            <input
              type="email"
              placeholder="Email Address"
              className="footer-input"
            />
            <button className="footer-button">➤</button>
          </div>
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
              <span>09417207294, 9417033842</span>
            </p>
            <p className="footer-contact-item">
              <span className="footer-icon">✉️</span>
              <span>novatelservices@gmail.com</span>
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