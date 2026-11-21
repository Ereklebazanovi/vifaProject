import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  slugify,
} from "../../service/blogService";
import { uploadToCloudinary } from "../../service/cloudinary";
import type { BlogPost, BlogStatus } from "../../types/blog";

// Optional: a Vercel Deploy Hook URL to rebuild the static site after publishing.
const DEPLOY_HOOK = import.meta.env.VITE_VERCEL_DEPLOY_HOOK as string | undefined;

const emptyForm = {
  id: "",
  slug: "",
  title: "",
  description: "",
  coverImage: "",
  contentHtml: "",
  tags: "",
  author: "VIFA Digital",
  status: "draft" as BlogStatus,
  publishedAt: "",
};

const BlogEditor = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [msg, setMsg] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);

  const editing = Boolean(form.id);

  // Custom quill image button → upload to Cloudinary (NOT base64) and insert the URL.
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const editor = quillRef.current?.getEditor?.();
      const range = editor?.getSelection?.(true);
      const at = range ? range.index : 0;
      try {
        editor?.insertText?.(at, "  ⏳ ");
        const url = await uploadToCloudinary(file);
        editor?.deleteText?.(at, 4);
        editor?.insertEmbed?.(at, "image", url);
        editor?.setSelection?.(at + 1, 0);
      } catch (e) {
        console.error(e);
        editor?.deleteText?.(at, 4);
        alert("ფოტოს ატვირთვა ვერ მოხერხდა");
      }
    };
    input.click();
  }, []);

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [imageHandler]
  );

  const onCoverFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    setMsg("");
    try {
      const url = await uploadToCloudinary(file);
      setForm((f) => ({ ...f, coverImage: url }));
    } catch (err) {
      console.error(err);
      setMsg("✗ cover ფოტოს ატვირთვა ვერ მოხერხდა");
    } finally {
      setUploadingCover(false);
    }
  };

  const refresh = () => getAllPosts().then(setPosts).catch((e) => console.error(e));

  useEffect(() => {
    refresh();
  }, []);

  // Auto-generate slug from the title until the user edits the slug manually.
  const autoSlug = useMemo(() => slugify(form.title), [form.title]);
  useEffect(() => {
    if (!slugTouched && !editing) setForm((f) => ({ ...f, slug: autoSlug }));
  }, [autoSlug, slugTouched, editing]);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const loadForEdit = (p: BlogPost) => {
    setForm({
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      coverImage: p.coverImage,
      contentHtml: p.contentHtml,
      tags: p.tags.join(", "),
      author: p.author,
      status: p.status,
      publishedAt: p.publishedAt,
    });
    setSlugTouched(true);
    window.scrollTo(0, 0);
  };

  const reset = () => {
    setForm({ ...emptyForm });
    setSlugTouched(false);
    setMsg("");
  };

  const save = async (status: BlogStatus) => {
    if (!form.title || !form.slug) {
      setMsg("⚠ სათაური და slug აუცილებელია");
      return;
    }
    setSaving(true);
    setMsg("");
    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const publishedAt =
      status === "published" && !form.publishedAt ? new Date().toISOString() : form.publishedAt;
    const payload = {
      slug: form.slug,
      title: form.title,
      description: form.description,
      coverImage: form.coverImage,
      contentHtml: form.contentHtml,
      tags,
      author: form.author || "VIFA Digital",
      status,
      publishedAt: publishedAt || "",
    };
    try {
      if (editing) await updatePost(form.id, payload);
      else await createPost(payload);
      setMsg(status === "published" ? "✓ გამოქვეყნდა" : "✓ შენახულია მონახაზად");
      reset();
      refresh();
    } catch (e) {
      console.error(e);
      setMsg("✗ შეცდომა შენახვისას");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: BlogPost) => {
    if (!confirm(`წავშალო „${p.title}“?`)) return;
    await deletePost(p.id);
    if (form.id === p.id) reset();
    refresh();
  };

  const rebuild = async () => {
    if (!DEPLOY_HOOK) {
      setMsg("⚠ VITE_VERCEL_DEPLOY_HOOK არ არის დაყენებული");
      return;
    }
    try {
      await fetch(DEPLOY_HOOK, { method: "POST" });
      setMsg("✓ საიტის განახლება დაიწყო, 2-3 წუთში მზად იქნება");
    } catch {
      setMsg("✗ საიტის განახლება ვერ დაიწყო");
    }
  };

  const field = "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  return (
    <div className="text-slate-900">
      <div className="w-[min(100%,48rem)]">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">ბლოგი</h1>
          <div className="flex gap-2">
            {DEPLOY_HOOK && (
              <button onClick={rebuild} className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700">
                საიტის განახლება
              </button>
            )}
            {editing && (
              <button onClick={reset} className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                + ახალი სტატია
              </button>
            )}
          </div>
        </div>

        {msg && <div className="mb-4 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">{msg}</div>}

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">სათაური *</label>
            <input className={field} value={form.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">slug (URL) *</label>
              <input
                className={field}
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", e.target.value);
                }}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">tags (მძიმით)</label>
              <input className={field} value={form.tags} onChange={(e) => set("tags", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">აღწერა (meta description, 150-160 სიმბ.)</label>
            <textarea className={field} rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">cover image (1200×630)</label>
            <div className="flex flex-wrap items-center gap-3">
              <label className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                {uploadingCover ? "იტვირთება…" : "ფაილის ატვირთვა"}
                <input type="file" accept="image/*" className="hidden" onChange={onCoverFile} disabled={uploadingCover} />
              </label>
              {form.coverImage && (
                <img src={form.coverImage} alt="" className="h-12 w-20 rounded-md object-cover" />
              )}
            </div>
            <input
              className={`${field} mt-2`}
              value={form.coverImage}
              onChange={(e) => set("coverImage", e.target.value)}
              placeholder="ან ჩასვი URL: https://…"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">ტექსტი</label>
            <div className="overflow-hidden rounded-xl border border-slate-300 bg-white text-slate-900">
              <ReactQuill ref={quillRef} theme="snow" modules={quillModules} value={form.contentHtml} onChange={(v) => set("contentHtml", v)} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              disabled={saving}
              onClick={() => save("published")}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {editing ? "განახლება + გამოქვეყნება" : "გამოქვეყნება"}
            </button>
            <button
              disabled={saving}
              onClick={() => save("draft")}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              მონახაზად შენახვა
            </button>
          </div>
          <p className="text-sm text-slate-500">
            გამოქვეყნებული სტატია საიტზე მაშინვე ჩანს. Google-ისთვის სრული ვერსია შემდეგი ატვირთვისას მზადდება:
            დააჭირე „საიტის განახლებას“ ან Vercel-ში Redeploy-ს.
          </p>
        </div>

        {/* Existing posts */}
        <h2 className="mb-3 mt-10 text-lg font-semibold">სტატიები ({posts.length})</h2>
        <div className="space-y-2">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
              <div className="min-w-0">
                <div className="truncate font-medium">{p.title || "(უსათაურო)"}</div>
                <div className="text-xs text-slate-500">
                  /blog/{p.slug} · {p.status === "published" ? "გამოქვეყნებული" : "მონახაზი"}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => loadForEdit(p)} className="rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50">
                  რედაქტირება
                </button>
                <button onClick={() => remove(p)} className="rounded-lg px-3 py-1 text-sm text-rose-600 hover:bg-rose-50">
                  წაშლა
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
