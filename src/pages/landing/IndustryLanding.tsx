import { Navigate, useParams } from "react-router-dom";

type IndustrySlug = "tourism" | "beauty";

type IndustryContent = {
  title: string;
};

const industryData: Record<IndustrySlug, IndustryContent> = {
  tourism: {
    title: "Tourism Industry Landing",
  },
  beauty: {
    title: "Beauty Industry Landing",
  },
};

const isIndustrySlug = (slug: string): slug is IndustrySlug => {
  return slug in industryData;
};

const IndustryLanding = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !isIndustrySlug(slug)) {
    return <Navigate to="/" replace />;
  }

  const industry = industryData[slug];

  return (
    <main>
      <h1>{industry.title}</h1>
    </main>
  );
};

export default IndustryLanding;
