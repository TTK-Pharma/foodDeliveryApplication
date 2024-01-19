import React, { Component } from 'react'
import '../styles/Cover.css'
import axios from 'axios'
import nav from './navigate'

export class Cover extends Component {
    constructor() {
        super();
        this.state = {
            restaurant: [],
            inputText: undefined,
            suggestions: []
        }
    }

    handleLocation = (location) => {
        const locationId = location.target.value;

        axios({
            url: `http://localhost:5500/restaurantss/${locationId}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ restaurant: res.data.restaurants })
        })
        .catch(err => console.log(err))
    }

    handleInput = (event) => {
        const { restaurant } = this.state;
        const inputText = event.target.value;

        let suggestions = [];

        suggestions = restaurant.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestions });
    }

    showSuggestions = () => {
        const { suggestions, inputText } = this.state;

        if (suggestions.length === 0 && inputText === undefined) {
            return null;
        } else if (suggestions.length > 0 && inputText === '') {
            return null;
        }else if (suggestions.length === 0 && inputText) {
            return (
                <li> No Search Results Found </li>
            )
        }

            return(
                suggestions.map((item) => (
                    <li onClick={() => this.selectRestaurant(item._id)}>
                        <img className='sugg_img' src={`${item.thumb}`} alt='not available'/>
                        <span className='fw-bolder sugg_title'>{`${item.name}`}</span> <br />
                        <span className='locality'>{`${item.locality}`}</span> <hr className='sugg_hr' />
                    </li>
                ))
            );
    }

    selectRestaurant = (resId) => {
        this.props.navigate(`/details?restaurant=${resId}`);
    }

    render(){
        const { locationData } = this.props
        

        return(
            <div>

                <div className="bg bg-image d-flex">
                    <div className="container my-5">
                        <div className="row">
                        </div>
                        <div className="row mt-5">
                            <div className="col d-flex justify-content-center">
                                <div className="text-danger circles">
                                    <h2 className="coverlogo">e!</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col d-flex justify-content-center">
                                <h3 className="text-light find">Find the best restaurants, cafés, and bars</h3>
                            </div>
                        </div>
                        <div className="row mt-3 d-flex justify-content-center ">
                            <div className="col .search-01 ">
                                <select className="form-control places py-2" onChange={this.handleLocation}>
                                    { locationData.map((item, index) => {
                                        return(
                                            <option key={index} value={ item.city_id }>{ item.name }</option>
                                        )
                                    })}
                                    
                                </select>
                            </div>
                            <div className="col input-group searchbar">
                                <i className="input-group-text bi bi-search "></i>
                                <input type="text" className="form-control .search-02 py-2" placeholder="Search for restaurants" onChange={this.handleInput} />
                                <ul className='suggestions'>{this.showSuggestions()}</ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default nav(Cover);