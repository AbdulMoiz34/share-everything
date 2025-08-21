import { Tooltip } from "antd";

interface LogoutBtnProp {
    logoutHandler: () => void
}

const LogoutBtn = ({ logoutHandler }: LogoutBtnProp) => {
    return (
        <Tooltip placement="bottom" title="Are you sure?">
            <button className="cursor-pointer text-[13px]" onClick={logoutHandler}>Log Out</button>
        </Tooltip>
    )
}

export default LogoutBtn;