import { useState } from "react";
import { WRITE_POST } from "../../constants/Texts";
import { MaterialIcon } from "../../utils/MaterialIcon";


export const WriteTagForm: React.FC = () => {

    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };
    return (
        <div className="write-post-form-group">
            <label className="write-post-form-label">{WRITE_POST.FORM.TAGS_LABEL}</label>
            <div className="write-post-tags-list">
                {tags.map((tag, index) => (
                    <span key={index} className="write-post-tag-item">
                        #{tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)} className="write-post-tag-remove">
                            <MaterialIcon icon="close" />
                        </button>
                    </span>
                ))}
            </div>
            <input
                type="text"
                className="write-post-input-tags"
                placeholder={WRITE_POST.FORM.TAGS_PLACEHOLDER}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
            />
        </div>
    );
};