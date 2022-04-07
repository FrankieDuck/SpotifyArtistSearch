import Carousel from "react-elastic-carousel"
import React, { Component } from "react"

class Slider extends Component {
    state = {
        items: [
            {id: 1, title: 'Artist #1'},
            {id: 2, title: 'Artist #2'},
            {id: 3, title: 'Artist #3'},
            {id: 4, title: 'Artist #4'},
            {id: 5, title: 'Artist #5'}
        ]
    }

    render() {
        const { items } = this.state
        return ( 
            <>
            <Carousel>
                {this.props.children}
            </Carousel>
            </>
        )
    }
}

export default Slider


