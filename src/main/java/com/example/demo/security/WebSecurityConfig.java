package com.example.demo.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .authorizeRequests()
                    .antMatchers("/register**").not().authenticated()
                    .antMatchers("/webjars/**", "/about**").permitAll()
                    .antMatchers("/admin**").hasRole("ADMIN")
                    .antMatchers("/index**").hasRole("USER")
                    .anyRequest().authenticated()
                .and()
                .formLogin().permitAll()
                .and()
                .logout()
                    .logoutSuccessUrl("/login")
                    .invalidateHttpSession(true)
                .permitAll();


        http.authorizeRequests()
                .antMatchers("/resources/static/js**").permitAll();


    }
}
