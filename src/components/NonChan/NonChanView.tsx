import Mostr from './Mostr';
import BoardBanner from './BoardBanner';
import NewThread from './NewThread';
import { useParams } from 'react-router-dom';
import { boards } from "../../constants/Const";

const NonChanView = () => {
  const boardIndex = boards.findIndex(board => board[0] === 'g');

  return (
    <div>
      <BoardBanner currentboard={boardIndex}/>
      <hr className="abovePostForm" />
      <div style={{ position: 'relative' }} />
      <NewThread currentboard={boardIndex}/>
      <Mostr/>
    </div>
  );

};

export default NonChanView;