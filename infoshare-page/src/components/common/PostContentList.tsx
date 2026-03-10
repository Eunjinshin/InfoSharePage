import { MAIN_TEXT } from "../../constants/Texts";
import { MaterialIcon } from "../../utils/MaterialIcon";
import "../../styles/main/MainLatestPosts.css";
import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

export interface PostList {
    id?: number | string;
    avatar: string;
    name: string;
    timeAgo: string;
    title: string;
    summary: string;
    category: string;
}

interface PostListProps {
    postList: PostList[];
}

export const PostContentList: React.FC<PostListProps> = ({
    postList
}) => {

    if (!postList || postList.length === 0) {
        return (
            <div className="no-contents-wrapper">
                <MaterialIcon icon="inbox" className="no-contents-icon" />
                <p className="no-contents-text">
                    {MAIN_TEXT.NO_CONTENTS}
                </p>
            </div>
        );
    }

    const displayPosts = postList.slice(0, 3);

    return (
        <div className="latest-posts-list">
            {displayPosts.map((postList, index) => (
                <Link to={`/detail/${postList.id || index}`} key={index} className="latest-post-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="latest-post-avatar-wrapper">
                        <div className="latest-post-avatar" style={{ overflow: 'hidden', borderRadius: '50%' }}>
                            <Avatar src={postList.avatar} alt={`${postList.name} avatar`} />
                        </div>
                    </div>
                    <div className="latest-post-content">
                        <div className="latest-post-meta">
                            <p className="latest-post-author">
                                {postList.name}
                                <span className="latest-post-time">• {postList.timeAgo}</span>
                            </p>
                            <span className="latest-post-category-badge">{postList.category}</span>
                        </div>
                        <h4 className="latest-post-title">{postList.title}</h4>
                        <p className="latest-post-summary">{postList.summary}</p>
                    </div>
                </Link>
            ))}
        </div>
    );

}
