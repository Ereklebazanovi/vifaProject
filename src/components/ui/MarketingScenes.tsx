import { useEffect, useRef } from "react";
import { Check, Grid3X3, Instagram } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
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

// Social media card and hero since 2026-11-24: a week's content plan instead of the profile phone,
// which sat small in the large card and filled it with food photos.
const planDays = { ka: ["ორ", "სა", "ოთ", "ხუ", "პა", "შა", "კვ"], en: ["M", "T", "W", "T", "F", "S", "S"] };
const planPosts = [
  { day: 0, Icon: FaInstagram, network: "instagram", ka: ["რილსი", "ორშაბათი, 12:00"], en: ["Reel", "Monday, 12:00"] },
  { day: 2, Icon: FaFacebook, network: "facebook", ka: ["პოსტი", "ოთხშაბათი, 18:30"], en: ["Post", "Wednesday, 18:30"] },
  { day: 4, Icon: FaTiktok, network: "tiktok", ka: ["ვიდეო", "პარასკევი, 20:00"], en: ["Video", "Friday, 20:00"] },
] as const;

function ContentPlan({ language, step }: { language: MarketingLanguage; step: number }) {
  const ka = language === "ka";
  const isNew = (index: number) => index === planPosts.length - 1;
  return <div className="marketing-plan">
    <div className="marketing-plan-head">
      <strong>{ka ? "კონტენტის გეგმა" : "Content plan"}</strong>
      <span>{ka ? "ეს კვირა" : "This week"}</span>
    </div>
    <div className="marketing-plan-week">
      {planDays[language].map((day, index) => {
        const post = planPosts.findIndex(item => item.day === index);
        return <span key={index} data-post={post >= 0 || undefined} data-ready={post >= 0 && isNew(post) ? step >= 1 : undefined}>
          {day}<i />
        </span>;
      })}
    </div>
    <ul className="marketing-plan-list">
      {planPosts.map(({ Icon, network, ...copy }, index) => {
        const [type, time] = copy[language];
        return <li key={network} data-ready={isNew(index) ? step >= 1 : undefined}>
          <span className="marketing-plan-icon" data-network={network}><Icon size={15} /></span>
          <span className="marketing-plan-text"><strong>{type}</strong><span>{time}</span></span>
          <span className="marketing-plan-status"><Check size={12} strokeWidth={2.6} /><span>{ka ? "დაგეგმილია" : "Scheduled"}</span></span>
        </li>;
      })}
    </ul>
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
    {service === "socialMedia" && <ContentPlan language={language} step={step} />}
    {service === "advertising" && <SponsoredPost language={language} ready={step >= 1} />}
    {service === "production" && <ProductionReel playing={playing} />}
    {service === "branding" && <BrandBoard language={language} step={step} />}
  </div>;
}
