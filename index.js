function Link(props) {
  const a = document.createElement("a");
  a.href = props.href;
  a.textContent = props.label;
  a.onclick = function (event) {
    event.preventDefault();
    history.pushState(null, "", event.target.href);
    render();
  };
  return a;
}

function Navbar() {
  const linkHome = Link({ href: "#home", label: "Home" });
  const linkAbout = Link({ href: "#about", label: "About" });

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
  const linkHome = Link({ href: "#home", label: "Back to Home" });

  const p = document.createElement("p");
  p.textContent = "Welcome to About Page";

  const div = document.createElement("div");
  div.appendChild(linkHome);
  div.appendChild(p);
  return div;
}

function App() {
  const homePage = HomePage();
  const aboutPage = AboutPage();

  if (window.location.hash == "#home") {
    return homePage;
  } else if (window.location.hash == "#about") {
    return aboutPage;
  } else {
    return homePage;
  }
}

function render() {
  const root = document.getElementById("root");
  const app = App();
  root.innerHTML = "";
  root.appendChild(app);
}

render();
