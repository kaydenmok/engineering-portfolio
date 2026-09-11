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
