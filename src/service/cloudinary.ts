// Cloudinary unsigned image upload (client-side).
// cloud name + unsigned preset are PUBLIC by design (that's how unsigned uploads work).
const CLOUD_NAME = "dnjsdlkp9";
const UPLOAD_PRESET = "vifaWeb";

/** Uploads an image File to Cloudinary and returns the hosted secure URL. */
export async function uploadToCloudinary(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Cloudinary upload failed (${res.status}): ${detail}`);
  }
  const data = (await res.json()) as { secure_url?: string };
  if (!data.secure_url) throw new Error("Cloudinary: no secure_url in response");
  return data.secure_url;
}
