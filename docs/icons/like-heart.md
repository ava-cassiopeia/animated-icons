---
title: Like Heart Icon
---
# Like Heart Icon

**Import:** `import "anim-icons/like-heart";`<br />
**Tag:** `<icon-like-heart>`<br />
**Since:** v0.1.0

This is a simple animated icon that shows a mouse clicking on a heart, which 
shows exploding lines around it after being "clicked". 

It exposes the following CSS custom properties that allow for its customization:

| Name | Default | Description |
| ---- | ------- | ----------- |
| `--like-heart-click-speed` | `300ms` | Represents the amount of time that it takes for the "click" animation to play. Will also be used to figure out when to show the explosion lines. |
| `--like-heart-anim-offset` | `700ms` | Offset between when the element is told to animate and when the animation actuallys plays. |
| `--like-heart-line-color` | `#000` | Color of the lines around the heart that appear when it is "clicked". |
| `--like-heart-heart-color` | `#000` | Color of the heart *after* it is "clicked" by the mouse. |