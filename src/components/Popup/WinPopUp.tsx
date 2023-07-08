import './winpopup.css';
import WinnerImage from '../../assets/popup/winner.png';

const WinPopUp = ({ playerName }: { playerName: string }) => {
  return (
    <div className="winpopup">
      <div className="winpopup_container">
        <img src={WinnerImage} alt="winner player" />
        <p>{playerName} is winner</p>
      </div>
    </div>
  );
};

export default WinPopUp;
