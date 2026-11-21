import { EditorialPage } from "../components/ui/EditorialPage";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaSearch, FaPhone } from "react-icons/fa";
import SEO from "../components/SEO";
const NotFound: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <EditorialPage>
      <SEO
        title="404 - გვერდი ვერ მოიძებნა"
        description="მოძებნილი გვერდი ვერ მოიძებნა. დაბრუნდით მთავარ გვერდზე ან დაგვიკავშირდით დახმარებისთვის."
        type="website"
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
              გვერდი ვერ მოიძებნა
            </h2>
            <p className="text-xl ed-muted mb-8 leading-relaxed">
              მოძებნილი გვერდი არ არსებობს ან გადატანილია სხვა ლოკაციაზე.
              გთხოვთ, ისარგებლოთ ქვემოთ მოცემული ღილაკებით ნავიგაციისთვის.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                to="/"
                className="it-pill-button gap-2"
              >
                <FaHome />
                <span>მთავარი გვერდი</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="it-pill-button ed-secondary gap-2"
              >
                <FaArrowLeft />
                <span>უკან დაბრუნება</span>
              </button>

              <Link
                to="/contact"
                className="it-pill-button ed-secondary gap-2"
              >
                <FaPhone />
                <span>კონტაქტი</span>
              </Link>
            </div>

            {/* Search Suggestion */}
            <div
              className="ed-card p-6"
            >
              <FaSearch className="ed-accent text-2xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold ed-ink mb-3">
                რას ეძებდით?
              </h3>
              <p className="ed-muted mb-4">
                შესაძლოა დაინტერესებდეთ ჩვენი სერვისებით:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/services/web"
                  className="ed-link"
                >
                  ვებ განვითარება
                </Link>
                <span className="ed-muted">•</span>
                <Link
                  to="/services/marketing"
                  className="ed-link"
                >
                  ციფრული მარკეტინგი
                </Link>
                <span className="ed-muted">•</span>
                <Link
                  to="/about"
                  className="ed-link"
                >
                  ჩვენს შესახებ
                </Link>
              </div>
            </div>

            {/* Help Section */}
            <div
              className="mt-8 ed-muted"
            >
              <p className="text-sm">
                თუ მაინც გჭირდებათ დახმარება, დაგვიკავშირდით:{" "}
                <a
                  href="mailto:vifa.official2020@gmail.com
"
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
