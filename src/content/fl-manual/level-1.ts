// Level 1 — "The FL Studio interface"
// Lesson outlines adapted from the official FL Studio online manual:
// https://www.image-line.com/fl-studio-learning/fl-studio-online-manual
// All prose here is our own paraphrase; each lesson links back to the
// canonical manual page for the authoritative reference.

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number; // index
  explain: string;
};

export type Lesson = {
  slug: string;
  title: string;
  short: string; // one-line teaser
  minutes: number;
  xp: number;
  intro: string[]; // paragraphs
  keyPoints: string[];
  shortcuts: { keys: string; does: string }[];
  tryIt: string[];
  quiz: QuizQuestion[];
  sourceUrl: string;
  sourceLabel: string;
  /**
   * Optional official Image-Line YouTube video ID for this lesson.
   * Embedded via YouTube's player (fully licensed by YT's ToS).
   * Swap for your preferred video from https://www.youtube.com/@imageline
   */
  youtubeId?: string;
};

const MANUAL_ROOT = "https://www.image-line.com/fl-studio-learning/fl-studio-online-manual";

export const LEVEL_1 = {
  n: 1,
  title: "The FL Studio interface",
  subtitle:
    "Get fluent with the five windows every producer uses every session: Browser, Channel Rack, Playlist, Piano Roll, and Mixer.",
  lessons: [
    {
      slug: "interface-tour",
      title: "Interface tour",
      short: "The big picture — Toolbar, Browser, Channel Rack, Playlist, Piano Roll, Mixer.",
      minutes: 8,
      xp: 40,
      intro: [
        "FL Studio's main window is a workbench, not a single document. You'll spend your session moving between five floating windows that each own a specific job.",
        "The Toolbar sits across the top — it's your transport (play, stop, record), your tempo, and quick-access buttons to open every other window.",
        "Once you learn what each window is *for*, the interface stops feeling busy and starts feeling like a studio.",
      ],
      keyPoints: [
        "Toolbar = transport + shortcuts to every window",
        "Browser = files, samples, plugin presets",
        "Channel Rack = your instruments and step sequencer",
        "Playlist = full song arrangement",
        "Piano Roll = notes for one instrument",
        "Mixer = levels, effects, routing",
      ],
      shortcuts: [
        { keys: "F5", does: "Toggle Playlist" },
        { keys: "F6", does: "Toggle Channel Rack" },
        { keys: "F7", does: "Toggle Piano Roll" },
        { keys: "F9", does: "Toggle Mixer" },
        { keys: "Space", does: "Play / Stop" },
      ],
      tryIt: [
        "Press F5, F6, F7, and F9 in order and watch each window toggle.",
        "Drag the Channel Rack to the right side of the screen.",
        "Press Space to start playback, Space again to stop.",
        "Hover the tempo readout in the Toolbar and scroll to change BPM.",
      ],
      quiz: [
        {
          q: "Which shortcut toggles the Mixer?",
          options: ["F5", "F6", "F7", "F9"],
          answer: 3,
          explain: "F9 opens the Mixer. F5 = Playlist, F6 = Channel Rack, F7 = Piano Roll.",
        },
        {
          q: "Where do you arrange the full song?",
          options: ["Channel Rack", "Playlist", "Piano Roll", "Mixer"],
          answer: 1,
          explain: "The Playlist is where patterns and audio clips are placed on the timeline.",
        },
        {
          q: "What does the Toolbar own?",
          options: ["Effects routing", "Transport controls and window shortcuts", "MIDI notes", "Sample browsing"],
          answer: 1,
          explain: "Toolbar = play/stop/record, tempo, and shortcuts to every other window.",
        },
      ],
      sourceUrl: `${MANUAL_ROOT}`,
      sourceLabel: "FL Studio Manual — Interface overview",
    },
    {
      slug: "browser",
      title: "The Browser",
      short: "Find samples, presets, and projects fast — and drag them anywhere.",
      minutes: 7,
      xp: 40,
      intro: [
        "The Browser is the tall panel on the left. It's a live view of your sample and preset folders — no import step, just drag and drop.",
        "You can add your own folders under Options → File Settings, then everything is one click away.",
        "Pro habit: preview samples by clicking them once. FL auto-plays them so you can audition a whole folder in seconds.",
      ],
      keyPoints: [
        "Left-click a sample to preview it instantly",
        "Drag a sample into the Channel Rack to make it a channel",
        "Drag directly into the Playlist to place an audio clip",
        "Add your own folders in Options → File Settings",
      ],
      shortcuts: [
        { keys: "F8", does: "Toggle Browser / Plugin Picker" },
        { keys: "Alt+Click", does: "Show a sample's containing folder" },
      ],
      tryIt: [
        "Open Packs and click 3 different kick samples — listen to each.",
        "Drag a kick from the Browser into an empty row of the Channel Rack.",
        "Drag a loop straight into the Playlist as an audio clip.",
      ],
      quiz: [
        {
          q: "How do you preview a sample in the Browser?",
          options: ["Double-click it", "Right-click → Preview", "Left-click it once", "Drag it to the Mixer"],
          answer: 2,
          explain: "One left-click auto-previews the sample.",
        },
        {
          q: "Dragging a sample into the Channel Rack…",
          options: ["Deletes it", "Adds it as a new channel", "Adds it as an audio clip", "Loads it into the Mixer"],
          answer: 1,
          explain: "Dropping into the Channel Rack creates a new sampler channel.",
        },
        {
          q: "Where do you add your own sample folders?",
          options: ["Options → File Settings", "View → Browser", "Tools → Import", "Mixer → Insert"],
          answer: 0,
          explain: "Options → File Settings lets you point FL at any folder on your drive.",
        },
      ],
      sourceUrl: `${MANUAL_ROOT}`,
      sourceLabel: "FL Studio Manual — Browser",
    },
    {
      slug: "channel-rack",
      title: "The Channel Rack",
      short: "Where instruments live and step sequencing happens.",
      minutes: 9,
      xp: 45,
      intro: [
        "The Channel Rack is the vertical list of instrument channels — each row is one sound (a kick, a snare, a synth patch).",
        "The grid of squares next to each channel is the step sequencer. Click a square to trigger that sound on that step. This is the fastest way to sketch a drum groove.",
        "Every channel routes to a Mixer track (top-right corner of the channel settings) — that's how effects get applied later.",
      ],
      keyPoints: [
        "One row = one instrument channel",
        "The step grid is a quick drum sequencer",
        "Right-click a channel name to rename, replace, or delete",
        "Assign a channel to a Mixer track via the FX number",
      ],
      shortcuts: [
        { keys: "F6", does: "Toggle Channel Rack" },
        { keys: "Right-click step", does: "Half-time / accent options" },
      ],
      tryIt: [
        "Program a basic 4-on-the-floor kick on steps 1, 5, 9, 13.",
        "Add a clap on steps 5 and 13.",
        "Add closed hats on every other step.",
        "Rename each channel to what it actually is (Kick, Clap, Hat).",
      ],
      quiz: [
        {
          q: "What is a single row in the Channel Rack?",
          options: ["A song section", "One instrument channel", "A Mixer bus", "An automation clip"],
          answer: 1,
          explain: "Each row is one channel — one sound source.",
        },
        {
          q: "The grid of squares is…",
          options: ["A piano roll", "A step sequencer", "The Mixer", "The Browser"],
          answer: 1,
          explain: "It's the step sequencer — click a step to trigger the sound.",
        },
        {
          q: "How do effects get applied to a channel?",
          options: [
            "Directly on the channel row",
            "By routing it to a Mixer track",
            "From the Browser",
            "Only on export",
          ],
          answer: 1,
          explain: "Channels route to Mixer tracks; effects live on the Mixer.",
        },
      ],
      sourceUrl: `${MANUAL_ROOT}`,
      sourceLabel: "FL Studio Manual — Channel Rack",
    },
    {
      slug: "playlist",
      title: "The Playlist",
      short: "The full song timeline — patterns and audio, arranged left to right.",
      minutes: 9,
      xp: 45,
      intro: [
        "The Playlist is where a beat becomes a *song*. Time runs left to right; tracks stack vertically and hold either patterns or audio clips.",
        "Unlike other DAWs, FL Studio's Playlist tracks aren't tied to a specific instrument — any track can hold any clip.",
        "The two most important tools are the Draw tool (paint clips in) and the Select tool (grab and move them).",
      ],
      keyPoints: [
        "Left → right = time; top → bottom = layered tracks",
        "Tracks are generic — any clip can go on any track",
        "Draw tool places clips, Select tool moves them",
        "Playlist clips are references to patterns — edit once, updates everywhere",
      ],
      shortcuts: [
        { keys: "F5", does: "Toggle Playlist" },
        { keys: "P", does: "Draw tool" },
        { keys: "S", does: "Slice tool" },
        { keys: "E", does: "Select tool" },
      ],
      tryIt: [
        "Switch to the Draw tool (P) and paint your drum pattern across 8 bars.",
        "Switch to Select (E) and move the pattern to bar 5.",
        "Add a second track above and paint an empty melody pattern there.",
      ],
      quiz: [
        {
          q: "Playlist tracks in FL Studio are…",
          options: [
            "Tied to one instrument each",
            "Generic — any clip can go on any track",
            "Read-only",
            "For audio only",
          ],
          answer: 1,
          explain: "Playlist tracks are generic containers, unlike Ableton or Logic.",
        },
        {
          q: "Which shortcut opens the Playlist?",
          options: ["F5", "F6", "F7", "F9"],
          answer: 0,
          explain: "F5 toggles the Playlist.",
        },
        {
          q: "Editing a pattern in the Piano Roll updates…",
          options: [
            "Only the clip you clicked",
            "Every Playlist clip that references that pattern",
            "Nothing until you re-render",
            "Only the Mixer",
          ],
          answer: 1,
          explain: "Playlist clips are references — edit once, updates everywhere.",
        },
      ],
      sourceUrl: `${MANUAL_ROOT}`,
      sourceLabel: "FL Studio Manual — Playlist",
    },
    {
      slug: "piano-roll",
      title: "The Piano Roll",
      short: "Draw notes for melodies, chords, and 808s.",
      minutes: 10,
      xp: 50,
      intro: [
        "The Piano Roll is where you draw MIDI notes for one instrument. It's arguably FL Studio's most-loved feature — producers swear by it.",
        "The keyboard runs down the left side. Time runs left to right. The Draw tool paints notes; you can drag their length and slide them vertically to change pitch.",
        "Velocity (how hard a note is hit) lives in the strip below the note area — critical for making drums and melodies feel human.",
      ],
      keyPoints: [
        "One Piano Roll = one instrument's notes",
        "Draw tool paints notes; drag right edge to change length",
        "Velocity strip below controls how hard each note hits",
        "Ghost notes show other patterns' notes for reference",
      ],
      shortcuts: [
        { keys: "F7", does: "Toggle Piano Roll" },
        { keys: "Ctrl+A", does: "Select all notes" },
        { keys: "Ctrl+B", does: "Duplicate selection" },
        { keys: "Alt+S", does: "Snap to scale" },
      ],
      tryIt: [
        "Open a synth's Piano Roll and draw a 4-note melody in C minor.",
        "Adjust the velocity strip so the first note is louder than the others.",
        "Select all (Ctrl+A) and duplicate (Ctrl+B) to extend the phrase.",
      ],
      quiz: [
        {
          q: "The strip below the note area controls…",
          options: ["Panning", "Velocity", "Pitch bend", "Tempo"],
          answer: 1,
          explain: "By default it's velocity — how hard each note is played.",
        },
        {
          q: "Which shortcut duplicates selected notes?",
          options: ["Ctrl+D", "Ctrl+B", "Ctrl+V", "Alt+D"],
          answer: 1,
          explain: "Ctrl+B (Bounce) duplicates the selection right after itself.",
        },
        {
          q: "A single Piano Roll belongs to…",
          options: [
            "The whole project",
            "One Mixer track",
            "One instrument channel",
            "The Playlist",
          ],
          answer: 2,
          explain: "Each instrument channel has its own Piano Roll patterns.",
        },
      ],
      sourceUrl: `${MANUAL_ROOT}`,
      sourceLabel: "FL Studio Manual — Piano Roll",
    },
    {
      slug: "mixer",
      title: "The Mixer",
      short: "Levels, effects, and routing — where beats become records.",
      minutes: 9,
      xp: 45,
      intro: [
        "The Mixer holds up to 125+ insert tracks plus a Master. Every instrument channel that needs its own volume or effects gets routed to a Mixer track.",
        "Each track has 10 effect slots on the right. Chain plugins top-to-bottom — the signal flows down the chain into the fader.",
        "The Master is the final stop. Anything you want on the whole mix (bus compression, limiter) goes here.",
      ],
      keyPoints: [
        "Each Mixer track has 10 effect slots",
        "Signal flows top → bottom through the effect chain",
        "The Master is the sum of everything",
        "Right-click a fader to link, rename, or reset",
      ],
      shortcuts: [
        { keys: "F9", does: "Toggle Mixer" },
        { keys: "Ctrl+L", does: "Link selected channel to selected Mixer track" },
      ],
      tryIt: [
        "Route your Kick channel to Mixer track 1, Clap to 2, Hat to 3.",
        "Add a Fruity Parametric EQ 2 on the Kick track and cut everything below 40 Hz.",
        "Add a limiter on the Master track.",
      ],
      quiz: [
        {
          q: "How many effect slots does each Mixer track have?",
          options: ["4", "6", "10", "Unlimited"],
          answer: 2,
          explain: "10 insert slots per track, chained top-to-bottom.",
        },
        {
          q: "What's the fastest way to link a channel to a Mixer track?",
          options: ["Drag it", "Ctrl+L", "Right-click the fader", "F2"],
          answer: 1,
          explain: "Select the channel, select the target Mixer track, press Ctrl+L.",
        },
        {
          q: "Where should bus-wide processing (like a final limiter) go?",
          options: ["On every track", "On the Master", "In the Playlist", "In the Browser"],
          answer: 1,
          explain: "The Master is the final sum — put mastering-stage plugins there.",
        },
      ],
      sourceUrl: `${MANUAL_ROOT}`,
      sourceLabel: "FL Studio Manual — Mixer",
    },
    {
      slug: "transport-tempo",
      title: "Transport & tempo",
      short: "Play, record, loop, and set the pulse of your beat.",
      minutes: 6,
      xp: 35,
      intro: [
        "The Transport lives on the Toolbar. Play, Stop, Record, plus a switch that decides whether playback is scoped to the current *pattern* or the whole *song*.",
        "Tempo (BPM) is right there in the Toolbar — click and drag or scroll to change it. Most Trap sits at 130–160 BPM (or half-time at 65–80).",
        "The Pattern/Song switch trips up beginners: if you're hearing nothing when you press play, check whether you're in Pattern mode with an empty pattern selected.",
      ],
      keyPoints: [
        "PAT mode plays the current pattern only",
        "SONG mode plays the full Playlist arrangement",
        "Scroll the tempo readout to nudge BPM",
        "Right-click Play for extra options (countdown, etc.)",
      ],
      shortcuts: [
        { keys: "Space", does: "Play / Stop" },
        { keys: "L", does: "Toggle Pattern / Song mode" },
        { keys: "R", does: "Record" },
      ],
      tryIt: [
        "Switch to SONG mode with L and press Space — the Playlist should play.",
        "Switch back to PAT mode and play a single pattern.",
        "Set tempo to 140 BPM by scrolling on the readout.",
      ],
      quiz: [
        {
          q: "If Space plays nothing, the most likely cause is…",
          options: [
            "Broken speakers",
            "You're in PAT mode with an empty pattern selected",
            "The Mixer is muted",
            "FL Studio needs restarting",
          ],
          answer: 1,
          explain: "Beginners often forget the PAT/SONG switch — check it first.",
        },
        {
          q: "Which key toggles Pattern / Song mode?",
          options: ["P", "L", "M", "T"],
          answer: 1,
          explain: "L flips between PAT and SONG playback.",
        },
        {
          q: "Trap tempo typically sits around…",
          options: ["80 BPM", "100 BPM", "140 BPM", "180 BPM"],
          answer: 2,
          explain: "Most Trap is 130–160 BPM (or half-time 65–80).",
        },
      ],
      sourceUrl: `${MANUAL_ROOT}`,
      sourceLabel: "FL Studio Manual — Transport panel",
    },
    {
      slug: "patterns-vs-clips",
      title: "Patterns vs clips",
      short: "The mental model that makes FL Studio click.",
      minutes: 7,
      xp: 40,
      intro: [
        "A *pattern* is a container of MIDI/step data — drums, a melody, a bassline. You edit a pattern once in the Channel Rack or Piano Roll.",
        "A *clip* on the Playlist is a *reference* to a pattern. Drop the same pattern in 8 places — edit it once, all 8 update. This is the superpower.",
        "Audio clips are different: they hold sample data directly and live on Playlist tracks without a pattern.",
      ],
      keyPoints: [
        "Pattern = editable source of notes/steps",
        "Playlist clip = reference to a pattern",
        "Change the source pattern → all references update",
        "Audio clips hold audio directly, not pattern references",
      ],
      shortcuts: [
        { keys: "+ / -", does: "Cycle to next / previous pattern" },
        { keys: "F4", does: "Next empty pattern" },
      ],
      tryIt: [
        "Create pattern 'Drums A' with a beat, drop it 4 times on the Playlist.",
        "Open the Piano Roll and change one hi-hat — watch all 4 Playlist clips reflect the change.",
        "Press F4 to jump to a fresh pattern named automatically.",
      ],
      quiz: [
        {
          q: "A Playlist clip is…",
          options: [
            "A copy of a pattern",
            "A reference to a pattern",
            "A Mixer channel",
            "An automation lane",
          ],
          answer: 1,
          explain: "It's a reference — edit the pattern, every clip updates.",
        },
        {
          q: "Audio clips…",
          options: [
            "Also reference patterns",
            "Hold sample data directly",
            "Can't be moved",
            "Only live in the Browser",
          ],
          answer: 1,
          explain: "Audio clips hold the audio itself, no pattern intermediary.",
        },
        {
          q: "What does F4 do?",
          options: [
            "Deletes the pattern",
            "Jumps to the next empty pattern",
            "Opens the Mixer",
            "Records automation",
          ],
          answer: 1,
          explain: "F4 hops to a fresh, empty pattern.",
        },
      ],
      sourceUrl: `${MANUAL_ROOT}`,
      sourceLabel: "FL Studio Manual — Patterns",
    },
    {
      slug: "saving-your-project",
      title: "Saving your project",
      short: "Save early, save often — and know the difference between .flp and a bounce.",
      minutes: 5,
      xp: 30,
      intro: [
        "FL Studio projects save as `.flp` files — they contain your patterns, arrangement, mixer state, and references to samples.",
        "*Save As* to a new name at every real milestone. Version your files: `beat-v01.flp`, `beat-v02.flp`, `beat-final.flp`. Future-you will thank you.",
        "Bouncing (File → Export) is different: it renders your project to WAV/MP3 for release or sharing. That's a mastered-out audio file, not an editable project.",
      ],
      keyPoints: [
        "Ctrl+S saves; Ctrl+Shift+S is Save As",
        "Zipped Loop Package (.zip) bundles project + samples for sharing",
        "Export (Ctrl+R) renders audio, not a project",
        "Auto-save is on by default — don't rely on it alone",
      ],
      shortcuts: [
        { keys: "Ctrl+S", does: "Save" },
        { keys: "Ctrl+Shift+S", does: "Save As" },
        { keys: "Ctrl+R", does: "Export audio" },
      ],
      tryIt: [
        "Save your project as `learnbeats-lesson-01.flp`.",
        "Save As a new version: `learnbeats-lesson-01-v2.flp`.",
        "Export → WAV, then play the exported file outside FL Studio.",
      ],
      quiz: [
        {
          q: "What does Ctrl+R do?",
          options: ["Save", "Save As", "Export audio", "Record"],
          answer: 2,
          explain: "Ctrl+R opens Export — renders your project to audio.",
        },
        {
          q: "Best way to share a project with all its samples?",
          options: [
            "Send just the .flp",
            "Send a Zipped Loop Package",
            "Screenshot the Playlist",
            "Send only the exported WAV",
          ],
          answer: 1,
          explain: "The zipped loop package bundles project + all sample dependencies.",
        },
        {
          q: "Why version your saves (v01, v02, v03)?",
          options: [
            "It sounds better",
            "You can roll back if you break something",
            "FL Studio requires it",
            "It exports faster",
          ],
          answer: 1,
          explain: "Versioning lets you recover from bad decisions without losing work.",
        },
      ],
      sourceUrl: `${MANUAL_ROOT}`,
      sourceLabel: "FL Studio Manual — Saving projects",
    },
  ] satisfies Lesson[],
};

export const LEVEL_1_LESSONS: Lesson[] = LEVEL_1.lessons;
