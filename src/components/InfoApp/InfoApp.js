import { infomationApp } from "../../services/appService";

export const InfoApp = () => {
    const {version} = infomationApp
    return (
        <>
            <h5 className='Title'>Version : {version}</h5>
        </>
    )
}