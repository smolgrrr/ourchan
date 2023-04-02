import { boards } from "../../constants/Const";

interface BoardBannerProps {
    currentboard: number | null;
}

const BoardBanner: React.FC<BoardBannerProps> = ({ currentboard }) => {
    const board = currentboard ? boards[currentboard] : null;
    const boardTitle = board ? `/${board[0]}/ - ${board[2]}` : null;

    return (
        <>
            <div id="boardNavDesktop" className="desktop">
                <span className="boardList">
                    [{boards.map(board => (<>
                        <a key={board[0]} href={`/${board[0]}`} title={board[0]}>
                            {board[0]}
                        </a> /
                    </>
                    ))}]
                </span>
            </div>
            <div className="pageJump">
                <a href="#bottom">▼</a> <a href="/">Mobile</a> <a href="/" target="_top">Home</a>
            </div>
            <div className="boardBanner">
                <div id="bannerCnt" className="title desktop" data-src="7.png"><img alt="ourChan" src="7.png" /></div>
                {boardTitle && <div className="boardTitle">{boardTitle}</div>}
            </div>
        </>
    );
};

export default BoardBanner;