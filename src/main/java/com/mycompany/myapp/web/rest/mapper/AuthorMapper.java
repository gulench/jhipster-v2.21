package com.mycompany.myapp.web.rest.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.web.rest.dto.AuthorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Author and its DTO AuthorDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AuthorMapper {

    AuthorDTO authorToAuthorDTO(Author author);

    @Mapping(target = "books", ignore = true)
    Author authorDTOToAuthor(AuthorDTO authorDTO);
}
