export interface BrainstormRequest {
  category: string;
  list_of: string;
  context?: string;
  examples?: string;
}

export interface BrainstormResponse {
  ideas: string[];
}

export const getBrainstormingIdeas = async (data: BrainstormRequest): Promise<BrainstormResponse> => {
  try {
    const response = await fetch('/api/brainstorming', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Response status:', response.status);
      console.error('Response text:', await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export interface RewriteRequest {
  selectedText: string;
  rewriteType: "shorter" | "longer" | "more_descriptive" | "more_intense" | "custom";
  customPrompt?: string;
}

export interface RewriteResponse {
  rewritten_text: string;
}

export const getRewrittenText = async (data: RewriteRequest): Promise<RewriteResponse> => {
  try {
    // Map preset rewrite types to default instructions.
    let computedCustomPrompt = "";
    if (data.rewriteType !== "custom") {
      switch (data.rewriteType) {
        case "shorter":
          computedCustomPrompt = "Rewrite the text to be shorter.";
          break;
        case "longer":
          computedCustomPrompt = "Rewrite the text to be longer.";
          break;
        case "more_descriptive":
          computedCustomPrompt = "Rewrite the text to be more descriptive.";
          break;
        case "more_intense":
          computedCustomPrompt = "Rewrite the text to be more intense.";
          break;
        default:
          computedCustomPrompt = "";
      }
    } else {
      computedCustomPrompt = data.customPrompt || "";
    }

    // Make sure to send the keys expected by the Flask API.
    const payload = {
      selected_text: data.selectedText,
      rewrite_type: data.rewriteType,
      custom_prompt: computedCustomPrompt,
    };

    const response = await fetch("/api/rewrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Rewrite response status:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Rewrite API call failed:", error);
    throw error;
  }
};

export interface StoryBibleRequest {
  braindump?: string;
  genre?: string;
  style?: string;
  synopsis?: string;
  characters?: string;
  worldbuilding?: string;
  outline?: string;
}

export interface StoryBibleResponse {
  status: string;
  data: StoryBibleRequest;
}

export const saveStoryBible = async (data: StoryBibleRequest): Promise<StoryBibleResponse> => {
  try {
    const response = await fetch("/api/story_bible", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Story Bible response status:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Story Bible API call failed:", error);
    throw error;
  }
};

export interface ChapterRequest {
  plot_point: string;
  previous_chapters: string;
  character_data: string;
  worldbuilding_data: string;
  user_genre: string;
  user_style: string;
}

export interface ChapterResponse {
  chapter_text: string;
}

// For demo purposes only – comment this out when switching to real API integration.
export const getStoryChapter = async (data: ChapterRequest): Promise<ChapterResponse> => {
  console.log("Demo getStoryChapter called with:", data);
  return {
    chapter_text:
    `Chapter 1: Code Red, Coffee Black (and Possibly Cursed)

The air in the "Innovation Hub" (a glorified, windowless storage room in the basement of the community college) crackled with the potent mixture of desperation, cheap instant coffee, and the ozone tang of overheating laptops. This was it. The annual "Hack-O-Scream," a 48-hour horror-themed hackathon, and Barnaby "Barn" Finch was ready. Or, at least, he projected an aura of readiness so intense it could melt steel, or at least slightly warp the cheap plastic folding chairs they were all sitting on.

"Alright, team! Operation: Nightmare Fuel is a GO!" Barnaby declared, striking a pose that was probably meant to be heroic but mostly resembled a startled flamingo. He brandished a half-eaten bag of gummy worms like a sacred talisman. "We're gonna build the most terrifying, most immersive, most groundbreaking VR horror experience the world has ever seen! They'll be talking about this for decades!"

Aggie McMillan, slumped in the chair beside him, raised a skeptical eyebrow. "They'll be talking about the lawsuits, maybe. Or the therapy bills." She took a long, slow sip of her coffee, the black liquid mirroring the depths of her doubts. "Barn, we're using Unity, a game engine none of us fully understands, to build a VR experience, a technology none of us have ever touched, based on a theme – horror – which, let's be honest, you find scarier than a slightly misaligned spreadsheet."

Barnaby waved a dismissive hand. "Details, details, Aggie! Minor speed bumps on the road to glory! Besides," he leaned in conspiratorially, "I found this amazing footage online. Total found-footage gold. Super creepy, totally authentic-looking. It's gonna be our secret weapon."

Dexter Chen, hunched over his laptop like a question mark made of anxiety and flannel, let out a whimper. "Found footage? Online? Barn, did you even check the source? Did you scan it for viruses? Did you consider the possibility that it might be, you know, cursed?" He nervously adjusted the small, silver crucifix hanging from his neck, a habit he'd developed after a particularly traumatic incident involving a corrupted hard drive and a lost weekend of work.

"Relax, Dex," Barnaby chuckled, patting him on the back with a force that nearly sent Dex sprawling. "It's just a bit of spooky video. What's the worst that could happen?"

The 'Innovation Hub' was a testament to the college's optimistic, if underfunded, approach to technology. The walls were painted a cheerful, yet slightly nauseating, shade of lime green, presumably chosen to inspire creativity (it mostly inspired a vague sense of unease). Posters advertising past hackathons – "Code for a Cause," "Hack the Planet (Responsibly)," "Apps for Aardvarks" – adorned the walls, each one slightly more faded and depressing than the last. The room was crammed with mismatched furniture: a wobbly conference table that served as their main workspace, a collection of beanbag chairs that looked like they'd lost a fight with a badger, and a single, flickering fluorescent light fixture that buzzed with a malevolent energy.

The source of Barnaby's "found-footage gold" was a dusty, unlabeled USB drive he'd mysteriously "acquired" from a box of discarded electronics behind the college library. He'd been drawn to it, he claimed, by a "vibe." Aggie suspected it was more likely the glint of the cheap plastic casing under the moonlight. The footage itself was grainy, shaky, and filled with static. It depicted a dark, seemingly abandoned room, with strange symbols scrawled on the walls. The camera moved erratically, capturing fleeting glimpses of…something. It was hard to tell what. Shadows, maybe. Or something…else. The audio was a cacophony of whispers, clicks, and a low, guttural hum that resonated deep in the chest cavity.

"See? Totally chilling!" Barnaby exclaimed, beaming. "We'll just… loop this in, add some jump scares, maybe a creepy monster or two… it'll be amazing!"

Aggie, watching the footage over his shoulder, felt a prickle of unease. The symbols on the walls… they looked vaguely familiar. Like something she'd seen in an old, leather-bound book her grandmother had kept locked away in the attic. A book her grandmother had warned her never to open.

"Barn," she began, her voice a little tighter than usual, "I'm not sure about this. Those symbols…"

"Perfectly spooky, right?" Barnaby interrupted, already typing furiously, his fingers flying across the keyboard with the reckless abandon of a man who had no idea what he was doing. "I'm thinking we'll use them as… texture maps! Yeah! Give the whole environment a real… ancient, cursed feel!"

Dexter, who had been meticulously sanitizing his hands with antibacterial gel, let out another, higher-pitched whimper. "Ancient? Cursed? Barn, please! My therapist specifically told me to avoid triggers!"

Ignoring them both, Barnaby continued his coding rampage, fueled by the unshakeable belief that he was a genius on the verge of a breakthrough. He copied and pasted lines of code from various online tutorials, tweaking them haphazardly, adding his own "flair" (which mostly involved changing variable names to things like "SpookyMonster" and "JumpScareIntensity"). He hummed along to a death metal soundtrack, completely oblivious to the growing sense of dread in the room.

As the hours ticked by, fueled by an endless supply of energy drinks and sugary snacks, the team's initial enthusiasm began to wane. Barnaby's coding, predictably, was a mess. Aggie, despite her reservations, found herself drawn into the technical challenge, trying to make sense of the chaotic jumble of code Barnaby had created. She was surprisingly good at it, her pragmatic mind finding order in the chaos, her fingers deftly untangling the digital knots. Dex, meanwhile, was a nervous wreck, constantly checking the room for signs of… well, anything. He'd taken to wearing a tinfoil hat, claiming it would protect him from "electromagnetic interference" (and possibly demonic possession).

It was around 3:00 AM, the witching hour (or, as Barnaby called it, "peak coding time"), that the first glitch occurred. The coffee machine, which had been faithfully dispensing lukewarm, vaguely coffee-flavored liquid all night, suddenly sputtered, choked, and then began to spew a thick, crimson fluid that looked disturbingly like blood.

Barnaby stared at it, momentarily speechless. "Huh," he finally said. "That's… new."

Aggie, who had been in the middle of debugging a particularly nasty piece of code, slowly turned her head, her eyes widening. "That's… not coffee," she stated, her voice remarkably calm considering the circumstances.

Dexter let out a shriek that could shatter glass. "It's a sign! A sign! We've angered the spirits! We're all doomed!" He scrambled under the table, clutching his tinfoil hat to his head.

The red liquid continued to pour from the coffee machine, forming a growing puddle on the floor. It smelled… metallic. And strangely… sweet.

Barnaby, ever the optimist, took a tentative sniff. "Maybe it's… cherry flavored?" He dipped a finger into the puddle and brought it to his lips.

Aggie grabbed his wrist. "Barnaby, NO! Don't be an idiot!"

Too late. He'd already tasted it. His face contorted in a mixture of confusion and disgust. "It… tastes like… pennies," he said, his voice strangely muffled. "And… despair."

Then, the lights began to flicker. Not a normal, random flicker, but a rhythmic, patterned flicker that mimicked the staccato rhythm of a jump scare in a horror movie. Flicker-flicker-darkness-flicker-flicker-darkness.

Dexter, still under the table, began to sob. "We're trapped in a real-life horror movie! And it's the badly-written, low-budget kind!"

Aggie, despite her growing fear, felt a strange sense of… detachment. It was as if she were watching a play unfold, a bizarre, absurd play where she was both an actor and an audience member. She looked at Barnaby, who was now staring at his reflection in the puddle of "coffee," his eyes wide and unfocused. She looked at Dexter, a quivering mass of anxiety under the table. And she looked at the flickering lights, the strange symbols on the USB drive (now plugged into Barnaby's laptop), and the growing puddle of… whatever that red stuff was.

A small, almost imperceptible smile played on her lips. "This," she thought, "is going to be interesting." The flickering lights, the strange fluid, the increasing sense of unease; the begining of a long strange night had just begun. They needed to get working, time was fleeting, and they still hadn't made the monster. She had to keep everyone focused, hopefully they could fix things before it got out of hand.`
  };
};

export interface CharacterRequest {
  user_character_description: string;
  user_genre: string;
}

export interface CharacterResponse {
  profile_text: string;
}

export const getCharacterProfile = async (data: CharacterRequest): Promise<CharacterResponse> => {
  try {
    const response = await fetch("/api/character", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Character response status:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Character API call failed:", error);
    throw error;
  }
};

export interface OutlineRequest {
  user_premise: string;
  user_genre: string;
}

export interface OutlineResponse {
  outline_text: string;
}

export const getPlotOutline = async (data: OutlineRequest): Promise<OutlineResponse> => {
  try {
    const response = await fetch("/api/outline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Outline response status:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Outline API call failed:", error);
    throw error;
  }
};