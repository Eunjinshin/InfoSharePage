import { FILTER_TEXT } from "../../constants/FilterText";
import { BOARD_ICONS } from "../../constants/Icons";
import { MaterialIcon } from "../../utils/MaterialIcon";
import { Button } from "../common/Button";
import '../../styles/Board/BoardFilterSearch.css';

export const BoardFilterSearch = () => {
    return (
        <div className="board-filter-search-wrapper">
            <div className="board-filter-search">
                <div className="board-filter-search-icon">
                    <MaterialIcon icon={BOARD_ICONS.FILTER_LIST} />
                </div>
                <input
                    type="text"
                    className="board-filter-search-input"
                    placeholder={FILTER_TEXT.FILTER_PLACEHOLDER}
                />
            </div>
            <Button className="board-filter-search-btn">
                {FILTER_TEXT.SEARCH_BTN}
            </Button>
        </div>
    );
};