
import { MdArrowBack } from "react-icons/md";

interface TitleProps {
  isShowBackButton?: boolean;
  tag?: string; // Optional badge/tag text (e.g., "PLATFORM")
  tagClass?: string; // Styling for tag
  title: string; // The main text string
  highlight?: string; // The word or phrase to style differently
  description?: string; // Optional subtitle paragraph
  className?: string; // Main wrapper classes (alignment, margins)
  titleClass?: string; // Base typography styling for the title
  highlightClass?: string; // Styling specifically for the highlighted text
  descriptionClass?: string; // Styling specifically for the description
}

export default function Title({
  isShowBackButton,
  tag,
  tagClass = "text-[#ff1770] text-sm font-semibold tracking-widest uppercase mb-3",
  title,
  highlight,
  description,
  className = "text-center max-w-3xl mx-auto space-y-3",
  titleClass = "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900",
  highlightClass = "text-[#f4a100]",
  descriptionClass = "text-base md:text-lg text-slate-500 font-normal leading-relaxed max-w-xl mx-auto",
}: TitleProps) {
  // Dynamically inserts the highlighted text exactly where it belongs in the string
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) {
      return title;
    }

    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className={highlightClass}>{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={className}>
      {isShowBackButton && <MdArrowBack />}
      {tag && <p className={tagClass}>{tag}</p>}
      <h1 className={titleClass}>{renderTitle()}</h1>
      {description && <p className={descriptionClass}>{description}</p>}
    </div>
  );
} 