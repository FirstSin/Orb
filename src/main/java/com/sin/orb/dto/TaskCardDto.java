package com.sin.orb.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class TaskCardDto {
    @Null
    private Long cardId;

    @Size(min = 1, max = 56)
    private String name;

    @Size(max = 2048)
    private String imageUrl;

    @Size(max = 100)
    private String description;

    @Null
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate creationDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime term;

    @Null
    private List<TaskDto> tasks;

    private Boolean done = false;

    private Boolean completedAtTerm = false;
}
