import { CATEGORY_ICONS } from "./Icons";

export const TITLE_TEXT = {
    TITLE: "InfoShare",
    SIGN: "Sign Up"

}

export const HEADER_TEXT = {
    main: [
        { text: '홈', href: '/' },
        { text: '카테고리', href: '/categories' },
        { text: '소개', href: '/about' }
    ],
    login: [
        { text: '소개', href: '/about' }
    ],
    board: [
        { text: '홈', href: '/' },
        { text: '카테고리', href: '/categories' },
        { text: '소개', href: '/about' }
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
