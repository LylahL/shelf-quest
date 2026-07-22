// Renders trusted, hand-authored inline markup (e.g. <b> tags) embedded in the levels data.
export default function Html({ as: Tag = 'span', html, className, style }) {
  return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}
