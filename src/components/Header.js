import React, { useEffect, useState } from "react";
import "./style.css";
import { Container,Nav, Navbar, Table } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { DLT } from "../redux/actions/Action";

const Header = () => {
  const [price, setPrice] = useState(0);
  const getData = useSelector((state) => state.cartreducer.carts);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const total = () => {
    let price = 0;
    getData.map((ele, key) => {
      price = ele.price + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);
  return (
    <>
      <Navbar variant="dark" style={{ height: "60px", background: "#014d4e" }}>
        <Container>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light h3">
              AJIO
            </NavLink>
          </Nav>
          

          <Badge badgeContent={getData.length} color="primary">
            <ShoppingCartIcon
              style={{ color: "white", fontSize: 25, cursor: "pointer" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          </Badge>
          {/* <NavLink to="/cart" className="text-decoration-none text-light mx-5">
            Item Details
          </NavLink> */}
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getData.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Pic</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {getData.map((item) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <NavLink
                              to={`/cart/${item.id}`}
                              onClick={handleClose}
                            >
                              <img
                                src={item.image}
                                alt=""
                                style={{ width: "5rem", heigth: "5rem" }}
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{item.category}</p>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: 0</p>
                            <p
                              className="smalltrash"
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(item.id)}
                            >
                              <DeleteIcon />
                            </p>
                          </td>
                          <td
                            className="mt-5 largetrash"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => dlt(item.id)}
                          >
                            <DeleteIcon />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center">Total : $ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "22rem", padding: 10, position: "relative" }}
            >
              <CloseIcon
                className="smallclose"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              />
              <p style={{ fontSize: 22 }}>No Items</p>
              <img
                src="https://media.tenor.com/xzM6oRwPFrMAAAAi/rolling-jackass.gif"
                alt=""
                className="emptycart_img"
                style={{ width: "5rem", padding: 10 }}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
