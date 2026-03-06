"use client";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "100%",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}
