import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteSlider,
  getSlider,
  toggleVisible,
} from "../Actions/sliderAction";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export class Sliders extends Component {
  constructor(props) {
    super(props);
    //console.log(this.props);

    const getslider = this.props.getSlider();

    //console.log(getslider);
    this.state = {  };
  }
  // componentDidMount() {
  //   this.setState(this.props.slider)
  // }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.slider !== prevProps.slider) {
      this.setState(this.props.slider)
  }
}
  
  

  handleDelete = (selectedId) => {
    const newSliderList = this.props.slider.filter((P) => P.id !== selectedId);
    console.log(selectedId);
    console.log(newSliderList);
    deleteSlider(selectedId);
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div container>
        <br />

        <h2 className="mx-auto"> Sliders and Settings </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Title</th>
              <th>Visible/Non-Visible</th>
              <th>Photo Preview</th>
              <th>Order</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          {this.props.slider.length !== 0 &&
            this.props.slider.map((slider, index) => (
              <tbody>
                <tr>
                  <td>{index + 1}</td>
                  <td>{slider.Title}</td>
                  <td>
                    {slider.IsActive === "visible" ? (
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={
                          toggleVisible(slider.id)
                          // () => {
                          //   return !this.state.isActive;
                          // }
                        }
                      >
                        Visible
                      </button>
                    ) : (
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={
                          //toggleVisible(slider.id)
                          () => {
                            return !this.state.isActive;
                          }
                        }
                      >
                        Non-Visible
                      </button>
                    )}
                  </td>
                  <td>
                    <img src={slider.ImageId} alt="" height="40" width="70" />
                  </td>
                  <td>{slider.Order}</td>
                  {/* <td>{slider.button}</td> */}
                  <td>
                    <div className="d-flex">
                      <Link to={`edit/${slider.id}`}>
                        <button
                          type="button"
                          className="btn btn-sm btn-success mr-auto gap-3"
                        >
                          Edit
                        </button>
                      </Link>

                      <button
                        type="button"
                        onClick={(event) => this.handleDelete(slider.id)}
                        className="btn btn-sm btn-danger mx-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
        <div className="text-right float-right ">
          <Link to={`add/`}>
            <button className="btn btn-primary  float-right">
              Add New Slider
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sliderList }, props) => {
  //console.log(props);
  return {
    slider: sliderList,
  };
};

const mapDispatchToProps = {
  getSlider,
  deleteSlider,
  toggleVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sliders);
