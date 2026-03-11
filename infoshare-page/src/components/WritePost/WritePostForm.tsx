import React, { useState, useEffect } from 'react';
import { WRITE_POST, MAIN_TEXT } from '../../constants/Texts';
import { WriteCategoryForm } from './WriteCategoryForm';
import { MaterialIcon } from '../../utils/MaterialIcon';
import '../../styles/WritePost/WritePostForm.css';
import { WritsEditor } from './WritsEditor';
import { WriteTagForm } from './WriteTagForm';
import { FileUpload } from '../common/FileUpload';
import { useAutoSave } from '../../hooks/useAutoSave';
import { useSubmitPost } from '../../hooks/useSubmitPost';
import { Editor } from '@toast-ui/react-editor';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getPostDetailApi, getCategoriesApi } from '../../api/getApiList';
import { useMutation } from '../../hooks/useMutation';
import { updatePostApi } from '../../api/editApiList';
import { API_ERROR } from '../../constants/AlertText';
import { FILTER_TEXT } from '../../constants/FilterText';

export const WritePostForm: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const isEdit = !!postId;
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState<number>(1);
    const editorRef = React.useRef<Editor>(null);
    const [tags, setTags] = useState<string[]>([]);

    const fetchDetail = React.useCallback(async (id: number) => {
        if (!id) throw new Error('Post ID is missing');
        return getPostDetailApi(id);
    }, []);

    // 상세 조회 API 훅 (수정 모드일 때만 활용)
    const { data: postDetail, isLoading: isDetailLoading } = useFetch(
        fetchDetail,
        isEdit ? Number(postId) : 0
    );

    // 카테고리 목록 가져오기 (이름 매핑용)
    const { data: categories } = useFetch(getCategoriesApi);

    // 상세 데이터가 로딩되면 초기값 세팅
    useEffect(() => {
        if (isEdit && postDetail && categories) {
            setTitle(postDetail.title || '');
            
            // 기존 카테고리 이름과 일치하는 ID를 찾아서 세팅합니다.
            const matchingCategory = categories.find((c: any) => c.name === postDetail.category);
            if (matchingCategory) {
                setCategoryId(matchingCategory.id);
            }
            
            // setTags(postDetail.tags || []);

            // Toast Editor 내용 세팅
            if (editorRef.current) {
                editorRef.current.getInstance().setHTML(postDetail.content || '');
            }
        }
    }, [isEdit, postDetail, categories]);

    // 생성 훅 (FormData)
    const { submitPost, isLoading: isSubmitLoading } = useSubmitPost();
    // 수정 훅 (JSON)
    const { mutate: mutateEdit, isLoading: isEditLoading } = useMutation(updatePostApi);

    const { lastSavedTime } = useAutoSave({ title });

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' });
    };

    const handleSubmit = async () => {
        const contentHtml = editorRef.current?.getInstance().getHTML() || "";
        
        // 현재 선택된 categoryId를 기반으로 categories 배열에서 이름(name)을 찾습니다.
        const selectedCategory = categories?.find((c: any) => c.id === categoryId);
        const categoryName = selectedCategory ? selectedCategory.name : "Free";

        if (isEdit) {
            // 게시글 수정 로직 (FormData 기반)
            try {
                const formData = new FormData();
                formData.append("title", title);
                formData.append("content", contentHtml);
                formData.append("category", categoryName);
                
                // 태그 배열 서버 파싱에 맞게 append
                tags.forEach(tag => formData.append("tags", tag));

                await mutateEdit(Number(postId), formData);
                alert("게시글이 성공적으로 수정되었습니다.");
                navigate(`/detail/${postId}`);
            } catch (error: any) {
                alert(error.message || API_ERROR.POST.ERROR);
            }
        } else {
            // 게시글 작성 로직
            submitPost(title, contentHtml, categoryName, tags);
        }
    };

    if (isEdit && isDetailLoading) {
        return <div>{MAIN_TEXT.LOADING}</div>;
    }

    const isLoading = isSubmitLoading || isEditLoading;

    return (
        <div className="write-post-form-container">
            {/* Post Title */}
            <div className="write-post-form-group">
                <label className="write-post-form-label">
                    {WRITE_POST.FORM.TITLE_LABEL}
                </label>
                <input
                    type="text"
                    className="write-post-input-title"
                    placeholder={WRITE_POST.FORM.TITLE_PLACEHOLDER}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Category Select */}
            <WriteCategoryForm categoryId={categoryId} setCategoryId={setCategoryId} />

            {/* Content Editor */}
            <WritsEditor editorRef={editorRef} />

            {/* Tags (수정 API에 태그 수정이 없으므로 생성시에만 주로 활성화) */}
            <WriteTagForm tags={tags} setTags={setTags} />

            {/* File Upload Area */}
            <FileUpload />

            {/* Actions */}
            <div className="write-post-form-actions">
                <div className="write-post-draft-info">
                    <MaterialIcon icon="info" />
                    {lastSavedTime
                        ? `${WRITE_POST.FORM.DRAFT_SAVED} (${formatTime(lastSavedTime)})`
                        : WRITE_POST.FORM.DRAFT_SAVING_GUIDE}
                </div>
                <div className="write-post-action-buttons">
                    <button type="button" className="write-post-btn-draft">
                        <MaterialIcon icon="save" />
                        {WRITE_POST.FORM.SAVE_DRAFT_BTN}
                    </button>
                    <button
                        type="button"
                        className="write-post-btn-publish"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        <MaterialIcon icon="publish" />
                        {isLoading ? FILTER_TEXT.PROCESSING : (isEdit ? FILTER_TEXT.EDIT_COMPLETE : WRITE_POST.FORM.PUBLISH_BTN)}
                    </button>
                </div>
            </div>
        </div>
    );
};
