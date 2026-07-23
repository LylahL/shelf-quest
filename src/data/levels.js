/* THE QUEST LOG (real tickets, curated) */
const LEVELS = [
  {
    id: 'stow-api', icon: '🧩', name: 'Stow Tool: The API Build', tag: 'the contract behind the scanner',
    title: 'LVL 1 — Stow Tool: The API Build',
    quip: 'before the app can scan anything, someone has to define what "scan" means. that someone was me.',
    rows: [
      ['Quest', 'Shipped the backend contract the Stow Tool scans against: <b>/stow/scan_source_container</b>, <b>/stow/scan_destination_container</b>, <b>/stow/scan_item</b>, <b>/stow</b>, <b>/stow/mark_empty</b> — plus new <b>BE: Stow History</b> and <b>BE: Exception Stow</b> endpoints.'],
      ['Guardrails', '<b>BE: Verify Mixed lots validation</b> and <b>BE: Add configurable qty threshold</b>, so scan_item can reject a bad scan before it ever reaches a shelf.'],
      ['Cleanup', '<b>Only Include lot_counts with Quantities &gt; 0 for GET /scan_source_container</b> — nobody needs to see a lot with zero units left in it.'],
    ],
    punch: '"requires_expiration_date": true,\n"requires_lot_number": true,\n"is_hazmat": true,\n"requires_cold_storage": true\n\nfour booleans, one scan_item response,\nand a validation bug hiding behind each one.',
    bugs: 5,
  },
  {
    id: 'stow-containers', icon: '🚚', name: 'Stow Tool: Any Container', tag: 'breaking the "it\'s always a PCL" assumption', mini: true,
    title: 'LVL 2 — Stow Tool: Any Container',
    quip: 'the tool was built assuming every source was a PCL. reality had other plans.',
    rows: [
      ['Quest', '<b>Stow from any container</b>, <b>Add new source container types</b>, and <b>Add OutboundPallet To Source Container Types</b> — pallets, totes, and problem-solve carts all needed to scan the same way a PCL does. try the gate below. 👇'],
      ['Follow-through', '<b>Persistent container unexpected item handling</b> and <b>Remove assumptions on transient carton source containers</b> — persistent and transient containers needed genuinely different rules, not one rule half-working for both.'],
      ['Exception stow cleanup', '<b>ContainerRelocationStow</b>: remove item_id requirement, remove movement validation, do not allow unit PSL — so relocating a whole container stops getting blocked by rules meant for single-unit stows.'],
      ['Safety rails', '<b>Block Stowing Container to The Same Container</b> in the first screen, <b>Disable Scan for markEmptied PPL for Stow</b>, and a fix for <b>Mark Unexpected Item In Return Tote</b> erroring when adding more items.'],
      ['Scan routing', '<b>DRAFT: Multipack/Bundle/Component Item Scan Flexibility</b> — singles, bundles, and multipacks can\'t all be scanned the same way either, though that\'s a separate fight from container type.'],
    ],
    punch: 'a PCL, a pallet, and a problem-solve cart walk into\n/scan_source_container. the endpoint isn\'t allowed\nto ask which one it is.',
    bugs: 12,
  },
  {
    id: 'stow-qa', icon: '🐛', name: 'Stow Tool: QA Gauntlet', tag: '~20 bugs, one tool',
    title: 'LVL 3 — Stow Tool: QA Gauntlet',
    quip: 'every workflow eventually meets QA. this one met QA about twenty times.',
    rows: [
      ['Container state bugs', 'A container marked empty could still be scanned into Stow (marked-empty PCLs and PPLs both slipping through) — and marking one empty sometimes threw an error instead of succeeding.'],
      ['Problem-solve flow', 'Scanning an MCL said "container not found" instead of offering to problem-solve it; scanning an invalid PS container gave no way to scan a new one; partial stow on a problem-solve tray; Desktop Problem Solve numbers not rendering.'],
      ['Cycle counts & quantities', 'Stowing more than the PCL called for was silently closing the cycle count instead of leaving it open; <b>Stow Mark Empty: Detect quantity mismatches for persistent containers</b> closed the same gap on the persistent side.'],
      ['Casepack barcode', 'Singles PCLs were showing a casepack-barcode screen they shouldn\'t (already prepped as singles); Bundles PCLs needed to require the bundle barcode instead of a single-item scan.'],
      ['Everything else', 'Stow History button not showing details; reporting an unexpected item failing on a valid PS location; a slow second final-destination-scan API; missing item details on the report-marketplace-container screen; expired items losing their expiration date on a PS-bin move; stowing twice on a single destination — plus the QA follow-up passes (<b>BE: Stow Tool QA Follow-up</b>, <b>Stow Tool Add Source Container Type: QA Followups</b>) that caught the rest.'],
    ],
    punch: 'QA: "I marked the container empty. I can still scan it.\nIt gives me an error when I try to mark it empty again."\n\nme: "so it\'s empty, but not empty-empty." 🙃',
    bugs: 20,
  },
  {
    id: 'carton-receive', icon: '📥', name: 'Carton Receive', tag: 'ISL → IBL → PCL → shipment', label: true,
    title: 'LVL 4 — Carton Receive',
    quip: 'the other side of the warehouse: get a carton in the door and turn it into something stowable.',
    rows: [
      ['The flow', 'Scan ISL → Scan IBL → Scan Product Info → (Report Expired / Report Damage / Split Carton) → Prep → Scan PCL → Complete. <b>BE: Carton receive launch support</b> kept this end-to-end shippable.'],
      ['Exceptions & adjustments', '<b>BE: Closing carton exceptions</b> and <b>BE: MarkEmpty - Pre-validate receipt adjustment</b> — catching bad states before they became bad inventory.'],
      ['Scan quality', 'Made SSCC scan error messages specific instead of generic, fixed lots that couldn\'t be updated to "multiple," and fixed "Another user is currently finding work orders…" from blocking Receive.'],
      ['Labels & IBLs', 'New <b>GET /api/v4/inbound_shipments/print_damaged_ibl</b> endpoint, a cleanup job for old/extra IBLs, and the <b>WFS ZPL Sample Label</b>.'],
      ['Launch prep', '<b>Auto Receive: Test Prep for Bastian Test in Lindon</b>, plus fixing the case where the system recommended 2 units/carton but still blocked shipping 1 unit in an oversized manufacturer carton.'],
    ],
    punch: 'a carton doesn\'t know it\'s "receivable" until an ISL,\nan IBL, and a product-info scan all agree. get any one\nwrong and the box just… waits.',
    bugs: 11,
  },
  {
    id: 'datadog', icon: '🔥', name: 'Production Support: Datadog Dungeon', tag: '7 fires, 0 nils left standing',
    title: 'LVL 5 — Production Support: Datadog Dungeon',
    quip: 'a backlog of production errors nobody had time to chase. time to chase them.',
    rows: [
      ['Quest', '<b>Go through Datadog Errors and resolve</b> — a real production backlog, not synthetic bugs.'],
      ['The nil crew', '<b>NoMethodError: undefined method `available_weight_capacity` for nil:NilClass</b>, <b>undefined method `[]` for nil:NilClass</b>, and <b>OutboundLoadable#departs_inventory?</b> delegating to a loadable that was nil.'],
      ['Data integrity', '<b>ActiveRecord::InvalidForeignKey</b> and <b>RuntimeError: No listing found for item</b> — both traced back to code assuming a relationship existed for every row.'],
    ],
    punch: 'undefined method `x` for nil:NilClass\n\nseven different stack traces, one shared root cause:\nsomething assumed a record would always be there.',
    bugs: 7,
  },
  {
    id: 'launch-ops', icon: '🚀', name: 'Launch Support & Ops', tag: 'TikTok, FBT, and the rest of the warehouse',
    title: 'LVL 6 — Launch Support & Ops',
    quip: 'not every ticket fits a tidy category. these kept the rest of the warehouse running.',
    rows: [
      ['Launch support', '<b>TikTok launch support</b> and <b>FBT: Error Handler</b> — new sales channels need the warehouse side ready on day one.'],
      ['Investigations', 'tracked down why <b>listing_id</b> wasn\'t populating in <b>purchase_shipment_notification_items</b>; fixed <b>"Report item as lost"</b> failing with "Not enough inventory exists to make this move"; added a clear error when Prep Container hits an item with no prep plan instead of failing silently.'],
      ['Inventory & ops', '<b>Virtual / Physical inventory true-up and monitor</b>, <b>Empty Transportation Options</b>, and <b>Pick cart "report empty" should create cycle counts on source bins, not ICQAs</b>.'],
      ['Labels & routing', '<b>Add pallet weight to pallet groups tab in Shelf</b>, <b>Pallet Label redesign</b>, <b>Improve routing info sending for middle mile</b>, and a fix for the PCL (4x6) label failing to print after prep.'],
      ['Research', 'Researched Decision Action Log functionality and defined warehouse barcode scan logging requirements — groundwork for knowing who scanned what, later.'],
    ],
    punch: 'not every ticket makes it into a category with a\nclean name. these are the ones that just needed\nto get done — and did.',
    bugs: 13,
  },
  {
    id: 'boss', icon: '👑', name: 'BOSS — Item-Level Work Orders', tag: 'the polymorphic final boss', boss: true,
    title: '👑 FINAL BOSS — Item-Level Work Orders',
    quip: 'WorkOrderItem.workable: Listing → also Item. the change that touches everything downstream.',
    rows: [
      ['The problem', 'Every work order item required an active <b>listing</b> and a <b>prep plan</b> to be processed at Receive/Pack — even for types like <b>IXFR</b> and <b>Relo</b> that don\'t need either.'],
      ['The fix', 'For IXFR and Relo, work order items can now point straight at an <b>Item</b> instead of a Listing, and automatically get the "no prep" prep plan instead of requiring one to exist on a listing.'],
      ['The battlefield', 'Pick batches, Receive, and every implicit "a WOI always has a listing" assumption across the app — 18–21 points of spike + implementation, shipped as <b>Work order items for items QA and launch support</b>, <b>Item-level work orders: FBM ItemShipmentCreator + deferred audit</b>, and <b>Handle Item validation differently for non-PCL source containers</b>.'],
      ['The guardrail', '<b>Cycle count getting created for NON-PCL with NO qualifying StowRequest</b> — restricted, so item-level flows don\'t spin up cycle counts nothing asked for. Also carried the work order item\'s component item IDs through.'],
      ['The nuance', 'FBM work order items split by level: item-level (IXFR, Chewy) get the "no prep" plan; listing-level (DTC) still use the listing\'s prep plan. Coordinated with Sushil on Continuum, since Grant\'s process could also generate item-level WOIs.'],
    ],
    punch: 'started the summer making sure a listing always exists.\nended it building the path for when one doesn\'t. 📈\n\nGG.',
    bugs: 4, win: true,
  },
];

export default LEVELS;
