import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import type { User } from "firebase/auth";
import { ChartColumn, Eye, EyeOff, Inbox, SquareKanban, LayoutDashboard, LogOut, PenLine, Send, Users, X } from "lucide-react";
import { checkAdminAccess, signInWithGoogle, signOutAdmin, watchAuth } from "./auth";
import { formatPhone, maskEmail, maskPhone, PRODUCT_LABELS, subscribeContacts, type Contact } from "./contacts/contactsService";
import { btnPrimary, btnSecondary } from "./ui";

type Status = "checking" | "anon" | "denied" | "authed";

export interface AdminContext {
  user: User;
  contacts: Contact[];
  contactsLoading: boolean;
  contactsError: string;
  /** Screen shown to others: phone numbers and emails are partly hidden everywhere. */
  privacy: boolean;
}

export const useAdmin = () => useOutletContext<AdminContext>();

/** Phone and email as they may be shown right now (masked in privacy mode). */
export function useShow() {
  const { privacy } = useAdmin();
  return {
    phone: (d?: string) => (privacy ? maskPhone(d) : formatPhone(d)),
    email: (e?: string) => (privacy ? maskEmail(e) : e || ""),
  };
}

const NAV = [
  { items: [{ to: "overview", label: "მიმოხილვა", Icon: LayoutDashboard }] },
  {
    title: "გაყიდვები",
    items: [
      { to: "pipeline", label: "გაყიდვების დაფა", Icon: SquareKanban },
      { to: "contacts", label: "კონტაქტები", Icon: Users },
    ],
  },
  {
    title: "მარკეტინგი",
    items: [
      { to: "campaigns", label: "კამპანიები", Icon: Send },
      { to: "sources", label: "წყაროები", Icon: ChartColumn },
      { to: "blog", label: "ბლოგი", Icon: PenLine },
    ],
  },
];
const NAV_ITEMS = NAV.flatMap((g) => g.items);

const PRIVACY_KEY = "studio_privacy";
const readPrivacy = () => {
  try {
    return localStorage.getItem(PRIVACY_KEY) === "1";
  } catch {
    return false;
  }
};

/**
 * /studio shell. The gate here is a convenience; the real lock is
 * firestore.rules, which refuses every admin read/write to accounts outside
 * the allowlist, whatever this component shows.
 */
const AdminLayout = () => {
  const [status, setStatus] = useState<Status>("checking");
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [contactsError, setContactsError] = useState("");
  const [privacy, setPrivacy] = useState(readPrivacy);
  const seenRef = useRef<Map<string, number> | null>(null);
  const [alerts, setAlerts] = useState<Contact[]>([]);
  const location = useLocation();
  const section = NAV_ITEMS.find((i) => location.pathname.startsWith(`/studio/${i.to}`))?.label || "";

  const togglePrivacy = () =>
    setPrivacy((on) => {
      try {
        localStorage.setItem(PRIVACY_KEY, on ? "0" : "1");
      } catch {
        /* storage blocked: the switch still works for this visit */
      }
      return !on;
    });

  useEffect(
    () =>
      watchAuth(async (u) => {
        setUser(u);
        if (!u) return setStatus("anon");
        setStatus("checking");
        try {
          setStatus((await checkAdminAccess()) ? "authed" : "denied");
        } catch (e) {
          console.error(e);
          setAuthError("Firestore-თან კავშირი ვერ მოხერხდა. სცადე თავიდან.");
          setStatus("anon");
        }
      }),
    []
  );

  // One live subscription for the whole panel, shared by every page via context.
  useEffect(() => {
    if (status !== "authed") return;
    setContactsLoading(true);
    return subscribeContacts(
      (data) => {
        // Someone just wrote (site form, Facebook form): a notice and a soft chime.
        const now = Date.now();
        const next = new Map(data.map((c) => [c.id, c.lastSeenAt?.toMillis() ?? 0]));
        const prev = seenRef.current;
        if (prev) {
          const fresh = data.filter((c) => {
            const t = next.get(c.id) || 0;
            return c.sources?.some((s) => s === "site" || s === "meta") && t > (prev.get(c.id) ?? 0) && now - t < 5 * 60e3;
          });
          if (fresh.length) {
            setAlerts((a) => [...fresh, ...a.filter((x) => !fresh.some((f) => f.id === x.id))].slice(0, 3));
            chime();
          }
        }
        seenRef.current = next;
        setContacts(data);
        setContactsLoading(false);
        setContactsError("");
      },
      (e) => {
        console.error(e);
        setContactsError("კონტაქტების ჩატვირთვა ვერ მოხერხდა.");
        setContactsLoading(false);
      }
    );
  }, [status]);

  const onSignIn = async () => {
    setAuthError("");
    try {
      await signInWithGoogle();
    } catch (e) {
      const code = (e as { code?: string }).code || "";
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return;
      setAuthError(
        code === "auth/unauthorized-domain"
          ? "ეს დომენი Firebase-ის Authorized domains-ში არ არის დამატებული."
          : code === "auth/operation-not-allowed"
            ? "Firebase-ში Google-ით შესვლა ჯერ ჩართული არ არის."
            : "შესვლა ვერ მოხერხდა. სცადე თავიდან."
      );
    }
  };

  return (
    <div className="studio min-h-screen bg-[#f5f6f8] text-slate-900">
      <Helmet>
        <title>VIFA Studio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {status === "checking" && <Centered><p className="text-slate-500">იტვირთება…</p></Centered>}

      {status === "anon" && (
        <Centered>
          <Card>
            <Logo />
            <h1 className="mt-6 text-xl font-semibold">შესვლა</h1>
            <p className="mt-1 text-slate-500">VIFA-ს სამუშაო სივრცე: მიმოხილვა, კონტაქტები, კამპანიები და ბლოგი.</p>
            <button onClick={onSignIn} className={`${btnPrimary} mt-6 w-full py-3`}>Google-ით შესვლა</button>
            {authError && <p className="mt-3 text-sm text-rose-600">{authError}</p>}
          </Card>
        </Centered>
      )}

      {status === "denied" && (
        <Centered>
          <Card>
            <Logo />
            <h1 className="mt-6 text-xl font-semibold">წვდომა არ არის</h1>
            <p className="mt-1 text-slate-500">{user?.email} ამ სივრცეში შესვლის უფლება არ აქვს.</p>
            <button onClick={signOutAdmin} className={`${btnSecondary} mt-6 w-full py-3`}>სხვა ანგარიშით შესვლა</button>
          </Card>
        </Centered>
      )}

      {status === "authed" && user && (
        <div className="md:flex">
          {/* Desktop: side menu */}
          <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white px-3 py-5 md:flex">
            <div className="px-2.5"><Logo /></div>
            <nav className="mt-7 space-y-6">
              {NAV.map((group, i) => (
                <div key={i}>
                  {group.title && (
                    <p className="mb-1.5 px-2.5 text-[11px] font-medium uppercase tracking-wider text-slate-400">{group.title}</p>
                  )}
                  <div className="grid gap-0.5">
                    {group.items.map(({ to, label, Icon }) => (
                      <NavLink key={to} to={to}
                        className={({ isActive }) =>
                          `group flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[14px] transition ${
                            isActive ? "bg-slate-100 font-medium text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}>
                        {({ isActive }) => (
                          <>
                            <Icon size={17} className={isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"} />
                            {label}
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <div className="mt-auto flex items-center gap-2.5 border-t border-slate-200 px-2 pt-4">
              <Avatar user={user} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{user.displayName || user.email}</p>
                <p className="truncate text-xs text-slate-400">{user.email}</p>
              </div>
              <button onClick={signOutAdmin} title="გასვლა" aria-label="გასვლა"
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                <LogOut size={15} />
              </button>
            </div>
          </aside>

          {/* Phone: top bar with tabs */}
          <div className="min-w-0 flex-1">
            {/* Desktop: slim top bar (where you are, privacy switch) */}
            <header className="sticky top-0 z-30 hidden h-14 items-center justify-between border-b border-slate-200 bg-white/85 px-10 backdrop-blur md:flex">
              <p className="text-sm text-slate-500">
                VIFA Studio<span className="mx-2 text-slate-300">/</span>
                <span className="font-medium text-slate-800">{section}</span>
              </p>
              <PrivacyButton on={privacy} onClick={togglePrivacy} />
            </header>

            {/* Phone: top bar with tabs */}
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white md:hidden">
              <div className="flex items-center justify-between gap-2 px-4 py-3">
                <Logo />
                <span className="flex items-center gap-1">
                  <PrivacyButton on={privacy} onClick={togglePrivacy} compact />
                  <button onClick={signOutAdmin} className="rounded-md p-2 text-slate-500" aria-label="გასვლა"><LogOut size={18} /></button>
                </span>
              </div>
              <nav className="flex gap-1 overflow-x-auto px-2 pb-2">
                {NAV_ITEMS.map(({ to, label, Icon }) => (
                  <NavLink key={to} to={to}
                    className={({ isActive }) =>
                      `flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm ${
                        isActive ? "bg-slate-100 font-medium text-slate-900" : "text-slate-600"
                      }`}>
                    <Icon size={15} />{label}
                  </NavLink>
                ))}
              </nav>
            </header>

            <main className="px-4 py-6 md:px-10 md:py-8">
              <div className="mx-auto w-[min(100%,72rem)]">
                <Outlet context={{ user, contacts, contactsLoading, contactsError, privacy } satisfies AdminContext} />
              </div>
            </main>
          </div>

          {alerts.length > 0 && (
            <div className="fixed bottom-4 right-4 z-60 grid w-[min(calc(100%-2rem),22rem)] gap-2" aria-live="polite">
              {alerts.map((c) => (
                <NewLeadNotice key={c.id} c={c} privacy={privacy} onClose={() => setAlerts((a) => a.filter((x) => x.id !== c.id))} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Logo = () => (
  <span className="inline-flex items-center gap-2">
    <span className="h-8 w-8 overflow-hidden rounded-lg bg-black ring-1 ring-slate-900/10">
      <img src="/viffa.png" alt="" className="h-full w-full scale-[1.15] object-cover" />
    </span>
    <span className="leading-tight">
      <span className="block text-[14px] font-semibold tracking-tight text-slate-900">VIFA Studio</span>
      <span className="block text-[11px] text-slate-400">VIFA Digital</span>
    </span>
  </span>
);

/** Two soft notes, made in the browser (no sound file). Silently skipped if audio is blocked. */
function chime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    [880, 1318.5].forEach((freq, i) => {
      const start = ctx.currentTime + i * 0.16;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.12, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.45);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.5);
    });
    setTimeout(() => ctx.close(), 1500);
  } catch {
    /* no audio: the notice is enough */
  }
}

/** "Someone just wrote": stays 20 seconds, opens the person's card. */
function NewLeadNotice({ c, privacy, onClose }: { c: Contact; privacy: boolean; onClose: () => void }) {
  // The parent re-renders on every live update; keep one timer per notice regardless.
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const t = setTimeout(() => close.current(), 20000);
    return () => clearTimeout(t);
  }, [c.id]);
  const who = c.name || (privacy ? maskPhone(c.phone) || maskEmail(c.email) : formatPhone(c.phone) || c.email);
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-lg ring-1 ring-slate-900/5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600"><Inbox size={17} /></span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">ახალი მომართვა</p>
        <p className="truncate text-sm text-slate-600">{[who, PRODUCT_LABELS[c.lastProduct || ""]].filter(Boolean).join(" · ")}</p>
        <Link to={`/studio/contacts?c=${encodeURIComponent(c.id)}`} onClick={onClose} className="mt-1.5 inline-block text-sm font-medium text-indigo-600 hover:underline">
          ბარათის გახსნა
        </Link>
      </div>
      <button onClick={onClose} aria-label="დახურვა" className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={15} /></button>
    </div>
  );
}

/** Eye switch: hides phone numbers and emails before the screen is shown to someone else. */
const PrivacyButton = ({ on, onClick, compact = false }: { on: boolean; onClick: () => void; compact?: boolean }) => (
  <button
    onClick={onClick}
    aria-pressed={on}
    aria-label={on ? "მონაცემები დაფარულია" : "მონაცემების დაფარვა"}
    title={on ? "ნომრები და მეილები დაფარულია. დააჭირე, რომ გამოჩნდეს" : "დაფარე ნომრები და მეილები, როცა ეკრანს სხვას აჩვენებ"}
    className={`inline-flex items-center gap-2 rounded-lg border text-sm transition ${compact ? "p-2" : "px-3 py-1.5"} ${
      on ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`}
  >
    {on ? <EyeOff size={15} /> : <Eye size={15} />}
    {!compact && (on ? "მონაცემები დაფარულია" : "მონაცემების დაფარვა")}
  </button>
);

const Avatar = ({ user }: { user: User }) =>
  user.photoURL ? (
    <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="h-8 w-8 shrink-0 rounded-full" />
  ) : (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-600">
      {(user.displayName || user.email || "?")[0].toUpperCase()}
    </span>
  );

const Centered = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen items-center justify-center px-5">{children}</div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="w-[min(100%,26rem)] rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">{children}</div>
);

export default AdminLayout;
