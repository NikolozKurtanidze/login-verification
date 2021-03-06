package com.example.pomotimer.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "pomo_users")
public class User {

    @Column(name = "id")
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "pwd")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "enabled")
    private Boolean enabled;
}
