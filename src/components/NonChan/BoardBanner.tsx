import { boards, ads, nonChanBoards } from "../../constants/Const";
import { useState, useMemo } from "react";

interface BoardBannerProps {
    currentboard: number | null;
}

const BoardBanner: React.FC<BoardBannerProps> = ({ currentboard }) => {

    const [adIndex, setAdIndex] = useState(0);

    useMemo(() => {
        setAdIndex(Math.floor(Math.random() * 2));
    }, []);

    return (
        <>
            <div id="boardNavDesktop" className="desktop">
                <span className="boardList">
                    [{boards.map(board => (
                        <><a key={board[0]} href={`/${board[0]}`} title={board[0]}>
                            {board[0]}
                        </a> /</>
                    ))}]
                    [{nonChanBoards.map(board => (
                        <><a key={board[0]} href={`/${board[0]}`} title={board[0]}>
                            {board[1]}
                        </a> /</>
                    ))}]                    
                </span>
            </div>
            <div className="pageJump">
                <a href="#bottom">▼</a> <a href="/">Mobile</a> <a href="/" target="_top">Home</a>
            </div>
            <div className="boardBanner">
                <div id="bannerCnt" className="title desktop">
                    <a href={ads[adIndex][0]} target="_blank"><img width={300} alt="ourChan" src={ads[adIndex][1]} /></a>
                </div>
                <div className="boardTitle">Mostr - /mostr/</div>
            </div>
        </>
    );
};

export default BoardBanner;
