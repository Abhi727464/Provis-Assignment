import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import "./style.css";
import { ADD, DLT } from "../redux/actions/Action";
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cards = ({ data }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const send = (e) => {
    // console.log(e)
    dispatch(ADD(e));
    toast.success("Item added", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    toast.error("Item Removed", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className="container mt-3">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-4">
          <h1 className="text-center">All Items</h1>
        </div>
        <div className="col-4">
          <Form className="d-flex mx-3">
            <Form.Control
              type="search"
              placeholder="Search Category"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </div>
      </div>

      <div className="row d-flex justify-content-center align-items-center">
        {data
          .filter((val) => {
            if (
              val.category.toLowerCase().includes(search.toLocaleLowerCase())
            ) {
              return val;
            } else if (search == "") {
              return val;
            }
          })
          .map((item, id) => {
            return (
              <>
                <Card
                  style={{
                    width: "18rem",
                    border: "none",
                    boxShadow: "rgba(0, 0, 0, 0.10) 0px 5px 15px",
                  }}
                  className="mx-3 mt-4 card_style"
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ height: "17rem" }}
                    className="mt-3"
                  />
                  <Card.Body>
                    <Card.Title>
                      <p className="crop">{item.title}</p>
                    </Card.Title>
                    <Card.Text>Category : {item.category}</Card.Text>
                    <Card.Text className="d-flex justify-content-between">
                      Price : ${item.price}
                      <span
                        style={{
                          background: "green",
                          color: "white",
                          padding: "2px 6px",
                          borderRadius: "5px",
                          fontSize:"13px"
                          
                        }}
                      >
                        {item.rating.rate}★
                      </span>
                    </Card.Text>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="success mx-1"
                        onClick={() => send(item)}
                        style={{ background: "#014d4e", border: "none" }}
                      >
                        Add to cart
                      </Button>

                      <Button
                        className="mx-1"
                        variant="primary"
                        style={{ background: "red", border: "none" }}
                        onClick={() => dlt(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Cards;
