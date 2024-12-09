package com.testTec.taskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.testTec.taskManager.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {}
