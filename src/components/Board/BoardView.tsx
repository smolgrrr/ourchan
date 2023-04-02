import Catalog from './Catalog';
import BoardBanner from '../Misc/BoardBanner';
import NewThread from '../PostForms/NewThread';
import { useParams } from 'react-router-dom';
import { boards } from "../../constants/Const";

const BoardView = () => {
  const { boardParam } = useParams();
  const boardIndex = boards.findIndex(board => board[0] === boardParam);

  if (boardIndex !== -1) {
    // If boardParam exists in the boards array
    const board = boards[boardIndex];
    // Do something with the board subarray or index
  } else {
    // If boardParam does not exist in the boards array
    // Handle the error or return a default value
  }

  return (
    <div>
      <BoardBanner currentboard={boardIndex}/>
      <hr className="abovePostForm" />
      <div style={{ position: 'relative' }} />
      <NewThread currentboard={boardIndex}/>
      <Catalog currentboard={boardIndex}/>
    </div>
  );

};

export default BoardView;