# ScrollReveal Component

High-quality Reveal & Stagger scroll animation component using Framer Motion and Tailwind CSS.

## Features

- ✨ Smooth spring animations (stiffness: 100, damping: 20)
- 🎯 Viewport-triggered animations (20% visibility threshold)
- 🔄 Staggered children animations (customizable delay)
- 🎬 Play once on scroll (no repeat)
- 📱 Fully responsive
- 🎨 Works with any content

## Installation

Make sure you have Framer Motion installed:

```bash
npm install framer-motion
```

## Basic Usage

```tsx
import ScrollReveal, { ScrollRevealItem } from "@/components/ui/ScrollReveal"

function MyComponent() {
  return (
    <ScrollReveal className="grid grid-cols-3 gap-4">
      <ScrollRevealItem>
        <div>Item 1</div>
      </ScrollRevealItem>
      <ScrollRevealItem>
        <div>Item 2</div>
      </ScrollRevealItem>
      <ScrollRevealItem>
        <div>Item 3</div>
      </ScrollRevealItem>
    </ScrollReveal>
  )
}
```

## Props

### ScrollReveal

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | required | Child elements to animate |
| `className` | string | "" | Additional CSS classes |
| `staggerDelay` | number | 0.2 | Delay between each child animation (in seconds) |

### ScrollRevealItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | required | Content to animate |
| `className` | string | "" | Additional CSS classes |

## Examples

### Skill Cards Grid

```tsx
<ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {skills.map((skill) => (
    <ScrollRevealItem key={skill.id}>
      <div className="p-6 rounded-xl bg-white shadow-lg">
        <h3>{skill.name}</h3>
        <p>{skill.level}</p>
      </div>
    </ScrollRevealItem>
  ))}
</ScrollReveal>
```

### Project List (Vertical)

```tsx
<ScrollReveal className="space-y-8" staggerDelay={0.15}>
  {projects.map((project) => (
    <ScrollRevealItem key={project.id}>
      <div className="p-8 rounded-2xl bg-white shadow-lg">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </ScrollRevealItem>
  ))}
</ScrollReveal>
```

### Custom Stagger Delay

```tsx
{/* Faster animation */}
<ScrollReveal staggerDelay={0.1}>
  {/* items */}
</ScrollReveal>

{/* Slower animation */}
<ScrollReveal staggerDelay={0.3}>
  {/* items */}
</ScrollReveal>
```

## Animation Details

### Container Animation
- Fades in from opacity 0 to 1
- Triggers stagger effect for children

### Item Animation
- Slides up 30px (y: 30 → y: 0)
- Fades in (opacity: 0 → opacity: 1)
- Spring transition: stiffness 100, damping 20
- Smooth, organic feel

### Viewport Settings
- Triggers when 20% of element is visible
- Plays animation only once
- No repeat on scroll up/down

## Tips

1. **Grid Layouts**: Use with Tailwind grid classes for card layouts
2. **Lists**: Use with `space-y-*` for vertical spacing
3. **Performance**: Animation plays once, no performance impact after initial load
4. **Customization**: Adjust `staggerDelay` based on number of items (fewer items = faster delay)

## See Also

- Check `components/examples/ScrollRevealExample.tsx` for complete examples
- Framer Motion docs: https://www.framer.com/motion/
