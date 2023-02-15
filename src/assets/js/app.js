const logoSrc = {
  white: "./assets/images/white-logo.svg",
  dark: "./assets/images/logo.svg"
};
document.addEventListener("DOMContentLoaded", ()=>{

  const closeIcon = document.querySelector(".close");
  const logo = document.querySelector(".logo");
  const MenuIcon = document.querySelector(".menu-target");
  const sideBar = document.querySelector(".side-bar");
  const colorTheme = document.querySelector(".color-theme");

  $(".close").on('click', ()=>{
    sideBar.classList.remove("sideBar-show")
  });
  $(".menu-target").on('click', ()=>{
    sideBar.classList.add("sideBar-show")
  });


  $(".color-theme").on('click', ()=>{
      if (colorTheme.classList.contains("active-moon")) {
          colorTheme.classList.remove("active-moon");
          colorTheme.classList.add("active-sun");
          document.body.classList.remove("dark-mode");
          logo.setAttribute("src", logoSrc.dark);
      } else {
          document.body.classList.add("dark-mode");
          colorTheme.classList.add("active-moon");
          colorTheme.classList.remove("active-sun");

          logo.setAttribute("src", logoSrc.white);
      }
  });
});
