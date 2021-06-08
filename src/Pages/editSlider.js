import React, { Component } from "react";
import { connect } from "react-redux";
import { editSliderFunk,getSlider } from "../Actions/sliderAction";
import { bindActionCreators } from "redux";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export class editSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Title: "",
      Url: "",
      ButtonText: "",
      Order: "",
      IsActive: "",
      IsDelete: false,
      ImageId: "",
      IsVideo: "",
      //CreateAt:new Date(),
      SubTitle: "",
      UpdateAt: new Date(),
      photo: {},
      submit: false,
    };
    console.log(this.props.willEditSlider);
  }
  componentDidMount() {
    this.setState(this.props.willEditSlider);
  }
  
  getPhoto = (e) => {
    console.log(e.target.files[0]);
    this.setState({ photo: e.target.files[0] });
  };
  uploadPhoto = () => {
    const fd = new FormData();

    fd.append("image", this.state.photo, this.state.photo.name);
    axios
      .post(
        "https://api.imgbb.com/1/upload?expiration=600&key=a4a61c5615a8ba139a774ff21a6d5373",
        fd
      )
      .then((res) => {
        console.log(res.data.data.display_url);
        this.setState({ ImageId: res.data.data.display_url });
        console.log(this.state.ImageId);
      });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    
    //console.log(this.state);
    this.setState({ ...this.state, submit: true });
    // console.log(this.props);
    // console.log(this.state);
    // console.log(this.props.willEditId);
    this.props.editSliderFunk(this.state, this.state.id);
    //window.location.href="/"
    this.props.getSlider()
  };

  render() {
    console.log(this.state);
    return (
      <div className="container bg-light border border-2 border-primary p-5 text-center">
        <form  onSubmit={this.handleSubmit}> 
          <h1 className="mx-auto"> EDIT SLIDER FORM </h1>
          <div className="row d-flex flex-row m-2 pb-3">
            <div className="col-4 text-center d-flex flex-column">
              <label for="Title">Title:</label>
              <input
                required="required"
                type="text"
                id="Title"
                value={this.state.Title}
                onChange={(event) =>
                  this.setState({ ...this.state, Title: event.target.value })
                }
              ></input>
            </div>
            <div className="col-4 text-center d-flex flex-column">
              <label for="SubTitle">SubTitle:</label>
              <input
                required="required"
                type="text"
                id="SubTitle"
                value={this.state.SubTitle}
                onChange={(event) =>
                  this.setState({ ...this.state, SubTitle: event.target.value })
                }
              ></input>
            </div>
            <div className="col-4 text-center d-flex flex-column">
              <label for="Url">Url:</label>
              <input
                type="text"
                id="Url"
                value={this.state.Url}
                onChange={(event) =>
                  this.setState({ ...this.state, Url: event.target.value })
                }
              ></input>
            </div>
          </div>
          <div className="row d-flex flex-row m-2">
            <div className="col-4 text-center d-flex flex-column">
              <label for="ButtonText">ButtonText:</label>
              <input
                required="required"
                type="text"
                id="ButtonText"
                value={this.state.ButtonText}
                onChange={(event) =>
                  this.setState({
                    ...this.state,
                    ButtonText: event.target.value,
                  })
                }
              ></input>
              <br />
            </div>
            <div className="col-4 text-center d-flex flex-column">
              <label for="Order">Order:</label>
              <input
                required="required"
                type="number"
                id="Order"
                value={this.state.Order}
                onChange={(event) =>
                  this.setState({ ...this.state, Order: event.target.value })
                }
              ></input>
            </div>
            <div className="col-4 text-center d-flex flex-column invisible">
              <label for="ImageId">ImageId:( Edit Slider Photo)</label>
              <input
                type="file"
                id="ImageId"
                // value={ImageId}
                onChange={(event) =>
                  this.setState({ ...this.state, ImageId: event.target.value })
                }
                onChange={(event) =>
                  this.setState(...this.state, { ImageId: event.target.value })
                }
                onChange={this.getPhoto}
              ></input>
              <button type="button" onClick={this.uploadPhoto}>
                Upload Photo
              </button>
            </div>
            <div className="col-4 text-center d-flex flex-column visible">
            <img src={this.state.ImageId} alt="" height="100" width="100" />
          </div>
          </div>
          
          <div className="row d-flex flex-row m-2">
            <div className="col-4 text-center d-flex flex-column">
              <label for="IsActive">IsActive:</label>
              <select
                value={this.state.IsActive ? "1":"0"}
                required="required"
                id="IsActive"
                onChange={(event) =>
                  this.setState({ ...this.state, IsActive: event.target.value })
                }
              >
                
                <option>Please Choose!</option>
                <option value="1">visible</option>
                <option value="0">non-visible</option>
              </select>
              <br />
            </div>
            <div className="col-4 text-center d-flex flex-column">
              <label for="IsVideo">IsVideo:</label>
              <select
              value={this.state.IsVideo ? "1":"0"}
                required="required"
                id="IsVideo"
                onChange={(event) =>
                  this.setState({ ...this.state, IsVideo: event.target.value })
                }
              >
                <option value="1">photo</option>
                <option value="0">video</option>
              </select>{" "}
              <br />
            </div>
            <div className="col-4 text-center">
              <button
              // as={Link}
              // to={"/"}
                type="submit"
                className="btn btn-success mt-4"
               
              >
                {/* <Link to="/"></Link> */}
                Edit Slider 
              </button>
            </div>
          </div>
        </form>
        {this.state.submit ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

const mapStateToProps = ({ sliderList }, props) => {
  const willEditId = props.match.params.id;
  return {
    willEditSlider: sliderList.find((i) => i.id === props.match.params.id),
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ editSliderFunk,getSlider }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(editSlider);
