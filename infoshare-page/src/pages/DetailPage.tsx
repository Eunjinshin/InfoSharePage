import React from 'react';
import '../styles/pages/DetailPage.css';
import { DetailPost } from '../components/Detail/DetailPost';
import { DetailComments } from '../components/Detail/DetailComments';
import { MOCK_POST_DETAIL, MOCK_COMMENTS } from '../tests/detailTestdata';

export const DetailPage: React.FC = () => {
    return (
        <main className="detail-page-main">
            <div className="detail-content-container">
                {/* Breadcrumb Navigation */}
                <nav className="detail-breadcrumb">
                    <a href="/" className="detail-breadcrumb-link">Home</a>
                    <span className="material-symbols-outlined detail-breadcrumb-separator">chevron_right</span>
                    <a href="#" className="detail-breadcrumb-link">{MOCK_POST_DETAIL.category}</a>
                    <span className="material-symbols-outlined detail-breadcrumb-separator">chevron_right</span>
                    <span className="detail-breadcrumb-current">Post Detail</span>
                </nav>

                <DetailPost post={MOCK_POST_DETAIL} />

                <DetailComments comments={MOCK_COMMENTS} totalCount={MOCK_POST_DETAIL.commentCount} />
            </div>
        </main>
    );
};

export default DetailPage;
