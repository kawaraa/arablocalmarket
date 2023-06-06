"use client";
export default function StarRating({ stars = 0, onRate, cls }) {
  return (
    <span dir="auto" className={`relative inline-block text-blur dark:text-t ${cls || "text-sm"}`}>
      &#9733;&#9733;&#9733;&#9733;&#9733;
      <span
        style={{ width: `${(stars / 5) * 100}%` }}
        className={`overflow-hidden absolute inset-0 h-1/1 text-orange`}>
        &#9733;&#9733;&#9733;&#9733;&#9733;
      </span>
      {/* label, title, aria-label, focus and keyboard interactivity */}
      {onRate && (
        <input
          onInput={(e) => onRate(+e.target.value)}
          type="range"
          min="0"
          max="5"
          step="1"
          value={stars}
          className="overflow-hidden absolute inset-0 h-1/1 w-1/1 appearance-none cursor-pointer opacity-0"
        />
      )}
    </span>
  );
}
