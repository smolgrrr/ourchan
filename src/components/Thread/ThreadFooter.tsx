
const ThreadFooter = () => {


    return (
        <>
                <div className="navLinks mobile"><span className="mobileib button"><a href="#top">Top</a></span> <span className="mobileib button"><a href="#bottom_r" id="refresh_bottom">Refresh</a></span></div>
                <hr className="mobile" />
                <div className="adl">[<a href="https://freeross.org/">Free Ross</a>]</div>
                <hr />
                <div className="bottomCtrl desktop">
                    <span className="deleteform"><input type="hidden" name="mode" defaultValue="usrdel" />Delete Post:<input type="hidden" name="res" defaultValue={421762085} /> [<input type="checkbox" name="onlyimgdel" defaultValue="on" />File Only]<input type="hidden" id="delPassword" name="pwd" /> <input type="submit" defaultValue="Delete" /><input id="bottomReportBtn" type="button" defaultValue="Report" style={{ display: 'none' }} /></span>
                    <span className="stylechanger">
                        Style:
                        <select id="styleSelector">
                            <option value="Yotsuba New">Yotsuba</option>
                            <option value="Yotsuba B New">Yotsuba B</option>
                            <option value="Futaba New">Futaba</option>
                            <option value="Burichan New">Burichan</option>
                            <option value="Tomorrow">Tomorrow</option>
                            <option value="Photon">Photon</option>
                        </select>
                    </span>
                </div>
        </>

    );
};

export default ThreadFooter;