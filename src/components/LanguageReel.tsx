const languages = ["React", "Angular", "SQL", "Next.js", "TypeScript", "JavaScript", "Python", "C#", "Java", "Node.js", "FastAPI"];

export function LanguageReel() {
  const loop = [...languages, ...languages];

  return (
    <div className="lang-reel" aria-label="Languages and frameworks">
      <div className="lang-track">
        {loop.map((item, index) => (
          <div className="lang-slide" key={`${item}-${index}`} aria-hidden={index >= languages.length}>
            <span className="lang-card">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
