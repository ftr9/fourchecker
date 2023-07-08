import { COL_COUNT } from '../../constants/Board';
import IndicatorImage from '../../assets/indicator.png';

interface IIndicatorProp {
  activeCol: number;
}

const Indicator = ({ activeCol }: IIndicatorProp) => {
  return (
    <div className="row">
      {new Array(COL_COUNT).fill('a').map((_, index) => (
        <div className="checker_placeholder checker_transparent" key={index}>
          {index === activeCol && (
            <img
              className="pointer"
              key={index}
              src={IndicatorImage}
              alt="pointer icon"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Indicator;
