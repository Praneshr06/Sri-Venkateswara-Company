# How to Add Images from JustDial to Your Website

## Step-by-Step Instructions

### 1. Visit the JustDial Page
Open this URL in your browser:
```
https://www.justdial.com/Coimbatore/Sri-Venkateswara-Company-Near-Lmw-Gas-Gudown-Perianaickenpalayam/0422PX422-X422-170210171620-Y5R6_BZDET
```

### 2. Download Images
1. **Right-click** on each image you want to use
2. Select **"Save image as..."** or **"Save picture as..."**
3. Save them to a temporary folder on your computer

### 3. Organize Images by Category

#### Gallery Images (`frontend/public/images/gallery/`)
**For product photos:**
- `product-1.jpg` - Brass Round Head Rivets*
- `product-2.jpg` - MS Dimple Head Rivets* 
- `product-3.jpg` - Copper Flat Head Rivets*
- `product-4.jpg` - Brass Tubular Rivets*
- `product-5.jpg` - Copper Mushroom Head*
- `product-6.jpg` - MS Hexagonal He0ad*
- `product-7.jpg` - MS Button Rivet

**How to add:**
1. Copy downloaded product images
2. Paste into `frontend/public/images/gallery/` folder
3. Rename them as `product-1.jpg`, `product-2.jpg`, etc.

#### Manufacturing Images (`frontend/public/images/manufacturing/`)
**For manufacturing process photos:**
- `manufacturing-1.jpg` - Cold Forging Process
- `manufacturing-2.jpg` - Quality Control

**How to add:**
1. Copy downloaded manufacturing images
2. Paste into `frontend/public/images/manufacturing/` folder
3. Rename them as `manufacturing-1.jpg`, `manufacturing-2.jpg`, etc.

#### Facility Images (`frontend/public/images/facility/`)
**For factory/facility photos:**
- `facility-1.jpg` - Company Facility Overview

**How to add:**
1. Copy downloaded facility images
2. Paste into `frontend/public/images/facility/` folder
3. Rename them as `facility-1.jpg`, etc.

### 4. Image Requirements

**Recommended Specifications:**
- **Format:** JPG or PNG
- **Size:** 1200x800px or similar aspect ratio (16:9 or 3:2)
- **File Size:** Under 500KB per image (optimize for web)
- **Quality:** High quality but compressed for fast loading

**Image Optimization Tips:**
- Use tools like TinyPNG, ImageOptim, or Squoosh to compress images
- Ensure images are web-optimized before uploading
- Keep aspect ratios consistent for better display

### 5. Verify Images Are Added

After adding images, check:
1. ✅ Images are in the correct folders
2. ✅ Images are named correctly (e.g., `product-1.jpg`)
3. ✅ Images display on the website:
   - Gallery page (`/gallery`)
   - About page (`/about`)

### 6. Image Usage Locations

**Gallery Page:**
- Product images display in the gallery grid
- Manufacturing images show in the "Manufacturing" category filter

**About Page:**
- Facility image displays in "Our Story" section
- Manufacturing images display in "Manufacturing Excellence" section

### 7. Troubleshooting

**If images don't display:**
1. Check file names match exactly (case-sensitive)
2. Verify images are in `frontend/public/images/` folder
3. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
4. Check browser console for 404 errors

**If images are too large:**
- Compress images using online tools
- Reduce image dimensions if needed
- Ensure file size is under 500KB

### 8. Notes

- ⚠️ **Copyright:** Ensure you have permission to use images from JustDial
- ⚠️ **Backup:** Keep original images in a separate folder
- ✅ **Responsive:** Images will automatically resize on mobile devices
- ✅ **Fallback:** If an image is missing, it will be hidden gracefully

## Quick Reference

**Image Paths Used in Code:**
```
Gallery Products:
- /images/gallery/product-1.jpg
- /images/gallery/product-2.jpg
- /images/gallery/product-3.jpg
- /images/gallery/product-4.jpg
- /images/gallery/product-5.jpg
- /images/gallery/product-6.jpg
- /images/gallery/product-7.jpg

Manufacturing:
- /images/manufacturing/manufacturing-1.jpg
- /images/manufacturing/manufacturing-2.jpg

Facility:
- /images/facility/facility-1.jpg
```

## Need Help?

If you encounter any issues:
1. Check the file paths match exactly
2. Ensure images are in the `public/images/` folder (not `src/`)
3. Restart the development server after adding images
4. Check browser console for error messages

