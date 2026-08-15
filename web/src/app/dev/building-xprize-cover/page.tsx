import { BuildingXprizeStartingGridCover } from "@/components/blog/BuildingXprizeStartingGridCover";

export default function BuildingXprizeCoverPreviewPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px",
        background: "#f4eee8",
      }}
    >
      <div
        style={{
          width: "min(1440px, 100%)",
          aspectRatio: "16 / 9",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 28px 80px rgba(82, 70, 58, 0.18)",
          background: "#fffaf6",
        }}
      >
        <BuildingXprizeStartingGridCover
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>
    </main>
  );
}
