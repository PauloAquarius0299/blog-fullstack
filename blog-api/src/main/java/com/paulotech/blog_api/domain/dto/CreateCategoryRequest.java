package com.paulotech.blog_api.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCategoryRequest {

    @NotBlank(message = "O nome da categoria é um requisito")
    @Size(min = 2, max = 30, message = "A Categoria deve ser entre {min} e {max} de caracteres")
    @Pattern(regexp = "^[\\p{L}0-9\\s-]+$", message = "O nome da categoria só pode conter letras, números, espaços e hífens ")
    private String name;
}
