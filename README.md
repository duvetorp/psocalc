# PsoCalc

**A free, open-source web app for scoring psoriasis severity – PASI, zPASI and BSA – right in the browser.**

👉 **Try it:** [duvetorp.github.io/psocalc](https://duvetorp.github.io/psocalc/)

PsoCalc helps clinicians, researchers and study teams estimate psoriasis disease activity in the skin quickly and consistently. You assess each body region, the app calculates the scores, and nothing is stored or sent anywhere.

---

## Why PsoCalc?

Anyone who studies psoriasis in the skin needs a simple way to estimate disease activity. PsoCalc is an open-source project built to make that easier. Our goal is that you can use the web app **as it is**, or **adapt it to your own study**.

## Features

- **Guided assessment.** Head, arms, torso and legs are assessed one at a time, and the app leads you to the next region.
- **Palm method for area.** Enter the affected area as a number of the patient's palms (the hand without fingers).
- **Severity with reference images.** Rate redness, thickness and scaling from 0 to 4 against example photos.
- **Live body figure.** The affected body part fills in as you enter the area, and its colour follows the redness score.
- **Three scores.** PASI, zPASI and BSA are calculated automatically. Only regions marked as done are counted.
- **Multilingual.** Available in English, Swedish, Dutch and Spanish.
- **Mobile first.** Designed for phones and works just as well on tablets and desktops.
- **Private by design.** Runs entirely in the browser, with no accounts, no storage and no tracking.

## How it works

1. **Assess each body part.** Head, arms, torso and legs are assessed separately.
2. **Enter area and severity.** Give the area in palms and choose redness, thickness and scaling (0–4) using the reference images.
3. **See the results.** PASI, zPASI and BSA are calculated as soon as you are done.

## Calculations

### BSA (Body Surface Area)

BSA is based on the following assumptions:

| Region | Share of total skin surface |
| --- | --- |
| Head and neck | 10 % |
| Arms and hands | 20 % |
| Torso (abdomen, chest, back) | 30 % |
| Legs, buttocks and feet | 40 % |
| **1 palm (PSA)** | **0.5 %** |

PSA (Palm Surface Area) is the area of the palm of the person with psoriasis, meaning the hand without fingers. Note that the **buttocks are part of the legs**.

### PASI

PASI is calculated using the method described by Fredriksson and Pettersson, *Dermatologica* 157: 238–244 (1978). In this app the calculation also uses the area assumptions listed under BSA.

### zPASI

zPASI is a modified PASI. Standard PASI puts the area into steps, while zPASI calculates the AREA score continuously from **a %**, the percentage of the region (head, arms, torso or legs) that is covered with psoriasis:

| a % | AREA score |
| --- | --- |
| 0 % | 0 |
| 1–9 % | 1/9 × a% |
| 10–29 % | 1 + 1/20 × (a% − 9) |
| 30–49 % | 2 + 1/20 × (a% − 29) |
| 50–69 % | 3 + 1/20 × (a% − 49) |
| 70–89 % | 4 + 1/20 × (a% − 69) |
| 90–100 % | 5 + 1/11 × (a% − 89) |

## Getting started

PsoCalc is a [Next.js](https://nextjs.org) app built as a static export.

```bash
git clone https://github.com/duvetorp/psocalc.git
cd psocalc
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

The static site is written to `out/`. In production the app is served under the base path `/psocalc`, which is set in `next.config.js`. Change it there if you host the app somewhere else.

### Deploy

The workflow in `.github/workflows/deploy.yml` builds the app and publishes it to GitHub Pages. You start it manually from the **Actions** tab.

### Project structure

```
src/
  pages/        Start page, area list, assessment page and results
  components/   UI components (body figure, sliders, dialogs, guide …)
  context/      Assessment state and translations
  hooks/        PASI, zPASI and BSA calculations
  lib/          Body regions, silhouettes and score helpers
  locales/      Translations (en, sv, nl, es)
public/images/  Body figures, reference images and guide screenshots
```

### Adding a language

1. Copy `src/locales/en.json` to a new file, for example `de.json`, and translate the values.
2. Register the language in the translation context and the language switcher.
3. Optionally add guide screenshots in `public/images/guide/<language>/`.

## Contributing

Contributions, adaptations and forks are welcome. Open an issue or a pull request if you find a bug or have an idea. If you build on PsoCalc, we would appreciate credit to the original creators.

## About

PsoCalc was created on the initiative of **Albert Duvetorp** at the Department of Dermatology, Skåne University Hospital, Sweden. The project was financially supported by **AbbVie** and carried out in collaboration with **Webexpress Stockholm**.

## License

- **Source code:** [MIT License](LICENSE). You are free to use, copy, modify and distribute the code. Please keep the copyright notice and credit the creators.
- **zPASI:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). You may share and adapt it for any purpose, including commercial use, as long as you give appropriate credit, link to the license and indicate if changes were made.

## Disclaimer

> The creators of this web application disclaim legal responsibility for its use or application. **PsoCalc is not a registered medical device.** Users should use the app critically and are responsible for ensuring that the calculations are performed correctly.
