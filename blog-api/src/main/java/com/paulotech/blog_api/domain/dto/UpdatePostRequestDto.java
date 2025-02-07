package com.paulotech.blog_api.domain.dto;

import com.paulotech.blog_api.domain.PostStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdatePostRequestDto {

    @NotNull(message = "Post Id is required")
    private UUID id;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 200,  message = "Title must be between {min} e {max} at least 3 characters long")
    private String title;

    @NotBlank(message = "Content is required")
    @Size(min = 10, max = 50000, message = "Content must be between {min} e {max} characters long")
    private String content;

    @NotNull(message = "Category is required")
    private UUID categoryId;

    @Builder.Default
    @Size(min = 10, message = "Maximum {max} tags allowed")
    private Set<UUID> tagsIds = new HashSet<>();

    @NotNull(message = "Status is required")
    private PostStatus postStatus;

}
