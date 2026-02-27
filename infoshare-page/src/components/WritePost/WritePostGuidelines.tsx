import React from 'react';
import { WRITE_POST } from '../../constants/Texts';
import { MaterialIcon } from '../../utils/MaterialIcon';
import '../../styles/WritePost/WritePostGuidelines.css';

export const WritePostGuidelines: React.FC = () => {
    return (
        <div className="write-post-guidelines-container">
            {WRITE_POST.GUIDELINES.map((guide, index) => (
                <div key={index} className="write-post-guideline-card">
                    <div className="write-post-guideline-header">
                        <MaterialIcon icon={guide.icon} className="write-post-guideline-icon" />
                        {guide.title}
                    </div>
                    <p className="write-post-guideline-desc">{guide.desc}</p>
                </div>
            ))}
        </div>
    );
};
