# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages.

## ✅ Pre-Deployment Checklist

Your portfolio is now ready for GitHub Pages! Here's what has been verified:

- ✅ All file paths are relative (no absolute paths)
- ✅ All required files exist (HTML, CSS, JS, images)
- ✅ Page title is set: "Kamalesh Kanna S - Portfolio"
- ✅ Navigation sections are properly defined
- ✅ All external CDN links are working (Font Awesome, Bootstrap, Google Fonts)
- ✅ Responsive design is implemented
- ✅ Mobile-friendly navigation with scroll buttons
- ✅ No localhost or file:// references
- ✅ README.md is comprehensive
- ✅ .gitignore is properly configured

## 📋 Step-by-Step Deployment

### Step 1: Push to GitHub (If not already done)

```powershell
# If you haven't initialized git yet:
git init
git add .
git commit -m "Initial commit - Portfolio ready for GitHub Pages"

# Create a new repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME`

2. Click on **Settings** (gear icon) in the repository menu

3. Scroll down and click on **Pages** in the left sidebar

4. Under **Source**, configure:
   - **Branch**: Select `main`
   - **Folder**: Select `/ (root)`

5. Click **Save**

6. Wait 1-3 minutes for GitHub to build your site

7. Your site will be live at:
   - `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Step 3: Custom Domain (Optional)

If you want your portfolio at `https://YOUR-USERNAME.github.io/`:

1. **Rename your repository** to: `YOUR-USERNAME.github.io`
   - Go to repository **Settings** → **General**
   - Scroll to **Repository name**
   - Rename it to exactly: `YOUR-USERNAME.github.io`

2. Follow Step 2 above

3. Your site will now be at: `https://YOUR-USERNAME.github.io/`

## 🔧 Post-Deployment

### Verify Your Deployment

After deployment, check:
- ✅ All pages load correctly
- ✅ Navigation works smoothly
- ✅ Horizontal scroll buttons function properly
- ✅ Images display correctly
- ✅ External links work (LinkedIn, GitHub, etc.)
- ✅ Mobile responsive design works
- ✅ All sections are accessible

### Update Content

To update your portfolio:

1. Make changes locally to your files
2. Commit and push:
   ```powershell
   git add .
   git commit -m "Update portfolio content"
   git push
   ```
3. GitHub Pages will automatically rebuild (1-3 minutes)

## 📝 Adding Content to New Sections

You now have placeholder sections for:
- Certificates
- Awards
- Membership
- License
- Courses
- Trainings
- Webinars
- Workshops
- Conferences
- Invited Talks
- Guest Lectures
- Workshops Conducted

To add content to these sections:

1. Open [index.html](index.html)
2. Find the section with `data-section="section-name"`
3. Replace the placeholder text with your actual content
4. You can copy the structure from the Education or Publications sections

Example:
```html
<section class="colorlib-experience" data-section="certificates">
  <div class="colorlib-narrow-content">
    <div class="row row-bottom-padded-sm animate-box fadeInLeft animated">
      <div class="about-desc">
        <h1>My <span style="color: #00AEEF">Certificates</span></h1>
      </div>
    </div>
    <div class="timeline-centered">
      <article class="timeline-entry animate-box fadeInUp animated">
        <div class="timeline-entry-inner">
          <div class="timeline-icon color-2"><i class="fa fa-certificate"></i></div>
          <div class="timeline-label">
            <h2>Certificate Name<span>Date</span></h2>
            <span class="timeline-sublabel">Issuing Organization</span>
            <p>Description of the certificate</p>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>
```

## 🐛 Troubleshooting

### Site Not Loading
- Wait 3-5 minutes after enabling GitHub Pages
- Check Settings → Pages to ensure it's enabled
- Verify branch is set to `main` and folder to `/ (root)`

### Images Not Showing
- Ensure image paths are relative: `./logo1.png` not `/logo1.png`
- Check that image files are committed and pushed to GitHub

### CSS/JS Not Working
- Clear browser cache (Ctrl + Shift + R)
- Check browser console for errors (F12)
- Verify all file paths are correct

### Navigation Not Scrolling
- Ensure `js/main.js` is loaded
- Check browser console for JavaScript errors
- Verify jQuery is loaded before main.js

## 📞 Support

If you encounter issues:
1. Check the browser console for errors (F12)
2. Verify all files are pushed to GitHub
3. Review GitHub Pages documentation: https://pages.github.com/
4. Check GitHub Actions tab for build errors

## 🎉 Congratulations!

Your portfolio is now live and ready to share with the world! 

Update your resume, LinkedIn, and other profiles with your new portfolio URL.

---

**Last Updated**: February 8, 2026
**Status**: ✅ Ready for deployment
