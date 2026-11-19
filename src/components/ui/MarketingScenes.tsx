import { useEffect, useRef } from "react";
import { Grid3X3, Instagram, MessageCircle } from "lucide-react";
import { foodPhoto, foodReel, foodReelPoster } from "../../data/marketingMedia";
import type { MarketingLanguage, MarketingService } from "../../data/marketingServices";

const profilePhotos = [1, 4, 10, 14, 8, 2, 3, 11, 12].map(foodPhoto);
const newPost = foodPhoto(6);
const sponsoredPhoto = foodPhoto(5);

function SocialProfile({ posted }: { posted: boolean }) {
  return <div className="marketing-scene-phone marketing-profile" data-posted={posted}>
    <div className="marketing-phone-screen">
      <div className="marketing-profile-header">
        <span className="marketing-profile-avatar"><Instagram /></span>
        <strong>vifaproduction</strong>
      </div>
      <div className="marketing-profile-tab"><Grid3X3 /></div>
      <div className="marketing-profile-posts">
        <div className="marketing-profile-grid">
          {profilePhotos.map(photo => <img key={photo.src} src={photo.srcSm} alt="" loading="lazy" />)}
        </div>
        <div className="marketing-profile-grid marketing-profile-grid-new">
          {[newPost, ...profilePhotos.slice(0, -1)].map(photo => <img key={photo.src} src={photo.srcSm} alt="" loading="lazy" />)}
        </div>
      </div>
    </div>
  </div>;
}

function SponsoredPost({ language, ready }: { language: MarketingLanguage; ready: boolean }) {
  return <div className="marketing-sponsored-post" data-ready={ready}>
    <div className="marketing-sponsored-header">
      <span className="marketing-sponsored-avatar" />
      <div><strong>{language === "ka" ? "რესტორანი" : "Restaurant"}</strong><span>Sponsored</span></div>
    </div>
    <img src={sponsoredPhoto.srcSm} alt="" loading="lazy" />
    <span className="marketing-sponsored-action"><MessageCircle size={17} />
      {language === "ka" ? "შეტყობინების გაგზავნა" : "Send message"}
    </span>
  </div>;
}

function ProductionReel({ playing }: { playing: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.currentTime = 0;
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [playing]);

  return <div className="marketing-scene-phone marketing-reel-phone">
    <div className="marketing-phone-screen">
      <video ref={videoRef} src={foodReel} poster={foodReelPoster} muted playsInline preload="none" />
    </div>
  </div>;
}

function BrandBoard({ language, step }: { language: MarketingLanguage; step: number }) {
  const ka = language === "ka";
  return <div className="marketing-brand-board">
    <div className="marketing-brand-board-label">{ka ? "ვიზუალური იდენტობა" : "Visual identity"}</div>
    <div className="marketing-brand-board-grid">
      <div className="marketing-brand-mark"><span /><span /></div>
      <div className="marketing-brand-type" data-ready={step >= 1}>
        <strong>{ka ? "ა ბ გ" : "Aa"}</strong><span>{ka ? "ტიპოგრაფია" : "Typography"}</span>
      </div>
      <div className="marketing-brand-swatches" data-ready={step >= 2}><i /><i /><i /><i /></div>
    </div>
  </div>;
}

export function MarketingScene({ service, language, step, playing = false }: {
  service: MarketingService; language: MarketingLanguage; step: number; playing?: boolean;
}) {
  return <div className="marketing-scene" aria-hidden="true">
    {service === "socialMedia" && <SocialProfile posted={step >= 1} />}
    {service === "advertising" && <SponsoredPost language={language} ready={step >= 1} />}
    {service === "production" && <ProductionReel playing={playing} />}
    {service === "branding" && <BrandBoard language={language} step={step} />}
  </div>;
}
