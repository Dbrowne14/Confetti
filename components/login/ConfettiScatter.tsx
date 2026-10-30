// A few pieces of confetti in the circle colours, scattered around the form.
// Positions are relative to the form's column so they stay close on any width.
const pieces = [
  { className: "-top-6 left-2 size-3 rotate-12 rounded-[3px] bg-circle-pink" },
  { className: "-top-2 right-6 size-2.5 rounded-full bg-circle-blue" },
  { className: "top-16 -left-3 h-2 w-4 -rotate-20 rounded-full bg-circle-yellow sm:-left-8" },
  { className: "top-28 -right-2 size-3 rotate-45 rounded-[3px] bg-circle-green sm:-right-7" },
  { className: "-bottom-4 left-10 size-2.5 rounded-full bg-circle-purple sm:-bottom-6" },
  { className: "-bottom-2 right-3 h-2 w-4 rotate-30 rounded-full bg-confetti-coral/70 sm:-right-5" },
];

export const ConfettiScatter = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0">
    {pieces.map(({ className }) => (
      <span key={className} className={`absolute ${className}`} />
    ))}
  </div>
);
