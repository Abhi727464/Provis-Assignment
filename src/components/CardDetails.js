import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT } from "../redux/actions/Action";

const CardDetails = () => {
  const [data, setData] = useState([]);
  const [quantity,setQuantity]= useState(0)
  const { id } = useParams();

  const history = useNavigate()
  const dispatch = useDispatch();

  const getData = useSelector((state) => state.cartreducer.carts);

  const compare = () => {
    let comparedata = getData.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };

  const dlt = (id)=>{
    dispatch(DLT(id));
    history("/");
  }

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <div className="container mt-2">
      <h2 className="text-center">Item Details</h2>
      <section className="container mt-3">
        <div className="item-details">
          {data.map((ele) => {
            return (
              <>
                <div className="items_img img-fluid">
                  <img
                    src={ele.image}
                    alt=""
                  />
                </div>
                <div className="details">
                  <Table>
                    <tr>
                      <td>
                        <p>
                          {" "}
                          <strong>Category :</strong> {ele.category}
                        </p>
                        <p>
                          {" "}
                          <strong>Description :</strong>{ele.description}
                        </p>
                        <p>
                          {" "}
                          <strong>Price:</strong> {ele.price}
                        </p>
                        <p>
                          <strong>Total:</strong> 500
                        </p>
                        {/* <div className="mt-5 d-flex justify-content-between align-items-center" style={{width:100, cursor:"pointer",background:"teal", color:"white"}}>
                            <span style={{fontSize:20}}>-</span>
                            <span style={{fontSize:20}}>{quantity}</span>
                            <span style={{fontSize:20}}>+</span>
                        </div> */}
                      </td>
                      <td>
                        <p>
                          <strong>
                            Rating :
                            <span
                              style={{
                                background: "green",
                                color: "white",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {ele.rating.rate}★
                            </span>
                          </strong>
                        </p>
                        <p>
                          <strong>Review: </strong>
                          <span>{ele.rating.count}+ Order Placed from here</span>
                        </p>
                        <p onClick={()=>dlt(ele.id)}>
                          <strong>Remove: </strong>
                          <span>
                            <DeleteIcon
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                            />
                          </span>
                        </p>
                      </td>
                    </tr>
                  </Table>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CardDetails;
