import { MAIN_TEXT } from "../../constants/Texts";
import { MaterialIcon } from "../../utils/MaterialIcon";
import "../../styles/main/MainLatestPosts.css";

export interface PostList {
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
                <div key={index} className="latest-post-item">
                    <div className="latest-post-avatar-wrapper">
                        <img
                            alt={`${postList.name} avatar`}
                            className="latest-post-avatar"
                            src={postList.avatar}
                        />
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
                </div>
            ))}
        </div>
    );

}
