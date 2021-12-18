// Import Component Bootstrap React
import { Navbar, Container, Nav } from "react-bootstrap";

// Import React Router Dom
import { Routes, Route, Link } from "react-router-dom";

// Import Component Home
import Home from './pages/Home';

// Import Component Post Index
import PostIndex from "./pages/posts/Index";

// Import Component Post Create
import PostCreate from "./pages/posts/Create";

// Import Component Post Edit
import PostEdit from "./pages/posts/Edit";

function App() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">Express.js dan React.js</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/posts" className="nav-link">Posts</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/posts" element={<PostIndex />} />
        <Route exact path="/posts/create" element={<PostCreate />} />
        <Route exact path="/posts/edit/:id" element={<PostEdit />} />
      </Routes>
    </div>
  );
}

export default App;
