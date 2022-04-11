package com.example.pomotimer.repository;


import com.example.pomotimer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE User SET verificationCode = ?1 WHERE id = ?2")
    void changeVerificationCode(@Param("code") String verificationCode, @Param("id") Long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE User SET enabled = true WHERE username = ?1")
    void setEnabled(@Param("username") String username);
}
