const linkHome = document.getElementById("link-home");
const linkAbout = document.getElementById("link-about");
const root = document.getElementById("root");

linkHome.onclick = function (event) {
  event.preventDefault();
  history.pushState(null, "", event.target.href);
  root.innerHTML = "";
  root.appendChild(HomePage());
};

linkAbout.onclick = function (event) {
  event.preventDefault();
  history.pushState(null, "", event.target.href);
  root.innerHTML = "";
  root.appendChild(AboutPage());
};

function HomePage() {
  const p = document.createElement("p");
  p.textContent = "Welcome to Home Page";

  const textPreview = document.createElement("p");

  const input = document.createElement("input");
  input.placeholder = "enter your name";
  input.oninput = function (event) {
    textPreview.textContent = event.target.value;
  };

  const div = document.createElement("div");
  div.append(p);
  div.append(input);
  div.append(textPreview);

  return div;
}

function AboutPage() {
  const p = document.createElement("p");
  p.textContent = "Welcome to About Page";
  return p;
}

if (window.location.pathname == "/") {
  root.innerHTML = "";
  root.appendChild(HomePage());
} else if (window.location.pathname == "/about") {
  root.innerHTML = "";
  root.appendChild(AboutPage());
}
