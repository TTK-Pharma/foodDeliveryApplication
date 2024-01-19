import React, { Component } from 'react'
import QuicksearchCards from './QuicksearchCards'
import '../styles/Quicksearch.css'

export class Quicksearch extends Component {
  render() {
    const {mealtypeData} = this.props
    return (
      <div>
        <div className="container quicksearch">
        {/* <!--Quick searches--> */}
        <div className="row quicks">
            <h2 className="quick  mt-4">Quick Searches</h2>
            <p className="disc  mt-1">Discover restaurants by type of meal</p>
        </div>
      </div>
        <QuicksearchCards mealtypedata = {mealtypeData}/>
      </div>
    )
  }
}

export default Quicksearch