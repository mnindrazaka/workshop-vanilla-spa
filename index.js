function Link(props) {
  const handleClick = function (event) {
    event.preventDefault();
    props.onClick();
  };
  return (
    <a href={props.href} onClick={handleClick}>
      {props.label}
    </a>
  );
}

function Navbar(props) {
  return (
    <div>
      <Link
        href="#home"
        label="Home"
        onClick={function () {
          props.onHashChange("#home");
        }}
      />
      <Link
        href="#about"
        label="About"
        onClick={function () {
          props.onHashChange("#about");
        }}
      />
    </div>
  );
}

function HomePage(props) {
  const [inputValue, setInputValue] = React.useState(
    localStorage.getItem("inputValue")
  );

  React.useEffect(() => {
    localStorage.setItem("inputValue", inputValue);
  }, [inputValue]);

  return (
    <div>
      <Navbar onHashChange={props.onHashChange} />
      <p>Welcome to Home Page</p>
      <input
        value={inputValue}
        placeholder="enter your name"
        onChange={function (event) {
          setInputValue(event.target.value);
        }}
      />
      <button
        onClick={function () {
          setInputValue(event.target.value);
        }}
      >
        Clear
      </button>
      <p>{inputValue}</p>
    </div>
  );
}

function AboutPage(props) {
  return (
    <div>
      <Link
        href="#home"
        label="Back to Home"
        onClick={function () {
          props.onHashChange("#home");
        }}
      />
      <p>Welcome to About Page</p>
    </div>
  );
}

function App() {
  const [hash, setHash] = React.useState(window.location.hash);

  React.useEffect(() => {
    history.pushState(null, "", hash);
  }, [hash]);

  if (hash == "#home") {
    return (
      <HomePage
        onHashChange={function (newHash) {
          setHash(newHash);
        }}
      />
    );
  } else if (hash == "#about") {
    return (
      <AboutPage
        onHashChange={function (newHash) {
          setHash(newHash);
        }}
      />
    );
  } else {
    return (
      <HomePage
        onHashChange={function (newHash) {
          setHash(newHash);
        }}
      />
    );
  }
}

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
