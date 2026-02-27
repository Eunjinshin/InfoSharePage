import React from 'react';
import { CHEVRON_ICONS } from "../../constants/Icons";
import { BREADCRUMB_NAV } from "../../constants/Texts";
import '../../styles/components/BreadcrumbNavigation.css';

export interface BreadcrumbPath {
    name: string;
    url?: string;
}

interface BreadcrumbNavigationProps {
    paths: BreadcrumbPath[];
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ paths }) => {

    return (
        <nav className="detail-breadcrumb">
            <a href="/" className="detail-breadcrumb-link">
                {BREADCRUMB_NAV.HOME}
            </a>

            {paths.map((path, index) => (
                <React.Fragment key={index}>
                    <span className="material-symbols-outlined detail-breadcrumb-separator">
                        {CHEVRON_ICONS.RIGHT}
                    </span>
                    {index === paths.length - 1 ? (
                        <span className="detail-breadcrumb-current">
                            {path.name}
                        </span>
                    ) : (
                        <a href={path.url || "#"} className="detail-breadcrumb-link">
                            {path.name}
                        </a>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};