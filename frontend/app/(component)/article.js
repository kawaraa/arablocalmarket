const h2Cls = "text-lg font-bold mt-8 mb-3";

export default function Article({ lang, article }) {
  const ps = Array.isArray(article.p[lang]) ? article.p[lang] : [article.p[lang]];

  return (
    <article>
      {article.t && <p>{article.t[lang]}</p>}
      <h2 className={h2Cls}>{article.h[lang]}</h2>

      {ps.map((p, i) => (
        <p key={i}>{p}.</p>
      ))}
    </article>
  );
}
