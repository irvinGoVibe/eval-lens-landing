Bento content tile for the homepage feature grid. One idea per tile; the title's
accent phrase carries the lens gradient.

```jsx
<Tile
  surface="ink"
  title="Private"
  titleAccent="deck vault"
  body="Pitch decks are stored and processed inside controlled project workspaces."
/>
<Tile surface="ink" eyebrow="1,000+ evaluation runs" title="Built for your batch">
  {/* chips, links, or a visual */}
</Tile>
```

`surface` is `ink` (dark, default) or `light`. Put chips, links, or a media slot
in `children`.
