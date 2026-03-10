export const ALERT_FAIL = {
    LIKE: "좋아요 처리에 실패했습니다.",
    SCRAP: "스크랩 처리에 실패했습니다.",
    SHARE: "공유하기에 실패했습니다.",
    FILE_UPLOAD: {
        ERROR: "파일 업로드에 실패했습니다.",
        SIZE_EXCEEDED: "[용량 초과] {fileName} 파일은 10MB를 넘을 수 없습니다.",
        UNSUPPORTED_FORMAT: "[지원하지 않는 포맷] {fileName}은(는) 허용되지 않는 파일 형식입니다. (PDF, JPG, PNG, ZIP만 가능)",
        DUPLICATE: "[중복 파일] {fileName}은(는) 이미 추가된 파일입니다."
    },
    AUTOSAVE: {
        ERROR: "자동 저장에 실패했습니다."
    },
    DELETE_POST: "게시글 삭제에 실패했습니다."
};

export const API_ERROR = {
    GET: "데이터를 불러오는데 실패했습니다.",
    PUT: "데이터를 수정하는데 실패했습니다.",
    DELETE: "데이터를 삭제하는데 실패했습니다.",
    FILE_UPLOAD: {
        ERROR: "파일 업로드에 실패했습니다.",
        SIZE_EXCEEDED: "[용량 초과] {fileName} 파일은 10MB를 넘을 수 없습니다.",
        UNSUPPORTED_FORMAT: "[지원하지 않는 포맷] {fileName}은(는) 허용되지 않는 파일 형식입니다. (PDF, JPG, PNG, ZIP만 가능)",
        DUPLICATE: "[중복 파일] {fileName}은(는) 이미 추가된 파일입니다."
    },
    AUTOSAVE: {
        ERROR: "자동 저장에 실패했습니다."
    },
    POST: {
        ERROR: "게시글 저장에 실패했습니다.",
        SUCCESS: "게시글이 성공적으로 저장되었습니다."
    }
}