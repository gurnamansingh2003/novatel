import "./Footer.css";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* ABOUT */}
        <div>
          <h3 style={styles.heading}>ABOUT NOVATEL TELECOM</h3>
          <div style={styles.underline}></div>
          <p style={styles.text}>
            Novatel is a partnership company dealing in sale and
            service of Telecom, Power, Networking and Office Automation
            equipment. It is an ISO 9001:2008 company.
          </p>

          <div style={styles.subscribe}>
            <input
              placeholder="Email Address"
              style={styles.input}
            />
            <button style={styles.button}>➤</button>
          </div>
        </div>

        {/* PARTNERS */}
        <div>
          <h3 style={styles.heading}>OUR KEY PARTNERS</h3>
          <div style={styles.underline}></div>

          <ul style={styles.list}>
            <li>Syntel </li>
            <li>NEC</li>
            <li>Lucent</li>
            <li>People Link</li>
          </ul>
        </div>

        {/* ADDRESS */}
        <div>
          <h3 style={styles.heading}>ADDRESS</h3>
          <div style={styles.underline}></div>

          <p style={styles.text}>
            <strong>NOVATEL TELECOM </strong><br />
            2nd floor, Sco 2461-62,<br />
            Sector 22C<br />
            Chandigarh – 160022
          </p>

          <p style={styles.text}>
            📞 09417207294, 09779919479<br />
            ✉️ saar.tech@yahoo.co.in<br />
            ✉️ business@saartech.in
          </p>
        </div>

      </div>
    </footer>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: "#f7f7f7",
    padding: "60px 20px",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
  },

  heading: {
    fontSize: "18px",
    fontWeight: 700,
    marginBottom: "6px",
  },

  underline: {
    width: "60px",
    height: "3px",
    backgroundColor: "#3b3fe3",
    marginBottom: "16px",
  },

  text: {
    fontSize: "14px",
    lineHeight: 1.6,
    color: "rgba(39, 38, 38, 1)",
  },

  list: {
    listStyle: "none",
    padding: 0,
    fontSize: "14px",
    color: "#444",
    lineHeight: 2,
  },

  subscribe: {
    display: "flex",
    marginTop: "16px",
    flexWrap: "wrap" as const,
  },

  input: {
    flex: 1,
    padding: "10px",
    border: "2px solid #3b3fe3",
    outline: "none",
    minWidth: "200px",
  },

  button: {
    padding: "0 18px",
    backgroundColor: "#3b3fe3",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
