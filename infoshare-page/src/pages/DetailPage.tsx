import React from 'react';
import '../styles/pages/DetailPage.css';
import { DetailPost } from '../components/Detail/DetailPost';
import { DetailComments } from '../components/Detail/DetailComments';
import { MOCK_POST_DETAIL, MOCK_COMMENTS } from '../tests/detailTestdata';
import { WritePostButton } from '../components/common/WritePostButton';
import { BreadcrumbNavigation } from '../components/common/BreadcrumbNavigation';
import { getCategoryInfo } from '../constants/Tag';
import { BREADCRUMB_NAV } from '../constants/Texts';

export const DetailPage: React.FC = () => {
    return (
        <main className="detail-page-main">
            <div className="detail-content-container">

                <BreadcrumbNavigation
                    paths={[
                        { name: BREADCRUMB_NAV.CATEGORIES, url: '/board' },
                        { name: getCategoryInfo(MOCK_POST_DETAIL.category).title },
                        { name: BREADCRUMB_NAV.POST_DETAIL }
                    ]}
                />

                <DetailPost
                    post={MOCK_POST_DETAIL}
                />

                <DetailComments
                    comments={MOCK_COMMENTS}
                    totalCount={MOCK_POST_DETAIL.commentCount}
                />

                <WritePostButton />
            </div>
        </main>
    );
};

export default DetailPage;
