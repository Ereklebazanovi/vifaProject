import { EditorialPage } from "../components/ui/EditorialPage";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaSearch, FaPhone } from "react-icons/fa";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";
const NotFound: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const en = currentLanguage === "en";

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <EditorialPage>
      <SEO
        title={en ? "404: page not found" : "404: გვერდი ვერ მოიძებნა"}
        description={en ? "This page does not exist. Go to the home page or contact us." : "ეს გვერდი არ არსებობს. გადადით მთავარ გვერდზე ან დაგვიკავშირდით."}
        type="website"
        noindex
      />

      <div className="ed-wrap ed-reading ed-not-found">
        <div className="text-center">
          <div>
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="ed-error-number">
                404
              </h1>
            </div>

            {/* Error Message */}
            <h2 className="text-3xl md:text-4xl font-light ed-ink mb-4">
              {en ? "Page not found" : "გვერდი ვერ მოიძებნა"}
            </h2>
            <p className="text-xl ed-muted mb-8 leading-relaxed">
              {en ? "This page does not exist or has moved to another address." : "ეს გვერდი არ არსებობს ან სხვა მისამართზეა გადატანილი."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                to="/"
                className="it-pill-button gap-2"
              >
                <FaHome />
                <span>{en ? "Home" : "მთავარი გვერდი"}</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="it-pill-button ed-secondary gap-2"
              >
                <FaArrowLeft />
                <span>{en ? "Go back" : "უკან დაბრუნება"}</span>
              </button>

              <Link
                to="/contact"
                className="it-pill-button ed-secondary gap-2"
              >
                <FaPhone />
                <span>{en ? "Contact" : "კონტაქტი"}</span>
              </Link>
            </div>

            {/* Search Suggestion */}
            <div
              className="ed-card p-6"
            >
              <FaSearch className="ed-accent text-2xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold ed-ink mb-3">
                {en ? "What were you looking for?" : "რას ეძებდით?"}
              </h3>
              <p className="ed-muted mb-4">
                {en ? "You may be interested in:" : "შესაძლოა გაინტერესებდეთ:"}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/it"
                  className="ed-link"
                >
                  {en ? "IT services" : "IT მომსახურება"}
                </Link>
                <span className="ed-muted">•</span>
                <Link
                  to="/services/marketing"
                  className="ed-link"
                >
                  {en ? "Marketing" : "მარკეტინგი"}
                </Link>
                <span className="ed-muted">•</span>
                <Link
                  to="/about"
                  className="ed-link"
                >
                  {en ? "About us" : "ჩვენ შესახებ"}
                </Link>
              </div>
            </div>

            {/* Help Section */}
            <div
              className="mt-8 ed-muted"
            >
              <p className="text-sm">
                {en ? "Still need help? Write to us:" : "თუ მაინც გჭირდებათ დახმარება, მოგვწერეთ:"}{" "}
                <a
                  href="mailto:vifa.official2020@gmail.com"
                  className="ed-link"
                >
                  vifa.official2020@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </EditorialPage>
  );
};

export default NotFound;
