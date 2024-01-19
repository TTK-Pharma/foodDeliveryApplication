import React, { Component } from 'react'
import '../styles/Quicksearchcard.css'
import navigate from'./navigate'

export class QuicksearchCards extends Component {
  navigatePage = (id, city) => {
    this.props.navigate(`/filter?type=${id}`)
  }
  render() {
    const {mealtypedata} = this.props
    return (
      <div>
        <div class="row option boxesss">
          
          <div className='d-flex flex-wrap '>
            {
              mealtypedata.map((item) =>{
                return (
                  <div onClick={()=>{this.navigatePage(item.name)}}>
                     <div className="box ">
                    <div className="d-flex boxes mt-4 " >
                      <div className="l-box ">
                        <img src={item.image} className="img-fluid img-qs" alt='not available'/>
                      </div>
                      <div className="r-box">
                        <h4 className="title">{ item.name }</h4>
                        <h5 className='Content'> start your day with exclusive breakfast options </h5>
                      </div>
                    </div>
                    </div>
                  </div>
                 
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default navigate(QuicksearchCards)