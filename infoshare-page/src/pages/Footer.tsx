import React from 'react';
import '../styles/pages/Footer.css';
import { FOOTER_TEXT } from '../constants/MenuText';

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>{FOOTER_TEXT.COPYRIGHT}</p>
            <div className="footer-links">
                <a href="#">{FOOTER_TEXT.POLICY}</a>
                <a href="#">{FOOTER_TEXT.TERMS}</a>
            </div>
        </footer>
    );
};
