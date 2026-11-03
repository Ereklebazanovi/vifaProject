import { useEffect, useState } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import type { User } from "firebase/auth";
import { LogOut, PenLine, Users } from "lucide-react";
import { checkAdminAccess, signInWithGoogle, signOutAdmin, watchAuth } from "./auth";
import { subscribeContacts, type Contact } from "./contacts/contactsService";
import { btnPrimary, btnSecondary } from "./ui";

type Status = "checking" | "anon" | "denied" | "authed";

export interface AdminContext {
  user: User;
  contacts: Contact[];
  contactsLoading: boolean;
  contactsError: string;
}

export const useAdmin = () => useOutletContext<AdminContext>();

const NAV = [
  { to: "contacts", label: "კონტაქტები", hint: "ვინც საიტზე ფორმა შეავსო", Icon: Users },
  { to: "blog", label: "ბლოგი", hint: "სტატიები საიტზე", Icon: PenLine },
];

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
    <div className="studio min-h-screen bg-slate-50 text-slate-900">
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
            <p className="mt-1 text-slate-500">VIFA-ს სამუშაო სივრცე: კონტაქტები და ბლოგი.</p>
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
          <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 md:flex">
            <div className="px-2"><Logo /></div>
            <nav className="mt-8 grid gap-1">
              {NAV.map(({ to, label, hint, Icon }) => (
                <NavLink key={to} to={to}
                  className={({ isActive }) =>
                    `flex items-start gap-3 rounded-xl px-3 py-2.5 transition ${
                      isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}>
                  <Icon size={18} className="mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-sm font-medium">{label}</span>
                    <span className="block text-xs text-slate-400">{hint}</span>
                  </span>
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto border-t border-slate-200 px-2 pt-4">
              <p className="truncate text-xs text-slate-500">{user.email}</p>
              <button onClick={signOutAdmin} className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900">
                <LogOut size={14} />გასვლა
              </button>
            </div>
          </aside>

          {/* Phone: top bar with tabs */}
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white md:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <Logo />
              <button onClick={signOutAdmin} className="text-slate-500" aria-label="გასვლა"><LogOut size={18} /></button>
            </div>
            <nav className="flex gap-1 px-2 pb-2">
              {NAV.map(({ to, label, Icon }) => (
                <NavLink key={to} to={to}
                  className={({ isActive }) =>
                    `flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-sm ${
                      isActive ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600"
                    }`}>
                  <Icon size={15} />{label}
                </NavLink>
              ))}
            </nav>
          </header>

          <main className="min-w-0 flex-1 px-4 py-6 md:px-10 md:py-10">
            <div className="mx-auto w-[min(100%,64rem)]">
              <Outlet context={{ user, contacts, contactsLoading, contactsError } satisfies AdminContext} />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

const Logo = () => (
  <span className="inline-flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">V</span>
    <span className="font-semibold tracking-tight text-slate-900">VIFA Studio</span>
  </span>
);

const Centered = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen items-center justify-center px-5">{children}</div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="w-[min(100%,26rem)] rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">{children}</div>
);

export default AdminLayout;
