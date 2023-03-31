interface OPPostContainerProps {
    file: string;
    subject: string;
    comment: string;
}


const OPPostContainer = ({ file, subject, comment }: OPPostContainerProps) => {
    return (
        <div className="postContainer opContainer">
            <div id="p421762085" className="post op">
                <div className="postInfoM mobile"> <span className="nameBlock"><span className="name">Anonymous</span> <span className="posteruid">(ID: <span className="hand" title="Highlight posts by this ID">OCAZFYgb</span>)</span> <span title="United States" className="flag flag-us" /><br /><span className="subject"><span data-tip data-tip-cb="mShowFull">Ukraine from now on will be kn(...)</span></span> </span><span className="dateTime postNum" data-utc={1680267945}>03/31/23(Fri)09:05:45 <a href="#p421762085" title="Link to this post">No.</a><a href="javascript:quote('421762085');" title="Reply to this post">421762085</a></span></div>
                <div className="file" id="f421762085">
                    <div className="fileText" id="fT421762085">File: <a href={file} target="_blank">1679971214859551.png</a> (377 KB, 527x558)</div>
                    <a className="fileThumb" href={file} target="_blank">
                        <img src={file} alt="377 KB" data-md5="TaFWJ19lIH43I954gO55gA==" style={{ maxHeight: '250px', maxWidth: '236px' }} loading="lazy" />
                        <div data-tip data-tip-cb="mShowFull" className="mFileInfo mobile">377 KB PNG</div>
                    </a>
                </div>
                <div className="postInfo desktop" id="pi421762085">
                    <input type="checkbox" name="421762085" defaultValue="delete" /> <span className="subject">{subject}</span> <span className="nameBlock"><span className="name">Anonymous</span> <span className="posteruid id_OCAZFYgb">(ID: <span className="hand" title="Highlight posts by this ID" style={{ backgroundColor: 'rgb(90, 190, 203)', color: 'black' }}>OCAZFYgb</span>)</span> <span title="United States" className="flag flag-us" /></span> <span className="dateTime" data-utc={1680267945}>04/01/23(Sat)00:05:45</span> <span className="postNum desktop"><a href="#p421762085" title="Link to this post">No.</a><a href="javascript:quote('421762085');" title="Reply to this post">421762085</a></span><a href="#" className="postMenuBtn" title="Post menu" data-cmd="post-menu">▶</a>
                    <div id="bl_421762085" className="backlink"><span><a href="#p421762253" className="quotelink">&gt;&gt;421762253</a> </span><span><a href="#p421762384" className="quotelink">&gt;&gt;421762384</a> </span></div>
                </div>
                <blockquote className="postMessage" id="m421766820">{comment}</blockquote>
            </div>
        </div>
    );
};

export default OPPostContainer;
