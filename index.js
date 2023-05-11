function Link(props) {
  const handleClick = function (event) {
    event.preventDefault();
    props.onClick();
  };
  return (
    <a
      className={"nav-link " + (props.isActive ? "active" : "")}
      href={props.href}
      onClick={handleClick}
    >
      {props.label}
    </a>
  );
}

function Navbar(props) {
  return (
    <ul className="nav nav-pills pt-2 pb-2">
      <li className="nav-item">
        <Link
          href="#home"
          label="Home"
          isActive={props.hash === "#home"}
          onClick={function () {
            props.onHashChange("#home");
          }}
        />
      </li>
      <li className="nav-item">
        <Link
          href="#about"
          label="About"
          isActive={props.hash === "#about"}
          onClick={function () {
            props.onHashChange("#about");
          }}
        />
      </li>
    </ul>
  );
}

function Container(props) {
  return (
    <div className="d-flex flex-column align-items-center">
      {props.children}
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

  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setIsLoading(true);
    fetch("https://dummyjson.com/products/search?q=" + inputValue)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setProducts(data.products);
        setError("");
      })
      .catch((err) => {
        setIsLoading(false);
        setProducts([]);
        setError(err.message);
      });
  }, [inputValue]);

  return (
    <Container>
      <Navbar hash={props.hash} onHashChange={props.onHashChange} />
      <h4 className="mt-2">Search the products</h4>
      <div className="input-group" style={{ maxWidth: 480 }}>
        <input
          className="form-control"
          value={inputValue}
          placeholder="enter your name"
          onChange={function (event) {
            setInputValue(event.target.value);
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-danger"
            onClick={function () {
              setInputValue(event.target.value);
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <p className="mt-2">Showing search result for "{inputValue}"</p>

      {isLoading ? (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : error !== "" ? (
        <p className="alert alert-danger">{error}</p>
      ) : products.length > 0 ? (
        <div className="card-columns">
          {products.map((product) => (
            <div className="card">
              <img className="card-img-top" src={product.thumbnail} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                {props.isProductInWishlist(product) ? (
                  <button
                    className="btn btn-danger"
                    onClick={function () {
                      props.onRemoveWishlist(product);
                    }}
                  >
                    Remove from Wishlist
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={function () {
                      props.onAddWishlist(product);
                    }}
                  >
                    Add to Wishlist
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="alert alert-info">No result found</p>
      )}
    </Container>
  );
}

function AboutPage(props) {
  return (
    <Container>
      <Navbar hash={props.hash} onHashChange={props.onHashChange} />
      <h4 className="mt-2">Welcome to About Page</h4>
    </Container>
  );
}

function App() {
  const [hash, setHash] = React.useState(window.location.hash);

  React.useEffect(() => {
    history.pushState(null, "", hash);
  }, [hash]);

  const [wishlist, setWishlist] = React.useState(
    JSON.parse(localStorage.getItem("wishlist") || "[]")
  );

  React.useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function addWishlist(product) {
    setWishlist([...wishlist, product]);
  }

  function removeWishlist(targetProduct) {
    setWishlist(
      wishlist.filter(function (product) {
        return targetProduct.id !== product.id;
      })
    );
  }

  function isProductInWishlist(targetProduct) {
    return wishlist.some(function (product) {
      return targetProduct.id === product.id;
    });
  }

  if (hash == "#home") {
    return (
      <HomePage
        hash={hash}
        onHashChange={function (newHash) {
          setHash(newHash);
        }}
        isProductInWishlist={isProductInWishlist}
        onAddWishlist={addWishlist}
        onRemoveWishlist={removeWishlist}
      />
    );
  } else if (hash == "#about") {
    return (
      <AboutPage
        hash={hash}
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
        isProductInWishlist={isProductInWishlist}
        onAddWishlist={addWishlist}
        onRemoveWishlist={removeWishlist}
      />
    );
  }
}

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
