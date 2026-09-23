document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".project-card[data-project-url]").forEach((card) => {
  const openProject = () => { window.location.href = card.dataset.projectUrl; };

  card.addEventListener("click", (event) => {
    if (!event.target.closest("a, button, video, video *")) openProject();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  });
});

// Keep project-page navigation on the public GitHub Pages site if an older
// bookmark or cached deployment was opened through the retired .dev address.
const publicSiteUrl = "https://kaydenmok.github.io/engineering-portfolio/";

document.querySelectorAll('a[href^="../index.html"]').forEach((link) => {
  const originalHref = link.getAttribute("href");
  const hash = originalHref.includes("#") ? originalHref.slice(originalHref.indexOf("#")) : "";
  link.href = `${publicSiteUrl}${hash}`;
});

const pageTitle = document.querySelector(".project-intro h1")?.textContent.trim();
const additionalProjectSkills = {
  "Custom 8-bit FPGA Computer": ["Digital Design", "RTL Development", "Verification"],
  "Embedded Motor Control System": ["Debugging", "Hardware Integration", "Prototyping"],
};

const projectTags = document.querySelector(".project-intro .tags");
additionalProjectSkills[pageTitle]?.forEach((skill) => {
  if (!Array.from(projectTags.children).some((tag) => tag.textContent === skill)) {
    const tag = document.createElement("span");
    tag.textContent = skill;
    projectTags.appendChild(tag);
  }
});

const galleryImages = document.querySelectorAll(".media-gallery img");

if (galleryImages.length) {
  const imageViewer = document.createElement("dialog");
  imageViewer.className = "image-viewer";
  imageViewer.setAttribute("aria-label", "Expanded project image");

  const closeButton = document.createElement("button");
  closeButton.className = "image-viewer-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close expanded image");
  closeButton.textContent = "×";

  const expandedImage = document.createElement("img");
  imageViewer.append(closeButton, expandedImage);
  document.body.append(imageViewer);

  const openImageViewer = (image) => {
    expandedImage.src = image.currentSrc || image.src;
    expandedImage.alt = image.alt;
    imageViewer.showModal();
    closeButton.focus();
  };

  galleryImages.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Expand image: ${image.alt}`);
    image.addEventListener("click", () => openImageViewer(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openImageViewer(image);
      }
    });
  });

  closeButton.addEventListener("click", () => imageViewer.close());
  imageViewer.addEventListener("click", (event) => {
    if (event.target === imageViewer) imageViewer.close();
  });
}
