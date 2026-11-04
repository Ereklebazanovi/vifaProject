import { useMemo, useState } from "react";
import { apiPost } from "../api";
import { btnPrimary, btnSecondary, Field, inputCls, Modal } from "../ui";
import { PRODUCT_LABELS } from "./contactsService";
import { parse, readTextFile } from "./parseList";

const ImportDialog = ({ onClose }: { onClose: () => void }) => {
  const [text, setText] = useState("");
  const [product, setProduct] = useState("other");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const { rows, skipped } = useMemo(() => parse(text), [text]);

  const run = async (body: Record<string, unknown>) => {
    setBusy(true);
    setMessage("");
    try {
      const r = await apiPost<{ created: number; updated: number; skipped: number }>("/api/import", body);
      setMessage(`დაემატა ${r.created}, განახლდა ${r.updated}${r.skipped ? `, გამოტოვდა ${r.skipped} (ნომრისა და მეილის გარეშე)` : ""}.`);
      setText("");
    } catch (e) {
      setMessage(`იმპორტი ვერ მოხერხდა: ${e instanceof Error ? e.message : e}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title="კონტაქტების იმპორტი" subtitle="არსებული ხალხი ერთ ბაზაში. ავტომატური შეტყობინება არავის წავა." onClose={onClose} width="42rem">
      <div className="grid gap-4">
        <Field label="ჩასვი სია ან ატვირთე CSV ფაილი" hint="Excel-იდან ან Google Sheets-იდან დააკოპირე სვეტები: სახელი, ტელეფონი, მეილი. თანმიმდევრობას მნიშვნელობა არ აქვს. CSV-ში სათაურების ხაზს (სახელი, ტელეფონი, ელ. ფოსტა) თავად ვცნობ, Facebook-ის რეკლამის ფორმებიდან ჩამოტვირთულ ფაილსაც.">
          <textarea className={`${inputCls} min-h-[150px] font-mono text-sm`} value={text} onChange={(e) => setText(e.target.value)}
            placeholder={"ნინო ბერიძე\t555 12 34 56\tnino@gmail.com\nგიორგი, 599112233"} />
        </Field>
        <label className={`${btnSecondary} w-fit cursor-pointer`}>
          CSV ფაილის ატვირთვა
          <input type="file" accept=".csv,text/csv,.txt" className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) setText(await readTextFile(file));
              e.target.value = "";
            }} />
        </label>
        {text.trim() && (
          <p className="text-sm text-slate-600">
            ნაპოვნია <b>{rows.length}</b> კონტაქტი ({rows.filter((r) => r.phone).length} ნომრით, {rows.filter((r) => r.email).length} მეილით)
            {skipped > 0 && `, ${skipped} ხაზი გამოტოვდება`}.
          </p>
        )}
        <Field label="რით არიან დაინტერესებულები">
          <select className={inputCls} value={product} onChange={(e) => setProduct(e.target.value)}>
            {Object.entries(PRODUCT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </Field>
        <label className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4" />
          <span>
            ამ ადამიანებმა თანხმობა მომცეს შეთავაზებების მიღებაზე (მაგ. ჩემი კლიენტები არიან და ამაზე შევთანხმდით).
            <span className="mt-1 block text-amber-700">მონიშვნის შემდეგ ჯგუფურ გაგზავნებს მიიღებენ. უცხო ნომრებზე არ მონიშნო.</span>
          </span>
        </label>
        <div className="flex flex-wrap gap-2">
          <button disabled={busy || rows.length === 0} onClick={() => run({ rows, product, consent })} className={btnPrimary}>
            {busy ? "იტვირთება…" : `${rows.length} კონტაქტის დამატება`}
          </button>
          <button disabled={busy} onClick={() => run({ legacy: true })} className={btnSecondary}
            title="საიტის ძველი ფორმები: ჩატბოტის მოთხოვნა და პროექტის მოთხოვნა">
            საიტის ძველი ფორმებიდან გადმოტანა
          </button>
        </div>
        {message && <p className="text-sm text-slate-700">{message}</p>}
      </div>
    </Modal>
  );
};

export default ImportDialog;
