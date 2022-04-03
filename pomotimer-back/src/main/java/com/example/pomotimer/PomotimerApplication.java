package com.example.pomotimer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PomotimerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PomotimerApplication.class, args);
	}

}
