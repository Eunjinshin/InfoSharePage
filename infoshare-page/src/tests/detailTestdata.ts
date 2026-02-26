export const MOCK_POST_DETAIL = {
    title: "Understanding UI Design Systems in 2024: From Tokens to Scalable Components",
    category: "Design Systems",
    author: {
        name: "Alex Rivera",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGZiPBWQ1jbVT_Uzxa-oQ_cB9V-WLKrgmYA8fad1gmvi1tIECLlAlKliD2c09eQV0tD4MI7PEWRNun20IWAxovmrptv-fl5fkoEs2-y-LVc-IwdQBm2P12KHaK4JH0CL_HixAgauTk8M7yNIWDfHqKjzmmPdBb_8eFL3FmaDf2GL58W1QzQWBIH18VaWQfBhhxpbsUo1mLtR24VZzjt-MHro9gYfshuokOnoLjhgLbCW4_QMagA-d0zY9anpZJCB9ipGju_3QptIo"
    },
    publishedAt: "Oct 24, 2023",
    readTime: "5 min read",
    views: "1.2k views",
    commentCount: 24,
    content: `
        <p class="post-text-lead">
            Designing a consistent UI requires a deep understanding of component architecture. In this post, we explore how to leverage design tokens and standardized layouts to create a seamless user experience across different platforms.
        </p>
        <p>
            Design systems have evolved from simple style guides into living ecosystems of code and documentation. By 2024, the focus has shifted from "what we build" to "how we build it." We are seeing a massive adoption of design tokens as the single source of truth for design properties like colors, spacing, and typography.
        </p>
        <div class="post-image-container">
            <img alt="UI Design System Concept" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFZ_IHFPOkWd5EYDWnkSBd_vko1Ehh4vyMrjA-NRWFTT-RRZB6wX_Y8QlFZ380FoPL0bM1cIn0M9pavEvZtWA2TmWiqrt4crD-gn5aKx_p4QTuYXS6R9B4j7OT9HsY3uRQFui41vBPBR4HaMieNvDM2lcF6gc7zQRTPQ2RKGwkHb38AP5wjjgQsWZY7Nl21mYRrGi5WtZeT9ZapWpmTcT0YJPlINoVHm3DPWx9R2fkgAPiJXQje2RWLvC2B1oRyrlwmAvRrdgpT2g" />
        </div>
        <h3>The Power of Design Tokens</h3>
        <p>
            Tokens allow designers and developers to speak the same language. Instead of hardcoding hex values like <code>#9edfff</code>, we use semantic names like <code>color.primary.base</code>. This abstraction makes dark mode implementation and brand theme updates almost instantaneous.
        </p>
        <p>
            As we look forward, AI-assisted design systems will likely automate the more repetitive parts of component creation, allowing designers to focus on accessibility and user flow.
        </p>
    `
};

export const MOCK_COMMENTS = [
    {
        id: 1,
        author: {
            name: "Jordan Smith",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKhOylSVbSbK4WusBcm1fGFehooBNthLey7qv4xXopjNYxJWwvyLb2agWKnJ3sicLKFW0newkTxk40sY7OpQU6mutNAV4JT_3RWPDOV0iTCH8FCLvX78pbseG-oiOdR1KqhAs2d2p3Zl0dXL5gvwdNUjuidvtoioUUmeEIcw4jxZfw4eLdEUa8YMYetEU5X4v4MpbQ7gu-LIta8rWa4RJp4QOzlflbnXG_Se_1rAzrAp8TQAK7MGYTXXhTEjRHr7LqlDkcpXDTGwo"
        },
        timeAgo: "2 hours ago",
        content: "This is a fantastic breakdown! I've been struggling with implementing tokens across our React and Vue projects. Do you have any recommendations for cross-platform token management tools?",
        likes: 12,
        isAuthor: false,
        replies: [
            {
                id: 2,
                author: {
                    name: "Alex Rivera",
                    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa5F7AUq8sg0JxpBeMfDMHF0fHuQT_09Wp01FP7_wzKERIb2NlZL88EwFLGqQ-pFU-AZcI-ta-xsJuSf1N0bhUAgkMhuJsLeVayl_nD-gNL3Y455re5yGAH0RXJmmSIlbnFPxEJj323OocO5IBHVGjawM7uDMIV3R-jwYzKWHLBykDr1mdSCwyy7x-V7LU99K7xavPfIz5sRZ5TAFiS8QQIqszhQjt-1TqbtAiot-3igJIw8JxnexQg68YwS7n-zgaILKdHAz8UjE"
                },
                timeAgo: "1 hour ago",
                content: "I highly recommend checking out Style Dictionary or Supernova. They work great for syncing between Figma and your codebase!",
                likes: 4,
                isAuthor: true
            }
        ]
    },
    {
        id: 3,
        author: {
            name: "Sarah Chen",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkTXcl8TeH4NYYobfnwpezH2lLHUTZt9PqdpTJ9tLz6E-xHXwkH3ehKl9ijoiBjA5ppsBzvfJ6ndtBSe60qy7asFIwTHleivz1kR4iZUdnhXqwM9b_pZkLwD78h5IoMLiFY8qaYoaFgyUUKjoFcF2THw-lueIBAPBiUP5U4tABys3wSV6KzfMIJp9BZPSo-ZQDoqvhREV0UiQUK2fpRxB-XFsbDQOUXK_Y_mVY4Jags0iA2IC63dBswqJ5ZLkq5TYNVQbhgQ1ye80"
        },
        timeAgo: "5 hours ago",
        content: "Great read. Accessibility in design systems is often overlooked. Would love to see a follow-up post on how to include ARIA attributes in a shared component library.",
        likes: 8,
        isAuthor: false,
        replies: []
    }
];
