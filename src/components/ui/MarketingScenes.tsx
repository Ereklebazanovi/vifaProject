import { useEffect, useRef } from "react";
import { Grid3X3, Instagram } from "lucide-react";
import { PhoneFrame } from "../lineup/AppKit";
import { foodPhoto, foodReel, foodReelPoster } from "../../data/marketingMedia";
import type { MarketingLanguage, MarketingService } from "../../data/marketingServices";

const profilePhotos = [10, 14, 1, 2, 13, 11, 3, 7, 9, 5, 8, 12].map(foodPhoto);
const newPost = foodPhoto(6);
const sponsoredPhoto = foodPhoto(13);

export function SocialProfile({ posted }: { posted: boolean }) {
  return <div className="marketing-scene-phone marketing-profile" data-posted={posted}>
    <div className="marketing-phone-frame-scale">
      <div className="marketing-phone-frame-inner">
        <PhoneFrame>
          <div className="marketing-phone-screen">
            <div className="marketing-phone-status">
              <span>9:41</span>
              <span className="marketing-phone-battery" />
            </div>
            <div className="marketing-profile-header">
              <span className="marketing-profile-avatar"><Instagram size={22} /></span>
              <div className="marketing-profile-meta">
                <strong>vifaproduction</strong>
                <span>Digital Marketing</span>
              </div>
            </div>
            <div className="marketing-profile-tab"><Grid3X3 size={16} /></div>
            <div className="marketing-profile-posts">
              <div className="marketing-profile-grid">
                {profilePhotos.map(photo => <img key={photo.src} src={photo.srcSm} alt="" loading="lazy" />)}
              </div>
              <div className="marketing-profile-grid marketing-profile-grid-new">
                {[newPost, ...profilePhotos.slice(0, 11)].map(photo => <img key={photo.src} src={photo.srcSm} alt="" loading="lazy" />)}
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  </div>;
}

export function SponsoredPost({ language, ready }: { language: MarketingLanguage; ready?: boolean }) {
  return <div className="marketing-sponsored-post" data-ready={ready}>
    <div className="marketing-sponsored-header">
      <span className="marketing-sponsored-avatar" />
      <div><strong>{language === "ka" ? "რესტორანი" : "Restaurant"}</strong><span>Sponsored</span></div>
    </div>
    <img src={sponsoredPhoto.srcSm} alt="" loading="lazy" />
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
