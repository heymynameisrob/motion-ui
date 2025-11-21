# Motiong Interface Guidelines

This is a ever-growing list of details on how to use motion in (web) interfaces. It is a living document, updated based on my learnings. A lot of subjective and open to debate.

NB The website for this isn't being maintained atm. You can see examples more examples on my own website: [https://heymynameisrob.com/work](https://heymynameisrob.com/work)

Contributions are welcome. Edit [this file](https://github.com/heymynameisrob/motion-ui/blob/main/src/content/guidelines.mdx) and submit a pull request.

## Performance
- Most animations can be handled by CSS rather than JavaScript. This reduces bundle-size, complexity, and improves performance in most cases.
- Animation libraries like Motion or React Spring take care of lots of basics for you. Use them when you can.
- Looping animations should pause when not visible on the screen to offload CPU and GPU usage
- Switching themes should not trigger transitions and animations on elements.
- Use `scroll-behavior: smooth` for navigating to in-page anchors, with an appropriate offset
- Stick to animating composite properties like `transform` and `opacity`. If you animate anything else, test a lot. [^1]
- Animations should run at ~60fps to feel fluid and smooth
- Use `will-change:transform|opacity...` or `transform: translateZ(0)` on heavy animations [^2]
- Test your animations on low-powered or throttled devices

## Accessibility
- Always respect `prefers-reduced-motion`. Bonus points for offering using control to toggle this on/off.
- If users prefers reduced motion, don't autoplay videos
- When mounting elements to the DOM with animation, provide a screen-reader alternative that is always there but hidden to visual users
- User aria labels `aria-hidden` to hide elements that are just for animated purposes (e.g. loaders)
- Pause looping animations on keyboard focus [^3]

## Design
- Animations can add delight to an interface or tell a story abotu what's happening.
- Use motion sparingly. Actions that are frequent and low in novelty should avoid extraneous animations:
    - Opening a right click menu
  - Deleting or adding items from a list
    - Hovering trivial buttons
- Tailor your animations to your aesthetic. Slower, softer animations are more cinematic. Snappier animations are more delightful and fun.
- Think about motion as if the elements were physical objects. Respect origin, gravity etc.
- Spring-based animations make an interface feel highly polished and well-built.
- Animation values should be proportional to the trigger size:
    - Don't animate dialog scale in from 0 → 1, fade opacity and scale from ~0.8
    - Don't scale buttons on press from 1 → 0.8, but ~0.96, ~0.9, or so
    - Duration for animating a sidebar should be smaller than moving an entire page around
- If in doubt, go with `200ms` and `easOut` to make animations look 👌
- Most built-in easing curves suck. I use the ones below:

```css
:root {
  --ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
}
```

[^1]: [Great article](https://www.granola.ai/blog/dont-animate-height) explaining why animating `height` causes huge amounts of performance problems
[^2]: Don't apply globally or use willy-nilly. Apply `will-change` to frequent animations and `transform: translateZ(0)` to boost performance if sluggish.
[^3]: WAI-ARIA spec recommends this in the [here](https://www.w3.org/WAI/tutorials/carousels/animations/)
