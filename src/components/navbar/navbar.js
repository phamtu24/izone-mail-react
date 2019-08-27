import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, } from 'react-bootstrap';
import './navbar.css';
import logo from './logo.png'

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    const { members } = this.props;
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
          <Navbar style={{ padding: '0 1rem 0 0px' }}>
            <a>
              <Link to="/">
                <img className="logo" src={logo} />
              </Link>
            </a>
          </Navbar>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown class="dropdown-cover" title="Members" id="collasible-nav-dropdown">
                {members.map(member => <NavDropdown.Item collapseOnSelect>
                  <div className="downdrop-item">
                    <Link to={"/" + member.name}>
                      <img src={member.avatar} />
                      <p>{member.name}</p>
                    </Link>
                  </div>
                </NavDropdown.Item>)}
              </NavDropdown>
              <NavDropdown title="Photos" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/photos/all-photos">
                    <p className="item">
                      All photos
                    </p>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/photos/album" >
                    <p className="item">
                      Album
                    </p>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link target="_blank" 
              href="https://docs.google.com/spreadsheets/d/1pLzVvFno4JvV81LhASZpMX28_4eoa8Qu0e2jDDIGTqs/edit?usp=sharing">
                Archive
              </Nav.Link>
              <Nav.Link href="#">Add</Nav.Link>

            </Nav>
            <Nav>
              <Nav.Link href="#deets">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}