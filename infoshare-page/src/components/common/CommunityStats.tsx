import { MAIN_TEXT_TEST } from "../../tests/Mainpagedata";
import '../../styles/components/CommunityStats.css';
import { Button } from "./Button";

export const CommunityStats = () => {
    return (
        <div className="community-container">
            <h3 className="community-container-title">
                {MAIN_TEXT_TEST.SIDEBAR.STATS_TITLE}
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
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
            <Button className="community-container-join-btn">
                {MAIN_TEXT_TEST.SIDEBAR.JOIN_BTN}
            </Button>
        </div>
    );
};