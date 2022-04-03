package com.example.pomotimer.service;


import com.example.pomotimer.entity.User;
import com.example.pomotimer.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    public boolean checkUser(String username, String password){
        return userRepository.findAll()
                .stream()
                .anyMatch(x -> x.getUsername().equals(username) && x.getPassword().equals(password));
    }

    public User getUser(String username){
        return userRepository.findAll()
                .stream()
                .filter(x -> x.getUsername().equals(username))
                .findAny()
                .get();
    }

    public boolean checkUsername(String username, String email) {
        return userRepository.findAll()
                .stream()
                .noneMatch(x -> x.getUsername().equals(username))
                &&
                userRepository
                        .findAll()
                        .stream()
                        .noneMatch(x -> x.getEmail().equals(email));
    }

    public boolean loginUser(String username, String password){
        if(userRepository.findAll().stream().noneMatch(x -> x.getUsername().equals(username))) return false;
        return userRepository.findAll()
                .stream()
                .filter(x -> x.getUsername().equals(username))
                .findFirst()
                .get()
                .getEnabled()
                && userRepository.findAll()
                .stream()
                .filter(x -> x.getUsername().equals(username))
                .findFirst()
                .get()
                .getUsername()
                .equals(username)
                && userRepository.findAll()
                .stream()
                .filter(x -> x.getUsername().equals(username))
                .findFirst()
                .get()
                .getPassword()
                .equals(password);
    }

    public boolean checkCode(String username, String verificationCode){
        if(this.getUser(username).getVerificationCode().equals(verificationCode)){
            userRepository.setEnabled(username);
            return true;
        }
        return false;
    }

    public boolean registerUser(String username, String password, String email){
        String verificationCode = RandomString.make(10);
        userRepository.save(User
                .builder()
                .username(username)
                .password(password)
                .pomosDay(0)
                .pomosWeek(0)
                .pomosMonth(0)
                .email(email)
                .verificationCode(verificationCode)
                .enabled(false)
                .build());
        return true;
    }

    public void changeVerificationCode(String username){
        String verificationCode = RandomString.make(10);
        User user = this.getUser(username);
        userRepository.changeVerificationCode(verificationCode, user.getId());
    }

    public void sendVerificationEmail(String username) throws MessagingException, UnsupportedEncodingException {
        User user = this.getUser(username);
        String toAddress = user.getEmail();
        String fromAddress = "pomotimernoreply@gmail.com";
        String senderName = "pomotimerNOREPLY";
        String subject = "Email verification";
        String content = "Your verification code is: " + user.getVerificationCode();

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(content, true);

        mailSender.send(message);
    }

    public void addPomo(Long id){
        userRepository.incrDay(id);
        userRepository.incrWeek(id);
        userRepository.incrMonth(id);
    }

    public void clearDay(){
        userRepository.findAll()
                .forEach(x -> userRepository.clearDay(x.getId()));
    }

    public void clearWeek(){
        userRepository.findAll()
                .forEach(x -> userRepository.clearWeek(x.getId()));
    }

    public void clearMonth(){
        userRepository.findAll()
                .forEach(x -> userRepository.clearMonth(x.getId()));
    }

}
