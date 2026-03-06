export default function Footer() {
  return (
    <footer
      style={{
        background: "#1a1a2e",
        color: "#a0aec0",
        textAlign: "center",
        padding: "16px 24px",
        fontSize: "14px",
        marginTop: "auto",
      }}
    >
      <p>&copy; {new Date().getFullYear()} NoteHub</p>
    </footer>
  );
}
