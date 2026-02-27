export const CATEGORY_INFO: Record<string, { title: string; description: string }> = {
    "자유게시판": {
        title: "자유게시판",
        description: "자유롭게 의견을 나누고 질문하며 커뮤니티와 소통할 수 있는 공간입니다."
    },
    "Tech": {
        title: "Tech",
        description: "최신 기술, 프로그래밍, 하드웨어에 대한 토론을 나눠보세요."
    },
    "Tips": {
        title: "Tips & Tricks",
        description: "유용하고 효과적인 팁과 노하우를 공유하고 발견해보세요."
    },
    "News": {
        title: "News",
        description: "최신 뉴스 및 공지사항을 확인하고 최신 정보를 얻어가세요."
    },
    "Science": {
        title: "Science",
        description: "과학적 발견과 흥미로운 연구 결과들을 탐구해보세요."
    },
    "Design": {
        title: "Design",
        description: "디자인 영감과 아이디어를 공유하고 피드백을 받아보세요."
    }
};

export const getCategoryInfo = (category: string) => {
    return CATEGORY_INFO[category] || CATEGORY_INFO["자유게시판"];
};