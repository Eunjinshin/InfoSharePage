import { SIDEBAR } from "../../constants/MainText";
import { MAIN_TEXT_TEST } from "../../tests/Mainpagedata";
import { MaterialIcon } from "../../utils/MaterialIcon";

export const ContributorsList = () => {
    return (
        <div className="contributors-list-containe">
            <h3 className="contributors-list-containe-title">
                {SIDEBAR.CONTRIBUTORS_TITLE}
            </h3>
            <div className="contributors-list">
                {MAIN_TEXT_TEST.SIDEBAR.CONTRIBUTORS.map((user: any, index: number) => (
                    <div
                        key={index}
                        className="contributors-list-item"
                    >
                        <div className="contributors-list-info-wrapper">
                            <div className="contributors-list-avatar">
                                <img
                                    alt={user.name}
                                    src={user.avatar}
                                />
                            </div>
                            <div className="contributors-list-info">
                                <p className="contributors-list-name">
                                    {user.name}
                                </p>
                                <p className="contributors-list-points">
                                    {user.points}
                                </p>
                            </div>
                        </div>
                        <MaterialIcon
                            icon="stars"
                            className="contributors-list-icon"
                            style={{ opacity: user.iconOpacity }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};



