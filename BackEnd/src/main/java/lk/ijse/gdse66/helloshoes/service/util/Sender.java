package lk.ijse.gdse66.helloshoes.service.util;

import jakarta.mail.*;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Properties;


@Component
public class Sender {

    @Autowired
    private JavaMailSender mailSender;

    public void outMail(String msg, String to, String subject) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setFrom("ydcocg@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(msg);

        mailSender.send(mimeMessage);
        System.out.println("Sent... " + to);
    }

    public void outMail(String msg, ArrayList<String> to, String subject) throws MessagingException {
        for (String ele : to) {
            outMail(msg, ele, subject);
        }
    }
    public static boolean checkConnection() {
        String host = "smtp.gmail.com";
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", 587);

        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("ydcocg@gmail.com", "pkqaypummghiplns");
            }
        });

        try {
            Transport transport = session.getTransport("smtp");
            transport.connect(host, "ydcocg@gmail.com", "pkqaypummghiplns");
            transport.close();
            return true; // Connection successful
        } catch (MessagingException e) {
            e.printStackTrace();
            return false; // Connection failed
        }
    }

}
