const root = document.getElementById("root");

function Navbar() {
  const linkHome = document.createElement("a");
  linkHome.href = "#home";
  linkHome.textContent = "Home";
  linkHome.onclick = function (event) {
    event.preventDefault();
    history.pushState(null, "", event.target.href);
    root.innerHTML = "";
    root.appendChild(HomePage());
  };

  const linkAbout = document.createElement("a");
  linkAbout.href = "#about";
  linkAbout.textContent = "About";
  linkAbout.onclick = function (event) {
    event.preventDefault();
    history.pushState(null, "", event.target.href);
    root.innerHTML = "";
    root.appendChild(AboutPage());
  };

  const div = document.createElement("div");
  div.append(linkHome);
  div.append(linkAbout);

  return div;
}

function HomePage() {
  const navbar = Navbar();

  const p = document.createElement("p");
  p.textContent = "Welcome to Home Page";

  const textPreview = document.createElement("p");

  const input = document.createElement("input");
  input.placeholder = "enter your name";
  input.oninput = function (event) {
    textPreview.textContent = event.target.value;
  };

  const div = document.createElement("div");
  div.append(navbar);
  div.append(p);
  div.append(input);
  div.append(textPreview);

  return div;
}

function AboutPage() {
  const linkHome = document.createElement("a");
  linkHome.href = "#home";
  linkHome.textContent = "Back to Home";
  linkHome.onclick = function (event) {
    event.preventDefault();
    history.pushState(null, "", event.target.href);
    root.innerHTML = "";
    root.appendChild(HomePage());
  };

  const p = document.createElement("p");
  p.textContent = "Welcome to About Page";

  const div = document.createElement("div");
  div.appendChild(linkHome);
  div.appendChild(p);
  return div;
}

if (window.location.pathname == "#home") {
  root.innerHTML = "";
  root.appendChild(HomePage());
} else if (window.location.pathname == "#about") {
  root.innerHTML = "";
  root.appendChild(AboutPage());
} else {
  root.innerHTML = "";
  root.appendChild(HomePage());
}
