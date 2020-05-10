package com.sin.orb.domain;

import com.sin.orb.exception.ResourceNotFoundException;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(of = {"id"})
@Table(name = "task_cards")
@ToString(exclude = {"user"})
public class TaskCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "creation_date")
    private LocalDate creationDate;

    @OneToMany(mappedBy = "taskCard", fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Task> tasks;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

    public Task getTask(Long id) {
        return tasks.stream()
                    .filter(task -> task.getId().equals(id))
                    .findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));
    }
}
