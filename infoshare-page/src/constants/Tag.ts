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
    },
    "IT": {
        title: "IT",
        description: "정보기술 트렌드와 새로운 디지털 기술을 탐색해보세요."
    },
    "Information": {
        title: "Information",
        description: "생활 전반의 유용한 정보와 지식을 공유하는 공간입니다."
    },
    "QnA": {
        title: "QnA",
        description: "궁금한 질문을 남기고 전문가들의 답변을 얻어가세요."
    },
    "Notice": {
        title: "Notice",
        description: "커뮤니티의 중요한 소식과 공지사항을 확인하세요."
    },
    "Free": {
        title: "자유게시판",
        description: "자유롭게 의견을 나누고 질문하며 커뮤니티와 소통할 수 있는 공간입니다."
    }
};

export const getCategoryInfo = (category: string) => {
    return CATEGORY_INFO[category] || CATEGORY_INFO["Free"];
};