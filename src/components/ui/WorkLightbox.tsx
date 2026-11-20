import { useId, useLayoutEffect, useRef } from "react";
import { X } from "lucide-react";
import "./marketingWork.css";

export type WorkMedia =
  | { kind: "photo"; src: string; label: string }
  | { kind: "reel"; id: string; label: string };

export type WorkSelection = { item: WorkMedia; trigger: HTMLButtonElement };

export function WorkLightbox({ selection, language, onClose, playOnOpen = true }: {
  selection: WorkSelection;
  language: "ka" | "en";
  onClose: () => void;
  playOnOpen?: boolean;
}) {
  const { item, trigger } = selection;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const backdropPress = useRef(false);
  const dialogTitle = useId();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, []);

  function closeMedia() {
    dialogRef.current?.close();
    onClose();
    trigger.focus({ preventScroll: true });
  }

  return (
    <dialog ref={dialogRef} className="marketing-lightbox" data-kind={item.kind} aria-labelledby={dialogTitle}
      onCancel={event => { event.preventDefault(); closeMedia(); }}
      onPointerDown={event => { backdropPress.current = event.target === event.currentTarget; }}
      onClick={event => {
        if (backdropPress.current && event.target === event.currentTarget) closeMedia();
        backdropPress.current = false;
      }}>
      <div className="marketing-lightbox-panel">
        <div className="marketing-lightbox-bar">
          <p id={dialogTitle}>{item.label}</p>
          <button ref={closeRef} type="button" className="marketing-lightbox-close" onClick={closeMedia}
            aria-label={language === "ka" ? "დახურვა" : "Close"}><X size={22} aria-hidden="true" /></button>
        </div>
        {item.kind === "photo"
          ? <img className="marketing-lightbox-photo" src={item.src} alt={item.label} />
          : <iframe className="marketing-lightbox-video" title={item.label}
              src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=${playOnOpen ? 1 : 0}&playsinline=1`}
              allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />}
      </div>
    </dialog>
  );
}
