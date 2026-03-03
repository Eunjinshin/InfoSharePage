package com.infoshare.common;

import java.util.ArrayList;
import java.util.List;

public class TagParserUtil {

    /**
     * 프론트엔드에서 넘어오는 다양한 형태의 태그 문자열(JSON 배열 문자열, 쉼표 구분 문자열 등)을 파싱합니다.
     * 
     * @param tags 원본 태그 리스트
     * @return 정제된 태그 리스트
     */
    public static List<String> parseTags(List<String> tags) {
        if (tags == null) {
            return null;
        }

        List<String> parsedTags = new ArrayList<>();
        for (String tag : tags) {
            if (tag == null || tag.trim().isEmpty()) {
                continue;
            }

            // JSON 배열이나 리스트 문자열인 경우 대괄호 제거
            if (tag.startsWith("[") && tag.endsWith("]")) {
                tag = tag.substring(1, tag.length() - 1);
            }

            // 쉼표 단위로 쪼개기 및 따옴표 제거
            if (tag.contains(",")) {
                String[] split = tag.split(",");
                for (String s : split) {
                    s = s.replaceAll("[\"']", "").trim();
                    if (!s.isEmpty()) {
                        parsedTags.add(s);
                    }
                }
            } else {
                tag = tag.replaceAll("[\"']", "").trim();
                if (!tag.isEmpty()) {
                    parsedTags.add(tag);
                }
            }
        }
        return parsedTags;
    }
}
