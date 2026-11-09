# Progress Knight personal web app

The playable campaign in index.html loads balance.js and remastered.js. The earlier custom campaign remains in previous.html with its own browser save key.

## Reference build

Android package com.doelia.pkhd, version 1.9.1 (build 191), contains the Remastered game tables, amulet state machine and art. Reference APK SHA-256 is 110df478844acafb39a47b1240cc4e02b7ec19b79a2a4907e686eea64d29dc94. The iOS listing identifies a later release, 1.10.2. Its executable has not been compared.

- balance.js records base pay, XP thresholds, skill effects, property upkeep, equipment and prerequisites. The reference defines 20 jobs, 23 skills, nine properties and eight miscellaneous items.
- The public release has six skills in each alignment. The amulet changes at ages 25, 45, 65, 200 and 300. Ordinary rebirth remembers the levels of the life just finished. Alignment and orb rebirths clear those memories. Each orb gives five times skill XP. The final amulet event requires both orbs and age 200.
- The browser interface and save format are specific to this port. The two optional potions run without native ads or purchases. The game saves on the device.

## Run

Generate the artwork from a local copy of the Android 1.9.1 APK with Python and Pillow using python build_art.py PATH_TO_APK. The published personal Site already includes its artwork. Serve this directory over HTTPS, or localhost for development. On iPhone, open the hosted game in Safari, choose Share, then Add to Home Screen.

## Verification

Run node verify.cjs from this directory. The checks cover the screenshot at Concentration 26, Productivity 17, Bargaining 7 and Strength 15, each displayed wage and upkeep example, an earned first promotion, the ordinary and alignment resets, both orbs and the final amulet. Boundary tests use explicit late-game fixtures.
