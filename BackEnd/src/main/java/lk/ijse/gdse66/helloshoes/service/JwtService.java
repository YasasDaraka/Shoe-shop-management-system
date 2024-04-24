package lk.ijse.gdse66.helloshoes.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String extractUserName(String token);
    String generateToken(UserDetails userDetails);
    boolean isTokenValid(String token, UserDetails userDetails);
    public String generateAccessTokenFromRefreshToken(String refreshToken);
    public boolean validateRefreshToken(String refreshToken);
}
