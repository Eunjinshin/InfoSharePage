import React from "react";
import { MaterialIcon } from "../../utils/MaterialIcon";
import { MAIN_TEXT } from "../../constants/Texts";
import "../../styles/main/MainPopularPosts.css";

export interface PostCards {
    image: string;
    category: string;
    title: string;
    likes: string | number;
    comments: string | number;
}

interface PostContentCardsProps {
    postCards: PostCards[];
}

export const PostContentCards: React.FC<PostContentCardsProps> = ({ postCards }) => {
    if (!postCards || postCards.length === 0) {
        return (
            <div className="no-contents-wrapper">
                <MaterialIcon icon="inbox" className="no-contents-icon" />
                <p className="no-contents-text">
                    {MAIN_TEXT.NO_CONTENTS}
                </p>
            </div>
        );
    }

    //최대 2개까지만 출력
    const displayPosts = postCards.slice(0, 2);

    return (
        <div className="popular-posts-grid">
            {displayPosts.map((postCard, index) => (
                <div key={index} className="popular-post-card group">
                    <div className="popular-post-img-wrapper">
                        <img
                            alt={postCard.title}
                            className="popular-post-img"
                            src={postCard.image}
                        />
                    </div>
                    <div className="popular-post-content">
                        <span className="popular-post-category">
                            {postCard.category}
                        </span>
                        <h3 className="popular-post-title">
                            {postCard.title}
                        </h3>
                        <div className="popular-post-stats">
                            <div className="popular-post-stat">
                                <MaterialIcon
                                    icon="thumb_up"
                                    className="popular-post-stat-icon"
                                />
                                {postCard.likes}
                            </div>
                            <div className="popular-post-stat">
                                <MaterialIcon
                                    icon="chat_bubble"
                                    className="popular-post-stat-icon"
                                />
                                {postCard.comments}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};