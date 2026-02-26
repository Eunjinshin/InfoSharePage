import { CATEGORY_ICONS } from "./Icons";

export const TITLE_TEXT = {
    TITLE: "InfoShare",
    SIGN: "Sign Up"

}

export const HEADER_TEXT = {
    main: [
        { text: 'Explore', href: '/explore' },
        { text: 'Community', href: '/community' },
        { text: 'About', href: '/about' }
    ],
    login: [
        { text: 'About', href: '/about' }
    ],
    board: [
        { text: 'Home', href: '/' },
        { text: 'Categories', href: '/categories' },
        { text: 'About', href: '/about' }
    ]
};

export const FOOTER_TEXT = {
    COPYRIGHT: "© 2026 InfoShare Community. All rights reserved.",
    POLICY: "Privacy Policy",
    TERMS: "Terms of Service"
};

export const CATEGORY_TEXT = {
    CATEGORIES: [
        { icon: CATEGORY_ICONS.TRENDING_UP, text: "Tips" },
        { icon: CATEGORY_ICONS.COMPUTER, text: "Tech" },
        { icon: CATEGORY_ICONS.NEWSPAPER, text: "News" },
        { icon: CATEGORY_ICONS.SCIENCE, text: "Science" },
        { icon: CATEGORY_ICONS.DESIGN_SERVICES, text: "Design" }
    ]
};
