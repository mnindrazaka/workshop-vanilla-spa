let state = {
  path: window.location.pathname,
  inputValue: "",
};

function setState(newState) {
  state = { ...state, ...newState };
  render();
}

function Link(props) {
  const a = document.createElement("a");
  a.href = props.href;
  a.textContent = props.label;
  a.onclick = function (event) {
    event.preventDefault();
    const url = new URL(event.target.href);
    setState({ path: url.pathname });
  };
  return a;
}

function Navbar() {
  const linkHome = Link({ href: "/", label: "Home" });
  const linkAbout = Link({ href: "/about", label: "About" });

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
  textPreview.textContent = state.inputValue;

  const input = document.createElement("input");
  input.id = "input";
  input.value = state.inputValue;
  input.placeholder = "enter your name";
  input.oninput = function (event) {
    setState({ inputValue: event.target.value });
  };

  const div = document.createElement("div");
  div.append(navbar);
  div.append(p);
  div.append(input);
  div.append(textPreview);

  return div;
}

function AboutPage() {
  const linkHome = Link({ href: "/", label: "Home" });

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

  const div = document.createElement("div");

  if (state.path == "/") {
    div.appendChild(homePage);
  } else if (state.path == "/about") {
    div.appendChild(aboutPage);
  }

  return div;
}

function render() {
  const focusedElementId = document.activeElement.id;
  const focusedElementSelectionStart = document.activeElement.selectionStart;
  const focusedElementSelectionEnd = document.activeElement.selectionEnd;

  const root = document.getElementById("root");
  const app = App();
  root.innerHTML = "";
  root.appendChild(app);

  if (focusedElementId) {
    const focusedElement = document.getElementById(focusedElementId);
    focusedElement.focus();
    focusedElement.selectionStart = focusedElementSelectionStart;
    focusedElement.selectionEnd = focusedElementSelectionEnd;
  }
}

render();
