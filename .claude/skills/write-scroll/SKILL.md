---
name: write-scroll
description: Write markdown content for in-game scrolls in the Head over Heels remake, matching the tone and conventions of the existing manual files
argument-hint: [description of what the scroll should say]
---

Write markdown content for an in-game scroll. The user will describe what the scroll should convey; your job is to write it in the correct style.

## Tone and style

The writing style is dry, matter-of-fact British English with understated humour. Absurd details are delivered deadpan as though perfectly reasonable. Sentences are short and punchy. Paragraphs are brief (1-3 sentences typically).

Read the existing manual files in `src/manual/` for reference, especially:
- `src/manual/historyOfTheBlacktoothEmpire.md` - world-building tone
- `src/manual/theGame.md` - mission briefing tone
- `src/manual/theEmperorsGuardian.md` - in-world character voice
- `src/manual/teleportBack.md` - example of an in-world note from a character
- `src/manual/returnOfTheEmpire.md` - sequel storyline

## Lore context

- The Blacktooth Empire enslaves four worlds: Egyptus, Penitentiary, Safari, and Book World
- Head (Headus Mouthion) and Heels (Footus Underium) are symbiotic spies from the planet Freedom
- Head can glide with rudimentary wings, fire doughnuts from a hooter
- Heels has powerful legs, runs fast, carries items in a bag
- They were originally captured and imprisoned in Blacktooth castle
- In the sequel storyline, they succeeded 38 years ago and now voluntarily return
- The new Emperor is a distant cousin of the old one, more paranoid
- The Architect designed the new traps after studying longplays on Youtube
- Head and Heels live on a personal moonbase orbiting Freedom

## Curly apostrophes

Use curly/smart apostrophes (\u2019) not straight ones, matching the existing manual files.

## Inline images

Scrolls can optionally include sprite images using this syntax:

```
![](texture-name)Text starts here on the same line
![](texture-name?float-right)Text with image floated right
![](texture-name?float-right&clear-right)Multiple classes separated by &
![](texture-name?bg-pureBlack)With background colour
```

Common texture names: `texture-crown_blacktooth`, `texture-crown_bookworld`, `texture-crown_egyptus`, `texture-crown_penitentiary`, `texture-crown_safari`, `texture-teleporter`, `texture-head_walking_right_2`, `texture-heels_standing_towards`, `texture-animated-dalek`, `texture-cyberman_towards`, `texture-blacktooth_wall_armour_left`, `texture-blacktooth_wall_shield_away`, `texture-bag`, `texture-hooter`, `texture-doughnuts`, `texture-animated-helicopterBug`, `texture-hushPuppy`, `texture-spring_released`, `texture-fish_1`.

Only include images if they are relevant and the scroll is long enough to warrant them. Short notes (like `teleportBack.md`) may have one or none.

## Output

Write the scroll content as markdown. After the user approves the content, suggest they use `/md-to-json-string` to convert it for embedding in room JSON.
