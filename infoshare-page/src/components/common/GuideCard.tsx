import { GUIDE } from "../../constants/Texts";
import { MaterialIcon } from "../../utils/MaterialIcon";
import "../../styles/components/GuideCard.css";

export const GuideCard = () => {
    return (
        <div className="guide-card">
            <h3 className="guide-card-title">
                {GUIDE.TITLE}
            </h3>
            <p className="guide-card-desc">
                {GUIDE.DESC}
            </p>
            <a href="#" className="guide-card-link">
                {GUIDE.LEARN_MORE}
                <MaterialIcon
                    icon="arrow_forward"
                    className="guide-card-link-icon"
                />
            </a>
        </div>
    );
}