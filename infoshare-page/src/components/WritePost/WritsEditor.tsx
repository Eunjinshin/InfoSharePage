import React, { useRef } from 'react';
import { WRITE_POST } from '../../constants/Texts';

// ✅ TOAST UI Editor 기능 및 CSS 임포트
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // 에디터 기본 스타일 (필수)

export const WritsEditor: React.FC = () => {
    // ✅ 에디터 컴포넌트를 조작하거나 작성된 데이터를 가져오기 위한 useRef
    // 나중에 "저장" 버튼 등을 눌렀을 때 아래와 같이 내용을 가져올 수 있습니다:
    // const contentMarkdown = editorRef.current?.getInstance().getMarkdown();
    // const contentHtml = editorRef.current?.getInstance().getHTML();
    const editorRef = useRef<Editor>(null);

    return (
        <div>
            <div className="write-post-form-group">
                <label className="write-post-form-label">
                    {WRITE_POST.FORM.CONTENT_LABEL}
                </label>
                <div className="write-post-editor-wrapper">
                    <Editor
                        ref={editorRef}
                        initialValue=" " // 빈 문자열 대신 공백 한 칸을 넣어야 placeholder가 정상 작동하는 에디터 스펙을 반영합니다.
                        placeholder={WRITE_POST.FORM.CONTENT_PLACEHOLDER} // 에디터 입력창에 힌트 텍스트(placeholder)를 띄웁니다.
                        previewStyle="vertical" // 마크다운 작성 시 우측에 미리보기를 띄울지 (vertical) 탭으로 구분할지 (tab)
                        height="400px" // 에디터의 세로 크기
                        initialEditType="wysiwyg" // 처음 띄울 에디터 모드: 'markdown' (마크다운 모드) 또는 'wysiwyg' (워드 같은 UI 모드)
                        useCommandShortcut={true} // Ctrl+B 등의 키보드 단축키 사용 설정
                        // ✅ toolbarItems 속성으로 상단 툴바에 어떤 기능 버튼들을 넣을지 커스텀 가능합니다.
                        toolbarItems={[
                            ['heading', 'bold', 'italic', 'strike'], // 제목, 굵게, 기울임꼴, 취소선
                            ['hr', 'quote'], // 가로선, 인용구
                            ['ul', 'ol', 'task', 'indent', 'outdent'], // 글머리 기호, 번호 매기기, 체크박스, 들여쓰기, 내어쓰기
                            ['table', 'image', 'link'], // 표, 이미지 삽입, 링크 삽입
                            ['code', 'codeblock'] // 짧은 코드, 코드 블록
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};