# GAMES ONN - Assets Folder Structure

## Required Assets Directory

Create the following folder structure in your project root:

```
assets/
├── posters/
│   ├── gta5.jpg
│   ├── cyberpunk2077.jpg
│   ├── csgo.jpg
│   ├── cs2.jpg
│   ├── rdr2.jpg
│   ├── valorant.jpg
│   ├── eafc24.jpg
│   ├── fifa23.jpg
│   ├── wwe2k25.jpg
│   ├── forzahorizon5.jpg
│   ├── godofwar.jpg
│   ├── hitman3.jpg
│   ├── minecraft.jpg
│   ├── warzone.jpg
│   ├── apexlegends.jpg
│   ├── pubg.jpg
│   ├── rocketleague.jpg
│   ├── nfsheat.jpg
│   ├── witcher3.jpg
│   └── acvalhalla.jpg
│
├── trailers/
│   ├── gta5.mp4
│   ├── cyberpunk2077.mp4
│   ├── csgo.mp4
│   ├── cs2.mp4
│   ├── rdr2.mp4
│   ├── valorant.mp4
│   ├── eafc24.mp4
│   ├── fifa23.mp4
│   ├── wwe2k25.mp4
│   ├── forzahorizon5.mp4
│   ├── godofwar.mp4
│   ├── hitman3.mp4
│   ├── minecraft.mp4
│   ├── warzone.mp4
│   ├── apexlegends.mp4
│   ├── pubg.mp4
│   ├── rocketleague.mp4
│   ├── nfsheat.mp4
│   ├── witcher3.mp4
│   └── acvalhalla.mp4
│
├── gallery/
│   ├── gaming-arena.jpg
│   ├── ps5-zone.jpg
│   ├── rtx-stations.jpg
│   ├── cafe-lounge.jpg
│   ├── tournament-stage.jpg
│   └── vip-pod.jpg
│
├── cafe-ambience.mp4          # Hero background video (gaming café ambience)
├── hero-fallback.jpg          # Fallback image if video fails
├── logo.png                   # Brand logo (optional)
└── favicon.ico                # Site favicon (optional)
```

## Asset Specifications

### Posters (Game Cards)
- **Format**: JPG/JPEG
- **Dimensions**: 600x800px (portrait, 3:4 ratio)
- **File Size**: < 200KB each (optimized for web)
- **Quality**: High quality game artwork/cover art

### Trailers (Game Previews)
- **Format**: MP4 (H.264 codec)
- **Dimensions**: 1280x720px or 1920x1080px
- **Duration**: 10-30 seconds (short gameplay clips)
- **File Size**: < 5MB each
- **Audio**: Muted in code (but can include audio track)

### Hero Video (Café Ambience)
- **Format**: MP4 (H.264 codec)
- **Dimensions**: 1920x1080px (Full HD)
- **Duration**: 15-60 seconds (looping)
- **File Size**: < 15MB
- **Content**: Gaming café interior, neon lights, people gaming
- **Audio**: Should be silent or have subtle ambient sounds

### Gallery Images
- **Format**: JPG/JPEG or WebP
- **Dimensions**: 1200x800px minimum
- **File Size**: < 300KB each
- **Content**: Real photos of your gaming café interior

## Fallback Behavior

The website includes automatic fallbacks:

1. **Poster Images**: If a poster fails to load, a gradient background with a 🎮 icon is displayed
2. **Hero Video**: If the video fails, a gradient overlay is shown instead
3. **Gallery Images**: Placeholder icons are shown by default until replaced with actual photos

## Where to Get Assets

### Game Posters
- Official game websites
- Steam store pages
- IGDB (Internet Game Database)
- Press kits from publishers

### Game Trailers
- YouTube (download short clips)
- Official game channels
- Press kits from publishers
- Create your own gameplay recordings

### Café Photos
- Professional photography of your venue
- Stock photos from Unsplash, Pexels (for placeholder)

## Optimization Tips

1. **Compress Images**: Use TinyPNG, ImageOptim, or Squoosh
2. **Convert Videos**: Use HandBrake for optimal compression
3. **Lazy Loading**: Already implemented in code for videos
4. **WebP Format**: Consider using WebP for better compression

## Quick Start (Demo Mode)

If you don't have assets yet, the website will still work with:
- Gradient placeholders for game posters
- Gradient background for hero section
- Placeholder icons for gallery

Simply add your actual assets when ready!