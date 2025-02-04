package com.paulotech.blog_api.domain.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateTagRequest {

    @NotEmpty(message = "O conjunto de tags não pode estar vazio")
    private Set<@Valid TagName> names;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TagName {

        @Size(min = 2, max = 30, message = "O nome da tag deve ter entre {min} e {max} caracteres")
        @Pattern(regexp = "^[a-zA-Z0-9\\s]+$", message = "O nome da tag deve conter apenas letras, números e espaços")
        private String name;
    }
}
