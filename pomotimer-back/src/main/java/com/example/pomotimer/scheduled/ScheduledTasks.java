package com.example.pomotimer.scheduled;

import com.example.pomotimer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    @Autowired
    private UserService userService;

    @Scheduled(cron = "@midnight")
    public void clearDay(){
        userService.clearDay();
    }

    @Scheduled(cron = "@weekly")
    public void clearWeek(){
        userService.clearWeek();
    }

    @Scheduled(cron = "@monthly")
    public void clearMonth(){
        userService.clearMonth();
    }

}
