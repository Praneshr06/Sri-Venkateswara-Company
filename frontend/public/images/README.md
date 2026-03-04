# Images Directory

This directory contains all images used throughout the website.

## Directory Structure

```
images/
├── gallery/          # Product gallery images
├── manufacturing/    # Manufacturing process images
├── facility/         # Facility and factory images
└── about/            # About page images (team, history, etc.)
```

## Adding Images from JustDial

### Step 1: Download Images from JustDial
1. Visit: https://www.justdial.com/Coimbatore/Sri-Venkateswara-Company-Near-Lmw-Gas-Gudown-Perianaickenpalayam/0422PX422-X422-170210171620-Y5R6_BZDET
2. Right-click on each image you want to use
3. Select "Save image as..." 
4. Save them to your computer

### Step 2: Organize Images

**Gallery Images** (`/images/gallery/`):
- Product photos (rivets, different types)
- Name them: `product-1.jpg`, `product-2.jpg`, etc.

**Manufacturing Images** (`/images/manufacturing/`):
- Cold forging process photos
- Machinery photos
- Production line images
- Name them: `manufacturing-1.jpg`, `machinery-1.jpg`, etc.

**Facility Images** (`/images/facility/`):
- Factory exterior/interior
- Facility overview
- Name them: `facility-1.jpg`, `factory-1.jpg`, etc.

**About Page Images** (`/images/about/`):
- Team photos
- Company history images
- Name them: `team-1.jpg`, `history-1.jpg`, etc.

### Step 3: Image Optimization
- Recommended size: 1200x800px or similar aspect ratio
- Format: JPG or PNG
- File size: Keep under 500KB per image for fast loading
- Use image compression tools if needed

### Step 4: Update Components
After adding images, update the following files:
- `frontend/src/pages/Gallery.jsx` - Update image paths
- `frontend/src/pages/About.jsx` - Add image references
- `frontend/src/pages/Home.jsx` - Add hero background images (optional)

## Current Image Usage

### Gallery Page
- Uses images from `/images/gallery/`
- Currently configured for 9 gallery items
- Each item can have a unique image

### About Page
- Can display facility images
- Manufacturing process images
- Team photos

## Notes
- All image paths should start with `/images/` (public folder)
- Use descriptive filenames
- Ensure you have permission to use images from JustDial
- Optimize images for web performance

