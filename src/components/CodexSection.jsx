export default function CodexSection({ sectionRef }) {
  return (
    <section className="codex codex-top" ref={sectionRef}>
      <h2>📜 The Map of amaczar</h2>
      <div className="lead">
        Shelf is Pattern's internal warehouse operations system — it's the software that runs the
        day-to-day work inside a physical fulfillment center, covering everything from receiving
        inventory as it arrives, to stowing it in the right storage location, prepping it to meet
        different retailers' requirements (Amazon, Walmart, TikTok, Chewy, etc.), and picking/packing/shipping
        customer orders back out, all while keeping inventory counts accurate along the way. It's the
        operational backbone that lets Pattern run warehouses for the brands it manages, coordinating
        people, barcode scanners, and physical inventory so products move correctly from "supplier
        shipped it" to "customer received it" across many different sales channels.
      </div>

      <div className="diagram">
        <div className="layer l-cat">
          <div className="lname">CATALOG<br />what a<br />product is</div>
          <div className="chips">
            <span className="chip2">Partner</span><span className="arrow">─&lt;</span>
            <span className="chip2">Item</span><span className="arrow">─&lt;</span>
            <span className="chip2">Listing<small>per marketplace / channel</small></span>
            <span className="arrow">·</span>
            <span className="chip2">Product<small>finance twin of Item</small></span>
          </div>
        </div>

        <div className="layer l-in">
          <div className="lname">INBOUND<br />how it<br />arrives</div>
          <div className="chips">
            <span className="chip2">Purchase (PO) / InventoryRequest</span>
            <span className="arrow">──&gt; receivable ──&gt;</span>
            <span className="chip2">InboundShipment</span>
          </div>
        </div>

        <div className="layer l-wo">
          <div className="lname">WORK<br />ORDER<br />what to do</div>
          <div className="chips">
            <span className="chip2">WorkOrder</span><span className="arrow">─&lt;</span>
            <span className="chip2 hub">WorkOrderItem ★ the hub<small>workable → Listing OR Item</small></span>
          </div>
        </div>

        <div className="layer l-phys">
          <div className="lname">PHYSICAL<br />where units<br />live</div>
          <div className="chips">
            <span className="chip2">InventoryLocation</span>
            <span className="chip2">TransientContainer<small>containable → box / pallet</small></span>
            <span className="arrow">──&gt;</span>
            <span className="chip2 star">TransientBox<small>the REAL box</small></span>
            <span className="arrow">⇄ assign ⇄</span>
            <span className="chip2 star">MetaphysicalBox<small>the PLANNED box</small></span>
            <span className="chip2">WorkOrderItemResult</span>
          </div>
        </div>

        <div className="layer l-out">
          <div className="lname">OUTBOUND<br />how it<br />leaves</div>
          <div className="chips">
            <span className="chip2">Shipment<small>shippable target</small></span><span className="arrow">─&lt;</span>
            <span className="chip2">ShipmentItem</span><span className="arrow">─&lt;</span>
            <span className="chip2">SubShipmentItem<small>the box's slot</small></span>
          </div>
        </div>
      </div>

      <div className="legend">
        <div className="li">1 · <i>WorkOrderItem is the hub.</i> it points <b>up</b> to its product (a Listing or an Item) and <b>down</b> to its boxes &amp; results. find it and you can trace anything.</div>
        <div className="li">2 · <i>Metaphysical vs physical.</i> a <b>MetaphysicalBox</b> is a box we <b>plan</b> to ship; a <b>TransientBox</b> is the real one we packed. <b>MetaphysicalBoxes::Assign</b> marries them</div>
        <div className="li">3 · <i>Polymorphism is everywhere.</i> <b>workable</b> (WOI→Listing/Item), <b>containable</b> (container→box/pallet), and <b>shippable</b> (TransientBox / MetaphysicalBox / WorkOrderItemResult all → Shipment). one pattern, used all over.</div>
      </div>

      <div className="lessons">
        <div className="lesson"><b>System thinking &gt; code.</b> the hard part was the mental model — PO → work → box → shipment — not the syntax.</div>
        <div className="lesson"><b>Find the 10 that matter.</b> 645 models is intimidating; almost everything routes through ~10 core classes.</div>
        <div className="lesson"><b>Names are clues.</b> "transient", "metaphysical", "shippable" — the vocabulary <i>is</i> the domain. learn the words, learn the system.</div>
        <div className="lesson"><b>Read before you write.</b> tracing associations beat guessing every time — and made every ticket above faster.</div>
      </div>
    </section>
  );
}
