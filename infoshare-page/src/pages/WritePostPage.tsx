import React from 'react';
import '../styles/pages/WritePostPage.css';
import { BreadcrumbNavigation } from '../components/common/BreadcrumbNavigation';
import { WritePostForm } from '../components/WritePost/WritePostForm';
import { WritePostGuidelines } from '../components/WritePost/WritePostGuidelines';
import { BREADCRUMB_NAV, WRITE_POST } from '../constants/Texts';

export const WritePostPage: React.FC = () => {
    return (
        <main className="write-post-page-main">
            <div className="write-post-content-container">
                <BreadcrumbNavigation paths={[
                    { name: BREADCRUMB_NAV.WRITE },
                    { name: BREADCRUMB_NAV.CREATE_POST }
                ]} />
                <h1 className="write-post-title">{WRITE_POST.TITLE}</h1>
                <p className="write-post-desc">{WRITE_POST.DESC}</p>

                <WritePostForm />
                <WritePostGuidelines />
            </div>
        </main>
    );
};

export default WritePostPage;
