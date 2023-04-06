import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getCurrentUser, removeSessionToken } from "@/utils";

export default function MainNav() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    removeSessionToken();
    window?.localStorage.remove('__user__');
  }
  
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="navBar"
      >
        <Container>
          <Navbar.Brand>Easy Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <Nav.Link>About Us</Nav.Link>
              </Link>
              <Link href="/results" passHref legacyBehavior>
                <Nav.Link>Saved Results</Nav.Link>
              </Link>
              {currentUser ? (
                <Link href="/account" passHref legacyBehavior>
                  <Nav.Link>My Account</Nav.Link>
                </Link>
              ) : null}
              {!currentUser ? (
                <>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link>
                      <Button>Login</Button>
                    </Nav.Link>
                  </Link>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link>
                      <Button>Register</Button>
                    </Nav.Link>
                  </Link>
                </>
              ) : (
                <Link href="/login" passHref legacyBehavior onClick={handleLogout}>
                  <Nav.Link>
                    <Button>Logout</Button>
                  </Nav.Link>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
