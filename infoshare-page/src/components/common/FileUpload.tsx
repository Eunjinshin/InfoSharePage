import { useRef } from "react";
import { WRITE_POST } from "../../constants/Texts";
import { MaterialIcon } from "../../utils/MaterialIcon";
import { useFileUpload } from "../../hooks/useFileUpload";
import { formatFileSize } from "../../utils/formatters";
import '../../styles/components/FileUpload.css';

export const FileUpload: React.FC = () => {

    // 1️⃣ 위에서 만든 hook에서 필요한 데이터와 함수들 가져오기
    const {
        files,
        isDragging,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileSelect,
        removeFile
    } = useFileUpload({
        // 💡 훅에서 에러가 발생했을 때 어떻게 처리할지 콜백으로 넘겨줍니다. 
        // (지금은 똑같이 alert을 쓰지만, 나중에 예쁜 Toast 팝업 컴포넌트로 여기서 바로 교체할 수 있습니다!)
        onError: (errorMessage) => {
            alert(`🚫 업로드 실패\n${errorMessage}`);
        }
    });

    // 2️⃣ 숨겨놓은 실제 <input type="file" /> 버튼에 접근하기 위한 useRef 
    // 화면을 클릭했을 때, 이 input을 강제로 클릭하게 만들어주는 역할
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="write-post-form-group">
            <label className="write-post-form-label">{WRITE_POST.FORM.ATTACHMENTS_LABEL}</label>

            {/* 🚀 드래그 앤 드롭 업로드 영역 */}
            <div
                className={`write-post-upload-area ${isDragging ? "dragging" : ""}`}
                onClick={handleBoxClick} /* 박스를 클릭하면 input 창 띄우기 */
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="write-post-upload-icon-wrapper">
                    <MaterialIcon icon="cloud_upload" className="write-post-upload-icon" />
                </div>
                <p className="write-post-upload-text">{WRITE_POST.FORM.ATTACHMENTS_DESC}</p>
                <p className="write-post-upload-subtext">{WRITE_POST.FORM.ATTACHMENTS_SUB_DESC}</p>
            </div>

            {/* 🔒 눈에 보이지 않는 (hidden) 실제 파일 선택 input 태그 */}
            <input
                type="file"
                ref={fileInputRef} /* 아까 선언한 박스클릭용 Ref 연결 */
                onChange={handleFileSelect} /* 파일이 선택되었을 때 hook의 검사기 돌리기 */
                style={{ display: 'none' }} /* 화면에서 숨김 */
                multiple /* 여러 파일 한 번에 선택 가능하도록 설정 */
            />

            {/* 📝 파일이 추가되었을 때 보여주는 첨부 리스트 (파일 개수가 0개면 그리지 않음) */}
            {files.length > 0 && (
                <div className="write-post-file-list">
                    {files.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="write-post-file-item">
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">({formatFileSize(file.size)})</span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation(); // 버튼 클릭 시 박스 클릭(파일선택창 열림)이 같이 일어나는거 방지
                                    removeFile(file.name);
                                }}
                                className="file-remove-btn"
                            >
                                <MaterialIcon icon="close" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};