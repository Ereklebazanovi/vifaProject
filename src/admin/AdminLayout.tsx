import { useEffect, useState } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import type { User } from "firebase/auth";
import { checkAdminAccess, signInWithGoogle, signOutAdmin, watchAuth } from "./auth";
import { subscribeLeads } from "./leads/leadsService";
import type { Lead } from "./leads/types";

type Status = "checking" | "anon" | "denied" | "authed";

export interface AdminContext {
  user: User;
  leads: Lead[];
  leadsLoading: boolean;
  leadsError: string;
}

export const useAdmin = () => useOutletContext<AdminContext>();

/**
 * /studio shell. The gate here is a convenience; the real lock is
 * firestore.rules, which refuses every admin read/write to accounts outside
 * the allowlist, whatever this component shows.
 */
const AdminLayout = () => {
  const [status, setStatus] = useState<Status>("checking");
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsError, setLeadsError] = useState("");

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
    setLeadsLoading(true);
    return subscribeLeads(
      (data) => {
        setLeads(data);
        setLeadsLoading(false);
        setLeadsError("");
      },
      (e) => {
        console.error(e);
        setLeadsError("ლიდების ჩატვირთვა ვერ მოხერხდა.");
        setLeadsLoading(false);
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
    <div className="studio min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>VIFA Studio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {status === "checking" && <Centered>იტვირთება…</Centered>}

      {status === "anon" && (
        <Centered>
          <div className="w-[min(100%,24rem)] rounded-xl border border-slate-700 bg-slate-900 p-6 text-left text-white">
            <h1 className="text-lg font-bold">VIFA Studio</h1>
            <p className="mt-1 text-sm text-slate-400">შესვლა მხოლოდ ადმინის ანგარიშით.</p>
            <button
              onClick={onSignIn}
              className="mt-5 w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold hover:bg-indigo-500"
            >
              Google-ით შესვლა
            </button>
            {authError && <p className="mt-3 text-sm text-rose-400">{authError}</p>}
          </div>
        </Centered>
      )}

      {status === "denied" && (
        <Centered>
          <div className="w-[min(100%,24rem)] rounded-xl border border-slate-700 bg-slate-900 p-6 text-left text-white">
            <h1 className="text-lg font-bold">წვდომა არ არის</h1>
            <p className="mt-2 text-sm text-slate-400">
              {user?.email} ადმინების სიაში არ არის.
            </p>
            <button
              onClick={signOutAdmin}
              className="mt-5 w-full rounded-lg border border-slate-600 px-4 py-2.5 hover:bg-slate-800"
            >
              სხვა ანგარიშით შესვლა
            </button>
          </div>
        </Centered>
      )}

      {status === "authed" && user && (
        <>
          <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
            <div className="mx-auto flex w-[min(100%,72rem)] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
              <span className="font-bold tracking-tight">VIFA Studio</span>
              <nav className="flex gap-1 text-sm">
                <Tab to="today">დღეს</Tab>
                <Tab to="leads">ლიდები</Tab>
                <Tab to="blog">ბლოგი</Tab>
              </nav>
              <div className="ml-auto flex items-center gap-3 text-xs text-slate-400">
                <span className="hidden sm:inline">{user.email}</span>
                <button onClick={signOutAdmin} className="rounded-md border border-slate-700 px-2.5 py-1 hover:bg-slate-800">
                  გასვლა
                </button>
              </div>
            </div>
          </header>
          <main className="mx-auto w-[min(100%,72rem)] px-4 py-6">
            <Outlet context={{ user, leads, leadsLoading, leadsError } satisfies AdminContext} />
          </main>
        </>
      )}
    </div>
  );
};

const Centered = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen items-center justify-center px-5 text-center text-sm text-slate-400">
    {children}
  </div>
);

const Tab = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `rounded-md px-3 py-1.5 ${isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`
    }
  >
    {children}
  </NavLink>
);

export default AdminLayout;
