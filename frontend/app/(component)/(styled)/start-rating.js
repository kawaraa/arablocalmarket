"use client";
export default function StarRating({ rating = 0, onRate, size = "sm" }) {
  return (
    <p className={`relative inline-block text-${size}`}>
      &#9733;&#9733;&#9733;&#9733;&#9733;
      <span className={`overflow-hidden absolute inset-0 h-1/1 w-[${(rating / 5) * 100}%] text-orange`}>
        &#9733;&#9733;&#9733;&#9733;&#9733;
      </span>
      {onRate && (
        <input
          onInput={(e) => onRate(e.target.value)}
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={rating}
          className="overflow-hidden absolute inset-0 h-1/1 w-1/1 appearance-none cursor-pointer opacity-0"
        />
      )}
    </p>
  );
}
