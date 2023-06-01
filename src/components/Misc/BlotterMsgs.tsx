import { BlotterMsgsText } from "../../constants/Const";


const BlotterMsgs = () => {
    return (
        <>
            <table id="blotter">
                <thead>
                    <tr>
                        <td colSpan={2} >
                            <hr className="aboveMidAd" />
                        </td>
                    </tr>
                </thead>
                <tbody id="blotter-msgs">
                    {BlotterMsgsText.map((Msg, index) => (
                        <tr key={Msg[0] + index}>
                            <td className="blotter-date">{Msg[0]}</td>
                            <td className="blotter-content">{Msg[1]}<a target="_blank" title="General" href={`${Msg[2]}`}>{Msg[2]}/</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default BlotterMsgs;