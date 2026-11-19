import { PageLink } from "./PageLink";
import { SectionHeading } from "./SectionHeading";
import { productColors } from "./tokens";

export function RelatedProductCard({ product, to, title, description, price, action }: {
  product: keyof typeof productColors;
  to: string;
  title: string;
  description: string;
  price: string;
  action: string;
}) {
  return (
    <section className="it-section it-col it-related-product" aria-label={title}>
      <PageLink to={to} className="it-related-card" style={{ backgroundColor: productColors[product].soft }}>
        <div>
          <SectionHeading>{title}</SectionHeading>
          <p>{description}</p>
          <strong>{price}</strong>
        </div>
        <span className="it-more-link" aria-hidden="true">{action} ›</span>
      </PageLink>
    </section>
  );
}
