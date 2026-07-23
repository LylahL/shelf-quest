export default function MockLabel() {
  return (
    <>
      <div className="mocklabel">
        <div className="ml-top"><span>PCL · 4x6</span><span>WFS&nbsp;ZPL</span></div>
        <div className="ml-barcode" />
        <div>IBL 000482 · LOT A19381</div>
        <div className="ml-tags">
          <span className="tag-lift">DAMAGED</span>
          <span className="tag-single">REPRINT OK</span>
        </div>
        <div className="ml-note">generated via print_damaged_ibl</div>
      </div>
      <div className="ml-cap">↑ a label for decoration purposes — WFS ZPL sample + damaged-IBL reprint</div>
    </>
  );
}
