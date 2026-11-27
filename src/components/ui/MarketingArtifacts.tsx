import { Film, MapPin, MessageCircle, Search, SlidersHorizontal, UsersRound } from "lucide-react";
import { foodPhoto, foodReelPoster } from "../../data/marketingMedia";
import type { MarketingLanguage } from "../../data/marketingServices";
import "./marketingArtifacts.css";

export type MarketingArtifactKind = "calendar" | "post" | "comment" | "sponsored" | "search" |
  "audience" | "logo" | "identity" | "poster" | "voice" | "photo" | "reel" | "aerial";

const postPhoto = foodPhoto(10);
const photoPair = [foodPhoto(14), foodPhoto(4)];
const swatches = ["#403150", "#9c7db1", "#ecc6ad", "#f8e6d9"];

function Calendar({ language }: { language: MarketingLanguage }) {
  const ka = language === "ka";
  const days = ka ? ["ორ", "სა", "ოთ", "ხუ", "პა", "შა", "კვ"] : ["M", "T", "W", "T", "F", "S", "S"];
  return <div className="marketing-calendar">
    <div className="marketing-calendar-days">{days.map((day, index) => <span key={index}>{day}</span>)}</div>
    <div className="marketing-calendar-events">
      <span>{ka ? "პოსტი" : "Post"}</span><span>Reel</span><span>Story</span>
    </div>
  </div>;
}

function PhotoPost({ kind, language }: { kind: "post" | "sponsored"; language: MarketingLanguage }) {
  return <div className="marketing-post-preview">
    <div className="marketing-mini-bar">
      <span className="marketing-mini-avatar" />
      {kind === "sponsored" ? "Sponsored" : language === "ka" ? "პოსტის მონახაზი" : "Post draft"}
    </div>
    <img src={(kind === "sponsored" ? foodPhoto(13) : postPhoto).srcSm} alt="" loading="lazy" />
    <div className="marketing-mini-footer"><MessageCircle size={13} /><i /></div>
  </div>;
}

function CommentThread({ language }: { language: MarketingLanguage }) {
  const ka = language === "ka";
  return <div className="marketing-mini-conversation">
    <div><span className="marketing-mini-avatar" /><span>{ka ? "მენიუ სად ვნახო?" : "Where’s the menu?"}</span></div>
    <div><span>{ka ? "ბმული პროფილშია." : "Link in bio."}</span></div>
  </div>;
}

export function MarketingArtifact({ kind, language, photo }: {
  kind: MarketingArtifactKind;
  language: MarketingLanguage;
  photo?: string;
}) {
  const ka = language === "ka";
  switch (kind) {
    case "calendar":
      return <Calendar language={language} />;
    case "post":
    case "sponsored":
      return <PhotoPost kind={kind} language={language} />;
    case "comment":
      return <CommentThread language={language} />;
    case "search":
      return <div className="marketing-search-preview">
        <div className="marketing-mini-search"><Search size={13} />{ka ? "კაფე ახლოს" : "Café near me"}</div>
        <span>{ka ? "რეკლამა" : "Ad"}</span>
        <strong>{ka ? "კაფე თქვენს უბანში" : "A café near you"}</strong>
        <i /><i />
      </div>;
    case "audience":
      return <div className="marketing-audience-preview">
        <span><MapPin size={14} />{ka ? "ქალაქი" : "City"}</span>
        <span><UsersRound size={14} />{ka ? "ასაკი" : "Age"}</span>
        <span><SlidersHorizontal size={14} />{ka ? "ინტერესები" : "Interests"}</span>
      </div>;
    case "logo":
      return <div className="marketing-logo-sketch"><div><i /><i /></div></div>;
    case "identity":
      return <div className="marketing-type-preview">
        <strong>{ka ? "ა ბ გ" : "Aa"}</strong>
        <div>{swatches.map(color => <i key={color} style={{ backgroundColor: color }} />)}</div>
      </div>;
    case "poster":
      return <div className="marketing-poster-preview">
        <div><i /><i /><i /></div>
        <img src={foodPhoto(8).srcSm} alt="" loading="lazy" />
      </div>;
    case "voice":
      return <div className="marketing-voice-preview">
        <div><small>{ka ? "მეგობრული" : "Friendly"}</small><strong>{ka ? "შემოგვიარეთ!" : "Drop by!"}</strong></div>
        <div><small>{ka ? "ოფიციალური" : "Formal"}</small><strong>{ka ? "გიწვევთ სტუმრად." : "You’re invited."}</strong></div>
      </div>;
    case "photo":
      return <div className="marketing-photo-preview">
        {(photo ? [photo] : photoPair.map(item => item.srcSm)).map(src => <img key={src} src={src} alt="" loading="lazy" />)}
      </div>;
    case "reel":
      return <div className="marketing-reel-preview">
        <img src={foodReelPoster} alt="" loading="lazy" />
        <span><Film size={15} /><i /><i /><i /></span>
      </div>;
    case "aerial":
      return <div className="marketing-aerial-preview">
        <div className="marketing-aerial-plan"><i /><i /><i /></div>
        <span className="marketing-aerial-viewfinder" />
      </div>;
  }
}

