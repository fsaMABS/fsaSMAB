import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
    render() {
        const { cell } = this.props;
        let fill, stroke
        switch (cell) {
            case '_':
                fill = 'green';
                stroke = 'yellow';
                break;
            default:
                fill = '#3355ee'; //'#fdae01';
                stroke = 'black';
        }

        return (
            <div style={{
                backgroundColor: fill,
                color: stroke,
                width: '100%',
                height: '100%'
            }}>
                {this.props.children}
            </div>
        );
    }
}

Square.propTypes = {
    black: PropTypes.bool
};