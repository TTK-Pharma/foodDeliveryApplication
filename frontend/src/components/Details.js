import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import '../styles/Details.css';
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
  },
};

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: {},
      restaurantId: undefined,
      menuItems: [],
      menuModalOpen: false,
      address: undefined,
      name: undefined,
      mobileno: undefined,
    };
  }

  componentDidMount() {
    const qs = queryString.parse(window.location.search);
    const { restaurant } = qs;

    axios({
      url: `http://localhost:5500/restaurant/${restaurant}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/JSON' }
    })

      .then(res => {
        this.setState({ restaurants: res.data.restaurantss, restaurantId: restaurant });
      })
      .catch(err => console.log(err));
  }

  handleModal = (state, value) => {
    const { restaurantId } = this.state;
    if (state === "menuModalOpen" && value === true) {
      axios({
        url: `http://localhost:5500/menus/${restaurantId}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/JSON' }
      })
        .then(res => {
          this.setState({ menuItems: res.data.menus });
        })
        .catch(err => console.log(err));
    }
    this.setState({ [state]: value });
  };

  addItems = (index, math) => {
    let total = 0;
    const items = [...this.state.menuItems];
    const item = items[index];

    if (math === 'add') {
      item.qty += 1;
    } else {
      item.qty -= 1;
    }

    items.forEach(x => {
      total += x.qty * x.price;
    });

    this.setState({ menuItems: items, subtotal: total });
  };

  // Payment Part
  initPayment = (data) => {
    const options = {
      key: "rzp_test_Sj12Rs85K18VIC",
      amount: data.amount,
      currency: data.currency,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:5500/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  handlePayment = async () => {
    const { subtotal } = this.state;

    try {
      const orderUrl = "http://localhost:5500/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: subtotal });
      console.log(data.data);
      this.initPayment(data.data);
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  setName = (e) => {
    this.setState({ name: e.target.value });
  };

  setMobile = (e) => {
    this.setState({ mobileno: e.target.value });
  };

  setAddress = (e) => {
    this.setState({ address: e.target.value });
  };

  handleUser = () => {
    const { name, address, mobileno } = this.state;

    const userObjec = {
      name,
      address,
      mobileno
    };

    axios({
      url: 'http://localhost:5500/users',
      method: 'POST',
      headers: { 'Content-Type': 'application/JSON' },
      data: userObjec
    })
      .then((response) => {
        this.setState({ usersDetailss: response.data.usersDetailss._id });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { restaurants, menuItems, menuModalOpen, galleryModal, subtotal, formModal } = this.state;
    return (
      <div>
        {/* <!--Navbar--> */}
        <nav className="navbar bg-danger position-static" style={{ top: "0", width: "100%", zIndex: "-1" }}>
          <div className="container">
            <div className="navbar-brand text-danger circle">
              <h3 className="logo_details">e!</h3>
            </div>
          </div>
        </nav>
        <div className="container">
          {/* Gallery */}
          <div className="m-5">
            <img src={restaurants.thumb} alt="Not available" className="imag" />
            <button className="gallery_button" onClick={() => this.handleModal('galleryModal', true)}>
              Click to see Image Gallery
            </button>
          </div>

          <div className="Restaurant_Name ms-5">{restaurants.name}</div>

          <button className="btn btn-danger me-5 order_btn" onClick={() => this.handleModal('menuModalOpen', true)}>
            Place Online Order
          </button>

          {/* Body Part */}
          <div className="tabs">
            <div className="tab">
              <input type="radio" id="tab-1" name="tab_group" checked />
              <label className="px-4 fw-bold" for="tab-1">
                Overview
              </label>

              <div className="content">
                <div className="fw-bolder fs-5 mb-4"> About this place </div>

                <div className="fw-bold mb-1">Cuisine</div>
                <div>
                  {restaurants.Cuisine && restaurants.Cuisine.length > 0 ? (
                    <div>
                      <span>{restaurants.Cuisine[0].name + " & "}</span>
                      {restaurants.Cuisine.length > 1 && (
                        <span>{restaurants.Cuisine[1].name}</span>
                      )}
                    </div>
                  ) : (
                    "Cuisine information not available"
                  )}
                </div>

                <div className="fw-bold mt-4 mb-1">Average Cost</div>
                <div>{restaurants.cost * 2} for two people (approx.)</div>
              </div>
            </div>

            <div className="tab ms-4">
              <input type="radio" id="tab-2" name="tab_group" />
              <label className="px-4 fw-bold" for="tab-2">
                Contact
              </label>

              <div className="content">
                <div>Phone Number</div>
                <div className="text-danger mt-1 mb-4">{restaurants.contact_number}</div>

                <div className="fw-bolder mb-1">{restaurants.name}</div>
                <div>{restaurants.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* image-modal */}
        <Modal isOpen={galleryModal} style={customStyles}>
          <div onClick={() => this.handleModal('galleryModal', false)} className="close">
            <i className="bi bi-x-circle-fill close"></i>
          </div>
          <Carousel showThumbs={false} showStatus={false} className="carou">
            <div>
              <img src={restaurants.thumb} alt="not available" className="thumb_img" />
            </div>
          </Carousel>
        </Modal>

        {/* menu-modal */}
        <Modal isOpen={menuModalOpen} style={customStyles}>
          <h2 key={restaurants._id}>{restaurants.name}</h2>

          {menuItems.map((item, index) => {
            return (
              <div>
                <div className="container overflow-auto mt-4">
                  <div className="d-inline-block col-9">
                    <span className="ms-1">{item.name}</span>
                    <br />
                    <span className="ms-1">₹{item.price}</span>
                    <br />
                    <p className="ms-1 modal_subtitle">{item.description}</p>
                  </div>
                  <div className="d-inline-block col-3">
                    <img src={item.image} className="me-3 modalImg" alt="not available" />
                    {item.qty === 0 ? (
                      <div>
                        <button className="btn btn-light text-success shadow-sm bg-white rounded add" onClick={() => this.addItems(index, 'add')}>
                          Add
                        </button>
                      </div>
                    ) : (
                      <div className="qty_set btn-group" role="group">
                        <button className="btn btn-light text-success shadow-sm bg-white" onClick={() => this.addItems(index, 'substract')}>
                          -
                        </button>
                        <span className="quantity text-success shadow-sm bg-white qty">{item.qty}</span>
                        <button className="btn btn-light text-success shadow-sm bg-white" onClick={() => this.addItems(index, 'add')}>
                          
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  <hr />
                </div>
              </div>
            );
          })}
          <div className="container">
            <div className="d-inline-block col-9">
              {subtotal ? (
                <h3 className="item-total fw-bolder">SubTotal : ₹{subtotal} </h3>
              ) : (
                <h3 className="item-total fw-bolder">SubTotal :</h3>
              )}
            </div>

            <div className="d-inline-block">
              {subtotal === undefined ? (
                <button className="btn btn-danger order-button pay" disabled>
                  {' '}
                  Pay Now
                </button>
              ) : (
                <button className="btn btn-danger pay" onClick={() => {
                  this.handleModal('menuModalOpen', false);
                  this.handleModal('formModal', true);
                }}>
                  {' '}
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </Modal>

        <Modal isOpen={formModal} style={customStyles}>
          <div className="container" style={{ width: "35em" }}>
            <div onClick={() => this.handleModal('formModal', false)} className="bi bi-x-lg me-3 modal_cross">close</div>
            <h2>{restaurants.name}</h2>
            <form>
              <div className="form-group mt-4">
                <label className="mb-2" for="name">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  style={{ borderRadius: '0px' }}
                  onChange={this.setName}
                  value={this.state.name}
                />
              </div>

              <div className="form-group mt-4">
                <label className="mb-2" for="mobileno">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobileno"
                  placeholder="Enter mobile number"
                  style={{ borderRadius: '0px' }}
                  onChange={this.setMobile}
                  value={this.state.mobileno}
                />
              </div>

              <div className="form-group mt-4">
                <label className="mb-2" for="address">
                  Address
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  rows="3"
                  placeholder="Enter your address"
                  style={{ borderRadius: '0px' }}
                  onChange={this.setAddress}
                  value={this.state.address}
                ></textarea>
              </div>
            </form>

            <div className="next_box" style={{ backgroundColor: "#F5F8FF" }}>
              <button className="btn btn-danger" style={{ float: 'right', marginTop: '20px' }} onClick={this.handlePayment}>
                Proceed
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Details;
