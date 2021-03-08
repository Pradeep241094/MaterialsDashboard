

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'


// to demonstrate the utilization of class based component. Custom Color Picker to select values from the range of colors
class ColorPickerComponent extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '80',
      g: '227',
      b: '194',
      a: '100',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {

    const {onChangeColor} = this.props;
    this.setState({ color: color.rgb })
    onChangeColor(color)
  };

  render() {
    const {color} = this.props;

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
        <div>
        <div>Color</div>
      <div>
        <div onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ color } onChange={ this.handleChange } />
        </div> : null }
        </div>
      </div>
    )
  }
}

export default ColorPickerComponent