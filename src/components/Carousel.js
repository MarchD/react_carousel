import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    transform: 0,
  }

  toNext = () => {
    const { itemWidth, step, images } = this.props;
    const limit = -itemWidth * (images.length - step);

    this.setState((state) => {
      let widthOfOneTurn = state.transform - (itemWidth * step);

      if (widthOfOneTurn < limit) {
        widthOfOneTurn = limit;
      }

      return { transform: widthOfOneTurn };
    });
  }

  toPrev = () => {
    const { itemWidth, step } = this.props;

    this.setState((state) => {
      let widthOfOneTurn = state.transform + (itemWidth * step);

      if (widthOfOneTurn > 0) {
        widthOfOneTurn = 0;
      }

      return { transform: widthOfOneTurn };
    });
  }

  render() {
    const {
      images,
      animationDuration,
      itemWidth,
      frameSize,
      step,
    } = this.props;
    const { transform } = this.state;
    const limit = -itemWidth * (images.length - step);

    return (
      <div className="wrapper" style={{ width: `${itemWidth * frameSize}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${this.state.transform}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(img => (
            <li key={img}>
              <img src={img} alt="1" style={{ width: `${itemWidth}px` }} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={this.toPrev}
          disabled={transform === 0}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={this.toNext}
          disabled={transform === limit}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  animationDuration: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};
