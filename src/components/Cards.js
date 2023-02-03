import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import "./style.css";
import { ADD, DLT } from "../redux/actions/Action";
import { NavLink } from "react-router-dom";
import { Dropdown, Form } from "react-bootstrap";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Cards = ({ data, setData }) => {
  const [filterData, setFilterData] = useState(data);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
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

  useEffect(() => {
    if(category==="All"){
      setFilterData(data);
    }
    else{
      let tempdata = data.filter((item) => item.category == category);
    setFilterData(tempdata);
    console.log(category);
    }
    
  }, [category]);

  useEffect(() => {
  console.log(data,"data")
    setFilterData(data);
    
  }, [data]);
  return (
    <div className="container mt-3">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12">
          <h1 className="text-center m-4">All Items</h1>
        </div>
        <div className="col-md-4">
          <Form className="d-flex mx-3">
            <Form.Control
              type="search"
              placeholder="Search Products"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </div>
        <div className="col-md-4">
          <select className="select border border-dark"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelary</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>

      <div className="row d-flex justify-content-center align-items-center">
      
        {filterData
          .filter((val) => {
            if (
              val.title.toLowerCase().includes(search.toLocaleLowerCase())
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
                          fontSize: "13px",
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
