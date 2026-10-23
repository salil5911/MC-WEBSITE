import {
  Smartphone,
  Layers,
  Plug,
  BatteryCharging,
  Camera,
  Droplets,
  type LucideIcon,
} from "lucide-react"

export interface ServiceStep {
  title: string
  description: string
}

export interface GlossaryTerm {
  term: string
  definition: string
}

export interface Service {
  slug: string
  name: string
  shortName: string
  icon: LucideIcon
  image: string
  tagline: string
  summary: string
  priceFrom: string
  turnaround: string
  overview: string
  includes: string[]
  process: ServiceStep[]
  signs: string[]
  glossary: GlossaryTerm[]
  faqs: { question: string; answer: string }[]
}

export const services: Service[] = [
  {
    slug: "screen-replacement",
    name: "Screen Replacement",
    shortName: "Screen Replacement",
    icon: Smartphone,
    image: "/services/screen-replacement.webp",
    tagline: "Full display assembly replacement, calibrated to factory spec",
    summary:
      "Cracked glass, dead pixels, or a digitizer that won't register touch? We replace the complete display assembly with a premium OLED or LCD panel matched to your device's original color, brightness, and refresh rate.",
    priceFrom: "$59",
    turnaround: "30–45 min",
    overview:
      "A modern phone screen is not just glass — it's a laminated display assembly made of the cover glass, the digitizer (the layer that senses your touch), and the OLED or LCD panel that produces the image. When any layer fails, we replace the full assembly with a quality-tested panel, re-seat every flex cable, and transfer the ambient light sensor data so features like True Tone keep working where supported. High-refresh displays (90Hz / 120Hz ProMotion) are matched to the correct spec, and the frame is resealed with fresh adhesive to restore a tight, dust-resistant fit.",
    includes: [
      "Premium OLED or LCD display assembly",
      "Digitizer and multi-touch testing across the full panel",
      "Ambient light sensor transfer to retain True Tone",
      "Refresh-rate matched panel (60Hz / 90Hz / 120Hz)",
      "New frame adhesive for a sealed, flush fit",
      "Tempered-glass protector applied",
      "30-day parts & labor warranty",
    ],
    process: [
      {
        title: "Free diagnostic",
        description: "We check whether the fault is the cover glass, digitizer, or display panel, and confirm the exact part for your model.",
      },
      {
        title: "Heat separation",
        description: "The screen adhesive is softened with controlled heat so the display lifts off without stressing the frame.",
      },
      {
        title: "Assembly & reconnection",
        description: "The new display is installed and every flex cable (the thin ribbon connectors) is re-seated and shielded.",
      },
      {
        title: "Calibration & QC",
        description: "We verify touch response, brightness, color, Face ID, and proximity sensor before you leave.",
      },
    ],
    signs: [
      "Cracked or spider-webbed cover glass",
      "Dead pixels, black blotches, or green lines (OLED burn or bleed)",
      "Unresponsive or 'ghost' touch from a failed digitizer",
      "Flickering, dimming, or screen burn-in",
      "Display lifting from the frame",
    ],
    glossary: [
      {
        term: "OLED vs LCD",
        definition: "OLED screens light each pixel individually for deeper blacks; LCD screens use a backlight. We always match the type your phone shipped with.",
      },
      {
        term: "Digitizer",
        definition: "The transparent touch layer bonded to the screen. If it fails, the display may look fine but stop responding to your finger.",
      },
      {
        term: "Flex cable",
        definition: "A thin ribbon cable that connects the screen to the phone's main board. Careful handling prevents new display issues.",
      },
      {
        term: "True Tone",
        definition: "An Apple feature that adjusts screen color to your surroundings. We transfer your original sensor data so it keeps working.",
      },
    ],
    faqs: [
      {
        question: "Will screen replacement affect Face ID or True Tone?",
        answer:
          "Face ID components are separate from the display and stay untouched. For True Tone, we transfer your original ambient light sensor data to the new panel on supported iPhone models.",
      },
      {
        question: "What's the difference between a premium and an OEM screen?",
        answer:
          "OEM (original equipment manufacturer) panels match the factory part exactly. Our premium panels are quality-tested aftermarket assemblies that closely match OEM color, brightness, and touch response at a lower price. We'll explain your options before any work begins.",
      },
      {
        question: "How long does a screen replacement take?",
        answer:
          "Most screen replacements are completed in 30–45 minutes while you wait. Foldables and some flagship models may take longer.",
      },
    ],
  },
  {
    slug: "back-glass-repair",
    name: "Back Glass Repair",
    shortName: "Back Glass Repair",
    icon: Layers,
    image: "/services/back-glass-repair.webp",
    tagline: "Laser-separated rear glass, without a full housing swap",
    summary:
      "Shattered rear glass exposes internals to dust and moisture. Our laser-separation process replaces only the glass, keeping your original housing and wireless charging coil intact.",
    priceFrom: "$69",
    turnaround: "45–90 min",
    overview:
      "On most modern iPhones and Galaxy flagships, the back glass is bonded directly to the metal chassis with industrial adhesive, which is why manufacturers often quote a full housing replacement. We use a precision laser to break down that adhesive bond, so the cracked glass can be removed cleanly without removing the logic board. A color-matched OEM-grade panel is then bonded in place, with the camera lens ring and cutouts aligned exactly. The Qi / MagSafe wireless charging coil and NFC antenna underneath stay untouched and are tested before return.",
    includes: [
      "Color-matched OEM-grade rear glass",
      "Laser adhesive separation (no housing swap)",
      "Qi / MagSafe wireless charging coil preserved",
      "Camera lens ring alignment and sealing",
      "Ultrasonic clean-up of glass fragments",
      "30-day parts & labor warranty",
    ],
    process: [
      {
        title: "Assessment",
        description: "We check for chassis bends or frame damage and confirm the correct glass and finish for your model.",
      },
      {
        title: "Laser separation",
        description: "A calibrated laser breaks down the factory adhesive so the cracked glass releases without heat damage to internals.",
      },
      {
        title: "Bonding new glass",
        description: "The new panel is aligned and bonded under pressure for a seamless, factory-flush finish.",
      },
      {
        title: "Function check",
        description: "We test wireless charging, MagSafe magnet alignment, NFC (Apple Pay), and camera clarity.",
      },
    ],
    signs: [
      "Cracked or shattered rear glass",
      "Sharp edges or glass flaking off",
      "Glass lifting from the chassis",
      "Wireless or MagSafe charging acting up",
      "Cracks reaching the camera lens ring",
    ],
    glossary: [
      {
        term: "Chassis / housing",
        definition: "The metal frame your phone is built around. Replacing only the glass keeps your original frame and saves money.",
      },
      {
        term: "Laser separation",
        definition: "A laser weakens the glue holding the back glass, so it can be removed cleanly without taking the whole phone apart.",
      },
      {
        term: "Qi / MagSafe coil",
        definition: "The copper coil under the back glass that enables wireless charging. We protect it during repair and test it after.",
      },
      {
        term: "NFC antenna",
        definition: "The short-range antenna used for tap-to-pay (Apple Pay, Google Wallet). It sits near the back glass and is verified after repair.",
      },
    ],
    faqs: [
      {
        question: "Is back glass repair cheaper than a full housing swap?",
        answer:
          "Yes. Laser separation lets us replace just the glass, avoiding the cost of a new chassis and the labor of transferring every internal component.",
      },
      {
        question: "Will wireless charging and Apple Pay still work?",
        answer:
          "Yes. The wireless charging coil and NFC antenna stay in place, and we test both before returning your device.",
      },
      {
        question: "What if my phone's frame is bent?",
        answer:
          "A bent chassis can stop new glass from bonding flat. We check for this during assessment and will recommend a housing replacement only if it's truly needed.",
      },
    ],
  },
  {
    slug: "charging-port-replacement",
    name: "Charging Port Replacement",
    shortName: "Charging Port Repair",
    icon: Plug,
    image: "/services/charging-port-replacement.webp",
    tagline: "Restore fast charging and data transfer, with a current-draw test",
    summary:
      "Charging only at an angle or not at all? We diagnose the port with a USB ammeter, then clean, micro-solder, or replace the charging port assembly to restore full fast-charge speeds.",
    priceFrom: "$49",
    turnaround: "45–60 min",
    overview:
      "Your charging port handles power, data, and sometimes audio, and it collects lint, debris, and oxidation (corrosion from moisture) over time. Before replacing anything, we plug in a USB ammeter to measure how much current the phone actually draws — this tells us whether the port, the cable, or a deeper board-level fault is to blame. Depending on your model, the port sits on a replaceable charging flex or daughterboard, or is soldered directly to the logic board, where we use micro-soldering to replace it. Every repair is tested for USB Power Delivery (PD) fast charging and data sync.",
    includes: [
      "USB ammeter current-draw diagnostic",
      "Deep cleaning of lint, debris, and oxidation",
      "Bent-pin repair and re-alignment",
      "Charging flex or daughterboard replacement",
      "Micro-soldering for board-mounted ports",
      "Fast-charge (USB-PD) and data-sync testing",
      "30-day parts & labor warranty",
    ],
    process: [
      {
        title: "Current-draw test",
        description: "A USB ammeter shows whether the phone is pulling normal charging power, pinpointing the real fault.",
      },
      {
        title: "Cleaning or teardown",
        description: "We clear compacted lint and oxidation, or open the device to access the charging assembly.",
      },
      {
        title: "Repair / replacement",
        description: "The port flex is swapped, or a board-mounted port is micro-soldered with precision tools.",
      },
      {
        title: "Charge & sync testing",
        description: "We verify fast-charge wattage, wired data transfer, and microphone function before return.",
      },
    ],
    signs: [
      "Charges only at a certain angle",
      "Cable feels loose or falls out",
      "Fast charging stopped working",
      "'Accessory not supported' or moisture warnings",
      "Computer won't detect the phone when plugged in",
    ],
    glossary: [
      {
        term: "USB ammeter",
        definition: "A small meter that shows how much power your phone draws while charging. It helps us find the real problem before replacing parts.",
      },
      {
        term: "Charging flex / daughterboard",
        definition: "The separate part the charging port is mounted on. On many phones it can be swapped without touching the main board.",
      },
      {
        term: "Micro-soldering",
        definition: "Precision soldering under a microscope, used when the port is attached directly to the phone's main circuit board.",
      },
      {
        term: "USB Power Delivery (PD)",
        definition: "The fast-charging standard used by USB-C phones. A worn port can fall back to slow charging, even with a fast charger.",
      },
    ],
    faqs: [
      {
        question: "Could it just need cleaning instead of replacement?",
        answer:
          "Often, yes. Many 'dead' ports simply have compacted lint or light oxidation. We always test and clean first, which costs far less than a replacement.",
      },
      {
        question: "Do you repair USB-C and Lightning ports?",
        answer: "Yes, we service Lightning, USB-C, and micro-USB ports across all major phone and tablet brands.",
      },
      {
        question: "Why does my phone say 'moisture detected'?",
        answer:
          "Samsung and other devices block charging when the port senses liquid or corrosion. If the warning stays after drying, the port likely needs cleaning or replacement.",
      },
    ],
  },
  {
    slug: "battery-replacement",
    name: "Battery Replacement",
    shortName: "Battery Replacement",
    icon: BatteryCharging,
    image: "/services/battery-replacement.webp",
    tagline: "High-capacity lithium-ion cells with full power diagnostics",
    summary:
      "Low maximum capacity, a high cycle count, or unexpected shutdowns? We replace worn lithium-ion batteries with high-capacity cells that meet or exceed OEM mAh ratings.",
    priceFrom: "$45",
    turnaround: "30–45 min",
    overview:
      "Every lithium-ion battery chemically wears down with each charge cycle. Once maximum capacity drops below about 80%, the battery can't deliver the peak current your processor demands, which causes lag, throttled performance, and sudden shutdowns. We start with a full power diagnostic — reading cycle count, maximum capacity, and checking for abnormal current drain from the board — to confirm the battery is the real cause. The old cell is safely removed by releasing its stretch-release adhesive strips, and a new high-capacity cell is installed with fresh adhesive. Swollen batteries are handled with fire-safe procedures and responsibly recycled.",
    includes: [
      "High-capacity cell meeting or exceeding OEM mAh rating",
      "Cycle count and maximum capacity diagnostics",
      "Abnormal current-drain (parasitic drain) testing",
      "New battery adhesive for a secure fit",
      "Swollen-cell handling with fire-safe procedures",
      "Responsible lithium-ion recycling",
      "30-day parts & labor warranty",
    ],
    process: [
      {
        title: "Battery health check",
        description: "We read cycle count and maximum capacity and test for drain caused by other components.",
      },
      {
        title: "Safe removal",
        description: "Adhesive strips are released without puncturing the cell, avoiding the risk of thermal runaway.",
      },
      {
        title: "New cell installed",
        description: "A high-capacity battery is fitted, connected, and secured with fresh adhesive.",
      },
      {
        title: "Charge & load testing",
        description: "We confirm stable voltage under load, normal charging temperature, and accurate battery reporting.",
      },
    ],
    signs: [
      "Maximum capacity below 80%",
      "Shuts down unexpectedly above 20%",
      "Slow performance or throttling warnings",
      "Phone gets hot while charging",
      "Swelling, a lifted screen, or a bulging back",
    ],
    glossary: [
      {
        term: "mAh (milliamp-hours)",
        definition: "A measure of how much energy a battery can hold. Higher mAh generally means longer time between charges.",
      },
      {
        term: "Cycle count",
        definition: "How many full charge cycles the battery has gone through. Most phone batteries are rated for about 500 to 1,000 cycles.",
      },
      {
        term: "Maximum capacity",
        definition: "How much charge your battery holds compared to when it was new. Below 80% is the usual point to replace it.",
      },
      {
        term: "Thermal runaway",
        definition: "A dangerous overheating chain reaction in damaged lithium batteries. It's why swollen batteries should be replaced right away.",
      },
    ],
    faqs: [
      {
        question: "How do I know if I need a new battery?",
        answer:
          "If your maximum capacity is under 80%, your phone shuts down unexpectedly, or it won't last a day, a replacement will restore full performance. We run free diagnostics to confirm before any work.",
      },
      {
        question: "Will a new battery make my phone faster?",
        answer:
          "Often, yes. Worn batteries can't supply peak power, so phones throttle the processor to stay stable. A healthy cell lets your device run at full speed again.",
      },
      {
        question: "Is a swollen battery dangerous?",
        answer:
          "Yes. A swollen battery is at risk of thermal runaway. Stop charging the device and bring it in; we remove swollen cells using fire-safe procedures.",
      },
    ],
  },
  {
    slug: "camera-replacement",
    name: "Camera Replacement",
    shortName: "Camera Replacement",
    icon: Camera,
    image: "/services/camera-replacement.webp",
    tagline: "Camera module and lens repair, with OIS and autofocus testing",
    summary:
      "Blurry shots, a cracked lens cover, or a camera that buzzes or won't focus? We replace front and rear camera modules — wide, ultra-wide, and telephoto — and test autofocus and optical image stabilization.",
    priceFrom: "$55",
    turnaround: "45–60 min",
    overview:
      "Most phones now have several rear cameras — wide, ultra-wide, and telephoto — each with its own image sensor, lens stack, and tiny motors for autofocus and optical image stabilization (OIS). Camera problems usually come from one of three places: a cracked lens cover letting in dust and light flare, a failed OIS or autofocus actuator causing blur or a buzzing sound, or a damaged module showing a black screen. We isolate which lens and component is at fault, replace only what's needed, and verify focus, stabilization, flash, and video at every zoom level.",
    includes: [
      "Wide, ultra-wide, telephoto, or front module replacement",
      "Lens cover glass replacement",
      "Autofocus and OIS actuator testing",
      "Dust and debris removal from the lens stack",
      "Flash, zoom, and video stabilization verification",
      "30-day parts & labor warranty",
    ],
    process: [
      {
        title: "Lens-by-lens diagnosis",
        description: "We test each camera and zoom level to find which lens, module, or software issue is at fault.",
      },
      {
        title: "Component removal",
        description: "The damaged lens cover or camera module is carefully disconnected from the logic board.",
      },
      {
        title: "Replacement",
        description: "A quality-tested part is installed, sealed, and kept free of dust inside the lens stack.",
      },
      {
        title: "Focus & stabilization testing",
        description: "We confirm sharp autofocus, smooth OIS, flash, and clean video before return.",
      },
    ],
    signs: [
      "Blurry photos or autofocus 'hunting'",
      "Camera shakes, buzzes, or rattles",
      "Cracked lens cover or light flares",
      "Black screen on one or more lenses",
      "Dust, spots, or haze in every photo",
    ],
    glossary: [
      {
        term: "Camera module",
        definition: "The complete camera unit: image sensor, lenses, and motors. Each rear lens on your phone is usually its own module.",
      },
      {
        term: "OIS (optical image stabilization)",
        definition: "Tiny motors that move the lens to cancel out hand shake. When OIS fails, the camera may buzz or photos may blur.",
      },
      {
        term: "Autofocus actuator",
        definition: "The small motor that moves the lens to focus. A damaged actuator makes the camera struggle to lock focus.",
      },
      {
        term: "Lens cover glass",
        definition: "The outer glass protecting the camera. It's a quick, low-cost fix when only the cover is cracked.",
      },
    ],
    faqs: [
      {
        question: "My lens cover is cracked but photos look fine — should I fix it?",
        answer:
          "Yes. A cracked lens cover lets in dust and moisture and causes flare in bright light. Replacing just the cover glass is quick and inexpensive.",
      },
      {
        question: "Why does my camera buzz or shake?",
        answer:
          "That's usually a failed OIS or autofocus actuator, often caused by a drop or strong vibration (like mounting a phone on a motorcycle). Replacing the affected module fixes it.",
      },
      {
        question: "Can you fix a camera that won't focus?",
        answer:
          "In most cases, yes. Focus issues are usually a faulty module, which we replace and test across all zoom levels.",
      },
    ],
  },
  {
    slug: "water-damage-repair",
    name: "Water Damage Repair",
    shortName: "Water Damage Repair",
    icon: Droplets,
    image: "/services/water-damage-repair.webp",
    tagline: "Board-level liquid damage repair and data recovery",
    summary:
      "Dropped your device in water? Corrosion starts within hours. Our ultrasonic cleaning and board-level diagnostics give your phone and your data the best chance of recovery.",
    priceFrom: "$79",
    turnaround: "24–72 hrs",
    overview:
      "When liquid gets inside a phone, minerals and electricity react to cause corrosion and short circuits on the logic board (the phone's main circuit board). That's why rice doesn't work — it can't reach or remove corrosion. We disconnect the battery immediately, check the liquid contact indicators, and fully disassemble the device. The logic board goes through an ultrasonic bath with isopropyl alcohol to lift corrosion from under tiny components. We then use a DC power supply and thermal camera to find shorted parts, repair them with board-level micro-soldering, and attempt data recovery so your photos and contacts are protected.",
    includes: [
      "Immediate battery disconnect and full teardown",
      "Liquid contact indicator (LCI) inspection",
      "Ultrasonic isopropyl alcohol bath for the logic board",
      "Short-circuit detection with thermal imaging",
      "Board-level micro-soldering repair",
      "Data recovery attempt",
      "Full function testing after repair",
    ],
    process: [
      {
        title: "Emergency intake",
        description: "We disconnect the battery right away to stop active short circuits and further corrosion.",
      },
      {
        title: "Ultrasonic cleaning",
        description: "The logic board is cleaned in an isopropyl alcohol bath that removes corrosion from under components.",
      },
      {
        title: "Short detection & repair",
        description: "A DC power supply and thermal camera locate shorted parts, which are micro-soldered or replaced.",
      },
      {
        title: "Recovery & testing",
        description: "We attempt data recovery and test charging, audio, cameras, display, and connectivity.",
      },
    ],
    signs: [
      "Device was submerged or splashed",
      "Won't power on or boot-loops after getting wet",
      "Screen shows lines, spots, or discoloration",
      "Muffled speakers or microphone",
      "Fogged camera lens or random restarts",
    ],
    glossary: [
      {
        term: "Logic board",
        definition: "The phone's main circuit board, holding the processor, memory, and power chips. Liquid damage here needs board-level repair.",
      },
      {
        term: "Liquid contact indicator (LCI)",
        definition: "A small sticker inside your phone that changes color when exposed to liquid. It helps us confirm and map the damage.",
      },
      {
        term: "Ultrasonic cleaning",
        definition: "High-frequency sound waves in an alcohol bath shake loose corrosion from places a brush can't reach.",
      },
      {
        term: "Short circuit",
        definition: "When liquid lets electricity flow where it shouldn't, damaging chips. We locate shorts with a thermal camera.",
      },
    ],
    faqs: [
      {
        question: "How soon should I bring in a water-damaged device?",
        answer:
          "As soon as possible. Do not charge or turn it on, and skip the rice. The sooner we disconnect the battery and clean the board, the higher the recovery rate.",
      },
      {
        question: "My phone is water-resistant (IP68). Why did it get damaged?",
        answer:
          "IP ratings are tested in fresh water under lab conditions, and the seals weaken with age, drops, and previous repairs. Salt water, pools, and hot showers can also get past them.",
      },
      {
        question: "Can you recover my data?",
        answer:
          "We attempt data recovery on every water-damage repair. Success depends on the severity, but we prioritize saving your photos and contacts.",
      },
    ],
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
