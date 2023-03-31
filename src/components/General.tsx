import React from 'react';

const General = () => {

  return (
<div>
        <div className="pageJump"> <a href="https://boards.4chan.org/pol/#bottom">▼</a> <a href="javascript:void(0);" id="settingsWindowLinkMobile">Settings</a> <a href="https://p.4chan.org/">Mobile</a> <a href="https://www.4chan.org/" target="_top">Home</a> </div>
        <div className="boardBanner">
          <div id="bannerCnt" className="title desktop" data-src="85.png"><img alt="4chan" src="./_pol_ - Politically Incorrect - 4chan_files/85.png" /></div>
          <div className="boardTitle">/g/ - General</div>
        </div>
        <hr className="abovePostForm" />
        <div className="navLinks mobile"><span className="mobileib button"><a href="https://boards.4chan.org/pol/#bottom">Bottom</a></span> <span className="mobileib button"><a href="https://boards.4chan.org/pol/catalog">Catalog</a></span> <span className="mobileib button"><a href="https://boards.4chan.org/pol/#top_r" id="refresh_top">Refresh</a></span></div>
        <div id="mpostform"><a href="https://boards.4chan.org/pol/#" className="mobilePostFormToggle mobile hidden button">Start
            a New Thread</a></div>
        <div style={{position: 'relative'}} />
        <form name="post" action="https://sys.4chan.org/pol/post" method="post" encType="multipart/form-data"><input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} /><input type="hidden" name="mode" defaultValue="regist" /><input id="postPassword" name="pwd" type="hidden" />
          <div id="togglePostFormLink" className="desktop">[<a href="https://boards.4chan.org/pol/#">Start a New Thread</a>]
          </div>
          <table className="postForm hideMobile" id="postForm">
            <tbody>
              <tr data-type="Name">
                <td>Name</td>
                <td><input name="name" type="text" tabIndex={1} placeholder="Anonymous" /></td>
              </tr>
              <tr data-type="Options">
                <td>Options</td>
                <td><input name="email" type="text" tabIndex={2} /></td>
              </tr>
              <tr data-type="Subject">
                <td>Subject</td>
                <td><input name="sub" type="text" tabIndex={3} /><input type="submit" defaultValue="Post" tabIndex={6} /></td>
              </tr>
              <tr data-type="Comment">
                <td>Comment</td>
                <td><textarea name="com" cols={48} rows={4} wrap="soft" tabIndex={4} defaultValue={""} /></td>
              </tr>
              <tr id="captchaFormPart">
                <td className="desktop">Verification</td>
                <td colSpan={2}>
                  <div id="t-root" />
                  <div className="passNotice">4chan Pass users can bypass this verification. [<a href="https://www.4chan.org/pass" target="_blank">Learn More</a>] [<a href="https://sys.4chan.org/auth">Login</a>]</div>
                </td>
              </tr>
              <tr data-type="Flag">
                <td>Flag</td>
                <td><select name="flag" className="flagSelector">
                    <option value={0}>Geographic Location</option>
                    <option value="AC">Anarcho-Capitalist</option>
                    <option value="AN">Anarchist</option>
                    <option value="BL">Black Nationalist</option>
                    <option value="CF">Confederate</option>
                    <option value="CM">Communist</option>
                    <option value="CT">Catalonia</option>
                    <option value="DM">Democrat</option>
                    <option value="EU">European</option>
                    <option value="FC">Fascist</option>
                    <option value="GN">Gadsden</option>
                    <option value="GY">Gay</option>
                    <option value="JH">Jihadi</option>
                    <option value="KN">Kekistani</option>
                    <option value="MF">Muslim</option>
                    <option value="NB">National Bolshevik</option>
                    <option value="NT">NATO</option>
                    <option value="NZ">Nazi</option>
                    <option value="PC">Hippie</option>
                    <option value="PR">Pirate</option>
                    <option value="RE">Republican</option>
                    <option value="MZ">Task Force Z</option>
                    <option value="TM">Templar</option>
                    <option value="TR">Tree Hugger</option>
                    <option value="UN">United Nations</option>
                    <option value="WP">White Supremacist</option>
                  </select></td>
              </tr>
              <tr data-type="File">
                <td>File</td>
                <td><input id="postFile" name="upfile" type="file" tabIndex={7} /></td>
              </tr>
              <tr className="rules">
                <td colSpan={2}>
                  <ul className="rules">
                    <li>Please read the <a href="https://www.4chan.org/rules#pol">Rules</a> and <a href="https://www.4chan.org/faq">FAQ</a> before posting.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <div id="postFormError" />
                </td>
              </tr>
            </tfoot>
          </table>
          <table id="blotter" className="desktop">
            <thead>
              <tr>
                <td colSpan={2}>
                  <hr className="aboveMidAd" />
                </td>
              </tr>
            </thead>
            <tbody id="blotter-msgs">
              <tr>
                <td data-utc={1598018313} className="blotter-date">03/31/23</td>
                <td className="blotter-content">First board added: <a target="_blank" title="Video Games/RPG" href="https://boards.4channel.org/vrpg/">/g/</a></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>[<a data-utc={1598018313} id="toggleBlotter" href="https://boards.4chan.org/pol/#">Hide</a>]<span> [<a href="https://www.4chan.org/blotter" target="_blank">Show All</a>]</span></td>
              </tr>
            </tfoot>
          </table>
        </form>
        <hr className="aboveMidAd" />
        <div className="middlead center">
          <div><a href="https://boards.4channel.org/biz/"><img alt="" src="./_pol_ - Politically Incorrect - 4chan_files/29a4ae0384f7d4b44353457edb17e29e5c30da2b.gif" /></a>
          </div>
        </div>
        <hr />
        <div id="danbo-s-t" className="danbo-slot">
          <div className="danbo_dta danbo-d" data-danbo="27-pol-1-728-90"><iframe marginHeight={0} frameBorder={0} scrolling="no" marginWidth={0} loading="lazy" src="./_pol_ - Politically Incorrect - 4chan_files/gate.html" id="danbo_item_adebchhbejcj" style={{margin: '0px auto', height: '90px', width: '728px'}} /></div>
        </div>
        <div id="ctrl-top" className="desktop">
          <hr /><input type="text" id="search-box" placeholder="Search OPs…" /> [<a href="https://boards.4chan.org/pol/catalog">Catalog</a>] [<a href="https://boards.4chan.org/pol/archive">Archive</a>]
        </div>
      </div>
      );
 
};

      export default General;