package com.paulotech.blog_api.domain.dto;

import com.paulotech.blog_api.domain.PostStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreatePostRequestDto {

    @NotBlank(message = "Title is required")
    @Size(min= 2, max = 200, message = "O titulo deve ter entre {min} e {max} de caracteres")
    private String title;

    @NotBlank(message = "Content is required")
    @Size(min= 10, max = 50000, message = "O conteudo deve ter entre {min} e {max} de caracteres")
    private String content;

//    @NotNull(message = "Category ID is required")
    private UUID categoryId;

    @Builder.Default
    @Size(max = 10, message="Maximo {max} tags allowed")
    private Set<UUID> tagIds = new HashSet<>();

//    @NotNull(message = "Status is required")
    private PostStatus status;

}
