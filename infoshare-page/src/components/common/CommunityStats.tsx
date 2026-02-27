import { MAIN_TEXT_TEST } from "../../tests/Mainpagedata";
import '../../styles/components/CommunityStats.css';
import { Button } from "./Button";
import { SIDEBAR } from "../../constants/Texts";

export const CommunityStats = () => {
    return (
        <div className="community-container">
            <h3 className="community-container-title">
                {SIDEBAR.STATS_TITLE}
            </h3>
            <div className="community-container-grid">
                {MAIN_TEXT_TEST.SIDEBAR.STATS.map((stat: any, index: number) => (
                    <div
                        key={index}
                        className="community-container-item"
                    >
                        <p className="community-container-value">
                            {stat.value}
                        </p>
                        <p className="community-container-label">
                            {SIDEBAR.STATS[index]}
                        </p>
                    </div>
                ))}
            </div>
            <Button className="community-container-join-btn">
                {SIDEBAR.JOIN_BTN}
            </Button>
        </div>
    );
};