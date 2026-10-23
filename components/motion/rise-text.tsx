/**
 * Text whose words sharpen into place one after another on first paint.
 * Pure CSS (.rise-word in globals.css): it runs before JavaScript, and the
 * words are visible from the first frame, so it never delays the page's
 * largest paint or hides the main heading from crawlers.
 */
export function RiseText({ text, start = 0, className = "" }: { text: string; start?: number; className?: string }) {
  const words = text.split(" ")
  return (
    <span className={`block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="rise-word" style={{ animationDelay: `${start + i * 0.06}s` }}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  )
}
