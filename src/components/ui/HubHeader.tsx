import "./hubHeader.css";

// Header of the two hub pages (/it and /services/marketing). The subtitle stays inside the h1 so the
// heading keeps its full text for search, but it is shown as a smaller gray line under the title.
export function HubHeader({ id, title, subtitle }: { id?: string; title: string; subtitle: string }) {
  return (
    <header className="hub-header">
      <h1 id={id}>
        <span className="hub-header-title">{title}</span>{" "}
        <span className="hub-header-subtitle">{subtitle}</span>
      </h1>
    </header>
  );
}
