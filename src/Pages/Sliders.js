import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getSlider} from "../Actions/sliderAction";
import { Table} from "react-bootstrap";
import { Link} from "react-router-dom";



export class Sliders extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    const getslider=this.props.getSlider()
    console.log(getslider);
    this.state={slider:[]}
    this.setState({slider:this.props.slider})

  }


   handleDelete=(selectedId)=>{
    const newSliderList = this.props.slider.filter((P) => P.id !== selectedId);
    console.log(selectedId);
    console.log(newSliderList);
        
  }

  render() {
    console.log(this.props);
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
                      <button type="button" class="btn btn-success">
                        Visible
                      </button>
                    ) : (
                      <button type="button" class="btn btn-danger">
                        Non-Visible
                      </button>
                    )}
                  </td>
                  <td>
                    <img
                      src="https://i.ibb.co/xh26nr9/tables-1803-21000.png"
                      alt=""
                      height="40"
                      width="40"
                    />
                  </td>
                  <td>{slider.Order}</td>
                  {/* <td>{slider.button}</td> */}
                  <td>
                    <div className="d-flex">
                      <Link to={`${slider.id}`}>
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

const mapStateToProps = ({sliderList}) => {
  return {
    slider: sliderList,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({getSlider}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sliders);





