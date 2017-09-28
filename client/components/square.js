import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
    render() {
        const { black } = this.props;
        const fill = black ? '#fdae01' : 'black';
        const stroke = black ? 'black' : ' #fdae01';

        return (
            <div style={{
                backgroundColor: fill,
                color: stroke,
                width: '100px',
                height: '100px'
            }}>
                {this.props.children}
            </div>
        );
    }
}

Square.propTypes = {
    black: PropTypes.bool
};